import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VAnimateCss from 'v-animate-css';
import VueSimpleAlert from "vue-simple-alert";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
 

Vue.use(VAnimateCss);
Vue.use(VueSimpleAlert);
Vue.use(Loading);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
