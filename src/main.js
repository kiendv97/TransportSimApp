import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router';
import store from "./store/index"
import moment from 'moment';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';
Vue.config.productionTip = false;
Vue.mixin({
  methods: {
    dateTimeFormat(date) {
      return moment(new Date(date)).format('H:mm, DD/MM/YYYY');
    },
    convertMoney(money) {
      return new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(money);
    }
  },
  computed: {
    convertMoneySubcriber: function () {
      return new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(this.receivePrice);
    }
  },
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
