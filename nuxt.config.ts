// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from "dotenv";

dotenv.config();

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "vue-toastification/dist/index.css"],
  components: [{ path: "~/src/components", pathPrefix: false }],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
    },
  },
});
