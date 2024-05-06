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
    const data: any = [
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
      },
      {
        name: "System",
        path: "/system",
        hidden: false,
        redirect: "noRedirect",
        component: "Layout",
        alwaysShow: true,
        meta: {
          title: "系统管理",
          icon: "Operation",
          noCache: false,
          link: null
        },
        children: [
          {
            name: "User",
            path: "user",
            hidden: false,
            component: "system/user/index",
            meta: {
              title: "用户管理",
              icon: "peoples",
              noCache: false,
              link: null
            }
          },
          {
            name: "Role",
            path: "role",
            hidden: false,
            component: "system/role/index",
            meta: {
              title: "角色管理",
              icon: "peoples",
              noCache: false,
              link: null
            }
          },
          {
            name: "Dept",
            path: "dept",
            hidden: false,
            component: "system/dept/index",
            meta: {
              title: "部门管理",
              icon: "tree",
              noCache: false,
              link: null
            }
          },
          {
            name: "Log",
            path: "log",
            hidden: false,
            redirect: "noRedirect",
            component: "ParentView",
            alwaysShow: true,
            meta: {
              title: "日志管理",
              icon: "log",
              noCache: false,
              link: null
            },
            children: [
              {
                name: "Operlog",
                path: "operlog",
                hidden: false,
                component: "monitor/operlog/index",
                meta: {
                  title: "操作日志",
                  icon: "form",
                  noCache: false,
                  link: null
                }
              },
              {
                name: "Logininfor",
                path: "logininfor",
                hidden: false,
                component: "monitor/logininfor/index",
                meta: {
                  title: "登录日志",
                  icon: "logininfor",
                  noCache: false,
                  link: null
                }
              }
            ]
          }
        ]
      }
    ]
    setTimeout(() => {
      resolve(data)
    })
  })
}
