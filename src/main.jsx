import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RoutingTable } from "./routes/RoutingTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./components/ContextProvider";
import { Flash } from "./components/Flash";
import { Loading } from "./components/Loading";
import { CssBaseline } from "@mui/material";

const cli = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={cli}>
        <CssBaseline />
        <Flash />
        <Suspense fallback={<Loading />}>
          <RouterProvider router={RoutingTable} />
        </Suspense>
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>
);
