// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './routes';
import store from '@/store';
import { setToken } from '@/services/api/config';


Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes
});


router.beforeEach((to, from, next) => {
  setToken(localStorage.getItem('token'))
  if (to.matched.some(record => record.meta.authPermission)) {
    if (!store.getters['auth/isAuth'])
      next({ name: 'login' })
    else next()
  }
  else next()
})


export default router;
