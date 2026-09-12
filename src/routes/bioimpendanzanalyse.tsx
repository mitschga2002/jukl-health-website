import { createFileRoute, Navigate } from "@tanstack/react-router";

// Legacy misspelled URL kept as a permanent redirect to the correct route.
export const Route = createFileRoute("/bioimpendanzanalyse")({
  component: () => <Navigate to="/bioimpedanzanalyse" replace />,
});
