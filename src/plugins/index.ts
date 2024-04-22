import cache from "./cache";
import modal from "./modal";

export default function installPlugins(app: any) {
  // 注册缓存插件
  app.config.globalProperties.$cache = cache;

  // 注册弹窗插件
  app.config.globalProperties.$modal = modal;
}
