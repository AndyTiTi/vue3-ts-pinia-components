export const localCache = {
  set(key: string, value: any) {
    // 存入缓存
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    // 获取缓存
    return JSON.parse(window.localStorage.getItem(key) as string)
  },
  remove(key: string) {
    // 删除缓存
    window.localStorage.removeItem(key)
  }
}

const sessionCache = {
  set(key: string, value: any) {
    // 存入缓存
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    // 获取缓存
    return JSON.parse(window.sessionStorage.getItem(key) as string)
  },
  remove(key: string) {
    // 删除缓存
    window.sessionStorage.removeItem(key)
  }
}

export default {
  sessionCache,
  localCache
}
