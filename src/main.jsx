import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledGlobal } from "./components/StyledGlobal";
import { routesBasic } from "./routes/routesBasic";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledGlobal />
    <RouterProvider router={routesBasic} />
  </React.StrictMode>
);
