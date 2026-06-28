# DAY01 - 项目初始化

**日期：** 2026-06-27  
**核心目标：** 创建React+TypeScript项目，配置Tailwind CSS

---

## 技术栈选型

- **框架：** React 18 + TypeScript
- **构建工具：** Vite
- **样式方案：** Tailwind CSS
- **状态管理：** React Hooks（useState, useEffect）
- **路由：** 单页应用，组件内部状态切换

---

## 完成内容

### 1. 项目脚手架搭建
```bash
npm create vite@latest vibe-portfolio -- --template react-ts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Tailwind配置
- 配置`tailwind.config.js`的content路径
- 添加暗黑模式支持：`darkMode: 'class'`
- 设置基础色彩变量和字体

### 3. 基础目录结构
```
src/
  ├── components/     # 组件文件夹
  ├── types/          # TypeScript类型定义
  ├── constants/      # 常量配置
  └── App.tsx         # 主应用入口
```

### 4. Git初始化
```bash
git init
git remote add origin https://github.com/xxx/vibe-portfolio.git
git commit -m "Initial commit: Project setup"
```

---

## 技术决策

**为什么选择Vite？**  
比CRA快10倍以上的开发服务器启动速度

**为什么TypeScript？**  
类型安全，减少运行时错误，提升开发体验

**为什么Tailwind？**  
原子化CSS，快速构建响应式界面，易维护

---

## 今日成果

✅ 项目环境完整配置  
✅ 开发服务器正常运行  
✅ Git版本控制就绪

**用时：** 2小时  
**提交次数：** 3次

---

**下一步：** 设计主页布局，实现圆形分支导航
