import Vue from "vue";
import App from "./App.vue";
import mixin from './mixins';
import router from "./router";
import { store } from "./store/";

import "@/assets/css/base.css";
import "@/plugins/element/index.js";

global.jQuery = require('../node_modules/jquery');
var $ = global.jQuery;
window.$ = $;

Vue.mixin(mixin)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
