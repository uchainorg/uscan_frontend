import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { GetCustomParams } from './script/service/customParamsService';
// import VueCodemirror from 'vue-codemirror';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// console.log('import.meta.env', import.meta.env);

const app = createApp(App);

const res = await GetCustomParams();
console.log('GetCustomParams', res);

// app.config.globalProperties.$title = 'Uscan';
// app.config.globalProperties.$nodeUrl = 'https://testnet.ankr.com';
// app.config.globalProperties.$unitDisplay = 'Rzh';

app.config.globalProperties.$title = res.data.appTitle == '' ? 'Uscan' : res.data.appTitle;
app.config.globalProperties.$nodeUrl = res.data.nodeUrl == '' ? 'https://testnet.ankr.com' : res.data.nodeUrl;
app.config.globalProperties.$unitDisplay = res.data.unitDisplay == '' ? 'Eth' : res.data.unitDisplay;
app.config.globalProperties.$chainID = res.data.chainID == 0 ? 123 : res.data.chainID;
app.config.globalProperties.$decimal = res.data.decimal == 0 ? 123 : res.data.decimal;

// app.use(VueCodemirror as any, {
//   readonly: false,
// });

app.use(router).mount('#app');
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }
