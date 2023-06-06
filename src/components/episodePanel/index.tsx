import React from "react"
import {
  Box,
  Input,
  Pagination,
  MenuItem,
  Typography,
  MenuList,
  CircularProgress,
} from "@mui/material"
import { useQuery } from "@apollo/client"
import { useSearchParams, useNavigate } from "react-router-dom"

import { GetEpisodesDocument } from "../../__generated__/graphql"

export default function EpisodePanel() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [page, setPage] = React.useState<number>(1)
  const [searchName, setSearchName] = React.useState<string>()
  const [pages, setPages] = React.useState<number>(0)
  const { data, loading } = useQuery(GetEpisodesDocument, {
    variables: { page, filter: { name: searchName } },
  })

  const handlePageChange = (_: any, page: number) => {
    setPage(page)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearchName(e.target.value)
  }

  const handleClickItem = (episodeId: string) => {
    searchParams.set("episodeId", episodeId)
    navigate(`/scenes?${searchParams.toString()}`)
  }

  React.useEffect(() => {
    if (data?.episodes?.info?.pages) {
      setPages(data.episodes.info.pages)
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
        height: "100vh",
        maxWidth: { md: "300px", xs: "100%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
          borderBottom: "1px solid",
          borderColor: "primary.main",
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px", mr: 2 }}>
          Episodes
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
            {data?.episodes?.results?.map((episode) => (
              <MenuItem
                selected={searchParams.get("episodeId") === episode?.id}
                key={episode?.id}
                onClick={() => handleClickItem(episode?.id || "")}
              >
                <Typography sx={{ fontSize: "14px" }}>{episode?.name}</Typography>
              </MenuItem>
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
