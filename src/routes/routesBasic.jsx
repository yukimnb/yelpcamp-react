import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { IndexPage } from "../pages/IndexPage";
import { MainPage } from "../pages/MainPage";
import { DetailPage } from "../pages/DetailPage";

export const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} />
      <Route path="/campgrounds" element={<MainPage />} />
      <Route path="/campgrounds/:id" element={<DetailPage />} />
      {/* <Route path="/accounts" element={< />} /> */}
    </>
  )
);
