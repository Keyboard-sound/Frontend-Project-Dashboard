import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@store": path.resolve(import.meta.dirname, "./src/store"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@features": path.resolve(import.meta.dirname, "./src/features"),
      "@api": path.resolve(import.meta.dirname, "./src/api"),
      "@hooks": path.resolve(import.meta.dirname, "./src/hooks"),
      "@utils": path.resolve(import.meta.dirname, "./src/utils"),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console.log, console.info, console.debug, console.warn
        // Keep console.error for production error tracking
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug",
          "console.warn",
        ],
        drop_debugger: true,
      },
    },
  },
});
