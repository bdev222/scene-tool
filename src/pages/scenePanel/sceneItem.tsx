import React from "react"
import { Box, Typography, Card, CardMedia, CardContent, Badge } from "@mui/material"
import { Remove as RmoveIcon } from "@mui/icons-material"

import { Scene } from "../../app/scene.slice"

export default function SceneItem({
  scene,
  onClick,
  onDelete,
}: {
  scene: Scene
  onClick: (scene: Scene) => void
  onDelete: (sceneId: string) => void
}) {
  return (
    <Box sx={{ p: 1 }}>
      <Badge
        badgeContent={<RmoveIcon onClick={() => onDelete(scene.id)} />}
        color="secondary"
        sx={{ display: { md: "block", xs: "none" }, "&:hover": { cursor: "pointer" } }}
      >
        <Card
          key={scene.id}
          onClick={() => onClick(scene)}
          sx={{
            width: 150,
            "&:hover": { cursor: "pointer", border: "1px solid", borderColor: "primary.main" },
          }}
        >
          <CardMedia>
            <Box
              component="img"
              src={scene.characters[0]?.image || ""}
              sx={{ width: "100%", height: "120px" }}
            />
          </CardMedia>
          <CardContent>
            <Typography
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                color: "background.default",
                whiteSpace: "nowrap",
              }}
            >
              {scene.location.name || ""}
            </Typography>
          </CardContent>
        </Card>
      </Badge>
      <Box
        sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", bgcolor: "primary.main" }}
      >
        <Box
          component="img"
          src={scene.characters[0]?.image || ""}
          sx={{ width: 150, height: 150 }}
        />
        <Box
          sx={{
            dispaly: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "background.default",
            p: 1,
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>{scene.location.name || ""}</Typography>
          <Typography sx={{ fontSize: "12px" }}>{scene.description}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
