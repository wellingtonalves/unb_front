import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';

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
        accent: '#4DB6AC',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        white: '#FFFFFF',
      },
    },
  },
  lang: {
    locales: {pt},
    current: 'pt',
  },
});
