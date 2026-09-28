import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // styles.css turns on `scroll-behavior: smooth` for in-page anchors, which
    // the router's scroll-to-top on navigation would otherwise inherit: the
    // smooth scroll got cut short by the page swap, and a page reached from
    // halfway down another one opened halfway down too.
    scrollRestorationBehavior: "instant",
    // Native View Transitions on route changes; the animation lives in styles.css.
    defaultViewTransition: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
