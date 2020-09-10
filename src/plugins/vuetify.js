import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n';
import messages from '../assets/lang/messages';

Vue.use(Vuetify);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

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
    t: (key, ...params) => i18n.t(key, params),
  },
});
