import {user} from '../services/auth.service';

const actions = {
  async setAuthenticated({dispatch, commit}, data) {
    await commit('SET_AUTHENTICATED', data);
    await dispatch('getUserData');
  },

  async logout({commit}) {
    commit('LOGOUT');
  },
  async setSnackbar({commit}, data = {}) {
    commit('SET_SNACKBAR', data);
  },
  async getUserData({commit}) {
    const response = await user()
    commit('UPDATE_USER_DATA', response.data.data);
  },
  async setMenuDrawer({commit}, data = {}) {
    commit('SET_MENU_DRAWER', data);
  },
};

export default actions;
