import { defineStore } from "pinia"
import { CommitResponse } from "@/types/user.type"
import defAva from "@/assets/images/avatar.jpg"

// 使用泛型的 Response 类型可能需要你定义一个辅助类型，
// 因为 TypeScript 的 Response 类型不直接支持泛型。
type Response<T> = T

const useUserStore = defineStore("user", {
  persist: true, //开启缓存
  state: () => ({
    name: "",
    userId: "",
    avatar: "",
    token: ""
  }),
  actions: {
    setUserInfo(userInfo: any) {
      this.name = userInfo.name
    },
    accountLogin(from: any) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.token = "abcdef"
          this.name = "John Doe"
          this.userId = "123456"
          this.avatar = "https://avatars.githubusercontent.com/u/349336?v=4"
          resolve({
            token: this.token,
            name: this.name,
            userId: this.userId,
            avatar: this.avatar
          })
        }, 1000)
      })
    },
    getUserInfo() {
      // 获取用户信息
      return new Promise((resolve, reject) => {
        // 模拟异步请求
        setTimeout(() => {
          // const avatar = import.meta.env.VITE_APP_BASE_API + user.avatar;
          this.avatar = defAva
          resolve({
            name: "John Doe",
            age: 30,
            email: "johndoe@example.com"
          })
        }, 1000)
      })
    },
    async getUserAvatar() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits"
        )
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data: Response<CommitResponse[]> = await res.json()
        return data
      } catch (error) {
        console.error("Fetching user avatar failed:", error)
        throw error
      }
    }
  }
})

export default useUserStore
