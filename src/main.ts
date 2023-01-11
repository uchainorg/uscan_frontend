import { createApp } from 'vue';
import App from './App.vue';
import { initRouter } from './router/index';
import { createPinia } from 'pinia';
const pinia = createPinia();
const app = createApp(App);

initRouter(app);
app.use(pinia);
app.mount('#app');
