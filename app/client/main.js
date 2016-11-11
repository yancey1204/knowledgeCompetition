import Vue from 'vue';
import Router from 'vue-router';
import routes from './utils/routers';
import App from './App';

Vue.use(Router);

const router = new Router({
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
