import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
interface ProxyOptions {
  target: string;
  changeOrigin: boolean;
  rewrite: (path: string) => string;
  secure: boolean;
}

interface ResolveOptions {
  proxy: {
    [key: string]: ProxyOptions;
  };
  alias: {
    [key: string]: string;
  };
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/v1/, "/api/v1"),
        secure: false,
      },
    },
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  } as ResolveOptions,
});
