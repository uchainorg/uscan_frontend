import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import { useCustomizationParametersStore } from '@/store/customizationParameters';
import { GetCustomParams } from '@/apis/customizationParameters';

const routes: Array<RouteRecordRaw> = [{ path: '/', component: () => import('../views/Home/ScanHome.vue') }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// BeforeEach
router.beforeEach(async (to, form, next) => {
  const store = useCustomizationParametersStore();
  // check custom params
  if (store.appTitle == '') {
    const { data } = await GetCustomParams();
    store.$patch(data);
    next();
  } else {
    // TODO: go to params wrong page
    next();
  }
});

export const initRouter = (app: App<Element>) => {
  app.use(router);
};
