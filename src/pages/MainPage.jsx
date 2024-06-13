import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ListPage } from "./ListPage";

export const MainPage = () => {
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <NavBar />
        <main className="container mt-5">
          <ListPage />
        </main>
        <Footer />
      </div>
    </>
  );
};
