import { RouteComponent } from "vue-router"

export type RouterState = string | RouteComponent
export type MenuRouter = {
  path: string
  name?: string
  children?: MenuRouter[]
  component?: RouterState
  hidden?: boolean
  redirect?: string
  alwaysShow?: boolean
  meta?: {
    title?: string
    icon?: string
    affix?: boolean
    hidden?: boolean
    noCache?: boolean
    link?: string
    fullPath?: string
  }
}

// 获取路由
export const getRouters = (): Promise<MenuRouter[]> => {
  return new Promise(resolve => {
    console.log("🚀 ~ 请求API 获取 routes")
    const data = [
      {
        name: "Tool",
        path: "/tool",
        hidden: false,
        component: "Layout",
        alwaysShow: true,
        meta: {
          title: "系统工具",
          icon: "tools",
          noCache: false,
          link: undefined
        },
        children: [
          {
            name: "Build",
            path: "build",
            hidden: false,
            component: "tool/build/index",
            meta: {
              title: "表单构建",
              icon: "build",
              noCache: false,
              link: undefined
            }
          },
          {
            name: "Gen",
            path: "gen",
            hidden: false,
            component: "tool/gen/index",
            meta: {
              title: "代码生成",
              icon: "code",
              noCache: false,
              link: undefined
            }
          }
        ]
      }
      // {
      //   name: "Http://ruoyi.vip",
      //   path: "http://ruoyi.vip",
      //   hidden: false,
      //   component: "Layout",
      //   meta: {
      //     title: "若依官网",
      //     icon: "guide",
      //     noCache: false,
      //     link: "http://ruoyi.vip"
      //   }
      // }
    ]
    setTimeout(() => {
      resolve(data)
    })
  })
}
