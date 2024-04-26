<template>
  <div class="app-main flex-1 p-4">
    <!-- <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component v-if="!route.meta.link" :is="Component" :key="route.path" />
      </transition>
    </router-view> -->
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-main {
  overflow: auto;
}
</style>
