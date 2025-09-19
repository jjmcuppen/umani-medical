import {
  getConfigByPath
} from '~/assets/js/config';

export default ({ $config, route, store }) => {
  if (!store.state.config.host) {
    const editMode = store.state.editMode || false;

    const path = editMode ?
      `${route.path}` :
      `${$config.ROOT === '/' ? '' : $config.ROOT}${route.path}`;

    let config = getConfigByPath(path);

    if (!config) {
      config = {
        host: 'localhost:3000',
        iso: 'nl-NL',
        hreflang: 'nl-nl',
        site: 'template',
        language: 'Nederlands',
        lang: 'nl',
        root: '/',
        prefix: false,
        alternates: []
      }
    }

    store.dispatch('config/loadConfig', config);
  }
}
