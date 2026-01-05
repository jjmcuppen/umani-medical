import {
  getConfigByPath
} from '~/assets/js/config';

export default ({ $config, route, store }) => {
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

  // Always reload config for the current route to ensure it's correct
  store.dispatch('config/loadConfig', config);
}
