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
    // Hash targets too. The router's default `scrollIntoView(true)` leaves the
    // behaviour to the CSS, so a CTA like "Jetzt anfragen" (→ /kontakt#anfrage)
    // started a *smooth* native scroll inside the view transition. Lenis then
    // adopted the position on the very same tick (see LenisRouterSync in
    // __root.tsx) with an instant scroll to where the page still was: that
    // aborted the glide and the contact page opened at the top instead of at
    // the form. Instant, the hash scroll is done before Lenis looks, and the
    // view transition's new-page snapshot is taken at the form as well.
    defaultHashScrollIntoView: { behavior: "instant", block: "start" },
    // Native View Transitions on route changes; the animation lives in styles.css.
    defaultViewTransition: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
