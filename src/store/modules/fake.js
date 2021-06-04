const axios = require("axios");
import { MOCK_LIST_SIM } from "@/mock/fake.js";
const { sendOrderTopsim, getListSimAppsim, register } = require("../../api/fetch");

const state = {
  loadingItem: false,
  offset: 0,
  listSim: [],
  limit: 20,
  snackbar: {
    message: "",
    status: false,
    color: "green",
  },
};
const mutations = {
  countOffset(state) {
    state.offset = state.offset + 20;
  },
  clearOffset(state) {
    state.offset = 0;
  },
  toggleOnSnackbar(state, data) {
    const { status, message } = data;
    state.snackbar.message = message;
    state.snackbar.status = true;
    if (status) {
      state.snackbar.color = "green";
    } else {
      state.snackbar.color = "red";
    }
  },
  toggleOffSnackbar(state) {
    state.snackbar.status = false;
  },
  changeLoading(state, status) {
    state.loadingItem = status;
  },
  listSimMuation(state, data) {
    state.listSim.push(...data);
  },
  listSearchMutation(state, data) {
    state.listSim = data;
  },
  clearListSim(state) {
    state.listSim = [];
  },
};
const actions = {
  async REGISTER({ commit }, payload) {
    try {
      let result = await register(payload.username, payload.password);
      if (result == "success") {
        let params = {
          message: "Thành công",
          status: true,
        };
        commit("toggleOnSnackbar", params);
      }
      setTimeout(() => {
        location.href = '/login';
      }, 1000);
    } catch (error) {
      let params = {
        status: false,
        message: error.response ? error.response.data.message : error.message,
        color: 'red'
      };
      commit("toggleOnSnackbar", params);
    }
  },
  async SEND_ORDER_TOP_SIM({ commit }, payload) {
    try {
      let get_username;
      if(localStorage.getItem('user')) {
        get_username = JSON.parse(localStorage.getItem('user')).username;
      } else {
        throw Error('Không tồn tại người dùng, mời bạn đăng nhập lại')
      }
      let request_order = {
        sim: payload.sim,
        price_sale: payload.price_sale,
        price_original: payload.price_original
      };
      let {code, message} = await sendOrderTopsim(request_order, get_username);
      if (code === 1) {
        let params = {
          message: "Thành công",
          status: true,
          color: 'green'
        };
        commit("toggleOnSnackbar", params);
      } else {
        throw Error(message);
      }
    } catch (error) {
      let params = {
        status: false,
        message: error.message,
        color: 'red'
      };
      commit("toggleOnSnackbar", params);
    }
  },

  async SEARCH_TRANSACTION({ commit }, payload) {
    try {
      let { key } = payload;
      commit('clearOffset');
      commit("clearListSim");
      commit("changeLoading", true);
      setTimeout(() => {
        commit("listSearchMutation", MOCK_LIST_SIM.sims.slice(0, 5));
        commit("changeLoading", false);
      }, 2000);
    } catch (error) {
      let params = {
        status: false,
        message: error.message,
      };
      commit("toggleOnSnackbar", params);
    }
  },

  async GET_LIST_TRACSACTION({ commit }, payload) {
    // payload : page, limit
    try {
      if(payload.is_new) {
        commit('clearOffset');
      }
      commit("changeLoading", true);

      let result = await getListSimAppsim(payload.keysearch, state.limit, state.offset);
      commit("listSimMuation", result);
      // commit("listSimMuation", MOCK_LIST_SIM.sims);
      commit("changeLoading", false);
      commit('countOffset');
      // setTimeout(() => {
      
      // }, 2000);
    } catch (error) {
      let params = {
        status: false,
        message: error.message,
      };
      commit("toggleOnSnackbar", params);
    }
  },
};

export default { namespaced: true, state, mutations, actions };
