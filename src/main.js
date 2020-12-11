// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store';
import "./plugins/element.js";

Vue.config.productionTip = false;
// 事件总线
Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});


require('./assets/css/base.css');

// qs 插件
import qs from 'qs'
Vue.prototype.$qs=qs

import xss from "xss"
Vue.prototype.$xss = new xss.FilterXSS();

