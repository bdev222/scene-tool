import React from "react"
import { Box } from "@mui/material"
import EpisodePanel from "../components/episodePanel"
import ScenePanel from "./scenePanel"

function Top() {
  return (
    <Box sx={{ display: "flex" }}>
      <EpisodePanel />
      <Box sx={{ flexGrow: 1 }}>
        <ScenePanel />
      </Box>
    </Box>
  )
}

export default Top
