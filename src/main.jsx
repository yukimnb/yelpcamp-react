import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledGlobal } from "./components/StyledGlobal";
import { RoutingTable } from "./routes/RoutingTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./components/ContextProvider";
import { Flash } from "./components/Flash";

const cli = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={cli}>
        <StyledGlobal />
        <Flash />
        <RouterProvider router={RoutingTable} />
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>
);
