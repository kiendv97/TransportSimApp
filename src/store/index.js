import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import transaction from "./modules/transaction";
import item from "./modules/item";
import user from "./modules/user";
import token from "./modules/token";
import fake from "./modules/fake";

export default new Vuex.Store({
    modules: {
        transaction,
        token,
        user,
        fake,
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
