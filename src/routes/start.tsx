import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/start")({
  component: () => <Navigate to="/" replace />,
});
