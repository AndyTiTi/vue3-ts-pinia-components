import { createApp } from "vue"
// element-plus
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import installPlugins from "./plugins"
import ImagePreview from "@/components/ImagePreview/index.vue"
import ImageUpload from "@/components/ImageUpload/index.vue"
import SingleImageUpload from "@/components/SingleImageUpload/index.vue"
import pinia from "./store"

// global css
import "@/assets/styles/index.scss"
import App from "./App.vue"
import router from "./router"

// svg图标
import "virtual:svg-icons-register"
import SvgIcon from "@/components/SvgIcon/index.vue"
import elementIcons from "@/components/SvgIcon/svgicon"

const app = createApp(App)

// element-plus
app.use(ElementPlus, {
  locale: zhCn
})
// pinia
app.use(pinia)
// 注册全局组件
app.component("ImagePreview", ImagePreview)
app.component("ImageUpload", ImageUpload)
app.component("SingleImageUpload", SingleImageUpload)

// 注册全局插件
app.use(installPlugins)

// svg图标
app.use(elementIcons)
app.component("svg-icon", SvgIcon)

// 注册路由
app.use(router)
console.log(app, "--------EPIcons----------")

app.mount("#app")
