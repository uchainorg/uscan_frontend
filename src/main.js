import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const app = createApp(App);

app.config.globalProperties.$http = axios;

app.use(router);

app.use(store);

app.mount("#app");
