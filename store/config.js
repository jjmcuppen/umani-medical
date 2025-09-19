export const state = () => ({
  host: '',
  iso: '',
  hreflang: '',
  site: '',
  language: '',
  lang: '',
  root: '',
  prefix: '',
  type: '',
  alternates: []
});

export const mutations = {
  setHost(state, value) {
    state.host = value;
  },
  setIso(state, value) {
    state.iso = value;
  },
  setHreflang(state, value) {
    state.hreflang = value;
  },
  setSite(state, value) {
    state.site = value;
  },
  setLanguage(state, value) {
    state.language = value;
  },
  setLang(state, value) {
    state.lang = value;
  },
  setRoot(state, value) {
    state.root = value;
  },
  setPrefix(state, value) {
    state.prefix = value;
  },
  setType(state, value) {
    state.type = value;
  },
  setAlternates(state, value) {
    state.alternates = value;
  }
};

export const actions = {
  loadConfig({ commit }, { host, iso, hreflang, site, language, lang, root, prefix, type, alternates }) {
    commit('setHost', host);
    commit('setIso', iso);
    commit('setHreflang', hreflang);
    commit('setSite', site);
    commit('setLanguage', language);
    commit('setLang', lang);
    commit('setRoot', root);
    commit('setPrefix', prefix);
    commit('setType', type);
    commit('setAlternates', alternates);
  }
};
