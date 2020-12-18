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
        tematica1: '#F6A3BF',
        tematica2: '#f45165',
        tematica3: '#C21754',
        tematica4: '#8cc63f',
        tematica5: '#0c81a2',
        tematica6: '#ec1d23',
        tematica7: '#A74821',
        tematica8: '#FFC010',
        tematica9: '#2f7bea',
        tematica10: '#EC4F84',
        tematica11: '#234870',
        tematica12: '#512A7B',
        tematica13: '#4db6ac',
        tematica14: '#777777',
        tematica15: '#fb8c00',
        tematica16: '#128842',
      },
    },
  },
});
