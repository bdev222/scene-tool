import React from "react"
import { Box, Input, Pagination, Typography, MenuList, CircularProgress } from "@mui/material"
import { Character, GetCharactersDocument } from "../../__generated__/graphql"
import { useQuery } from "@apollo/client"
import CharacterItem from "./characterItem"

export default function CharacterPanel({
  characters,
  onChange,
}: {
  characters: Character[]
  onChange: (character: Character) => void
}) {
  const [page, setPage] = React.useState<number>(1)
  const [searchName, setSearchName] = React.useState<string>()
  const [pages, setPages] = React.useState<number>(0)
  const { data, loading } = useQuery(GetCharactersDocument, {
    variables: { page, filter: { name: searchName } },
  })

  const handlePageChange = (_: any, page: number) => {
    setPage(page)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearchName(e.target.value)
  }

  const handleClick = (character: Character) => {
    onChange(character)
  }

  React.useEffect(() => {
    if (data?.characters?.info?.pages) {
      setPages(data.characters.info.pages)
    }
  }, [data])

  return (
    <Box
      sx={{
        display: "flex",
        flexShrink: 0,
        flexDirection: "column",
        border: "1px solid",
        borderColor: "primary.main",
        height: "calc(100vh - 42px)",
        maxWidth: { md: "300px", xs: "100%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
          flexShrink: 0,
          borderBottom: "1px solid",
          borderColor: "primary.main",
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px", mr: 2 }}>
          Characters
        </Typography>
        <Input
          value={searchName}
          onChange={handleNameChange}
          sx={{
            lineHeight: "24px",
          }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
        {loading && (
          <Box
            sx={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}
          >
            <CircularProgress size="1.5rem" />
          </Box>
        )}
        {!loading && (
          <MenuList>
            {data?.characters?.results?.map((character) => (
              <CharacterItem
                key={character?.id}
                onClick={handleClick}
                character={character as Character}
                disabled={!!characters.find((c) => c.id === character?.id)}
              />
            ))}
          </MenuList>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          size="small"
          color="secondary"
          count={pages}
          page={page}
          disabled={loading}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  )
}
