import React, { useState } from "react"
import { Box, SwipeableDrawer, AppBar, Toolbar, Typography, Button } from "@mui/material"
import { MenuOutlined as MenuIcon } from "@mui/icons-material"
import EpisodePanel from "../episodePanel"

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Box>
      <AppBar position="fixed" sx={{ height: "64px" }}>
        <Toolbar>
          <Button
            sx={{ display: { xs: "inline-block", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon color="error" />
          </Button>
          <Typography>Scene Tool</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8, display: { xs: "none", md: "flex" } }}>
        <EpisodePanel />
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
      <Box sx={{ mt: 8, display: { xs: "flex", md: "none" } }}>
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          PaperProps={{
            sx: {
              top: "64px",
            },
          }}
        >
          <Box sx={{ bgcolor: "background.default" }}>
            <EpisodePanel onClose={() => setOpen(false)} />
          </Box>
        </SwipeableDrawer>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  )
}
