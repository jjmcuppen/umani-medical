export default ({ $config, app, store, isDev }) => {
  if (!store.state.version) {
    const version = $config.STORYBLOK_VERSION || (app.$preview || isDev ? 'draft' : 'published');
    
    store.commit('setVersion', version);
  }
};