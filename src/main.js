import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueI18n from 'vue-i18n';
// import messages from './assets/lang/messages';
import pt from './assets/lang/pt/messages';
import en from './assets/lang/en/messages';

Vue.config.productionTip = false;

Vue.use(CKEditor);
Vue.use(VueI18n);

const messages = {
  en: en,
  pt: pt,
};

const i18n = new VueI18n({
  locale: 'pt',
  messages,
});

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
