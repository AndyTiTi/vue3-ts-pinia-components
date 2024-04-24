// import axios, { AxiosResponse } from "axios";
import axios from "axios"
import { getToken } from "@/utils/auth"
import { tansParams } from "./params"
export const errorCode: { [key: string]: any } = {
  "401": "认证失败，无法访问系统资源",
  "403": "当前操作没有权限",
  "404": "访问资源不存在",
  default: "系统未知错误，请反馈给管理员"
}

import { ElMessage, ElNotification } from "element-plus"

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 创建axios实例
export const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000 * 20
})

service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 请求头添加token
  if (getToken() && !isToken) {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers["Authorization"] = "Bearer " + getToken()
  }
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?" + tansParams(config.params)
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode["default"]
  // 二进制数据则直接返回
  if (
    res.request.responseType === "blob" ||
    res.request.responseType === "arraybuffer"
  ) {
    return res.data
  }

  if (code === 500) {
    ElMessage({ message: msg, type: "error" })
    return Promise.reject(new Error(msg));
  } else if (code !== 200) {
    ElNotification.error({ title: msg });
    return Promise.reject("error");
  } else {
    return Promise.resolve(res.data);
  }
})
export default service
