import { Configuration } from '@nuxt/types'

const config: Configuration = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'DDRadar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'DDR Score Tracker' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/styles.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module', '@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.org/documentation
    ['nuxt-buefy', { css: false }],
    '@nuxtjs/pwa'
  ],
  pwa: {
    manifest: {
      name: 'DDRadar',
      description: 'DDR Score Tracker',
      theme_color: '#8c67ef',
      lang: 'ja',
      display: 'standalone',
      scope: '/',
      start_url: '/'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  }
}
export default config
