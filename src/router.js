import { createRouter, createWebHashHistory } from "vue-router";
import ScanHome from "./components/ScanHome/ScanHome.vue";
import BlockInfo from "./components/ScanBlock/BlockInfo.vue";
import TransactionList from "./components/ScanTransaction/TransactionList.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: ScanHome },
    { path: "/block/:number", component: BlockInfo, props: true },
    { path: "/block/txs/:number", component: TransactionList, props: true },
  ],
});

export default router;
