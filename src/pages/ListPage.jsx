import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCampgroundsList } from "../apis/campground-api";
import { Link } from "react-router-dom";
import { ClusterMap } from "../components/ClusterMap";
import { useErrorBoundary } from "react-error-boundary";
import { Box, Typography, Button, useMediaQuery, useTheme, Card, CardMedia, CardContent } from "@mui/material";

import SwapVertIcon from "@mui/icons-material/SwapVert";

export const ListPage = () => {
  const [desc, setDesc] = useState(false);
  const [data, setData] = useState([]);
  const { showBoundary } = useErrorBoundary();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: fetchedData } = useQuery("list", getCampgroundsList, {
    onError: (error) => {
      showBoundary(error);
    },
  });

  useEffect(() => {
    if (fetchedData) {
      const updatedData = fetchedData.map((object) => ({
        ...object,
        properties: { title: object.title },
      }));
      setData(updatedData);
    }
  }, [fetchedData]);

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (desc) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setData(sortedData);
    setDesc((prev) => !prev);
  };

  return (
    <>
      <ClusterMap newData={data} />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 1 }}>
        <Typography variant={isSm ? "h6" : "h5"} component="h1">
          キャンプ場一覧
          <Typography component="span" variant={isSm ? "h6" : "h5"} sx={{ ml: 1 }}>
            ({data.length}件)
          </Typography>
        </Typography>
        <Button variant="outlined" color="error" onClick={handleSort} size={isSm ? "small" : "medium"}>
          <SwapVertIcon sx={{ mr: 1 }} />
          <Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>
            {isSm ? (desc ? "古い順" : "新しい順") : desc ? "古い順に並び替え" : "新しい順に並び替え"}
          </Typography>
        </Button>
      </Box>

      {data.map((object) => (
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            mb: 3,
            height: { md: 200 },
            flexDirection: { xs: "column", md: "row" },
          }}
          key={object.id}>
          <CardMedia component="img" image={object.image1} alt={object.title} sx={{ width: { md: 300 } }} />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: { xs: 1, md: 0 },
            }}>
            <Typography variant="h5" component="h2">
              {object.title}
            </Typography>
            <Typography variant="body1">
              {object.description.length > 30 ? `${object.description.slice(0, 30)}...` : object.description}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {object.location}
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to={`/campgrounds/${object.id}`}
              sx={{ alignSelf: { md: "flex-start" } }}>
              {object.title}の詳細
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
