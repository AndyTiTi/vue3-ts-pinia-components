<template>
  <div class="login-container">
    <div class="login-panel">
      <h1 class="title">后台管理系统</h1>
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><user-filled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account v-if="activeName === 'account'" ref="accountRef" />
        </el-tab-pane>

        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone v-if="activeName === 'phone'" ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>
      <div class="controls">
        <el-checkbox v-model="rememberMe" label="记住我" size="large" />
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button
        @click="handleLoginClick"
        size="large"
        class="login-btn"
        type="primary"
      >
        立即登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PaneAccount from "./PaneAccount.vue"
import PanePhone from "./PanePhone.vue"
import { localCache } from "@/plugins/cache"
const activeName = ref("account")
const rememberMe = ref(localCache.get("rememberMe") ?? false)

const accountRef = ref<InstanceType<typeof PaneAccount>>()
const phoneRef = ref<InstanceType<typeof PanePhone>>()

function handleLoginClick() {
  if (activeName.value === "account") {
    // 获取子组件的实例
    accountRef.value?.loginAction(rememberMe.value)
    console.log("account")
  } else {
    phoneRef.value?.loginAction()
    console.log("phone")
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  /* 添加磨砂效果，使用径向渐变模糊 */
  background-image: linear-gradient(200deg, #77a2d7 0%, #2c5d9a 100%),
    radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3) 50%,
      transparent 50%,
      transparent
    );
  /* 确保背景覆盖整个容器并延伸到足够大，以适应不同尺寸的屏幕 */
  background-size: cover;
  background-attachment: fixed;
  /* 使用box-shadow添加一些深度 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.login-panel {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .title {
    text-align: center;
  }
}

.el-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: 20px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .el-icon {
      margin-right: 5px;
    }
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.login-btn {
  width: 100%;
}
</style>
