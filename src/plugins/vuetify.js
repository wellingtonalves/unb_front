import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#337CA0',
        secondary: '#37474F',
        contrast: '#ff5722',
        black: '#181f1c',
        lightgrey: '#eff1f3',
        mediumgrey: '#bdc3c7',
        darkgrey: '#7f8c8d',
        accent: '#4DB6AC',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        white: '#FFFFFF',
      },
    },
  },
});
