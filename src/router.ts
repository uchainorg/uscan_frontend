import { createWebHistory, createRouter } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('./components/ScanHome/ScanHome.vue') },
  { path: '/block/:blockNumber', component: () => import('./components/ScanBlock/BlockInfo.vue'), props: true },
  { path: '/blocks', component: () => import('./components/ScanBlock/BlockList.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
