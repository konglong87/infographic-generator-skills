/**
 * SVG 生成器演示脚本
 * 展示各种风格和类型的信息图生成
 */

const { generateInfographic, exportPNG, saveSVG } = require('../svg-generator');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎨 SVG 信息图生成器演示\n');

// 示例1: 知识科普 - 极简风格
console.log('1️⃣ 生成知识科普信息图（极简风格）...');
const knowledgeData = {
  title: "人工智能基础概念",
  subtitle: "从机器学习到深度学习",
  items: [
    { title: "机器学习", description: "让计算机从数据中学习规律，无需显式编程" },
    { title: "神经网络", description: "模拟生物神经元结构的计算模型" },
    { title: "深度学习", description: "多层神经网络，自动学习特征表示" },
    { title: "大语言模型", description: "基于Transformer架构的预训练模型" }
  ],
  summary: "AI技术正在改变我们的工作和生活方式"
};

const result1 = generateInfographic(knowledgeData, {
  type: 'knowledge',
  style: 1,
  orientation: 'landscape'
});
result1.save(path.join(outputDir, 'demo-knowledge.svg'));
console.log('   ✅ 已保存: demo-knowledge.svg\n');

// 示例2: 对比分析 - 商务风格
console.log('2️⃣ 生成对比分析信息图（商务风格）...');
const comparisonData = {
  title: "云服务提供商对比",
  subtitle: "AWS vs Azure vs GCP",
  left_title: "AWS",
  right_title: "Azure",
  left_items: [
    { label: "市场份额", value: "32%" },
    { label: "服务数量", value: "200+" },
    { label: "全球区域", value: "30+" }
  ],
  right_items: [
    { label: "市场份额", value: "23%" },
    { label: "服务数量", value: "180+" },
    { label: "全球区域", value: "60+" }
  ],
  conclusion: "AWS市场领先，Azure企业集成度高，GCPAI能力强"
};

const result2 = generateInfographic(comparisonData, {
  type: 'comparison',
  style: 6,
  orientation: 'landscape'
});
result2.save(path.join(outputDir, 'demo-comparison.svg'));
console.log('   ✅ 已保存: demo-comparison.svg\n');

// 示例3: 流程说明 - 赛博朋克风格
console.log('3️⃣ 生成流程说明信息图（赛博朋克风格）...');
const processData = {
  title: "DevOps 流水线",
  subtitle: "从代码提交到生产部署",
  items: [
    { title: "代码提交", description: "开发者提交代码到Git仓库" },
    { title: "自动构建", description: "CI服务器编译代码，运行单元测试" },
    { title: "镜像打包", description: "构建Docker镜像并推送到仓库" },
    { title: "部署上线", description: "自动部署到Kubernetes集群" }
  ]
};

const result3 = generateInfographic(processData, {
  type: 'process',
  style: 3,
  orientation: 'landscape'
});
result3.save(path.join(outputDir, 'demo-process.svg'));
console.log('   ✅ 已保存: demo-process.svg\n');

// 示例4: 小红书风格 - 马卡龙
console.log('4️⃣ 生成小红书爆款信息图（马卡龙风格）...');
const xiaohongshuData = {
  title: "5个习惯提升效率",
  subtitle: "职场人必看 🔥",
  items: [
    { icon: "⏰", title: "番茄工作法", description: "25分钟专注 + 5分钟休息" },
    { icon: "📝", title: "每日清单", description: "前晚规划次日任务" },
    { icon: "🧘", title: "冥想放松", description: "每天10分钟正念冥想" },
    { icon: "📚", title: "持续学习", description: "每天阅读30分钟" },
    { icon: "💤", title: "充足睡眠", description: "保证7-8小时睡眠" }
  ],
  interaction: "💡 点赞收藏，一起变优秀！"
};

const result4 = generateInfographic(xiaohongshuData, {
  type: 'xiaohongshu',
  style: 2,
  orientation: 'portrait'
});
result4.save(path.join(outputDir, 'demo-xiaohongshu.svg'));
console.log('   ✅ 已保存: demo-xiaohongshu.svg\n');

// 示例5: 时间线 - 莫兰迪风格
console.log('5️⃣ 生成时间线信息图（莫兰迪风格）...');
const timelineData = {
  title: "产品发展历程",
  events: [
    { date: "2020", title: "产品立项", description: "确定产品方向" },
    { date: "2021", title: "MVP发布", description: "首个版本上线" },
    { date: "2022", title: "用户增长", description: "突破10万用户" },
    { date: "2023", title: "商业化", description: "实现盈利" },
    { date: "2024", title: "国际化", description: "拓展海外市场" }
  ]
};

const result5 = generateInfographic(timelineData, {
  type: 'timeline',
  style: 4,
  orientation: 'landscape'
});
result5.save(path.join(outputDir, 'demo-timeline.svg'));
console.log('   ✅ 已保存: demo-timeline.svg\n');

// 示例6: 所有风格展示
console.log('6️⃣ 生成所有风格展示...');
const styles = [
  { id: 1, name: '极简风' },
  { id: 2, name: '马卡龙风' },
  { id: 3, name: '赛博朋克' },
  { id: 4, name: '莫兰迪风' },
  { id: 5, name: '国潮风' },
  { id: 6, name: '商务风' },
  { id: 7, name: '手绘风' },
  { id: 8, name: '扁平化' }
];

for (const style of styles) {
  const result = generateInfographic(knowledgeData, {
    type: 'knowledge',
    style: style.id,
    orientation: 'landscape'
  });
  result.save(path.join(outputDir, `demo-style-${style.id}-${style.name}.svg`));
}
console.log('   ✅ 已保存所有风格示例\n');

// 示例7: PNG导出
console.log('7️⃣ 导出PNG格式（需要rsvg-convert）...');
try {
  const result7 = generateInfographic(knowledgeData, {
    type: 'knowledge',
    style: 1,
    orientation: 'landscape'
  });
  result7.exportPNG(path.join(outputDir, 'demo-export.png'));
  console.log('   ✅ 已导出: demo-export.png\n');
} catch (error) {
  console.log('   ⚠️ PNG导出跳过（rsvg-convert不可用）\n');
}

console.log('✨ 演示完成！');
console.log(`📁 输出目录: ${outputDir}`);
console.log('\n生成的文件:');
const files = fs.readdirSync(outputDir);
files.forEach(f => console.log(`  - ${f}`));
