const mutations = {
  SET_AUTHENTICATED(state, data) {
    state.isAuthenticated = true;
    state.token = data.access_token;
    localStorage.setItem('token', data.access_token);
  },
  LOGOUT(state) {
    state.isAuthenticated = false;
    state.token = '';
    state.user = {};
    localStorage.removeItem('token');
  },
  UPDATE_USER_DATA(state, data) {
    const permissoes = data.perfil.permissao.map(value => {
      let {tx_nome_permissao} = value;
      return tx_nome_permissao;
    });

    delete data.perfil;

    state.user = data;
    state.userRole = permissoes;
  },
  SET_SNACKBAR(state, data = {}) {
    state.snackbar = data
  },
  SET_MENU_DRAWER(state, data = {}) {
    state.drawerSettings = data
  },
  SET_LOADING(state, data = {}) {
    state.loading = data
  }
};

export default mutations;
