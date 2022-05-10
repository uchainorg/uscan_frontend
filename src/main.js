import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const app = createApp(App);

app.config.globalProperties.$rpc_http = axios;

app.use(router);

app.use(store);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
