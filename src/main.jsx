import React from "react";
import ReactDOM from "react-dom/client";
import { StyledGlobal } from "./components/StyledGlobal.jsx";
import { Index } from "./components/Index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledGlobal />
    <Index />
  </React.StrictMode>
);
