import { defineStore } from "pinia"

const useSidebar = defineStore("sidebar", {
  persist: true,
  state: () => {
    return {
      // 侧边栏展开状态
      sidebar: false
    }
  },
  actions: {
    // 切换侧边栏展开状态
    toggleSidebar() {
      this.sidebar = !this.sidebar
    }
  }
})

export default useSidebar
