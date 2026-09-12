import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/start")({
  // Redirect target only - keep it out of the index.
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: () => <Navigate to="/" replace />,
});
