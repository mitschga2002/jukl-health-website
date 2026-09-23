import { defineConfig, loadEnv, type PluginOption, type UserConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// The plugin stack used to come from a third-party wrapper package; it is
// spelled out here so the build depends only on the upstream plugins. Order
// matters: tanstackStart must see the source before the React plugin transforms
// it, and nitro must be registered after tanstackStart.
export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  const plugins: PluginOption[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Keep server-only modules out of the client bundle, and fail the build
      // rather than silently shipping them.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR
      // error wrapper). Nitro builds from this - wrangler.jsonc `main` alone is
      // not enough.
      server: {
        entry: "server",
        build: {
          // The stylesheet is the only render-blocking request on the page and
          // costs a full round trip before anything paints. Inlining it into
          // the SSR response removes that request from the critical path; the
          // route manifest still owns the CSS, so code-split sheets (the Leaflet
          // one) keep loading as separate files.
          inlineCss: true,
        },
      },
    }),
  ];

  // Nitro produces the Cloudflare Worker bundle, so it is only needed on build.
  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro({ defaultPreset: "cloudflare-module" }));
  }

  plugins.push(viteReact());

  // Mirror VITE_* vars into import.meta.env, as the previous wrapper did.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const define = Object.fromEntries(
    Object.entries(env).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
  );

  return {
    plugins,
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": new URL("./src", import.meta.url).pathname },
      // Single copies of these, or hooks and query clients break across bundles.
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    server: { host: "::", port: 8080 },
  };
});
