import { createApp } from "vue";
// element-plus
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import installPlugins from "./plugins";

import "./style.scss";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(installPlugins);
// 注册路由
app.use(router);

app.mount("#app");
