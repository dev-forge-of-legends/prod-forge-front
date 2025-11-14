import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@app-types": path.resolve(__dirname, "./src/types"),
      "@app-utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://staging-api.forge.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    host: true
  },
});