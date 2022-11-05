import { createRouter, createWebHistory } from 'vue-router';

const pageComponent = (path: string) => () => import(`../pages/${path}.vue`);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: pageComponent('home'),
    },
  ],
});

export default router;
