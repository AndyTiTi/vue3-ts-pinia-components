import request from "@/utils/request";
/**
 * 登录
 *
 * @param {Object} data
 * @returns
 */
export const accountLogin = (data: any) => {
  return request({
    url: "/login",
    method: "post",
    data: data,
  });
};
