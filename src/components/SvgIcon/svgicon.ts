import { App } from "vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const components: Record<string, any> = {
  ...ElementPlusIconsVue
}

// 方式一
// export default {
//   install: (app: App) => {
//     for (const key in components) {
//       const componentConfig = components[key]
//       app.component(componentConfig.name, componentConfig)
//     }
//   }
// }

// 方式一
function registerIcons(app: App<Element>) {
  for (const key in components) {
    console.log("🚀 ~ registerIcons ~ key:", key)
    app.component(key, components[key])
  }
}

export default registerIcons
