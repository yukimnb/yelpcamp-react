import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "../components/ErrorFallBack";

export const Frame = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <Outlet />
    </ErrorBoundary>
  );
};
