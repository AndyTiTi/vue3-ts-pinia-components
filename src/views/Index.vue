<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; overflow: auto"
      @keydown.left="scrollLeft"
      @keydown.right="scrollRight"
    >
      <el-table-column prop="date" width="600" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="date" width="600" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="date" width="600" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="date" width="600" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="date" width="600" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="date" width="200" label="日期"></el-table-column>
      <el-table-column prop="name" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

// 生成模拟数据
const generateData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      date: `2016-05-0${i + 1}`,
      name: `姓名${i}`,
      address: `地址${i}`
    })
  }
  return data
}

const tableBody = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  if (tableBody.value) {
    tableBody.value.scrollLeft -= 1600 // 每次滚动的距离
  }
}

const scrollRight = () => {
  if (tableBody.value) {
    tableBody.value.scrollLeft += 1600 // 每次滚动的距离
  }
}

// 假设我们有100条数据
const tableData = ref(generateData(100))
</script>

<style scoped></style>
