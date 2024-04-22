import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://element-plus.org/zh-CN/guide/quickstart.html#vite     自动导入 【推荐】
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // 设置 `@` 指向 `src` 目录
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve("src/assets"),
      "@comps": path.resolve("src/components"),
      "@utils": path.resolve("src/utils"),
      "@router": path.resolve("src/router"),
      "@store": path.resolve("src/store"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
