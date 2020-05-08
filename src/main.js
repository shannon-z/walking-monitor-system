import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import echarts from 'echarts'
import ecStat from 'echarts-stat'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import roslib from 'roslib'
// import eventemitter2 from 'eventemitter2'

Vue.use(ViewUI);

Vue.prototype.$echarts = echarts;
Vue.prototype.$ecStat = ecStat;
Vue.prototype.$roslib = roslib;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
