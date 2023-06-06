import { Box, MenuItem, Typography } from "@mui/material"
import React from "react"
import { Character } from "../../__generated__/graphql"

export default function CharacterItem({
  onClick,
  character,
  disabled,
}: {
  onClick: (character: Character) => void
  character: Character
  disabled?: boolean
}) {
  return (
    <MenuItem key={character.id} onClick={() => onClick(character)} disabled={disabled}>
      <Box component="img" src={character.image || ""} sx={{ width: "50px", height: "50px" }} />
      <Box sx={{ ml: 1 }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>{character.name}</Typography>
        <Typography sx={{ fontSize: "12px" }}>{character.gender}</Typography>
        <Typography sx={{ fontSize: "12px" }}>{character.status}</Typography>
      </Box>
    </MenuItem>
  )
}
