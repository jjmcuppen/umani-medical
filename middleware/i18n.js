export default function ({ isHMR, app, store }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }
  
  app.i18n.locale = store.state.config.iso.toLowerCase();
}