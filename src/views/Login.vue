<template>
  <div>
    <el-button @click="handleClick" type="primary">Click</el-button>
    <image-upload v-model:value="imgUrl" />
    <img :src="imgUrl" alt="">
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
const imgUrl = ref('')

const instance = getCurrentInstance() as any;
const { proxy } = instance;
console.log("🚀 ~ proxy:", instance.appContext.config.globalProperties)

function handleClick() {
  proxy.$modal.msgSuccess("触发点击事件");
}
</script>

<style scoped></style>