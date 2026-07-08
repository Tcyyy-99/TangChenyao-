# DAY11 - 移动端弹出与折叠视觉打磨

**日期：** 2026-07-08  
**核心目标：** 修复移动端 hover 卡片布局、固定折叠斜角比例、统一深浅主题细节

---

## 主要工作

### 1. 移动端 Hover 弹出卡片修复
- **问题：** 移动端 3 张卡片只显示 1 张且被裁成竖条
- **根因：** `index.html` 中的 MutationObserver 会给每个 `<img>` 外套 `.img-loading-container`（`width/height:100%; display:inline-block`），把 `aspectRatio` 和绝对定位全覆盖
- **解决：** 外层用 `motion.div` 承担定位/尺寸，`<img>` 只做 `w-full h-full object-cover` 铺满内部，wrapper 只作用在 img 层

### 2. 文件夹折叠斜角固定
- **问题：** `clipPath: polygon(... 16.67% ... 40% ...)` 用百分比，容器宽度不同时斜角会被拉伸
- **解决：** 改用像素固定值：`polygon(100% 24px, 50% 24px, calc(50% - 14px) 0, 0 0, 0 100%, 100% 100%)`
- 斜角高度 24px、斜边水平位移 14px，无论容器多宽都保持角度不变

### 3. 卡片遮挡比例统一
- **问题：** `top: -45%` 是相对容器高度的百分比，移动端容器变小 → 相对遮挡变少
- **解决：** 改用 `y: '-67%'` 相对卡片自身高度位移，底部 1/3 始终留在文件夹内
- PC/移动端遮挡比例现在完全一致

### 4. 移动端卡片放大
- PC：`width: 30%`、`leftOffsets: [19, 35, 51]`
- 移动端：`width: 48%`、`leftOffsets: [-2, 26, 54]`（触摸设备通过 `matchMedia('(hover: none), (pointer: coarse)')` 检测）

### 5. 语言切换 icon 统一
- 移动端顶栏原用 `Globe` 图标，PC 侧栏用 `EN`/`中` 文本
- 移动端顶栏改为文本 `{language === 'zh' ? 'EN' : '中'}`，与 PC 一致

### 6. 深色主题背景清理
- 移动端顶栏、Portfolio/Articles 分支树栏：`dark:bg-gray-900` → `dark:bg-black`
- 消除偏蓝的灰调，纯黑更贴合整体氛围

### 7. 深色滚动条灰化
```css
.dark ::-webkit-scrollbar-thumb {
  background: #3f3f3f;
  border: 2px solid #0a0a0a;
  border-radius: 6px;
}
```
- Firefox 同步：`scrollbar-color: #3f3f3f #0a0a0a`

### 8. 文件夹英文字体切换
- `Chathura` → `DotGothic16`（Google Fonts）
- `.folder-title-en` 规则加载新字体族
- 移动端标题空间不足时只显示首词：`card.label.split(' ')[0]`

---

## 技术突破

**MutationObserver 副作用：** 全局图片加载动画的自动包装会破坏子组件精细布局  
**解决方案：** 用 `<div>` 承担定位、`<img>` 只做填充，隔离 wrapper 影响

**跨端遮挡一致性：** 百分比相对容器 vs 相对自身  
**解决方案：** `y: '-67%'` 用 Framer Motion 相对自身尺寸的 transform，几何关系不受容器影响

**CSS clipPath 混合单位：** `polygon()` 支持 `calc(50% - 20px)` 混合百分比与像素  
**解决方案：** 需要保持"比例"的坐标用 %，需要保持"绝对尺寸"的用 px

---

## 今日成果

✅ 移动端 hover 卡片三张齐显、遮挡比例与 PC 一致  
✅ 文件夹斜角在任意宽度下保持相同角度  
✅ 深色主题全面去蓝、纯黑基调  
✅ 语言切换 UI 跨端统一  
✅ 文件夹英文字体像素风更强烈

**提交次数：** 1（合并推送）  
**解决 Bug：** 3 个（弹卡布局 / 斜角拉伸 / 遮挡失衡）

---

**下一步：** 继续打磨内容页交互与滚动体验
