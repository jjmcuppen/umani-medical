export const state = () => ({
  noScroll: false,
  navMobileOpen: false
});

export const mutations = {
  setNoScroll(state, value) {
    state.noScroll = value;
  },
  setNavMobileOpen(state, value) {
    state.navMobileOpen = value;
  }
};