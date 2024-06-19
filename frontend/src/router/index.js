import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import AdminView from '../components/AdminView.vue';
import OperarioView from '../components/OperarioView.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/admin', component: AdminView, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/operario', component: OperarioView, meta: { requiresAuth: true, role: 'operario' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/');
    } else {
      const role = JSON.parse(atob(token.split('.')[1])).role;
      if (to.meta.role === role) {
        next();
      } else {
        next('/');
      }
    }
  } else {
    next();
  }
});

export default router;
