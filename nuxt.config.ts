import { Configuration } from '@nuxt/types'
import pkg from './package.json'

/* eslint-disable no-process-env */
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_API_KEY,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID
} = process.env
/* eslint-enable no-process-env */
const projectId = FIREBASE_PROJECT_ID || 'ddradar-staging'

const configration: Configuration = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'DDRadar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
  plugins: ['~/plugins/firebase.ts'],
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
      description: pkg.description,
      theme_color: '#8c67ef',
      lang: 'ja',
      display: 'standalone',
      scope: '/',
      start_url: '/'
    }
  },
  env: {
    apiKey: FIREBASE_API_KEY || 'AIzaSyC_z8VvdgZDibPFZYT1W0-xrmkJiU6PmRw',
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID || '922209395211',
    appId: FIREBASE_APP_ID || '1:922209395211:web:04e36178df0443c6cf9d0e'
  },
  /*
   ** Build configuration
   */
  build: {
    extend: (config, _) => {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
export default configration
