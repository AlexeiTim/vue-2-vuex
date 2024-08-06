// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './routes';


Vue.use(Router);

export default new Router({
  mode: 'history', // Используйте history mode для красивых URL без #
  routes
});