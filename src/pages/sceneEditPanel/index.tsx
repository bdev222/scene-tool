import React, { useState, useEffect } from "react"
import { Box, Input, Typography, Grid, Button, Breadcrumbs, Link } from "@mui/material"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import LocationPanel from "../../components/locationPanel"
import CharacterPanel from "../../components/characterPanel"
import CharacterItem from "../../components/characterPanel/characterItem"
import { addScene, selectSceneByIdAndEpisode, updateScene } from "../../app/scene.slice"
import { Character, Location } from "../../__generated__/graphql"
import { useAppDispatch } from "../../app/hooks"

export default function SceneEditPanel() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const scene = useSelector(
    selectSceneByIdAndEpisode(
      searchParams.get("episodeId") || "",
      searchParams.get("sceneId") || ""
    )
  )
  const [location, setLocation] = useState<Location | undefined>()
  const [characters, setCharacters] = useState<Character[]>([])
  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    console.log(scene)
    setLocation(scene?.location)
    setCharacters([...(scene?.characters || [])])
    setDescription(scene?.description || "")
  }, [scene])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleAddCharacter = (character: Character) => {
    setCharacters((characters) => {
      console.log(characters)
      characters.push(character)
      return [...characters]
    })
  }

  const handleRemoveCharacter = (character: Character) => {
    setCharacters((characters) => {
      return characters.filter((ch) => ch.id !== character.id)
    })
  }

  const handleAddScene = () => {
    const episodeId = searchParams.get("episodeId")
    const sceneId = searchParams.get("sceneId")
    if (episodeId && location) {
      if (sceneId) {
        dispatch(
          updateScene({ episodeId, sceneId, updates: { location, description, characters } })
        )
      } else {
        dispatch(addScene({ episodeId, scene: { location, description, characters } }))
      }
    }
    navigate(`/scenes?episodeId=${episodeId}`)
  }

  return (
    <Box sx={{ border: "1px solid", borderColor: "primary.main" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "40px",
          borderBottom: "1px solid",
          borderColor: "primary.main",
          px: 2,
        }}
      >
        <Breadcrumbs>
          <Link underline="hover">scene</Link>
        </Breadcrumbs>
      </Box>
      <Box sx={{ display: "flex" }}>
        <LocationPanel onChange={setLocation} location={location} />
        <CharacterPanel characters={characters} onChange={handleAddCharacter} />
        <Box sx={{ p: "5px 20px", flexGrow: 1, height: "calc(100vh - 42px)", overflowY: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "1.5rem", mb: 2 }}>
              {!scene ? "New Scene" : "Edit Scene"}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              disabled={!location}
              onClick={handleAddScene}
            >
              {scene ? "Save" : "Add"}
            </Button>
          </Box>
          <Box sx={{ display: "flex", mb: 2 }}>
            <Typography sx={{ mr: 1, fontWeight: 700 }}>Description: </Typography>
            <Input rows={5} multiline fullWidth onChange={handleChange} value={description} />
          </Box>
          <Typography sx={{ mr: 1, fontWeight: 700, mb: 1 }}>
            Location: {location?.name || ""}
          </Typography>
          <Typography sx={{ mr: 1, fontWeight: 700 }}>Characters: </Typography>
          <Grid container>
            {characters.map((character) => (
              <Grid key={character!.id} item xs={12} sm={6}>
                <CharacterItem character={character as Character} onClick={handleRemoveCharacter} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
