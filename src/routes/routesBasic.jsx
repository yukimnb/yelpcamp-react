import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { IndexPage } from "../pages/IndexPage";
import { MainPage } from "../pages/MainPage";

export const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} />
      <Route path="/campgrounds" element={<MainPage />} />
    </>
  )
);
