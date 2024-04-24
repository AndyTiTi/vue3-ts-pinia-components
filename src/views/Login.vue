<template>
  <div>
    <image-upload v-model="imgUrl" :limit="2" />
    <svg-icon icon-class="peoples" />
    <el-icon>
      <Plus />
    </el-icon>
    <el-icon>
      <Minus />
    </el-icon>
    <single-image-upload v-model="imgUrl" />
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue"
import useUserStore from "@/store/modules/user"
import { CommitResponse } from "@/types/user.type"

// 在 Vue 组件中定义响应式引用
const userList = ref<CommitResponse[]>([])

const imgUrl = ref("")

const instance = getCurrentInstance() as any
const { proxy } = instance
console.log("🚀 ~ proxy:", instance.appContext.config.globalProperties)

const { getUserAvatar, getUserInfo, avatar } = useUserStore()
console.log("🚀 ~ avatar:", avatar)

// 由于 getUserAvatar 返回一个 Promise，我们可以使用 async/await 或者 then/catch 来处理异步操作
getUserInfo()
getUserAvatar()
  .then(res => {
    console.log(res)
    userList.value = res // res 已经被推断为 CommitResponse[] 类型
  })
  .catch(error => {
    console.error("获取用户头像失败:", error)
  })

</script>

<style scoped></style>
