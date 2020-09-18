const axios = require('axios');
const state = {
    tokenDevice: ''
};
const mutations = {
    getToken(state, data) {

    },
    postToken(state, data) {

    }
};
const actions = {
    async GET_TOKEN({ commit }, payload) {
        let changeStatus = await axios.put(`https://banhang.topsim`);
    },
    async POST_TOKEN({ commit }, payload) {
        let changeStatus = await axios.put(`https://banhang.topsim`);
    }

};

export default { namespaced: true, state, mutations, actions };