import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import transaction from "./modules/transaction";
import token from "./modules/token";

export default new Vuex.Store({
    modules: {
        transaction,
        token
    },
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    }
});
