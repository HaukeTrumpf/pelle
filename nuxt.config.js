// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  head: {
    script: [
      {
        src: 'https://www.google.com/recaptcha/api.js',
        async: true,
        defer: true,
      },
    ],
  },

  devtools: { enabled: true },
  target: 'static',

  app: {
    // Optional: Füge den Basis-URL-Pfad hinzu, falls das Repository nicht auf einem Custom-Domain veröffentlicht wird
    baseURL: '/pelle/', // Verwende den Repository-Namen
    head: {
      script: [
        {
          src: 'https://www.google.com/recaptcha/api.js',
          async: true,
          defer: true,
        },
      ],
    },
  },

  css: ['~/assets/css/custom.css', '~/assets/font/font.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Module für SEO
  modules: [
    '@nuxtjs/robots', // robots.txt Unterstützung
    '@nuxtjs/sitemap', // Sitemap Generator
  ],

  // Robots.txt Einstellungen
  robots: {
    UserAgent: '*',
    Disallow: '/admin', // Blockiere Seiten wie '/admin'
    Allow: '/', // Erlaube das Indexieren aller anderen Seiten
  },

  // Sitemap-Einstellungen
  sitemap: {
    hostname: 'https://hauke-trumpf.com', // Ersetze mit deiner echten Domain
    routes: [
      { url: '/#events', priority: 1.0 }, // Füge wichtige Routen mit Priorität hinzu
      { url: '/#contact', priority: 0.8 },
    ],
  },

  compatibilityDate: '2024-10-07',
});