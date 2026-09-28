import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Native View Transitions on route changes; the animation lives in styles.css.
    defaultViewTransition: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
