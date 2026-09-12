import { createFileRoute, Navigate } from "@tanstack/react-router";

// Legacy misspelled URL kept as a permanent redirect to the correct route.
export const Route = createFileRoute("/bioimpendanzanalyse")({
  // Legacy misspelled URL - keep it out of the index.
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: () => <Navigate to="/bioimpedanzanalyse" replace />,
});
