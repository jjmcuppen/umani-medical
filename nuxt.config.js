import pkg from './package';

import {
  generate
} from './utils/generate';

import {
  netlifyToml
} from './utils/netlify';

import {
  robots
} from './utils/robots';

import {
  sitemap
} from './utils/sitemap';

import webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  ssr: isProduction,
  target: 'static',

  /*
  ** Build configuration
  */
  build: {
    transpile: [ /^vuetify/ ],
    extractCSS: isProduction,
    hardSource: process.env.HARDSOURCE,
    /*
    ** You can extend webpack config here
    */
    extend(config, { isClient, isDev }) {
      config.plugins = [
        ...config.plugins,
        new webpack.IgnorePlugin(/unicode\/category\/So/, /node_modules/)
      ];

      if (isClient && isDev) {
        config.devtool = 'source-map';
      }
    }
  },

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  /*
  ** Global CSS
  */
  css: [
    '~/assets/fonts/icomoon/style.css',
    '~/assets/scss/themes.scss'
  ],

  /*
  ** Configure environment variables
   */
  publicRuntimeConfig : {
    BASE_URL: process.env.BASE_URL,
    ASSET_URL: process.env.ASSET_URL,
    MULTISITE: process.env.MULTISITE || false,
    ROOT: process.env.ROOT || '/',
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    STORYBLOK_PERSONAL_ACCESS_TOKEN: process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN,
    STORYBLOK_SPACE_ID: process.env.STORYBLOK_SPACE_ID,
    STORYBLOK_VERSION: process.env.STORYBLOK_VERSION,
  },

  /*
  ** Generate configuration
  */
  generate: {
    fallback: true,
    crawler: false,
    routes: async () => process.argv.includes('--skip-routes') ?
      ['/'] :
      await generate()
  },

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: { lang: 'nl', dir: 'ltr' },
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'ogType', property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700,900|Montserrat:300,500,700' }
    ],
    script: []
  },

  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#ff3b61'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    'storyblok-nuxt',
    'cookie-universal-nuxt',
    'nuxt-graphql-request',
    'vue-scrollto/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    '@nuxtjs/google-gtag',
    '@nuxtjs/netlify-files',
    // '@nuxtjs/recaptcha',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/svg',
    '@nuxtjs/vuetify'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/storyblok',
    '~/plugins/components',
    '~/plugins/filters',
    '~/plugins/vue-i18n',
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '~/plugins/vue-masonry', mode: 'client' },
    { src: '~/plugins/vue-observe-visibility', mode: 'client' }
  ],


  /*
  ** Router middleware
  */
  router: {
    middleware: [
      'config',
      'i18n',
      'cache-version',
      'version',
      'links',
      'settings'
    ],
    trailingSlash: true,
    // extendRoutes(routes) {
    //   routes.find(({ path }) => path === '/*/').path = '/*'
    // }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    browserBaseURL: '/',
    ...isProduction ? {
      ...process.env.BASE_URL ? {
        baseURL: process.env.BASE_URL
      } : {}
    } : {
      proxy: true
    }
  },

  /*
  ** Dayjs configuration
   */
  dayjs: {
    locales: ['nl'],
    defaultLocale: 'nl'
  },

  /*
  ** Google Analytics configuration
  */
  'google-gtag': {
    id: process.env.GOOGLE_ANALYTICS_ID,
    config: {
      anonymize_ip: true
    }
  },

  /*
  ** GraphQL request configuration
  ** https://github.com/Gomah/nuxt-graphql-request
  */
  graphql: {
    clients: {
      website: {
        endpoint: 'https://gapi.storyblok.com/v1/api',
        options: {
          headers: {
            token: process.env.STORYBLOK_ACCESS_TOKEN
          }
        }
      }
    }
  },

  /*
  ** Netlify configuration
  */
  netlifyFiles: {
    copyExistingFiles: false,
    netlifyToml
  },

  /*
  ** Recaptcha configuration
  */
  // recaptcha: {
  //   hideBadge: true,
  //   siteKey: process.env.GOOGLE_RECAPTCHA_KEY,
  //   version: 3
  // },

  /*
   ** Robots configuration
   ** https://github.com/nuxt-community/robots-module
   */
  robots,

  /*
  ** Sitemap configuration
  */
  sitemap,

  /*
  ** Storyblok configuration
  */
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    cacheProvider: 'memory'
  },

  /*
  ** Vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    // theme: {
    //   disable: true
    // },
    defaultAssets: {
      icons: 'md'
    }
  }
};
