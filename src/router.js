import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('./components/Post.vue'),
      props: true,
    },
    {
      path: '*',
      redirect: '/',
    },
  ]
});

export default router;