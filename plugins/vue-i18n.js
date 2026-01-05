import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

export default ({ app, store }) => {
  // Default to 'en-gb' if config is not yet loaded
  const defaultLocale = store.state.config.iso ? store.state.config.iso.toLowerCase() : 'nl-nl';
  
  app.i18n = new VueI18n({
    locale: defaultLocale,
    fallbackLocale: 'nl-nl',
    messages: {
      'nl-nl': require('~/locales/nl-nl.json'),
      'de-de': require('~/locales/de-de.json'),
      'en-gb': require('~/locales/en-gb.json')
    }
  })
}
