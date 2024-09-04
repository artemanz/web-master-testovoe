import { defineConfig } from "vite";
import { resolve } from "path";
import pugPlugin from "vite-plugin-pug";

export default defineConfig({
  root: resolve("src/app"),
  publicDir: resolve("public"),
  build: {
    outDir: resolve("dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve("src/app/index.html")
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  plugins: [pugPlugin({ localImports: true, basedir: resolve("src") })],
});
