// import axios, { AxiosResponse } from "axios";
import axios from "axios";

// import {
//   ElNotification,
//   ElMessageBox,
//   ElLoading,
//   ElMessage,
// } from "element-plus";

// prettier-ignore
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
console.log(import.meta.env.VITE_APP_BASE_API, "---");

export const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000 * 20,
});

export default service;
