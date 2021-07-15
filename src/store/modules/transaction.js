import { search } from 'core-js/fn/symbol';

const { listTransactionForApp, countTractionTrader, changeStatus, putConnect, searchTransation, getListConnect } = require('../../api/fetch')
const state = {
    listTransaction: {},
    listConnect: [],
    currenStatus: 'SHIPPING',
    page: 1,
    loadingItem: false,
    search: '',
    countTransactionStatus: {}
};
const mutations = {
    lisTransaction(state, data) {
        state.listTransaction[state.currenStatus] = data.slice(0,50)
    },
    lisConnect(state, data) {
        state.listConnect = data
    },
    changeStatus(state, data) {
        state.currenStatus = data
    },
    currentPage(state, page) {
        state.page = page
    },
    resetTransaction(state, page) {
        state.listTransaction = {}
        state.currenStatus = 'SHIPPING',
        state.page = 1
    },
    changeLoading(state, status) {
        state.loadingItem = status
    },
    countTransaction(state, payload) {
        state.countTransactionStatus = payload
    }
};
const actions = {
    async COUNT_TRANSACTION_STATUS({ commit, state }, payload) {
        try {
            let result = await countTractionTrader()
            commit('countTransaction', result)
        } catch (error) {
            if(error && error.response.status == 401) { 
                window.location.href = '/login'
            }
            if (error && error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error)
            }
        }
    },
    async GET_LIST_TRACSACTION({ commit }, payload) {
        try {
            commit('changeLoading', true)
            /** bỏ cache */
            // if(!state.listTransaction.hasOwnProperty(payload.status)) {
            //     let result = await listTransactionForApp(payload.status, payload.page, payload.page_size)
            //     commit('lisTransaction', result)
            // } 
            let result = await listTransactionForApp(payload.status, payload.page, payload.page_size)
            commit('lisTransaction', result)
            commit('changeLoading', false)
        } catch (error) {
            if (error && error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error)
            }
        }
    },
    async GET_LIST_CONNECT({ commit }, payload) {
        try {
            commit('lisConnect', [])
            commit('lisTransaction', [])
            commit('changeLoading', true)
            let result = await getListConnect(payload.status, payload.page, payload.sold_product, payload.shipper_id)
            commit('lisConnect', result)
            commit('changeLoading', false)
        } catch (error) {
            if (error && error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error)
            }
        }
    },
    async SEARCH({ commit, state }, payload) {
        try {
            commit('changeLoading', true)
            commit('lisTransaction', [])
            if (state.currenStatus == 'CONNECT') {
                console.log(payload);
                let result = await getListConnect('', 1, payload.search, payload.shipper_id)
                commit('lisConnect', result)
            } else {
                if(payload.search) {
                    let result = await searchTransation(payload.search)
                    commit('lisTransaction', result)
                } else {
                    let result = await searchTransation(payload.search, state.currenStatus)
                    commit('lisTransaction', result)
                }
            }
            commit('changeLoading', false)
        } catch (error) {
            if (error && error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error)
            }
        }
    },
    async CHANGE_STATUS({ commit }, payload) {
        try {
            let result = await changeStatus(payload.package_item_id, payload.note, payload.status, payload.receivePrice)
        } catch (error) {
            if (error && error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error)
            }
        }
    },
    async PUT_CONNECT({ commit }, payload) {
        try {
            let result = await putConnect(payload.orderCode, payload.status)
        } catch (error) {
            if (error && error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error)
            }
        }
    }
};

export default { namespaced: true, state, mutations, actions };