export const state = () => ({
  current: {},
  alternates: []
});

export const mutations = {
  setCurrent(state, value) {
    state.current = value;
  },

  setAlternates(state, value) {
    state.alternates = value;
  }
};
