import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
console.log(process.env.VITE_APP_BASE_API);

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
  // server: {
  //   // host: "0.0.0.0", // 默认为localhost
  //   // port: 7001, // 端口号
  //   // open: false, // 是否自动打开浏览器
  //   proxy: {
  //     // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
  //     "/dev-api": {
  //       target: "https://xxx.xxx.com", // 后端服务实际地址
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/dev-api/, ""),
  //       // rewrite: (path) =>
  //       //   path.replace(new RegExp("^" + process.env.VITE_APP_BASE_API), ""),
  //     },
  //   },
  // },
});
