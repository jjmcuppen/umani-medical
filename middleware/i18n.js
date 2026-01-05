export default function ({ isHMR, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }
  
  // Set locale from config, defaulting to 'en-gb' if not available
  const locale = store.state.config.iso ? store.state.config.iso.toLowerCase() : 'nl-nl';
  app.i18n.locale = locale;
}