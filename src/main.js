// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMq from 'vue-mq'
import router from './router'

Vue.config.productionTip = false;
export const Bus = new Vue({});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
});

Vue.use(VueMq, {
    breakpoints: {
        xs: 450,
        sm: 767,
        md: 1220,
        lg: Infinity,
    }
});
console.log("$MQ");