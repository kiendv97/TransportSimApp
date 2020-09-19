import { search } from 'core-js/fn/symbol';

const { listTransactionForApp, changeStatus, searchTransation } = require('../../api/fetch')
const state = {
    listTransaction: [],
    currenStatus: 'SHIPPING',
    page: 1,
    loadingItem: false,
    search: ''
};
const mutations = {
    lisTransaction(state, data) {
        state.listTransaction = data
    },
    changeStatus(state, data) {
        state.currenStatus = data
    },
    currentPage(state, page) {
        state.page = page
    },
    resetTransaction(state, page) {
        state.listTransaction = []
        state.currenStatus = 'SHIPPING',
            state.page = 1
    },
    changeLoading(state, status) {
        state.loadingItem = status
    }
};
const actions = {
    async GET_LIST_TRACSACTION({ commit }, payload) {
        try {
            commit('lisTransaction', [])
            commit('changeLoading', true)
            let result = await listTransactionForApp(payload.status, payload.page, payload.page_size)
            commit('lisTransaction', result)
            commit('changeLoading', false)
        } catch (error) {
            alert(error)
        }
    },
    async SEARCH({ commit, state }, payload) {
        try {
            commit('lisTransaction', [])
            commit('changeLoading', true)
            let result = await searchTransation(payload.search, state.currenStatus)
            commit('lisTransaction', result)
            commit('changeLoading', false)
        } catch (error) {
            alert(error)
        }
    },
    async CHANGE_STATUS({ commit }, payload) {
        try {
            // let result = await changeStatus(payload.package_item_id, payload.note, payload.status, payload.receivePrice)
            console.log('xx');
        } catch (error) {
            alert(error)
        }
    }

};

export default { namespaced: true, state, mutations, actions };