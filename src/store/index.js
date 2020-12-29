import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import transaction from "./modules/transaction";
import item from "./modules/item";
import token from "./modules/token";

export default new Vuex.Store({
    modules: {
        transaction,
        token,
        item
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
