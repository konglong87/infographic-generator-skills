#!/usr/bin/env node

/**
 * SVG 信息图生成器 CLI
 * 使用方法: node cli.js [options]
 */

const { generateInfographic, exportPNG, saveSVG, STYLE_PROFILES, INFOGRAPHIC_TYPES } = require('./index');
const fs = require('fs');
const path = require('path');

function showHelp() {
  console.log(`
SVG 信息图生成器

用法:
  node cli.js [选项]

选项:
  --input, -i <文件>      输入 JSON 配置文件
  --output, -o <文件>     输出文件路径 (.svg 或 .png)
  --type, -t <类型>       信息图类型: ${Object.keys(INFOGRAPHIC_TYPES).join(', ')}
  --style, -s <风格>      风格 ID (1-8) 或风格名称
  --orientation, -r <方向>  方向: landscape, portrait, square
  --title <标题>          信息图标题
  --width <宽度>          输出宽度 (默认 1920)
  --height <高度>         输出高度 (默认 1080)
  --help, -h              显示帮助

示例:
  # 使用配置文件
  node cli.js -i config.json -o output.png

  # 命令行参数
  node cli.js -t knowledge -s 1 --title "Python 编程" -o python.png

  # 生成横版和竖版
  node cli.js -i config.json -o output.png -r landscape
  node cli.js -i config.json -o output.png -r portrait

可用风格:
${Object.entries(STYLE_PROFILES).map(([id, p]) => `  ${id}: ${p.name_zh} (${p.name})`).join('\n')}

可用类型:
${Object.entries(INFOGRAPHIC_TYPES).map(([key, t]) => `  ${key}: ${t.name} - ${t.description}`).join('\n')}
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,
    output: null,
    type: 'knowledge',
    style: 1,
    orientation: 'landscape',
    title: '',
    width: 1920,
    height: 1080,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
        break;
      case '--input':
      case '-i':
        options.input = args[++i];
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--type':
      case '-t':
        options.type = args[++i];
        break;
      case '--style':
      case '-s':
        const styleArg = args[++i];
        options.style = parseInt(styleArg) || styleArg;
        break;
      case '--orientation':
      case '-r':
        options.orientation = args[++i];
        break;
      case '--title':
        options.title = args[++i];
        break;
      case '--width':
        options.width = parseInt(args[++i]);
        break;
      case '--height':
        options.height = parseInt(args[++i]);
        break;
    }
  }

  return options;
}

function main() {
  const options = parseArgs();

  if (!options.output) {
    console.error('错误: 请指定输出文件路径 (--output)');
    showHelp();
    process.exit(1);
  }

  let content;

  if (options.input) {
    // 从文件读取配置
    const configData = fs.readFileSync(options.input, 'utf-8');
    const config = JSON.parse(configData);
    content = config.content || config;
    options.type = config.type || options.type;
    options.style = config.style || options.style;
  } else {
    // 使用命令行参数
    content = {
      title: options.title,
      items: []
    };
  }

  console.log('🎨 生成信息图...');
  console.log(`   类型: ${options.type}`);
  console.log(`   风格: ${options.style}`);
  console.log(`   方向: ${options.orientation}`);

  try {
    const result = generateInfographic(content, {
      type: options.type,
      style: options.style,
      orientation: options.orientation,
      dimensions: { width: options.width, height: options.height }
    });

    if (options.output.endsWith('.svg')) {
      result.save(options.output);
      console.log(`✅ SVG 已保存: ${options.output}`);
    } else {
      result.exportPNG(options.output);
      console.log(`✅ PNG 已导出: ${options.output}`);
    }
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    process.exit(1);
  }
}

main();
