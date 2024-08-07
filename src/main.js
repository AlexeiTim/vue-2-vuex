import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueMoment from "vue-moment";
import moment from "moment";
import VMask from "v-mask";

Vue.use(VueMoment, { moment });

Vue.use(VMask);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
