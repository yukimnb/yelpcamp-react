import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { IndexPage } from "../pages/IndexPage";
import { MainPage } from "../pages/MainPage";
import { ListPage } from "../pages/ListPage";
import { DetailPage } from "../pages/DetailPage";
import { CreatePage } from "../pages/CreatePage";
import { SignUpPage } from "../pages/SignUpPage";
import { LoginPage } from "../pages/LoginPage";
import { EditPage } from "../pages/EditPage";

export const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} />
      <Route path="/campgrounds" element={<MainPage />}>
        <Route path="" element={<ListPage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path=":id" element={<DetailPage />} />
        <Route path=":id/edit" element={<EditPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </>
  )
);
