const { resetPwd } = require("../../api/fetch");

const state = {
  
};
const mutations = {
  
};
const actions = {
  async RESET_PWD({ commit }, payload) {
    try {
      let data = {
        userId: payload.id,
        oldPwd: payload.oldPwd,
        newPwd: payload.newPwd,
        reNewPwd: payload.reNewPwd,
      };
      let result = await resetPwd(data);
      alert(result);
    } catch (error) {
      if (error && error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  },
};

export default { namespaced: true, state, mutations, actions };
