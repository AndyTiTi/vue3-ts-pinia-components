<template>
  <div class="header px-4">
    <div class="h-full flex items-center justify-between">
      <div class="header-left flex items-center">
        <Hamburger />
        <h1 class="mx-4 header-title">后台管理系统</h1>
        <!-- <Breadcrumb /> -->
      </div>
      <div class="header-right flex items-center">
        <span class="user-name mr-3" @click="handleLogout"> 退出登录 </span>
        <el-avatar
          :size="32"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hamburger from "@/components/Hamburger/index.vue"
import Breadcrumb from "@/components/Breadcrumb/index.vue"
import useUserStore from "@/store/modules/user"
import { useRouter } from "vue-router"
const router = useRouter()

function handleLogout() {
  // 退出登录逻辑
  useUserStore().logout()

  router.push("/login")
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  height: 50px;
  color: #fff;
  background-color: #2a3a50;
  .header-left {
    .header-title {
      font-size: 16px;
      width: 130px;
    }
  }
  .header-right {
    .user-name {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 21px;
    cursor: pointer;
  }

  .header-right {
    .header-user-con {
      display: flex;
      height: 70px;
      align-items: center;
      font-size: 24px;

      > i {
        cursor: pointer;
      }

      .btn-bell {
        margin-left: 5px;
        position: relative;
        text-align: center;
        width: 24px;
        height: 24px;
        cursor: pointer;

        .el-icon {
          color: #fff;
          position: absolute;
          top: 0;
          left: 0;
        }

        .btn-bell-badge {
          position: absolute;
          right: 0;
          top: -2px;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: #f56c6c;
          color: #fff;
        }
      }

      .user-avator {
        margin-left: 20px;

        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .user-name {
        margin-left: 10px;

        .el-dropdown-link {
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
