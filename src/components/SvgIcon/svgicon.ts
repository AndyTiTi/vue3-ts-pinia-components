import { App } from "vue"
import * as EPIcons from "@element-plus/icons-vue"

const components: Record<string, any> = {
  ...EPIcons
}

export default {
  install: (app: App) => {
    for (const key in components) {
      const componentConfig = components[key]
      app.component(componentConfig.name, componentConfig)
    }
  }
}
