<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: './page-header.html' }">
        homepage
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="./page-header.html">route 1</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>route 2</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
:deep(.el-breadcrumb__inner a) {
  color: white !important;
}
</style>
