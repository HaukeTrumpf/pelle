export default defineNuxtConfig({

  head: {
    htmlAttrs: {
      lang: 'de' 
    }
  },


  devtools: { enabled: true },
  target: 'static',

  app: {
    baseURL: '/pelle/',
  },

  css: ['~/assets/css/custom.css', '~/assets/font/font.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  robots: {
    UserAgent: '*',
    Disallow: '/admin',
    Allow: '/',
  },

  sitemap: {
    routes: [
      { url: '/#events', priority: 1.0 },
      { url: '/#contact', priority: 0.8 },
    ],
  },

  compatibilityDate: '2024-10-07',
});
