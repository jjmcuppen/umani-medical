export const state = () => ({
  modalOpen: false
});

export const mutations = {
  setModalOpen(state, value) {
    state.modalOpen = value;
  }
};
