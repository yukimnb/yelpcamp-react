import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { TopPage } from "../pages/TopPage";
import { ListPage } from "../pages/ListPage";

export const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<TopPage />} />
      <Route path="/campgrounds" element={<ListPage />} />
    </>
  )
);
