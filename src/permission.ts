import router from "./router"
import useRoutes from "./store/modules/routes"

let aaa = true
// const whiteList = ["/login"]
router.beforeEach((to, from, next) => {
  if (aaa) {
    //  坑点一：路由表 router.addRoute(route) 加载完成之后再执行next()
    aaa = false
    useRoutes()
      .getMergeRoutes()
      .then(finalRoutes => {
        finalRoutes.forEach((route: any) => {
          router.addRoute(route)
        })
        //  坑点二：
        // hack方法 确保addRoutes已完成
        // 如果 addRoutes 并未完成，路由守卫会一层一层的执行执行，直到 addRoutes 完成，找到对应的路由
        // 其实在路由守卫中，只有next() 是放行，其他的诸如：next('/logon') 、 next(to) 或者 next({ …to, replace: true })都不是放行，而是：中断当前导航，执行新的导航
        next({ ...to, replace: true })
      })
      .catch(err => {
        console.log(err, "-------err")
        next({ path: "/login" })
      })
  } else {
    next()
    // 没有token
    // if (whiteList.indexOf(to.path) !== -1) {
    //   // 在免登录白名单，直接进入
    //   next()
    // } else {
    //   next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    // }
  }
})
