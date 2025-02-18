// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import path from 'path';
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    // Passando opções diretamente no módulo
    [
      '@nuxtjs/i18n',
      {
        vueI18n: path.resolve(__dirname, 'src','i18n','index') // Se estiver usando um caminho customizado
      }
    ]
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
