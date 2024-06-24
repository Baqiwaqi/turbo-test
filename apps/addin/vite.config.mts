import react from "@vitejs/plugin-react-swc";
import devCerts from "office-addin-dev-certs";
import { defineConfig } from "vite";
import officeAddin from "vite-plugin-office-addin";

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

const __dirname = new URL(".", import.meta.url).pathname;

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  plugins: [
    react(),
    // eslint(),
    officeAddin({
      devUrl: "https://localhost:3000",
      prodUrl: "https://www.contoso.com", // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION
    }),
  ],
  root: "src",
  build: {
    rollupOptions: {
      input: {
        taskpane: "/taskpane.html",
      },
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: mode !== "production" ? { https: await getHttpsOptions() } : {},
}));
