import {
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElLoading,
} from "element-plus";

let loadingInstance: { close: () => void };

export default {
  msg(content: string) {
    ElMessage.info(content);
  },
  msgError(content: string) {
    ElMessage.error(content);
  },
  msgSuccess(content: string) {
    ElMessage.success(content);
  },
  msgWarning(content: string) {
    ElMessage.warning(content);
  },
  msgInfo(content: string) {
    ElMessage.info(content);
  },
  confirm(content: string, tip?: string) {
    return ElMessageBox.confirm(content, tip || "系统提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
  },
  notify(content: string) {
    ElNotification.info(content);
  },
  prompt(content: string, tip?: string) {
    return ElMessageBox.prompt(content, tip || "系统提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    });
  },
  loading(content: string) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: content,
      spinner: "loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
  },
  closeLoading() {
    loadingInstance.close();
  },
};
