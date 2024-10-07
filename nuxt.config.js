// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    '@dargmuesli/nuxt-cookie-control',
  ],

  robots: {
    UserAgent: '*',
    Disallow: '/admin',
    Allow: '/',
  },

  sitemap: {
    hostname: 'https://hauke-trumpf.com',
    routes: [
      { url: '/#events', priority: 1.0 },
      { url: '/#contact', priority: 0.8 },
    ],
  },

  compatibilityDate: '2024-10-07',

  cookieControl: {
    barPosition: 'bottom-full',
    locales: ['en', 'de'],
    cookies: {
      necessary: [
        {
          name: { en: 'Necessary Cookies', de: 'Notwendige Cookies' },
          id: 'necessary',
          initialState: true,
          description: {
            en: 'These cookies are essential for the website to function.',
            de: 'Diese Cookies sind für die Funktion der Website unerlässlich.',
          },
        },
      ],
      optional: [
        {
          name: { en: 'Google reCAPTCHA', de: 'Google reCAPTCHA' },
          id: 'recaptcha',
          initialState: false,
          src: 'https://www.google.com/recaptcha/api.js?render=explicit',
          cookies: ['NID', 'CONSENT'],
          purposes: ['Security'],
          description: {
            en: 'Google reCAPTCHA is used to prevent spam and abuse.',
            de: 'Google reCAPTCHA wird verwendet, um Spam und Missbrauch zu verhindern.',
          },
        },
      ],
    },
    // Anpassung der Cookie-Leiste und -Buttons nach deinen Vorgaben
    colors: {
      barBackground: '#1c4b5e', // Brand blue for the bar
      barButtonBackground: '#fcca03', // Brand yellow for the buttons
      barButtonColor: '#1c4b5e', // Brand blue for the button text
      barButtonHoverBackground: '#dbcf7a', // Light yellow for hover effect
      barButtonHoverColor: '#1c4b5e', // Keep the text color consistent
      barTextColor: '#fcca03', // Brand yellow for the bar text
      checkboxActiveBackground: '#1c4b5e', // Active background matches brand blue
      checkboxActiveCircleBackground: '#fcca03', // Checkbox circle uses brand yellow
      checkboxDisabledBackground: '#ddd', // Default for disabled checkboxes
      checkboxDisabledCircleBackground: '#fcca03', // Brand yellow for disabled circle
      checkboxInactiveBackground: '#1c4b5e', // Inactive background is brand blue
      checkboxInactiveCircleBackground: '#fcca03', // Brand yellow for inactive circle
      controlButtonBackground: '#fcca03', // Buttons background matches brand yellow
      controlButtonHoverBackground: '#dbcf7a', // Light yellow on hover
      controlButtonIconColor: '#1c4b5e', // Icon color on the button is brand blue
      controlButtonIconHoverColor: '#fcca03', // Icon hover color is brand yellow
      focusRingColor: '#808080', // Default focus ring color
      modalBackground: '#fff', // Default white background for modal
      modalButtonBackground: '#c75b46', // Brand red for modal buttons
      modalButtonColor: '#fcca03', // Brand yellow for modal button text
      modalButtonHoverBackground: '#fca03', // Lighter brand red on hover
      modalButtonHoverColor: '#fff', // White text on hover for modal buttons
      modalOverlay: '#000', // Black overlay for the modal
      modalOverlayOpacity: 0.8, // Opacity for the modal overlay
      modalTextColor: '#000', // Text color in the modal
      modalUnsavedColor: '#fff', // Unsaved color state
    },
    text: {
      de: {
        barTitle: 'Cookies',
        barDescription:
          'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und unsere Website zu schützen.',
        acceptAll: 'Alle akzeptieren',
        declineAll: 'Alle ablehnen',
        manageCookies: 'Einstellungen',
        save: 'Speichern',
        necessary: 'Notwendige Cookies',
        optional: 'Optionale Cookies',
      },
    },
  },
});
