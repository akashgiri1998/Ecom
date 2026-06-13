import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
})
