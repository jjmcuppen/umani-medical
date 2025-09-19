export default async function ({ store, query, enablePreview }) {
  if (query._storyblok && enablePreview) {
    store.commit('setEditMode', true);
    
    enablePreview();
  }
}