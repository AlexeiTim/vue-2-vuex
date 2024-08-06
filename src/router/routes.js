import ApplicationsView from '../views/ApplicationsView.vue';
import LoginView from '../views/LoginView.vue';

export const routes = [
  {
    path: '/',
    name: 'Applications',
    component: ApplicationsView,
    meta: {
      authPermission: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]