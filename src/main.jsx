import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledGlobal } from "./components/StyledGlobal";
import { routesBasic } from "./routes/routesBasic";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./components/ContextProvider";

const cli = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={cli}>
        <StyledGlobal />
        <RouterProvider router={routesBasic} />
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>
);
