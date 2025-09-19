// import LRU from 'lru-cache';
// import colors from 'vuetify/lib/util/colors';

// const isProduction = process.env.NODE_ENV === 'production';

// const themeCache = new LRU({
//   max: 10,
//   maxAge: 1000 * 60 * 60
// });

export default {
  customVariables: ['~/assets/scss/variables.scss'],
  treeShake: true,
  theme: {
    disable: true
    // options: {
    //   themeCache,
    //   minifyTheme: value => isProduction ? value.replace(/[\r\n|\r|\n]/g, '') : value,
    //   customProperties: true
    // },
    // themes: {
    //   light: {
    //     anchor: colors.blue.darken2,
    //     primary: colors.blue.darken2,
    //     secondary: colors.grey.darken3,
    //     accent: colors.blue.accent1,
    //     error: colors.red.accent2,
    //     info: colors.blue.base,
    //     success: colors.green.base,
    //     warning: colors.amber.base,
    //     background: '#FFFFFF'
    //   }
    // }
  }
}
