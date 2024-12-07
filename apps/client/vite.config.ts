import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { Agent } from 'node:http';

export const envPath = path.resolve(process.cwd(), "..", "..");

export default defineConfig(({ mode }) => {
  const { APP_URL, FILE_UPLOAD_SIZE_LIMIT, DRAWIO_URL } = loadEnv(mode, envPath, "");

  return {
    define: {
      "process.env": {
        APP_URL,
        FILE_UPLOAD_SIZE_LIMIT,
        DRAWIO_URL
      },
      'APP_VERSION': JSON.stringify(process.env.npm_package_version),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      proxy: {
        "/api": {
          target: APP_URL,
          changeOrigin: true,
          agent: new Agent({ keepAlive: true, keepAliveMsecs: 20000 }), 
        },
      },
    },
  };
});
