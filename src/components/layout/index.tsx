import React from "react"
import { Box } from "@mui/material"
import EpisodePanel from "../episodePanel"

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <EpisodePanel />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  )
}
