// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@primevue/nuxt-module', '@nuxtjs/i18n', '@pinia/nuxt'],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
  },
  i18n: {    
    locales: [
      { code: "en", iso: "en-US", name: "English" },
      { code: "pt", iso: "pt-BR", name: "Português" },
      { code: "es", iso: "es", name: "Português" },
    ],
    defaultLocale: "pt",
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts", // Agora é uma string apontando para o arquivo
  },
  css: ['~/assets/css/main.css'], 
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})






 

