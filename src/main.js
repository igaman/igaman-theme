import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

require('./assets/style/main.scss');

Vue.use(VueRouter);

const Post = {
  template: '<div>Post</div>'
}



new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
