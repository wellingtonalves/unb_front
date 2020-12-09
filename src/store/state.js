const state = {
  isAuthenticated: false,
  token: '',
  user: {},
  userRole: {},
  snackbar: {
    active: false,
    color: '',
    text: '',
    timeout: 2000
  },
  drawerSettings: {
    model: null,
    clipped: true,
  }
};

export default state;
