# Vue 3 + Vite + TypeScript + Pinia Components Library

这是一个基于 Vue 3、TypeScript、Element-Plus 和 Pinia 的组件库项目。它旨在提供一组高质量的 UI 组件，同时展示如何在 Vue 3 中使用 Pinia 进行状态管理。

## 特点

- **Vue 3**: 使用 Vue 3 的 Composition API 构建。
- **TypeScript**: 整个项目使用 TypeScript 编写，提供类型安全。
- **Pinia**: 使用 Pinia 作为状态管理库，轻松管理组件间的状态。
- **Customizable Components**: 提供可定制的组件以满足不同需求。
- **Best Practices**: 遵循 Vue 3 和 TypeScript 的最佳实践。

## 安装 Element-Plus

```bash
pnpm install element-plus --save
```

## 安装 Pinia

```bash
pnpm install pinia --save
```

## 安装 Auto Import 和 Components

```bash
pnpm install unplugin-auto-import unplugin-vue-components --save-dev
// 注意：安装这两个插件后会在项目根目录下面生成 auto-imports.d.ts 和 components.d.ts 文件
```

## 配置 Auto Import 和 Components

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
```

## 使用

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);

// 创建 Pinia 实例并注册
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
```

## 资源文档

查看进阶资源文档，请访问 [栈先锋](https://yirengongsi.com)

## 贡献

欢迎任何形式的贡献，包括但不限于：

- 报告 bug
- 提交修复
- 新增组件
- 改进文档

## 支持

如果你觉得这个项目对你有帮助，请不要犹豫给我们一个 star ⭐

# ESLint 插件之间的区别请参考我的系列文章

```bash
pnpm install eslint vue-eslint-parser eslint-plugin-vue eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier -S
```

- [ESLint 插件之 @vue/eslint-config-typescript 和 plugin:@typescript-eslint/recommended 的区别](https://yirengongsi.com/blog/ESLint%E6%8F%92%E4%BB%B6%E7%B3%BB%E5%88%97/ESLint%E6%8F%92%E4%BB%B6@vue'eslint-config-typescript%E5%92%8Cplugin'@typescript-eslint'recommended.html)
- [ESLint 插件之 plugin:prettier/recommended 和 @vue/eslint-config-prettier/skip-formatting 的区别](https://yirengongsi.com/blog/ESLint%E6%8F%92%E4%BB%B6%E7%B3%BB%E5%88%97/ESLint%E6%8F%92%E4%BB%B6plugin'prettier'recommended%E5%92%8C@vue'eslint-config-prettier'skip-formatting%E7%9A%84%E5%8C%BA%E5%88%AB.html)
- [ESLint 插件之 plugin:vue/vue3-essential 和 plugin:vue/vue3-recommended 的区别](https://yirengongsi.com/blog/ESLint%E6%8F%92%E4%BB%B6%E7%B3%BB%E5%88%97/ESLint%E6%8F%92%E4%BB%B6vue3-essential%E5%92%8Cvue3-reommended%E7%9A%84%E5%8C%BA%E5%88%AB.html)
