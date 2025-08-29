# Yumo 工具站

## 项目简介
Yumo 工具站是一个基于 Vue 3、TypeScript 和 Vite 构建的工具集合项目。它包含多个实用工具页面，用于辅助开发和测试工作。

## 技术栈
- Vue 3 (使用 `<script setup>` 语法)
- TypeScript
- Vite 构建工具
- Vue Router

## 项目结构说明
- `src/views/`：包含多个工具页面组件，例如：
  - `BoxShadowStyle`：用于演示和生成盒子阴影样式
  - `BrowserNavigation`：浏览器导航相关功能
  - `CommonCryptography`：常见加密算法工具
  - `ResponsiveLayoutDemo`：响应式布局演示
  - `VueRouterCase`：Vue Router 使用示例
  - `WaterfallLayoutDemo`：瀑布流布局演示
- `src/components/`：公共组件目录
- `src/router/`：Vue Router 路由配置
- `src/style.css`：全局样式文件
- `src/vite/plugins/`：Vite 插件目录

## 功能特点
- 提供多种前端开发常用工具
- 使用 Vue 3 最新特性构建
- 支持 TypeScript 类型检查
- 采用 Vite 构建，开发启动速度快

## 安装与启动
1. 克隆项目：
```bash
git clone https://gitee.com/uncle-yumo/yumo-tool-station.git
```

2. 安装依赖：
```bash
pnpm install
```

3. 启动开发服务器：
```bash
pnpm run dev
```

4. 构建生产版本：
```bash
pnpm run build
```

## 使用说明
项目包含多个工具页面，每个页面都是独立的功能模块，可以通过导航菜单访问不同的工具。

## 注意事项
- 项目已移除 Tailwind CSS，相关样式已清理
- 所有工具页面都使用 Vue 3 的 Composition API 编写
- 项目配置了 Vue Router 用于页面导航

## 许可证
本项目采用 MIT 许可证，请查看项目根目录的 LICENSE 文件了解详细信息。