import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/src/dark/css-vars.scss";
import "element-plus/dist/index.css";

import "./style/styles.scss";
import "dayjs/locale/zh-cn";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App)
  .use(ElementPlus, {
    size: "small",
    zIndex: 3000,
    locale: zhCn,
  })
  .use(pinia)
  .use(router)
  .mount(document.body);
