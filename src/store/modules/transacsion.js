const axios = require('axios');
const state = {

};
const mutations = {
    changeStatus(state, data) {

    }
};
const actions = {
    async CHANGE_STATUS({ commit }, payload) {
        let changeStatus = await axios.put(`https://banhang.topsim`);
    },

};

export default { namespaced: true, state, mutations, actions };