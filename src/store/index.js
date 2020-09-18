import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import transacsion from "./modules/transacsion";
import token from "./modules/token";

export default new Vuex.Store({
    modules: {
        transacsion,
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
