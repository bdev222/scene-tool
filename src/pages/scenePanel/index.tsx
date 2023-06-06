import React from "react"
import { Box, Breadcrumbs, Link, Typography, Button } from "@mui/material"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { Scene, removeScene, selectScenesByEpisode } from "../../app/scene.slice"
import SceneItem from "./sceneItem"
import { useAppDispatch } from "../../app/hooks"

export default function ScenePanel() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const scenes = useSelector(selectScenesByEpisode(searchParams.get("episodeId") || ""))

  const handleEditScene = (scene: Scene) => {
    searchParams.set("sceneId", scene.id)
    navigate(`/scenes/edit?${searchParams.toString()}`)
  }

  const handleDeleteScene = (sceneId: string) => {
    const episodeId = searchParams.get("episodeId")
    if (episodeId) {
      dispatch(removeScene({ episodeId, sceneId }))
    }
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
          <Link underline="hover"> Scenes</Link>
        </Breadcrumbs>
      </Box>
      <Box>
        {!searchParams.get("episodeId") ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 42px)",
            }}
          >
            <Typography>Please choose episode first to manage scenes</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              height: "calc(100vh - 42px)",
              p: "5px 20px",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {scenes?.map((scene) => (
              <SceneItem
                key={scene.id}
                scene={scene}
                onClick={handleEditScene}
                onDelete={handleDeleteScene}
              />
            ))}
            <Button
              onClick={() => navigate(`/scenes/add?episodeId=${searchParams.get("episodeId")}`)}
              sx={{
                width: "40px",
                height: "60px",
                m: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "40px",
                border: "1px dotted",
                borderColor: "primary.main",
              }}
            >
              <Typography sx={{ fontSize: "1.5rem" }}>+</Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
