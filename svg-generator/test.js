/**
 * SVG 生成器测试脚本
 */

const { generateInfographic, exportPNG, saveSVG } = require('./index');
const fs = require('fs');
const path = require('path');

// 测试数据
const testData = {
  knowledge: {
    title: "Python 编程语言",
    subtitle: "简洁优雅，强大易用",
    items: [
      { title: "语法简洁", description: "Python 的语法设计简洁明了，代码可读性强，易于学习和使用" },
      { title: "应用广泛", description: "广泛应用于 Web 开发、数据分析、人工智能、自动化脚本等领域" },
      { title: "生态丰富", description: "拥有庞大的第三方库和工具生态系统，几乎所有需求都有现成解决方案" },
      { title: "跨平台", description: "支持 Windows、Linux、macOS 等主流操作系统，代码可移植性强" }
    ],
    summary: "Python 是一门强大而优雅的编程语言，适合从初学者到专业开发者的各个层次"
  },

  comparison: {
    title: "Python vs JavaScript",
    subtitle: "两种流行编程语言的对比",
    left_title: "Python",
    right_title: "JavaScript",
    left_items: [
      { label: "类型", value: "解释型、动态类型" },
      { label: "主要用途", value: "后端、数据科学、AI" },
      { label: "语法特点", value: "简洁、缩进敏感" },
      { label: "执行环境", value: "服务器端为主" }
    ],
    right_items: [
      { label: "类型", value: "解释型、动态类型" },
      { label: "主要用途", value: "前端、全栈、移动端" },
      { label: "语法特点", value: "灵活、类C语法" },
      { label: "执行环境", value: "浏览器 + 服务器端" }
    ],
    conclusion: "选择取决于应用场景：Python 适合数据处理和 AI，JavaScript 适合 Web 开发"
  },

  process: {
    title: "机器学习工作流程",
    subtitle: "从数据到模型的完整流程",
    items: [
      { title: "数据收集", description: "收集和整理训练所需的数据集" },
      { title: "数据预处理", description: "清洗数据、处理缺失值、特征工程" },
      { title: "模型训练", description: "选择合适的算法，训练模型" },
      { title: "模型评估", description: "使用测试集评估模型性能" },
      { title: "模型部署", description: "将模型部署到生产环境" }
    ]
  },

  data: {
    title: "2024 年技术趋势",
    subtitle: "开发者调查数据统计",
    data_points: [
      { label: "AI/ML 采用率", value: "78%", description: "同比增长 23%" },
      { label: "云原生部署", value: "65%", description: "主流选择" },
      { label: "TypeScript 增长", value: "42%", description: "年度增长最快" },
      { label: "远程工作比例", value: "35%", description: "保持稳定" }
    ]
  },

  xiaohongshu: {
    title: "5个AI工具提升效率",
    subtitle: "打工人必备神器 🔥",
    items: [
      { icon: "🤖", title: "ChatGPT", description: "文案创作神器，效率提升 300%" },
      { icon: "🎨", title: "Midjourney", description: "AI 绘画工具，设计师必备" },
      { icon: "📝", title: "Notion AI", description: "智能笔记整理，告别混乱" },
      { icon: "💻", title: "GitHub Copilot", description: "代码自动补全，开发提速" },
      { icon: "🎬", title: "Runway", description: "AI 视频编辑，创意无限" }
    ],
    interaction: "💡 点赞收藏，分享更多干货！"
  },

  timeline: {
    title: "人工智能发展历程",
    events: [
      { date: "1956", title: "AI 诞生", description: "达特茅斯会议" },
      { date: "1997", title: "深蓝胜利", description: "击败国际象棋冠军" },
      { date: "2012", title: "深度学习突破", description: "AlexNet 夺冠" },
      { date: "2016", title: "AlphaGo", description: "击败围棋世界冠军" },
      { date: "2022", title: "ChatGPT", description: "大模型时代开启" },
      { date: "2024", title: "多模态 AI", description: "GPT-4V、Sora 等" }
    ]
  },

  mindmap: {
    title: "前端技术栈",
    branches: [
      { title: "基础" },
      { title: "框架" },
      { title: "工具" },
      { title: "性能" },
      { title: "测试" },
      { title: "部署" }
    ]
  }
};

async function runTests() {
  const outputDir = path.join(__dirname, 'test-output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🧪 开始测试 SVG 生成器\n');

  const styles = [1, 2, 3, 4, 5, 6, 7, 8];
  const types = Object.keys(testData);

  // 测试 1: 每种类型使用默认风格
  console.log('📋 测试 1: 每种信息图类型');
  for (const [type, data] of Object.entries(testData)) {
    try {
      const result = generateInfographic(data, { type, style: 1, orientation: 'landscape' });
      const svgPath = path.join(outputDir, `test-${type}.svg`);
      saveSVG(result.config, svgPath);
      console.log(`  ✅ ${type}: ${svgPath}`);
    } catch (error) {
      console.error(`  ❌ ${type}: ${error.message}`);
    }
  }

  // 测试 2: 知识科普类型使用所有风格
  console.log('\n🎨 测试 2: 所有风格 (知识科普类型)');
  for (const style of styles) {
    try {
      const result = generateInfographic(testData.knowledge, {
        type: 'knowledge',
        style,
        orientation: 'landscape'
      });
      const svgPath = path.join(outputDir, `test-style-${style}.svg`);
      saveSVG(result.config, svgPath);
      console.log(`  ✅ 风格 ${style}: ${svgPath}`);
    } catch (error) {
      console.error(`  ❌ 风格 ${style}: ${error.message}`);
    }
  }

  // 测试 3: 不同方向
  console.log('\n📐 测试 3: 不同方向');
  const orientations = ['landscape', 'portrait', 'square'];
  for (const orientation of orientations) {
    try {
      const result = generateInfographic(testData.knowledge, {
        type: 'knowledge',
        style: 1,
        orientation
      });
      const svgPath = path.join(outputDir, `test-orientation-${orientation}.svg`);
      saveSVG(result.config, svgPath);
      console.log(`  ✅ ${orientation}: ${svgPath}`);
    } catch (error) {
      console.error(`  ❌ ${orientation}: ${error.message}`);
    }
  }

  // 测试 4: PNG 导出（如果 rsvg-convert 可用）
  console.log('\n🖼️ 测试 4: PNG 导出');
  try {
    const result = generateInfographic(testData.knowledge, {
      type: 'knowledge',
      style: 1,
      orientation: 'landscape'
    });
    const pngPath = path.join(outputDir, 'test-export.png');
    result.exportPNG(pngPath);
    console.log(`  ✅ PNG 导出: ${pngPath}`);
  } catch (error) {
    console.log(`  ⚠️ PNG 导出跳过 (rsvg-convert 不可用): ${error.message}`);
  }

  console.log('\n✨ 测试完成！输出目录:', outputDir);
}

runTests().catch(console.error);
