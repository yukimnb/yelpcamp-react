import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "../assets/css/starability.css";

export const MainPage = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <NavBar />
      <main className="container mt-5">
        <ScrollRestoration />

        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
