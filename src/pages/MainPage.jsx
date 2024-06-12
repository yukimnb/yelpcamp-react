import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ListPage } from "./ListPage";
import { QueryClient, QueryClientProvider } from "react-query";

export const MainPage = () => {
  const cli = new QueryClient();

  return (
    <>
      <QueryClientProvider client={cli}>
        <div className="d-flex flex-column vh-100">
          <NavBar />
          <main className="container mt-5">
            <ListPage />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </>
  );
};
