import { defineStore } from "pinia"
import { getRouters, type MenuRouter, type RouterState } from "@/api/menu"
import Layout from "@/layout/index.vue"
import ParentView from "@/components/ParentView/index.vue"
import constantRoutes from "@/router/constantRoutes"

// 匹配views里面所有的.vue文件
const modules = import.meta.glob("./../../views/**/*.vue")
const useRoutes = defineStore("authRoutes", {
  // persist: true,
  state: () => {
    return {
      routes: [] as MenuRouter[]
    }
  },
  actions: {
    setAuthRouter(route: any[]) {
      this.routes = constantRoutes.concat(route)
    },

    getMergeRoutes(): Promise<MenuRouter[]> {
      return new Promise(resolve => {
        getRouters().then(res => {
          const sdata = JSON.parse(JSON.stringify(res))
          const rdata = JSON.parse(JSON.stringify(res))
          // 用于导航菜单，根据数据渲染成 routes，忠实地显示后台返回的数据，无论 children 嵌套多少层
          const sidebarRoutes = filterAsyncRouter(sdata)
          // 拍平除了一级路由下其他所有有 children 的二级路由，用于路由导航
          const rewriteRoutes = filterAsyncRouter(rdata, undefined, true)
          console.log(
            "🚀 ~ getRouters ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ rewriteRoutes:",
            sidebarRoutes,
            rewriteRoutes
          )
          this.setAuthRouter(sidebarRoutes)
          // rewriteRoutes没有children的，需要添加children，但是不会出现 el-sub-menu 的显示效果，必须是 sidbarRoutes 才会与这种效果
          resolve(rewriteRoutes)
        })
      })
    }
  }
})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(
  asyncRouterMap: MenuRouter[] = [], // 提供默认值 []
  _lastRouter: MenuRouter | undefined = undefined,
  type: boolean = false // 提供默认值 false
): MenuRouter[] {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout
      } else if (route.component === "ParentView") {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      if ("redirect" in route) {
        delete route["redirect"]
      }

      if ("children" in route) {
        delete route["children"]
      }
    }
    return true
  })
}

function filterChildren(
  childrenMap: MenuRouter[] = [],
  _lastRouter: MenuRouter | undefined = undefined
): MenuRouter[] {
  var children = <any>[]
  childrenMap.forEach(el => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView" && !_lastRouter) {
        el.children.forEach((c: any) => {
          c.path = el.path + "/" + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (_lastRouter) {
      el.path = _lastRouter.path + "/" + el.path
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view: RouterState) => {
  let res
  for (const path in modules) {
    const dir = path.split("views/")[1].split(".vue")[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

export default useRoutes
