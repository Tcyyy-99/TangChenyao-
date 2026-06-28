# DAY07 - 交互优化

**日期：** 2026-06-27  
**核心目标：** 完善网站动效与悬停状态，提升交互体验

---

## 为什么要做交互优化

静态页面能展示信息，但缺少"呼吸感"。好的交互反馈能让用户感知到：
- **这是可点击的**（hover变化暗示可交互）
- **我点对了**（active状态确认操作）
- **页面是活的**（动效增加生命力）

所以今天集中处理所有hover状态、过渡动画、反馈效果。

---

## 悬停状态设计

### 1. 导航按钮
**目标：** 突出当前激活项，引导用户点击

**桌面端侧边栏：**
```tsx
// 默认状态：灰色文字
text-gray-400

// 悬停状态：变黑+浅灰背景
hover:text-black dark:hover:text-white 
hover:bg-gray-50 dark:hover:bg-gray-900/50

// 激活状态：纯黑文字+深灰背景+左侧指示条
text-black dark:text-white 
bg-gray-100 dark:bg-gray-900
```

**为什么这样设计：**
- 默认灰色降低干扰，让用户专注内容
- 悬停时渐变到黑色，给予即时反馈
- 激活项左侧加竖条，参考VS Code侧边栏

**移动端底部栏：**
```tsx
// 只用颜色区分，不加背景（空间有限）
text-gray-400  // 默认
text-black dark:text-white  // 激活
```

---

### 2. 作品/文章卡片
**目标：** 让内容"浮起来"，吸引点击

**实现方式：**
```tsx
// 卡片容器
<div className="
  transition-all duration-300
  hover:scale-105          // 放大5%
  hover:shadow-xl          // 增强阴影
  cursor-pointer
">
```

**为什么用scale而不是其他：**
- `scale` 比 `translateY` 更有层次感
- `105%` 是合适的比例，既明显又不夸张
- `duration-300` 是黄金时长，快了突兀，慢了迟钝

**移动端调整：**
```tsx
// 移动端取消scale（卡片太大，放大会溢出）
md:hover:scale-105
```

---

### 3. 分类标签（Category Tabs）
**目标：** 明确当前筛选项

**状态设计：**
```tsx
// 默认：灰色虚框
text-gray-400 border border-gray-300

// 悬停：灰色实框
hover:border-gray-400

// 激活：黑色实框+黑色文字
text-black dark:text-white 
border-2 border-black dark:border-white
```

**为什么用边框而不是背景：**
- 保持极简风格，背景色会显得太重
- 边框加粗（1px→2px）已经足够明显
- 符合"无彩色"设计理念

---

### 4. 图标按钮（主题/语言/重力）
**目标：** 让小图标也有交互感

**实现：**
```tsx
// 圆角矩形+背景变化
<button className="
  px-4 py-3 rounded-lg
  hover:bg-gray-100 dark:hover:bg-gray-900
  transition-colors
">
```

**为什么加圆角：**
- 对比侧边栏方形按钮，底部控件用圆角区分层级
- `rounded-lg` 刚好，`rounded-full` 太圆会显得卡通

---

## 动效细节

### 1. 过渡时长统一
所有动效用两种时长：
```css
duration-200  // 快速反馈（按钮、链接）
duration-300  // 舒缓变化（卡片、弹窗）
```

**为什么不用更复杂的：**
- 统一时长能形成一致的节奏感
- 过多的时长变化反而乱

---

### 2. 缓动函数
Tailwind默认用 `ease-in-out`，我保持默认：
```tsx
transition-all  // 等同于 ease-in-out
```

**什么时候用其他缓动：**
- `ease-out` 适合元素进入（快进慢出）
- `ease-in` 适合元素离开（慢进快出）
- 但这个项目动效简单，默认够用

---

### 3. transform优化
所有位移/缩放用 `transform`，不用 `top/left`：

```tsx
// ✅ 正确：GPU加速
hover:scale-105

// ❌ 避免：触发重排
hover:width-110%
```

**为什么：**
- `transform` 只触发合成，性能高
- `width/height` 会触发重排，卡顿

---

## 反馈状态

### 1. 点击反馈
按钮加 `active` 状态：
```tsx
active:scale-95  // 按下缩小，模拟物理按键
```

**实际使用场景：**
- 主要按钮（发布、提交）
- 本项目多数是路由跳转，用不上

---

### 2. 加载状态
Markdown渲染时显示"Loading..."：
```tsx
{loading ? (
  <div className="text-gray-400">Loading...</div>
) : (
  <article>{content}</article>
)}
```

**为什么不用Spinner：**
- Markdown本地加载很快（<100ms）
- 复杂加载动画反而多余
- 简单文字足够

---

### 3. 无内容状态
分类下无文章时：
```tsx
<div className="text-center text-gray-400 py-12">
  {language === 'zh' ? '暂无文章' : 'No articles'}
</div>
```

---

## 光标样式

根据元素类型统一：
```tsx
// 可点击元素
cursor-pointer  // 卡片、按钮、链接

// 文本内容
cursor-text  // 输入框

// 不可交互
cursor-default  // 标题、说明文字
```

**容易忽略的地方：**
- Logo点击回首页，要加 `cursor-pointer`
- 禁用按钮要改 `cursor-not-allowed`

---

## 移动端触摸优化

### 1. 触摸区域最小44px
苹果HIG建议最小点击区域：
```tsx
// 底部导航高度
h-14  // 56px，符合标准
```

---

### 2. 去掉hover状态
移动端没有鼠标，hover会粘滞：
```tsx
// 只在桌面端生效
md:hover:scale-105
```

---

### 3. 触摸反馈
添加 `-webkit-tap-highlight-color`：
```css
* {
  -webkit-tap-highlight-color: transparent;
}
```

**为什么：**
- 去掉默认的蓝色闪光（太丑）
- 用我们自己的 `active` 状态代替

---

## 今日完成清单

✅ 统一所有按钮/链接的hover状态  
✅ 作品卡片悬停放大效果  
✅ 分类标签激活状态优化  
✅ 过渡动画时长标准化  
✅ 移动端触摸体验优化  
✅ 光标样式全局检查

**用时：** 4小时  
**提交次数：** 12次

---

## 一些思考

交互设计是"感性的理性"：

**理性层面：**
- 200ms vs 300ms 的差异能感知
- 按钮最小44px是生理学要求
- transform比width快是浏览器原理

**感性层面：**
- 卡片"浮起来"让人想点
- 边框变粗比变色更克制
- 圆角8px比12px更专业

好的交互是让用户"感觉不到"交互本身，只觉得"用起来很舒服"。

---

**明天计划：** 统一布局细节，检查各页面header高度一致性
