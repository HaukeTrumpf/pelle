// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
    hostname: 'https://example.com', // Ersetze mit deiner echten Domain
    routes: [
      { url: '/#events', priority: 1.0 }, // Füge wichtige Routen mit Priorität hinzu
      { url: '/#contact', priority: 0.8 },
    ],
  },
});
