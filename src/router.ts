import { createWebHistory, createRouter } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('./components/ScanHome/ScanHome.vue') },
  { path: '/block/:blockNumber', component: () => import('./components/ScanBlock/BlockInfo.vue'), props: true },
  { path: '/blocks', component: () => import('./components/ScanBlock/BlocksList.vue') },
  { path: '/tx/:txHash', component: () => import('./components/ScanTransaction/TransactionInfo.vue'), props: true },
  { path: '/txs/:txsType', component: () => import('./components/ScanTransaction/TransactionsList.vue'), props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
