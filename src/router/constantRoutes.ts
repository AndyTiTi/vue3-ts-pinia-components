import { MenuRouter } from "@/api/menu"

// 公共路由
const constantRoutes: MenuRouter[] = [
  {
    path: "",
    component: () => import("@/layout/index.vue"),
    redirect: "index",
    children: [
      {
        path: "index",
        component: () => import("@/views/index.vue"),
        name: "index",
        meta: {
          title: "首页",
          icon: "HomeFilled",
          affix: true,
          fullPath: "/index"
        }
      }
    ]
  },
  // {
  //   name: "System",
  //   path: "/system",
  //   hidden: false,
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: {
  //     title: "系统管理",
  //     icon: "monitor",
  //     noCache: false,
  //     link: undefined
  //   },
  //   children: [
  //     {
  //       name: "User",
  //       path: "user",
  //       hidden: false,
  //       component: () => import("@/views/system/user/index.vue"),
  //       meta: {
  //         title: "用户管理",
  //         icon: "user",
  //         noCache: false,
  //         link: undefined
  //       }
  //     },
  //     {
  //       name: "Role",
  //       path: "role",
  //       hidden: false,
  //       component: () => import("@/views/system/role/index.vue"),
  //       meta: {
  //         title: "角色管理",
  //         icon: "peoples",
  //         noCache: false,
  //         link: undefined
  //       }
  //     },
  //     {
  //       name: "Menu",
  //       path: "menu",
  //       hidden: false,
  //       component: () => import("@/views/system/menu/index.vue"),
  //       meta: {
  //         title: "菜单管理",
  //         icon: "tree-table",
  //         noCache: false,
  //         link: undefined
  //       }
  //     },
  //     {
  //       name: "Dept",
  //       path: "dept",
  //       hidden: false,
  //       component: () => import("@/views/system/dept/index.vue"),
  //       meta: {
  //         title: "部门管理",
  //         icon: "tree",
  //         noCache: false,
  //         link: undefined
  //       }
  //     },
  //     {
  //       name: "Log",
  //       path: "log",
  //       hidden: false,
  //       component: () => import("@/components/ParentView/index.vue"),
  //       alwaysShow: true,
  //       meta: {
  //         title: "日志管理",
  //         icon: "log",
  //         noCache: false,
  //         link: undefined
  //       },
  //       children: [
  //         {
  //           name: "Operlog",
  //           path: "operlog",
  //           hidden: false,
  //           component: () => import("@/views/monitor/operlog/index.vue"),
  //           meta: {
  //             title: "操作日志",
  //             icon: "user",
  //             noCache: false,
  //             link: undefined
  //           }
  //         },
  //         {
  //           name: "Logininfor",
  //           path: "logininfor",
  //           hidden: false,
  //           component: () => import("@/views/monitor/logininfor/index.vue"),
  //           meta: {
  //             title: "登录日志",
  //             icon: "logininfor",
  //             noCache: false,
  //             link: undefined
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    hidden: true,
    meta: {}
  },
  {
    path: "/404",
    name: "error404",
    component: () => import("@/views/error/404.vue"),
    hidden: true,
    meta: {}
  },
  {
    path: "/401",
    name: "error401",
    component: () => import("@/views/error/401.vue"),
    hidden: true,
    meta: {}
  }
]
export default constantRoutes
