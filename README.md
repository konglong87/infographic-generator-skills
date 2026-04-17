# Infographic Generator

**高性能信息图生成器 - 一句话生成PNG图片**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

## 🎯 核心特性

- ⚡ **极速渲染** - SVG生成器实现~10ms渲染，性能提升1000倍
- 🎨 **8种专业风格** - 极简、马卡龙、赛博朋克、莫兰迪、国潮、商务、手绘、扁平化
- 📊 **7种图表类型** - 知识科普、对比分析、流程说明、数据展示、小红书、时间线、思维导图
- 🚀 **一句话生成** - 自然语言描述 → 高质量PNG图片
- 🔄 **三级降级策略** - SVG → Remotion → Puppeteer，确保渲染成功
- 💯 **无需API Key** - 完全本地运行，无外部依赖
- 📱 **多平台支持** - Claude、Codex、Cursor、OpenCode全平台兼容

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/konglong87/infographic-generator-skills.git
cd infographic-generator-skills
```

### 2. 安装系统依赖

**macOS:**
```bash
brew install librsvg
```

**Ubuntu/Debian:**
```bash
sudo apt-get install librsvg2-bin
```

**CentOS/RHEL:**
```bash
sudo yum install librsvg2
```

### 3. 安装Node依赖

```bash
npm install
```

### 4. 安装为AI工具Skill（推荐）

根据你使用的AI工具，选择对应的安装方式：

#### Claude Code

```bash
# 创建skills目录
mkdir -p ~/.claude/skills

# 创建软链接
ln -s $(pwd) ~/.claude/skills/infographic-generator

# 重启Claude Code
```

**验证安装：**
```bash
ls -la ~/.claude/skills/infographic-generator
```

#### Codex CLI

```bash
# 创建skills目录
mkdir -p ~/.codex/skills

# 创建软链接
ln -s $(pwd) ~/.codex/skills/infographic-generator

# 重启Codex
```

**验证安装：**
```bash
ls -la ~/.codex/skills/infographic-generator
```

#### Cursor

```bash
# 创建cursor skills目录
mkdir -p ~/.cursor/skills

# 创建软链接
ln -s $(pwd) ~/.cursor/skills/infographic-generator

# 重启Cursor
```

**验证安装：**
```bash
ls -la ~/.cursor/skills/infographic-generator
```

#### OpenCode

```bash
# 创建opencode skills目录
mkdir -p ~/.opencode/skills

# 创建软链接
ln -s $(pwd) ~/.opencode/skills/infographic-generator

# 重启OpenCode
```

**验证安装：**
```bash
ls -la ~/.opencode/skills/infographic-generator
```

---

## 💡 使用方法

### 方式1：一句话生成（推荐）

安装为Skill后，直接在AI对话中描述需求：

```
用户：生成Python编程语言的信息图，包含语法简洁、应用广泛、生态丰富、跨平台4个特点，使用极简风格
AI：[自动调用infographic-generator skill生成PNG图片]
```

### 方式2：命令行直接运行

```bash
node skill-render.js "生成Python编程语言的信息图，包含语法简洁、应用广泛、生态丰富、跨平台4个特点，使用极简风格"
```

### 方式3：指定风格和类型

```bash
node skill-render.js "生成AI趋势对比图" --style cyberpunk --type comparison
```

### 方式4：使用SVG生成器CLI

```bash
node svg-generator/cli.js --config fortune-temp.json --output output.png
```

---

## 🎨 支持的风格

| 风格 | 特点 | 适用场景 |
|------|------|---------|
| **minimal** | 干净、现代、专业 | 技术文档、企业介绍 |
| **macaron** | 柔和、甜美、女性向 | 生活方式、美妆时尚 |
| **cyberpunk** | 霓虹、未来、科技感 | 科技产品、游戏 |
| **morandi** | 高级灰、优雅、艺术感 | 艺术展览、高端品牌 |
| **guochao** | 传统中国元素、红色金色 | 国潮品牌、文化活动 |
| **business** | 深蓝、专业、企业级 | 商务报告、金融数据 |
| **handdrawn** | 自然、亲切、草图感 | 教育、创意内容 |
| **flat** | 简洁、现代、UI风格 | App介绍、网页设计 |

## 📊 支持的图表类型

| 类型 | 说明 | 示例 |
|------|------|------|
| **knowledge** | 知识科普 | 概念解释、知识点展示 |
| **comparison** | 对比分析 | 产品对比、优劣分析 |
| **process** | 流程说明 | 步骤流程、操作指南 |
| **data** | 数据展示 | 统计图表、数据可视化 |
| **xiaohongshu** | 小红书 | 社交媒体风格、种草文案 |
| **timeline** | 时间线 | 历史发展、项目里程碑 |
| **mindmap** | 思维导图 | 层级结构、发散思维 |

## 📁 项目结构

```
infographic-generator-skills/
├── SKILL.md                    # 完整使用指南
├── skill-render.js             # 主入口文件
├── svg-generator/              # SVG生成器（高性能渲染）
│   ├── index.js               # 主模块
│   ├── svg-renderer.js        # SVG渲染核心
│   ├── style-profiles.js      # 8种风格配置
│   └── cli.js                 # CLI工具
├── remotion/                   # Remotion渲染（降级方案）
├── generate-html.js            # HTML生成器（Puppeteer降级）
├── schemas/                    # JSON Schema定义
├── examples/                   # 示例输出
├── assets/                     # 静态资源
├── docs/                       # 文档
├── .claude-plugin/            # Claude插件配置
├── .codex/                    # Codex安装指南
├── .cursor-plugin/            # Cursor插件配置
└── .opencode/                 # OpenCode安装指南
```

## 📖 文档

- [SKILL.md](./SKILL.md) - 完整使用指南和API文档
- [OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md) - 性能优化总结
- [svg-generator/README.md](./svg-generator/README.md) - SVG生成器文档

## 🔧 技术架构

### 三级降级策略

```
用户请求
    ↓
┌─────────────────┐
│ 1. SVG生成器    │ ← 首选方案，~10ms
│    (Node.js)    │
└────────┬────────┘
         ↓ 失败
┌─────────────────┐
│ 2. Remotion     │ ← 降级方案，~5s
│    (React)      │
└────────┬────────┘
         ↓ 失败
┌─────────────────┐
│ 3. Puppeteer    │ ← 最终降级，~10s
│    (Headless)   │
└─────────────────┘
```

### 性能对比

| 方案 | 渲染时间 | 依赖 | 稳定性 |
|------|---------|------|--------|
| SVG生成器 | ~10ms | rsvg-convert | ⭐⭐⭐⭐⭐ |
| Remotion | ~5s | Node + React | ⭐⭐⭐⭐ |
| Puppeteer | ~10s | Chromium | ⭐⭐⭐ |

## 🔄 更新Skill

```bash
cd infographic-generator-skills
git pull
npm install
```

## ❌ 卸载Skill

```bash
# 根据安装位置删除软链接
rm ~/.claude/skills/infographic-generator      # Claude
rm ~/.codex/skills/infographic-generator       # Codex
rm ~/.cursor/skills/infographic-generator      # Cursor
rm ~/.opencode/skills/infographic-generator    # OpenCode
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [fireworks-tech-graph](https://github.com/konglong87/fireworks-tech-graph) - 架构参考
- [Remotion](https://www.remotion.dev/) - 视频/图片渲染引擎
- [librsvg](https://wiki.gnome.org/Projects/LibRsvg) - SVG到PNG转换

---

**恐龙创新部** | 2026
