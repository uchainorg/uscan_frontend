import { createRouter, createWebHashHistory } from "vue-router";
import ScanHome from "./components/ScanHome/ScanHome.vue";
import BlockInfo from "./components/ScanBlock/BlockInfo.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: ScanHome },
    { path: "/block/:number", component: BlockInfo, props: true },
  ],
});

export default router;
