export default async ({ app, store }) => {
  if (!store.state.links) {
    const { links } = await app.$storyapi
      .get('cdn/links', {
        version: store.state.version
      })
      .then(({ data }) => data);
    
    store.commit('setLinks', links);
  }
};