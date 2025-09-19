export default async ({ app, store }) => {
  if (!store.state.cacheVersion) {
    const { version } = await app.$storyapi
      .get('cdn/spaces/me')
      .then(({ data }) => data.space);
    
    store.commit('setCacheVersion', version);
  }
};