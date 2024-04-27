<template>
  <div class="avatar-uploader">
    <el-upload
      ref="imageUpload"
      list-type="picture-card"
      :action="uploadImgUrl"
      :headers="headers"
      :file-list="fileList"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :on-error="handleUploadError"
      :on-preview="handlePictureCardPreview"
      :before-remove="handleRemove"
      :class="{ hide: fileList.length >= limit }"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <!-- 上传提示 -->
    {{ number }}
    <div class="el-upload__tip" v-if="showTip">
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
      </template>
      的文件
    </div>
    <el-dialog v-model="dialogVisible" title="预览" append-to-body>
      <img class="pic-preview" w-full :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, computed, watch, PropType } from "vue"
import { getToken } from "@/utils/auth"

import type { UploadProps, UploadUserFile } from "element-plus"

type ModelValueType = string | any[]

const props: any = defineProps({
  modelValue: [String, Array] as PropType<ModelValueType>,
  // 图片数量限制
  limit: {
    type: Number,
    default: 5
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array as PropType<string[]>,
    default: () => ["png", "jpg", "jpeg"]
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true
  }
})

const { proxy } = getCurrentInstance() as any
const emit = defineEmits()
const number = ref(0)
const uploadList = ref<UploadUserFile[]>([])
// 用于控制对话框的显示
const dialogImageUrl = ref("")
const dialogVisible = ref(false)
const baseUrl = import.meta.env.VITE_APP_BASE_API
const uploadImgUrl = ref(import.meta.env.VITE_APP_BASE_API + "/common/upload") // 上传的图片服务器地址
const headers = ref({ Authorization: "Bearer " + getToken() })
const fileList = ref<UploadUserFile[]>([])
const showTip = computed(
  () => props.isShowTip && (props.fileType || props.fileSize)
)
watch(
  () => props.modelValue,
  val => {
    if (val) {
      // 首先将值转为数组
      const list = Array.isArray(val) ? val : props.modelValue.split(",")
      // 然后将数组转为对象数组
      fileList.value = list.map((item: string | object | any[]) => {
        console.log("🚀 ~ fileList.value=list.map ~ item:", item)
        if (typeof item === "string") {
          if (item.indexOf(baseUrl) === -1) {
            item = { name: baseUrl + item, url: baseUrl + item }
          } else {
            item = { name: item, url: item }
          }
        }
        return item
      })
    } else {
      fileList.value = []
      return []
    }
  },
  { deep: true, immediate: true }
)

// 上传成功处理
const handleUploadSuccess: UploadProps["onSuccess"] = (res, file) => {
  // res = { url: URL.createObjectURL(file.raw!) }
  if (res.code === 200) {
    uploadList.value.push({ name: res.fileName, url: res.fileName })
    uploadedSuccessfully()
  } else {
    number.value--
    proxy.$modal.closeLoading()
    proxy.$modal.msgError(res.msg)
    proxy.$refs.imageUpload.handleRemove(file)
    uploadedSuccessfully()
  }
}

// 上传前
const handleBeforeUpload: UploadProps["beforeUpload"] = file => {
  let isImg = false
  if (props.fileType.length) {
    let fileExtension = ""
    if (file.name.lastIndexOf(".") > -1) {
      fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1)
    }
    isImg = props.fileType.some((type: string) => {
      if (file.type.indexOf(type) > -1) return true
      if (fileExtension && fileExtension.indexOf(type) > -1) return true
      return false
    })
  } else {
    isImg = file.type.indexOf("image") > -1
  }
  if (!isImg) {
    proxy.$modal.msgError(
      `文件格式不正确, 请上传${props.fileType.join("/")}图片格式文件!`
    )
    return false
  }
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize
    if (!isLt) {
      proxy.$modal.msgError(`上传头像图片大小不能超过 ${props.fileSize} MB!`)
      return false
    }
  }
  proxy.$modal.loading("正在上传图片，请稍候...")
  number.value++
}

// 上传出错
const handleUploadError = () => {
  proxy.$modal.msgError("上传图片失败")
  proxy.$modal.closeLoading()
}

// 移除前
const handleRemove: UploadProps["beforeRemove"] = uploadFile => {
  const findex = fileList.value.map(f => f.name).indexOf(uploadFile.name)
  if (findex > -1 && uploadList.value.length === number.value) {
    fileList.value.splice(findex, 1)
    emit("update:modelValue", listToString(fileList.value))
    return false
  }
  return true
}

// 文件个数超出
function handleExceed() {
  proxy.$modal.msgError(`上传文件数量不能超过 ${props.limit} 个!`)
}

// 上传结束处理
function uploadedSuccessfully() {
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value
      .filter(f => f.url !== undefined)
      .concat(uploadList.value)
    uploadList.value = []
    number.value = 0
    emit("update:modelValue", listToString(fileList.value))
    proxy.$modal.closeLoading()
  }
}

const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 对象转成指定字符串分隔
function listToString(list: any[], separator?: string) {
  let strs = ""
  separator = separator || ","
  for (let i in list) {
    if (undefined !== list[i].url && list[i].url.indexOf("blob:") !== 0) {
      strs += list[i].url.replace(baseUrl, "") + separator
    }
  }
  return strs != "" ? strs.substr(0, strs.length - 1) : ""
}
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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
.pic-preview {
  width: 100%;
}
/* .el-upload--picture-card 控制加号部分 */
:deep(.hide .el-upload--picture-card) {
  display: none;
}
</style>
