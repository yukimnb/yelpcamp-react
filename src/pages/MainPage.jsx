import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Outlet } from "react-router-dom";

export const MainPage = () => {
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <NavBar />
        <main className="container mt-5">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
