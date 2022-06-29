import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { wei2eth, gwei2eth, wei2gwei } from "./js/ethers";

// axios.defaults.baseURL = "http://localhost:3000/";
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const nodeInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE_URL,
  headers: { "Content-Type": "application/json" },
});

const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const app = createApp(App);

app.config.globalProperties.$rpc_http = httpInstance;

app.config.globalProperties.$node_http = nodeInstance;

app.use(router);

app.use(store);

app.config.globalProperties.$wei2eth = wei2eth;

app.config.globalProperties.$gwei2eth = gwei2eth;

app.config.globalProperties.$wei2gwei = wei2gwei;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
