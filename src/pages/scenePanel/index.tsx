import React from "react"
import { Box, Typography, Button } from "@mui/material"
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
          justifyContent: "space-between",
          height: "40px",
          borderBottom: "1px solid",
          borderColor: "primary.main",
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: 700 }}> Scenes</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(`/scenes/add?episodeId=${searchParams.get("episodeId")}`)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          + Create New Scene
        </Button>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 106px)",
          overflowY: "auto",
        }}
      >
        {!searchParams.get("episodeId") ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Please choose episode first to manage scenes</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: { md: "flex", xs: "block" },
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
          </Box>
        )}
      </Box>
    </Box>
  )
}
