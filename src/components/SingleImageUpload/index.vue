<template>
  <div class="avatar-uploader">
    <el-upload
      :action="uploadImgUrl"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleUploadError"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="value" :src="value" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus"
import { Plus } from "@element-plus/icons-vue"
import { getToken } from "@/utils/auth"

import type { UploadProps } from "element-plus"

const headers = {
  Authorization: "Bearer " + getToken()
}

defineProps({
  value: {
    type: String,
    default: ""
  }
})

const uploadImgUrl = "/common/upload"

const emit = defineEmits(["update:value"])
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  response = { url: URL.createObjectURL(uploadFile.raw!) }
  emit("update:value", response.url)
}

const handleUploadError = (error: any, file: any) => {
  console.log("🚀 ~ handleUploadError ~ error:", error, file)
  emit("update:value", URL.createObjectURL(file.raw!))
}

const acceptFileType = ["image/jpeg", "image/png"]

const acceptFileSize = 2

const beforeAvatarUpload: UploadProps["beforeUpload"] = rawFile => {
  if (!acceptFileType.includes(rawFile.type)) {
    ElMessage.error(
      "图片类型有误！只能上传" + acceptFileType.join(",") + "格式的图片"
    )
    return false
  } else if (rawFile.size / 1024 / 1024 > acceptFileSize) {
    ElMessage.error("Avatar picture size can not exceed 2MB!")
    return false
  }
  return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
