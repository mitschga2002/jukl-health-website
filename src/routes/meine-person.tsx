import { createFileRoute, redirect } from "@tanstack/react-router";

/* The page moved to /julian-kleinheinz so its URL matches the menu label and
   the name people search for. This keeps old links and search results
   working with a permanent redirect. */
export const Route = createFileRoute("/meine-person")({
  beforeLoad: () => {
    throw redirect({ to: "/julian-kleinheinz", statusCode: 301 });
  },
});
