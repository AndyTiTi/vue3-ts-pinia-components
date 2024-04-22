<template>
  <div>
    <el-button @click="handleClick" type="primary">Click</el-button>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance() as any;
const { proxy } = instance;
console.log("🚀 ~ proxy:", instance.appContext.config.globalProperties)

function handleClick() {
  proxy.$modal.msgSuccess("触发点击事件");
}
</script>

<style scoped></style>