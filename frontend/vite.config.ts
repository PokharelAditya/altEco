import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/api": "http://localhost:4000",
    },
    allowedHosts: [
      // Changed this using ngrok for https
      "e9691f2da530.ngrok-free.app",
    ],
  },
  plugins: [react(), tailwindcss()],
});
