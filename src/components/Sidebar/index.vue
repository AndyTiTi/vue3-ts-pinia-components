<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#324157"
    text-color="#bfcbd9"
    active-text-color="#20a0ff"
    unique-opened
  >
    <template v-for="item in menu">
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu
          v-if="!item.meta?.hidden"
          :key="item.path"
          :index="item.path"
        >
          <template #title>
            <el-icon v-if="item.meta?.icon">
              <component :is="item.meta?.icon" />
            </el-icon>
            <span>{{ item.meta?.title }}1</span>
          </template>
          <template v-for="subItem in item.children">
            <el-sub-menu
              v-if="subItem.children && subItem.children.length > 0"
              :key="subItem.path"
              :index="subItem.path"
            >
              <template #title>
                <el-icon v-if="subItem.meta?.icon">
                  <component :is="subItem.meta?.icon" />
                </el-icon>
                {{ subItem.meta?.title }}2C
              </template>
              <el-menu-item
                v-for="threeItem in subItem.children"
                :key="threeItem.path"
                :index="threeItem.path"
              >
                <router-link
                  :to="`${item.path}/${subItem.path}/${threeItem.path}`"
                >
                  <el-icon v-if="threeItem.meta?.icon">
                    <component :is="threeItem.meta?.icon" />
                  </el-icon>
                  {{ threeItem.meta?.title }}3
                </router-link>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-else
              :key="subItem.path + '_1'"
              :index="subItem.path"
            >
              <router-link :to="`${item.path}/${subItem.path}`">
                <el-icon v-if="subItem.meta?.icon">
                  <component :is="subItem.meta?.icon" />
                </el-icon>
                {{ subItem.meta?.title }}2
              </router-link>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <router-link :to="item.path">
          <el-menu-item
            v-if="!item.meta?.hidden"
            :key="item.path"
            :index="item.path"
          >
            <el-icon>
              <component :is="item.meta?.icon" />
            </el-icon>
            <template #title>{{ item.meta?.title }}5</template>
          </el-menu-item>
        </router-link>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import useSidebar from "@/store/modules/sidebar"
import useAuthRoutesStore from "@/store/modules/routes"

const route = useRoute()
const sidebarStatus = useSidebar()
const mergedRoutes = useAuthRoutesStore()
// 从 store 中获取路由数据
const menu = computed(() => mergedRoutes.routes)
const isCollapse = computed(() => {
  return sidebarStatus.sidebar
})

const activeIndex = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
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
