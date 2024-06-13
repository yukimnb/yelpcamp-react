import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledGlobal } from "./components/StyledGlobal";
import { routesBasic } from "./routes/routesBasic";
import { QueryClient, QueryClientProvider } from "react-query";

const cli = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={cli}>
      <StyledGlobal />
      <RouterProvider router={routesBasic} />
    </QueryClientProvider>
  </React.StrictMode>
);
