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
      "601b-2400-1a00-b060-b9b4-7bb8-9e4-95ab-80a0.ngrok-free.app"
    ],
  },
  plugins: [react(), tailwindcss()],
});
