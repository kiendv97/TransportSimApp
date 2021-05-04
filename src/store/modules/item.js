const state = {
  countCopy: 0,
  listTransactionCopied: [],
  behaviorScroll: {}
};
const mutations = {
  offset_scroll(state, payload) {
    state.behaviorScroll[payload.screenOffset] = payload.offset;
  },
  lisTransaction(state, data) {
    let dataCopy = { ...data };
    state.listTransactionCopied.push(dataCopy);
    state.countCopy += 1;
  },
  rmTransactionCopy(state, data) {
    let dataRmCopy = { ...data };
    let listCopied = [...state.listTransactionCopied];
    let indexTractionRemove = listCopied.findIndex((dataCopy) => dataCopy.sold_product == dataRmCopy.sold_product);
    state.listTransactionCopied.splice(indexTractionRemove, 1);
    state.countCopy -= 1;
  },
  resetCopy(state) {
    state.countCopy = 0;
    state.listTransactionCopied = [];
  },
};
const actions = {
  SAVE_OFFSET_SCROLL({ commit, state }, data) {
    commit('offset_scroll', {offset: data.offset, screenOffset: data.status})
  },
  TRANSACTION_COPY({ commit, state }, payload) {
    commit("lisTransaction", payload);
  },
  TRANSACTION_RM_COPY({ commit, state }, payload) {
    commit("rmTransactionCopy", payload);
  },
  RESET_TRANSACTION_COPY({ commit, state }) {
    commit("resetCopy");
  },
};

export default { namespaced: true, state, mutations, actions };
