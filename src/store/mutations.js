const mutations = {
  SET_AUTHENTICATED(state, data) {
    state.isAuthenticated = true;
    state.token = data.access_token;

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', data.access_token);
  },
  LOGOUT(state) {
    state.isAuthenticated = false;
    state.token = '';
    state.user = {};

    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  },
  UPDATE_USER_DATA(state, data) {
    const permissoes = data.perfil.permissao.map(value => {
      let {tx_nome_permissao} = value;
      return tx_nome_permissao;
    });

    delete data.perfil;

    state.user = data;
    localStorage.setItem('user', JSON.stringify(data));

    state.userRole = permissoes;
    localStorage.setItem('userRole', JSON.stringify(permissoes));
  },
  SET_SNACKBAR(state, data = {}) {
    state.snackbar = data
  }
};

export default mutations;
