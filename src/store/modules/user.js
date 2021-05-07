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
      // success thì result là {}
      let result = await resetPwd(data);
      if(!Object.keys(result).length) {
        alert('Thành công')
      } else {
        alert(JSON.stringify(result))
      }
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
