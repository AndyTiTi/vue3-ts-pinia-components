import { defineConfig, loadEnv } from "vite"
import path from "path"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import createSvgIcon from "./src/plugins/svg-icon"

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.yirengongsi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.yirengongsi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: [
      vue(),
      // https://element-plus.org/zh-CN/guide/quickstart.html#vite     自动导入 【推荐】
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIcon(command === "build")
    ],
    resolve: {
      alias: {
        // 设置 `@` 指向 `src` 目录
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve("src/assets"),
        "@comps": path.resolve("src/components"),
        "@utils": path.resolve("src/utils"),
        "@router": path.resolve("src/router"),
        "@store": path.resolve("src/store")
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    // vite 相关配置
    server: {
      host: true,
      // 是否开启自动刷新
      hmr: true,
      // open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        "/dev-api": {
          target: "http://localhost:7060",
          changeOrigin: true,
          rewrite: p => p.replace(/^\/dev-api/, "")
        }
      }
    }
  }
})
