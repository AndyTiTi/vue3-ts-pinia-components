<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#324157"
    text-color="#bfcbd9"
    active-text-color="#20a0ff"
    unique-opened
  >
    <SidebarItem
      v-for="(route, index) in menu"
      :key="route.path + index"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script setup lang="ts" name="SidebarItem">
import { computed } from "vue"
import { useRoute } from "vue-router"
import router from "@/router"
import useSidebar from "@/store/modules/sidebar"
import useAuthRoutesStore from "@/store/modules/routes"
import SidebarItem from "./SidebarItem.vue"

const route = useRoute()
const sidebarStatus = useSidebar()
const mergedRoutes = useAuthRoutesStore()
// 从 store 中获取路由数据
const menu = computed(() => mergedRoutes.routes)
console.log("🚀 ~ menu:", router.getRoutes())
const isCollapse = computed(() => {
  return sidebarStatus.sidebar
})

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  console.log("🚀🚀🚀 ~ activeIndex ~ path:", path)
  return path
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo::-webkit-scrollbar {
  display: none; /* 隐藏 WebKit 滚动条 */
}
</style>
