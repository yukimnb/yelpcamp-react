import { Box, Container, Typography, useTheme } from "@mui/material";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ backgroundColor: "#212529", py: 2.5, mt: "auto" }}>
      <Container>
        <Typography
          sx={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.5)",
            fontWeight: theme.typography.fontWeightBold,
          }}>
          &copy;YelpCamp 2024
        </Typography>
      </Container>
    </Box>
  );
};
