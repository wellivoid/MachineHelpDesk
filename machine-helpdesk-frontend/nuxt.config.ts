// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@primevue/nuxt-module', '@nuxtjs/i18n'],
primevue: {
  options: {
      theme: {
          preset: Aura
      }
  }
},
  css: ['~/assets/css/main.css'], 
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})