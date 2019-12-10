import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "./assets/request/http";
import Api from "./assets/api/api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.prototype.$api = Api;
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
