# Installing Infographic Generator for Codex

Enable infographic-generator skill in Codex via native skill discovery.

## Prerequisites

- Git
- Codex CLI installed
- rsvg-convert (for PNG export): `brew install librsvg` (macOS) or `apt-get install librsvg2-bin` (Linux)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/konglong87/infographic-generator-skills.git ~/.codex/infographic-generator
   ```

2. **Create the skills symlink:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/infographic-generator ~/.agents/skills/infographic-generator
   ```

   **Windows (PowerShell):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\infographic-generator" "$env:USERPROFILE\.codex\infographic-generator"
   ```

3. **Install dependencies:**
   ```bash
   cd ~/.codex/infographic-generator
   npm install
   ```

4. **Restart Codex** (quit and relaunch the CLI) to discover the skill.

## Verify

```bash
ls -la ~/.agents/skills/infographic-generator
```

You should see a symlink (or junction on Windows) pointing to your infographic-generator directory.

## Usage

Skills are automatically triggered based on your requests. For example:

```
用户：生成Python编程语言的信息图，包含语法简洁、应用广泛、生态丰富、跨平台4个特点，使用极简风格
AI: [自动触发 infographic-generator skill]

用户：创建一份关于AI趋势的小红书爆款图，马卡龙风格
AI: [自动触发 infographic-generator skill]

用户：制作论文用的数据对比图表，科研风格
AI: [自动触发 infographic-generator skill]
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
cd ~/.codex/infographic-generator && git pull
```

Skills update instantly through the symlink.

## Uninstalling

```bash
rm ~/.agents/skills/infographic-generator
```

Optionally delete the clone: `rm -rf ~/.codex/infographic-generator`.

## Support

- **Issues**: https://github.com/konglong87/infographic-generator-skills/issues
- **Documentation**: https://github.com/konglong87/infographic-generator-skills/blob/main/SKILL.md
