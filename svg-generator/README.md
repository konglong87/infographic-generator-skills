# SVG 信息图生成器

基于 fireworks-tech-graph 架构的轻量级 SVG 信息图生成引擎。

## 特性

- ⚡ **极速渲染**：纯代码生成，毫秒级响应
- 🎨 **8种专业风格**：极简、马卡龙、赛博朋克、莫兰迪、国潮、商务、手绘、扁平化
- 📐 **7种图表类型**：知识科普、对比分析、流程说明、数据展示、小红书、时间线、思维导图
- 💾 **矢量输出**：生成可编辑的 SVG，支持无限缩放
- 🖼️ **高质量PNG**：使用 rsvg-convert 导出视网膜级 PNG
- 🔧 **零依赖**：无需浏览器、无需 Puppeteer

## 快速开始

```javascript
const { generateInfographic } = require('./svg-generator');

const data = {
  title: "Python 编程语言",
  subtitle: "简洁优雅，强大易用",
  items: [
    { title: "语法简洁", description: "代码可读性强，易于学习" },
    { title: "应用广泛", description: "Web、AI、数据分析等领域" },
    { title: "生态丰富", description: "海量第三方库和框架" },
    { title: "跨平台", description: "支持主流操作系统" }
  ]
};

const result = generateInfographic(data, {
  type: 'knowledge',
  style: 1,
  orientation: 'landscape'
});

// 保存 SVG
result.save('output.svg');

// 导出 PNG
result.exportPNG('output.png');
```

## 风格配置

| ID | 名称 | 特点 |
|---|---|---|
| 1 | 极简风 | 黑白灰+单色强调，专业感强 |
| 2 | 马卡龙风 | 柔和色调，适合社交媒体 |
| 3 | 赛博朋克 | 霓虹色彩，科技感强 |
| 4 | 莫兰迪风 | 低饱和度，高级感 |
| 5 | 国潮风 | 传统元素，现代设计 |
| 6 | 商务风 | 专业严谨，数据导向 |
| 7 | 手绘风 | 亲切自然，温度感 |
| 8 | 扁平化 | 简洁现代，信息清晰 |

## 图表类型

- **knowledge**：知识科普，卡片网格布局
- **comparison**：对比分析，左右分栏
- **process**：流程说明，步骤时间线
- **data**：数据展示，大数字卡片
- **xiaohongshu**：小红书爆款，竖版卡片
- **timeline**：时间线，水平时间轴
- **mindmap**：思维导图，放射状布局

## CLI 使用

```bash
# 使用配置文件
node cli.js -i config.json -o output.png

# 命令行参数
node cli.js -t knowledge -s 1 --title "标题" -o output.png

# 指定方向
node cli.js -i config.json -o output.png -r portrait
```

## API

### generateInfographic(content, options)

生成信息图配置对象。

**参数：**
- `content`：内容数据对象
- `options`：配置选项
  - `type`：图表类型
  - `style`：风格ID (1-8)
  - `orientation`：方向 (landscape/portrait/square)

**返回：**
- `svg`：SVG字符串
- `config`：完整配置对象
- `save(path)`：保存SVG
- `exportPNG(path)`：导出PNG

## 与原有系统集成

SVG生成器已集成到 `skill-render.js` 中，作为首选渲染方案：

```
用户请求 → SVG生成器 → Remotion → HTML+Puppeteer
          (首选)      (备选)     (降级)
```

当 SVG 生成失败时，自动降级到 Remotion 或 HTML+Puppeteer。

## 性能对比

| 方案 | 渲染时间 | 依赖 | 输出质量 |
|---|---|---|---|
| SVG生成器 | ~10ms | rsvg-convert | ⭐⭐⭐⭐⭐ |
| Remotion | ~5s | Node + React | ⭐⭐⭐⭐ |
| Puppeteer | ~10s | Chrome | ⭐⭐⭐ |

## 文件结构

```
svg-generator/
├── style-profiles.js    # 8种风格配置
├── svg-renderer.js      # SVG渲染引擎
├── index.js             # 主入口
├── cli.js               # 命令行工具
├── test.js              # 测试脚本
└── README.md            # 本文档
```

## 依赖安装

```bash
# macOS
brew install librsvg

# Ubuntu/Debian
sudo apt-get install librsvg2-bin

# Windows (Chocolatey)
choco install rsvg-convert
```

## 许可证

MIT
