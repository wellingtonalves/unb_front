import {user} from '../services/auth.service';

const actions = {
  async setAuthenticated({dispatch, commit}, data) {
    await commit('SET_AUTHENTICATED', data);
    await dispatch('getUserData');
  },

  async logout({commit}) {
    commit('LOGOUT');
  },

  //TODO - tratamento para erro, status diferente de 200
  async getUserData({commit}) {
    const response = await user();
    commit('UPDATE_USER_DATA', response.data.data);
  },
};

export default actions;
