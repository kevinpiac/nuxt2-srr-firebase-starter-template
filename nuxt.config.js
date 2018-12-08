const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/ant.js',
    // We only use firebase in front-end
    { src: '~/plugins/firebase.js', ssr: false },
  ],

  /*
  ** Nuxt environment variables shared with client / server
  ** Docs: https://fr.nuxtjs.org/api/configuration-env/
  */
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',

    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',

    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    ['nuxt-i18n', {
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en',
        // Small workaround to address fallback issue with lazy loading
        // See: https://github.com/nuxt-community/nuxt-i18n/issues/34
        messages: {
          en: require('./lang/en-US'),
          fr: require('./lang/fr-FR'),
        },
      },
      locales: [
        {
          code: 'en',
          iso: 'en-EN',
          file: 'en-US.js',
        },
        {
          code: 'fr',
          iso: 'fr-FR',
          file: 'fr-FR.js',
        },
      ],
      lazy: true,
      langDir: 'lang/',
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
