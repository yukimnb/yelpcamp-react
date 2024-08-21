import { Box, CircularProgress, Typography } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <CircularProgress color="grey" size="4rem" />
      <Typography
        component="span"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          margin: -1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          border: 0,
          padding: 0,
        }}>
        Loading...
      </Typography>
    </Box>
  );
};
