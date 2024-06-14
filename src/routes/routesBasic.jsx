import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { IndexPage } from "../pages/IndexPage";
import { MainPage } from "../pages/MainPage";
import { ListPage } from "../pages/ListPage";
import { DetailPage } from "../pages/DetailPage";
import { LoginPage } from "../pages/LoginPage";
import { CreatePage } from "../pages/CreatePage";
export const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} />
      <Route path="/campgrounds" element={<MainPage />}>
        <Route path="" element={<ListPage />} />
        <Route path=":id" element={<DetailPage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </>
  )
);
