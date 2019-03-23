// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import ptBR from 'vee-validate/dist/locale/pt_BR';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';

import App from './App';

import router from './router';

Vue.config.productionTip = false;

VeeValidate.Validator.localize('pt_BR', ptBR);
Vue.use(VeeValidate, { locale: 'pt_BR' });
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
