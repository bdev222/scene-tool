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
import { GetLocationsDocument, Location } from "../../__generated__/graphql"

export default function LocationPanel({
  onChange,
  location,
}: {
  location?: Location
  onChange: (location: Location) => void
}) {
  const [page, setPage] = React.useState<number>(1)
  const [searchName, setSearchName] = React.useState<string>()
  const [pages, setPages] = React.useState<number>(0)
  const { data, loading, error } = useQuery(GetLocationsDocument, {
    variables: { page, filter: { name: searchName } },
  })

  const handlePageChange = (_: any, page: number) => {
    setPage(page)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearchName(e.target.value)
  }

  const handleClick = (location: Location) => {
    onChange(location)
  }

  React.useEffect(() => {
    if (data?.locations?.info?.pages) {
      setPages(data.locations.info.pages)
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
        height: "calc(100vh - 106px)",
        maxWidth: { md: "300px", xs: "100%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexShrink: 0,
          alignItems: "center",
          height: "40px",
          borderBottom: "1px solid",
          borderColor: "primary.main",
          px: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "24px",
            mr: 2,
          }}
        >
          Locations
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
        {error ? (
          <Box p={2}>
            <Typography sx={{ fontSize: "16px", textAlign: "center" }}>
              Something was wrong
            </Typography>
          </Box>
        ) : loading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}
          >
            <CircularProgress size="1.5rem" />
          </Box>
        ) : (
          <MenuList>
            {data?.locations?.results?.map((loc) => (
              <MenuItem
                key={loc?.id}
                onClick={() => handleClick(loc as Location)}
                disabled={loc?.id === location?.id}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{loc?.name}</Typography>
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
