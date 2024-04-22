<template>
  <div class="component-upload-image">
    <el-upload :action="uploadImgUrl" list-type="picture-card" :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload" :on-error="handleUploadError" name="file" :show-file-list="false"
      :headers="headers" style="display: inline-block; vertical-align: top">
      <el-image v-if="!value" :src="value">
        <div slot="error" class="image-slot">
          <i class="plus" />
        </div>
      </el-image>
      <div v-else class="image">
        <el-image :src="value" :style="`width:150px;height:150px;`" fit="fill" />
        <div class="mask">
          <div class="actions">
            <span title="预览" @click.stop="dialogVisible = true">
              <i class="zoom-in" />
            </span>
            <span title="移除" @click.stop="removeImage">
              <i class="delete" />
            </span>
          </div>
        </div>
      </div>
    </el-upload>
    <el-dialog v-model="dialogVisible" title="预览" width="800" append-to-body>
      <img :src="value" style="display: block; max-width: 100%; margin: 0 auto;">
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { getToken } from "@/utils/auth";

import type { UploadProps } from 'element-plus'

const instance = getCurrentInstance() as any;
const { proxy } = instance;

defineProps({
  value: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value']);
const imageUrl = ref('')
// 上传的图片服务器地址
const uploadImgUrl = import.meta.env.VUE_APP_BASE_API + "/common/upload"
const headers = {
  Authorization: "Bearer " + getToken(),
}
// 用于控制对话框的显示
const dialogVisible = ref(false);

// 上传成功处理
const handleUploadSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  response = { url: URL.createObjectURL(uploadFile.raw!) }
  emit('update:value', response.url)
  console.log("🚀 ~ imageUrl:", imageUrl.value)
  console.log("🚀 ~ uploadFile:", uploadFile)
  console.log("🚀 ~ response.url:", response.url)
  proxy.$modal.closeLoading();
}

// 上传前
const handleBeforeUpload = () => {
  proxy.$modal.loading("上传中");
};

const handleUploadError = (error: any, file: any) => {
  console.log("🚀 ~ handleUploadError ~ error:", error, file)
  proxy.$modal.closeLoading();
};
// 移除图片
const removeImage = () => {
  // 清除已上传的图片
  imageUrl.value = '';
  // 清除表单的值
  // this.$refs.upload.clearFiles();
};

// export default {
//   data() {
//     return {
//       dialogVisible: false,
//       uploadImgUrl: import.meta.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
//       headers: {
//         Authorization: "Bearer " + getToken(),
//       },
//     };
//   },
//   props: {
//     value: {
//       type: String,
//       default: "",
//     },
//   },
//   methods: {
//     removeImage() {
//       this.$emit("input", "");
//     },
//     handleUploadSuccess(res) {
//       this.$emit("input", res.url);
//       this.loading.close();
//     },
//     handleBeforeUpload() {
//       this.loading = this.$loading({
//         lock: true,
//         text: "上传中",
//         background: "rgba(0, 0, 0, 0.7)",
//       });
//     },
//     handleUploadError() {
//       this.$message({
//         type: "error",
//         message: "上传失败",
//       });
//       this.loading.close();
//     },
//   },
//   watch: {},
// };
</script>

<style scoped lang="scss">
.image {
  position: relative;

  .mask {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
  }

  &:hover .mask {
    opacity: 1;
  }
}
</style>