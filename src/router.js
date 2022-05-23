import { createRouter, createWebHashHistory } from "vue-router";
import ScanHome from "./components/ScanHome/ScanHome.vue";
import BlockInfo from "./components/ScanBlock/BlockInfo.vue";
import TransactionInfo from "./components/ScanTransaction/TransactionInfo.vue";
import TransactionList from "./components/ScanTransaction/TransactionList.vue";
import BlocksList from "./components/ScanBlock/BlockList.vue";
import AddressInfo from "./components/ScanAddress/AddressInfo.vue";
import AllTransactionsList from "./components/ScanTransaction/TransactionAll.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: ScanHome },
    { path: "/block/:number", component: BlockInfo, props: true },
    { path: "/tx/:txHash", component: TransactionInfo, props: true },
    { path: "/block/txs/:number", component: TransactionList, props: true },
    { path: "/address/:address", component: AddressInfo, props: true },
    { path: "/blocks", component: BlocksList, props: false },
    { path: "/transactions", component: AllTransactionsList, props: false },
    { path: "/transactions/:type", component: AllTransactionsList, props: true },
  ],
});

export default router;
