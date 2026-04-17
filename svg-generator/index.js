/**
 * SVG 信息图生成器主入口
 * 提供与原有系统兼容的 API
 */

const { SVGRenderer } = require('./svg-renderer');
const { STYLE_PROFILES, DIMENSION_PRESETS, INFOGRAPHIC_TYPES } = require('./style-profiles');
const fs = require('fs');
const path = require('path');

/**
 * 从配置生成 SVG
 */
function generateSVG(config) {
  const renderer = new SVGRenderer(config);
  return renderer.render(config.content || config);
}

/**
 * 从配置生成并保存 SVG
 */
function saveSVG(config, outputPath) {
  const svg = generateSVG(config);
  fs.writeFileSync(outputPath, svg, 'utf-8');
  return outputPath;
}

/**
 * 生成并导出 PNG
 */
function exportPNG(config, outputPath) {
  const tempSvgPath = outputPath.replace('.png', '.svg');

  // 生成 SVG
  saveSVG(config, tempSvgPath);

  // 导出 PNG
  const { execSync } = require('child_process');
  const width = config.dimensions?.width || config.width || 1920;

  try {
    execSync(`rsvg-convert -w ${width} "${tempSvgPath}" -o "${outputPath}"`, { stdio: 'pipe' });

    // 可选：删除临时 SVG
    if (!config.keepSvg) {
      fs.unlinkSync(tempSvgPath);
    }

    return outputPath;
  } catch (error) {
    console.error('PNG export failed:', error.message);
    // 如果 rsvg-convert 失败，保留 SVG
    console.log(`SVG saved at: ${tempSvgPath}`);
    throw error;
  }
}

/**
 * 智能生成信息图
 * 根据内容自动选择最佳样式和布局
 */
function generateInfographic(content, options = {}) {
  const type = options.type || inferType(content);
  const style = options.style || INFOGRAPHIC_TYPES[type]?.default_style || 1;
  const orientation = options.orientation || 'landscape';

  const config = {
    type,
    style,
    dimensions: DIMENSION_PRESETS[orientation],
    content: {
      title: content.title,
      subtitle: content.subtitle,
      items: content.items,
      summary: content.summary,
      ...content
    }
  };

  return {
    svg: generateSVG(config),
    config,
    save: (outputPath) => saveSVG(config, outputPath),
    exportPNG: (outputPath) => exportPNG(config, outputPath)
  };
}

/**
 * 推断内容类型
 */
function inferType(content) {
  if (content.left_items && content.right_items) return 'comparison';
  if (content.events || (content.items && content.items[0]?.date)) return 'timeline';
  if (content.branches) return 'mindmap';
  if (content.data_points || content.items?.[0]?.value) return 'data';
  if (content.items?.[0]?.icon) return 'xiaohongshu';
  if (content.type) return content.type;
  return 'knowledge';
}

/**
 * 批量生成
 */
function batchGenerate(contents, options = {}) {
  return contents.map((content, index) => {
    const outputPath = options.outputPath
      ? options.outputPath.replace(/\.png$/, `-${index + 1}.png`)
      : `output-${index + 1}.png`;

    try {
      const result = generateInfographic(content, options);
      result.exportPNG(outputPath);
      return { success: true, outputPath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
}

module.exports = {
  generateSVG,
  saveSVG,
  exportPNG,
  generateInfographic,
  batchGenerate,
  SVGRenderer,
  STYLE_PROFILES,
  DIMENSION_PRESETS,
  INFOGRAPHIC_TYPES,
};
