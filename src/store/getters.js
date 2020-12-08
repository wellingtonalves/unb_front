const getters = {
  isAuthenticated: state => state.isAuthenticated,
  token: state => state.token,
  user: state => state.user,
  userRole: state => state.userRole,
  snackbar: state => state.snackbar,
  menu: state => state.drawerSettings,
};

export default getters;
