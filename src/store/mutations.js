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
  },
  UPDATE_USER_DATA(state, data) {
    state.user = data;
    localStorage.setItem('user', JSON.stringify(data));
  },
};

export default mutations;
