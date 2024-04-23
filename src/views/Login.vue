<template>
  <div>
    <el-button @click="handleClick" type="primary">Click</el-button>
    <image-upload v-model:value="imgUrl" />
    <img :src="imgUrl" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import useUserStore from "@/store/modules/user";
import { CommitResponse } from "@/types/user.type";

// 在 Vue 组件中定义响应式引用
const userList = ref<CommitResponse[]>([]);

const imgUrl = ref('')

const instance = getCurrentInstance() as any;
const { proxy } = instance;
console.log("🚀 ~ proxy:", instance.appContext.config.globalProperties)


const { getUserAvatar } = useUserStore()


// 由于 getUserAvatar 返回一个 Promise，我们可以使用 async/await 或者 then/catch 来处理异步操作
getUserAvatar().then(res => {
  console.log(res);
  userList.value = res; // res 已经被推断为 CommitResponse[] 类型
}).catch(error => {
  console.error('获取用户头像失败:', error);
});


function handleClick() {
  proxy.$modal.msgSuccess("触发点击事件");
}
</script>

<style scoped></style>