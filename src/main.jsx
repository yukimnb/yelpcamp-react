import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledGlobal } from "./components/StyledGlobal";
import { RoutingTable } from "./routes/RoutingTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./components/ContextProvider";
import { Flash } from "./components/Flash";
import { Loading } from "./components/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "./components/ErrorFallBack";

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
        <StyledGlobal />
        <Flash />
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={RoutingTable} />
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>
);
