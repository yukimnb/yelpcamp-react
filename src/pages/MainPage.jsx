import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Box, Container } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import "../assets/css/starability.css";

export const MainPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar />
      <Container fixed sx={{ mt: 5, flexGrow: 1 }}>
        <ScrollRestoration />
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};
