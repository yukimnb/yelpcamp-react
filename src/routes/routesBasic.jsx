import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { TopPage } from "../pages/TopPage";
import { MainPage } from "../pages/MainPage";

export const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<TopPage />} />
      <Route path="/campgrounds" element={<MainPage />} />
    </>
  )
);
