import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { wei2eth, gwei2eth } from "./js/ethers";

// axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const app = createApp(App);

app.config.globalProperties.$rpc_http = axios;

app.use(router);

app.use(store);

app.config.globalProperties.$wei2eth = wei2eth;

app.config.globalProperties.$gwei2eth = gwei2eth;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
