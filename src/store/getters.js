const getters = {
  isAuthenticated: state => state.isAuthenticated,
  token: state => state.token,
  user: state => state.user,
  userRole: state => state.userRole,
};

export default getters;
