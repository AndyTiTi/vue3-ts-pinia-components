<template>
  <div class="pane-account">
    <el-form
      :model="form"
      :rules="rules"
      label-width="70px"
      size="large"
      ref="formRef"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user"
import { ElMessage, type ElForm, type FormRules } from "element-plus"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const userStore = useUserStore()
const form = reactive({
  account: "",
  password: ""
})
const formRef = ref<InstanceType<typeof ElForm>>()
const rules: FormRules = {
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur"
    },
    {
      pattern: /^[a-zA-Z0-9_-]{4,16}$/,
      message: "账号格式错误，请输入4-16位字母、数字或下划线",
      trigger: "blur"
    }
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}

function loginAction() {
  formRef.value?.validate(valid => {
    if (valid) {
      // 验证通过，可以进行登录操作
      userStore.accountLogin(form).then(res => {
        console.log("🚀 ~ userStore.accountLogin ~ res:", res)
        router.push("/")
      })
    } else {
      ElMessage.error("请检查输入信息")
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped></style>
