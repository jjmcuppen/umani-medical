export const state = () => ({
  editMode: false,
  cacheVersion: '',
  version: '',
  links: null,
  settings: {}
});

export const mutations = {
  setEditMode(state, value) {
    state.editMode = value;
  },
  setCacheVersion(state, value) {
    state.cacheVersion = value;
  },
  setVersion(state, value) {
    state.version = value;
  },
  setLinks(state, value) {
    state.links = value;
  },
  setSettings(state, value) {
    state.settings = value;
  }
};