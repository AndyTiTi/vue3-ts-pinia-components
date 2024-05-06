<template>
  <template v-if="!item.hidden">
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
      popper-append-to-body
    >
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span v-show="!collapse"> {{ item.meta?.title }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :item="child"
        :key="child.path"
        :base-path="resolvePath(child.path, 2)"
      />
    </el-sub-menu>

    <router-link
      v-else-if="item.children && item.children.length === 1"
      :to="resolvePath(item.children[0].path, 3)"
    >
      <el-menu-item :index="resolvePath(item.children[0].path, 4)">
        <el-icon>
          <component :is="item.children[0].meta?.icon"></component>
        </el-icon>
        <template #title> {{ item.children[0].meta?.title }}</template>
      </el-menu-item>
    </router-link>

    <router-link v-else :to="`${basePath}`">
      <el-menu-item :index="`${basePath}`">
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </router-link>
  </template>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from "vue"
import useUserStore from "@/store/modules/user"
export default defineComponent({
  name: "SidebarItem",
  props: {
    index: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: {}
    },
    collapse: {
      type: Boolean
    },
    basePath: {
      type: String as PropType<string>,
      default: ""
    }
  },
  setup(props) {
    const store = useUserStore()

    const getNormalPath = (p: string): string => {
      if (p.length === 0 || !p || p == "undefined") {
        return p
      }
      let res = p.replace("//", "/")
      if (res.endsWith("/")) {
        return res.slice(0, -1)
      }
      console.log("🚀 ~ getNormalPath ~ res:", props.basePath)
      console.log("🚀 ~ getNormalPath ~ res:", p)
      console.log("🚀 ~ getNormalPath ~ res:", res)
      return res
    }

    const resolvePath = (routePath: string, type: number): string => {
      console.log("🚀 ~ resolvePath ~ type:", type)
      return getNormalPath(props.basePath + "/" + routePath)
    }

    return {
      store,
      getNormalPath,
      resolvePath
    }
  }
})
</script>

<!-- <style lang="scss" scoped>
:deep(.el-menu--inline) {
  background-color: #000c17;
}

:deep(.el-menu-item:hover) {
  color: #fff !important;
}
</style> -->
