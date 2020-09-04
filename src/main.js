import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';
Vue.config.productionTip = false;
Vue.mixin({
  methods: {
    convertMoney(money) {
      return new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(money)
    }
  },
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
