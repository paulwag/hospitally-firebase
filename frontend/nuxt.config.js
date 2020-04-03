export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Hospitally',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }]
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
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAJRvb_QaEVaSAh50POdBHXYftNJDXIP7E',
          authDomain: 'wirvsvirus-hospitally.firebaseapp.com',
          databaseURL: 'https://wirvsvirus-hospitally.firebaseio.com',
          projectId: 'wirvsvirus-hospitally',
          storageBucket: 'wirvsvirus-hospitally.appspot.com',
          messagingSenderId: '265024279637',
          appId: '1:265024279637:web:ee93621c48cb7e95c170dc',
          measurementId: 'G-TJD5GWCS3X'
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
          realtimeDb: true
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    credentials: true
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
