export default async ({ app, store }) => {
  if (!store.state.settings._uid) {
    const { config } = store.state;

    const rootPath = (config.prefix ?
      `${config.root}/${config.lang}` :
      `${config.root}`).replace(/^\//g, '');

    const { content } = await app.$storyapi
      .get(`cdn/stories/${rootPath}/settings/`, {
        version: store.state.version
      })
      .then(({ data }) => data.story)
      .catch(error => {
        /* eslint-disable-next-line */
        console.log('Missing \'settings\' page');

        throw error;
      });

    store.commit('setSettings', content);
  }
};
