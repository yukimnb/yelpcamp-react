import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "../assets/css/starability.css";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "../components/ErrorFallBack";

export const MainPage = () => {
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <NavBar />
        <main className="container mt-5">
          <ScrollRestoration />
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </>
  );
};
