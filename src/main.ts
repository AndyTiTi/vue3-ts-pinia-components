import { createApp } from "vue";
// element-plus
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import installPlugins from "./plugins";
import ImagePreview from "@/components/ImagePreview/index.vue";
import ImageUpload from "@/components/ImageUpload/index.vue";
import pinia from "./store";
import "./style.scss";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// element-plus
app.use(ElementPlus, {
  locale: zhCn,
});
// pinia
app.use(pinia);
// 注册全局组件
app.component("ImagePreview", ImagePreview);
app.component("ImageUpload", ImageUpload);

// 注册全局插件
app.use(installPlugins);

// 注册路由
app.use(router);

app.mount("#app");
