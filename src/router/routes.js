import AppealsView from '../views/AppealsView.vue';
import LoginView from '../views/LoginView.vue';

export const routes = [
  {
    path: '/',
    name: 'Appeals',
    component: AppealsView,
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