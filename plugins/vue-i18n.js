import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.config.iso.toLowerCase(),
    fallbackLocale: 'nl-nl',
    messages: {
      'nl-nl': require('~/locales/nl-nl.json'),
      'de-de': require('~/locales/de-de.json'),
      'en-gb': require('~/locales/en-gb.json')
    }
  })
}
