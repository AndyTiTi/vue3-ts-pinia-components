<template>
  <div class="pane-phone">
    <el-form :model="form" :rules="rules" label-width="70px" size="large">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const form = reactive({
  phone: "",
  password: ""
})
const rules = {
  phone: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur"
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "手机号格式错误",
      trigger: "blur"
    }
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}

function loginAction() {
  console.log("phone")
}
defineExpose({
  loginAction
})
</script>

<style scoped></style>
