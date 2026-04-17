# Installing Infographic Generator for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed
- Git installed
- rsvg-convert (for PNG export): `brew install librsvg` (macOS) or `apt-get install librsvg2-bin` (Linux)

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/konglong87/infographic-generator-skills.git ~/.config/opencode/infographic-generator
```

### 2. Install Dependencies

```bash
cd ~/.config/opencode/infographic-generator
npm install
```

### 3. Register the Plugin

Create a symlink so OpenCode discovers the plugin:

```bash
mkdir -p ~/.config/opencode/plugins
rm -f ~/.config/opencode/plugins/infographic-generator.js
ln -s ~/.config/opencode/infographic-generator/.opencode/plugins/infographic-generator.js ~/.config/opencode/plugins/infographic-generator.js
```

### 4. Symlink Skills

Create a symlink so OpenCode's native skill tool discovers the skill:

```bash
mkdir -p ~/.config/opencode/skills
rm -rf ~/.config/opencode/skills/infographic-generator
ln -s ~/.config/opencode/infographic-generator ~/.config/opencode/skills/infographic-generator
```

### 5. Restart OpenCode

Restart OpenCode to discover the skill.

Verify by asking: "生成一个Python入门的信息图"

## Usage

### Finding Skills

Use OpenCode's native `skill` tool to list available skills:

```
use skill tool to list skills
```

### Loading the Skill

Use OpenCode's native `skill` tool to load the skill:

```
use skill tool to load infographic-generator
```

## Supported Styles

- **minimal** - 极简风格：干净、现代、专业
- **macaron** - 马卡龙：柔和、甜美、女性向
- **cyberpunk** - 赛博朋克：霓虹、未来、科技感
- **morandi** - 莫兰迪：高级灰、优雅、艺术感
- **guochao** - 国潮：传统中国元素、红色金色
- **business** - 商务：深蓝、专业、企业级
- **handdrawn** - 手绘：自然、亲切、草图感
- **flat** - 扁平化：简洁、现代、UI风格

## Supported Chart Types

- **knowledge** - 知识科普：概念解释、知识点展示
- **comparison** - 对比分析：并排对比、优劣分析
- **process** - 流程说明：步骤流程、操作指南
- **data** - 数据展示：统计图表、数据可视化
- **xiaohongshu** - 小红书：社交媒体风格、种草文案
- **timeline** - 时间线：历史发展、项目里程碑
- **mindmap** - 思维导图：层级结构、发散思维

## Updating

```bash
cd ~/.config/opencode/infographic-generator
git pull
npm install
```

## Troubleshooting

### Skills not found

1. Check skills symlink: `ls -l ~/.config/opencode/skills/infographic-generator`
2. Verify it points to: `~/.config/opencode/infographic-generator`
3. Use `skill` tool to list what's discovered

### rsvg-convert not found

Install librsvg:
- macOS: `brew install librsvg`
- Ubuntu/Debian: `sudo apt-get install librsvg2-bin`
- CentOS/RHEL: `sudo yum install librsvg2`

### Tool mapping

When skills reference Claude Code tools:
- `TodoWrite` → `todowrite`
- `Task` with subagents → `@mention` syntax
- `Skill` tool → OpenCode's native `skill` tool
- File operations → your native tools

## Getting Help

- Report issues: https://github.com/konglong87/infographic-generator-skills/issues
- Full documentation: https://github.com/konglong87/infographic-generator-skills/blob/main/SKILL.md
