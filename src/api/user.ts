import request from "@/utils/request";
/**
 * 用户头像上传
 *
 * @param {Object} data
 * @returns
 */
export const uploadAvatar = async (data: any) => {
  return await request({
    url: "/system/user/profile/avatar",
    method: "post",
    data: data,
  });
};
