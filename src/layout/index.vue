<template>
  <div class="layout">
    <Header />
    <div class="content flex">
      <Sidebar />
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue"
import Sidebar from "@/components/Sidebar/index.vue"
import AppMain from "@/components/AppMain/index.vue"
</script>

<style scoped></style>
