/**
 * SVG 渲染引擎
 * 参考 fireworks-tech-graph 的 generate-from-template.py
 * 使用 Node.js 实现类似的 SVG 生成能力
 */

const { STYLE_PROFILES, DIMENSION_PRESETS, INFOGRAPHIC_TYPES, SHAPE_VOCABULARY } = require('./style-profiles');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class SVGRenderer {
  constructor(config = {}) {
    this.config = config;
    this.style = this.loadStyle(config.style || config.style_id || 1);
    this.dimensions = this.loadDimensions(config.dimensions || config.orientation || 'landscape');
    this.lines = [];
  }

  loadStyle(style) {
    if (typeof style === 'number') {
      return STYLE_PROFILES[style] || STYLE_PROFILES[1];
    }
    if (typeof style === 'string') {
      // 尝试通过名称查找
      for (const [id, profile] of Object.entries(STYLE_PROFILES)) {
        if (profile.name.toLowerCase() === style.toLowerCase() ||
            profile.name_zh === style) {
          return profile;
        }
      }
    }
    return STYLE_PROFILES[1];
  }

  loadDimensions(dimensions) {
    if (typeof dimensions === 'object' && dimensions.width && dimensions.height) {
      return dimensions;
    }
    return DIMENSION_PRESETS[dimensions] || DIMENSION_PRESETS.landscape;
  }

  /**
   * 渲染信息图为 SVG
   */
  render(data) {
    this.lines = [];
    const { width, height } = this.dimensions;

    // SVG 头部
    this.lines.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`);

    // 定义部分（defs）
    this.renderDefs();

    // 画布背景
    this.renderCanvas(width, height);

    // 根据类型渲染内容
    const type = data.type || 'knowledge';
    switch (type) {
      case 'knowledge':
        this.renderKnowledgeType(data, width, height);
        break;
      case 'comparison':
        this.renderComparisonType(data, width, height);
        break;
      case 'process':
        this.renderProcessType(data, width, height);
        break;
      case 'data':
        this.renderDataType(data, width, height);
        break;
      case 'xiaohongshu':
        this.renderXiaohongshuType(data, width, height);
        break;
      case 'scientific':
        this.renderScientificType(data, width, height);
        break;
      case 'timeline':
        this.renderTimelineType(data, width, height);
        break;
      case 'mindmap':
        this.renderMindmapType(data, width, height);
        break;
      default:
        this.renderKnowledgeType(data, width, height);
    }

    // SVG 结尾
    this.lines.push('</svg>');

    return this.lines.join('\n');
  }

  /**
   * 渲染 defs 部分（滤镜、渐变、阴影等）
   */
  renderDefs() {
    const style = this.style;
    this.lines.push('  <defs>');

    // 柔和阴影滤镜
    if (style.shadow) {
      this.lines.push(`    <filter id="shadowSoft" x="-20%" y="-20%" width="140%" height="160%">`);
      this.lines.push(`      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.12"/>`);
      this.lines.push(`    </filter>`);

      this.lines.push(`    <filter id="shadowCard" x="-10%" y="-10%" width="120%" height="130%">`);
      this.lines.push(`      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.08"/>`);
      this.lines.push(`    </filter>`);
    }

    // 赛博朋克发光效果
    if (style.name === 'Cyberpunk') {
      ['Cyan', 'Magenta', 'Green', 'Yellow'].forEach((color, i) => {
        const colors = ['#00f5ff', '#ff00ff', '#00ff88', '#ffee00'];
        this.lines.push(`    <filter id="glow${color}" x="-30%" y="-30%" width="160%" height="160%">`);
        this.lines.push(`      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="${colors[i]}" flood-opacity="0.65"/>`);
        this.lines.push(`    </filter>`);
      });
    }

    // 渐变定义
    this.lines.push(`    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">`);
    this.lines.push(`      <stop offset="0%" stop-color="${style.gradient_start}"/>`);
    this.lines.push(`      <stop offset="100%" stop-color="${style.gradient_end}"/>`);
    this.lines.push(`    </linearGradient>`);

    // 文字样式
    this.lines.push(`    <style>`);
    this.lines.push(`      text { font-family: ${style.font_family}; }`);
    this.lines.push(`      .title { font-size: ${style.title_size}px; font-weight: 700; fill: ${style.title_fill}; }`);
    this.lines.push(`      .subtitle { font-size: ${style.subtitle_size}px; font-weight: 500; fill: ${style.subtitle_fill}; }`);
    this.lines.push(`      .card-title { font-size: 24px; font-weight: 600; fill: ${style.text_primary}; }`);
    this.lines.push(`      .card-text { font-size: 16px; font-weight: 400; fill: ${style.text_secondary}; }`);
    this.lines.push(`      .number-large { font-size: 48px; font-weight: 700; fill: ${style.arrow_colors.primary}; }`);
    this.lines.push(`      .label { font-size: 14px; font-weight: 500; fill: ${style.text_muted}; }`);
    this.lines.push(`    </style>`);

    this.lines.push('  </defs>');
  }

  /**
   * 渲染画布背景
   */
  renderCanvas(width, height) {
    const style = this.style;
    this.lines.push(`  <rect width="${width}" height="${height}" fill="${style.background}"/>`);

    // 赛博朋克背景网格
    if (style.name === 'Cyberpunk') {
      this.lines.push(`  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">`);
      this.lines.push(`    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f5ff" stroke-opacity="0.05" stroke-width="1"/>`);
      this.lines.push(`  </pattern>`);
      this.lines.push(`  <rect width="${width}" height="${height}" fill="url(#grid)"/>`);
    }
  }

  /**
   * 渲染标题块
   */
  renderTitleBlock(data, width) {
    const style = this.style;
    const title = data.title || '信息图';
    const subtitle = data.subtitle || '';

    const x = style.title_align === 'center' ? width / 2 : 60;
    const anchor = style.title_align === 'center' ? 'middle' : 'start';
    const y = style.title_align === 'center' ? 80 : 70;

    // 标题
    this.lines.push(`  <text x="${x}" y="${y}" text-anchor="${anchor}" class="title">${this.escapeXml(title)}</text>`);

    // 副标题
    if (subtitle) {
      this.lines.push(`  <text x="${x}" y="${y + style.title_size - 10}" text-anchor="${anchor}" class="subtitle">${this.escapeXml(subtitle)}</text>`);
    }

    // 标题分隔线
    if (style.title_divider) {
      const lineY = y + (subtitle ? 50 : 30);
      this.lines.push(`  <line x1="60" y1="${lineY}" x2="${width - 60}" y2="${lineY}" stroke="${style.section_stroke}" stroke-width="1"/>`);
      return lineY + 40;
    }

    return y + (subtitle ? 60 : 40);
  }

  /**
   * 渲染知识科普类型
   */
  renderKnowledgeType(data, width, height) {
    const style = this.style;
    const items = data.items || [];
    let cursorY = this.renderTitleBlock(data, width);

    // 计算卡片布局
    const cols = width > 1500 ? 3 : 2;
    const cardWidth = (width - 120 - (cols - 1) * 40) / cols;
    const cardHeight = 200;
    const startX = 60;

    items.forEach((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * (cardWidth + 40);
      const y = cursorY + row * (cardHeight + 30);

      // 卡片背景
      const shadowAttr = style.shadow ? ' filter="url(#shadowCard)"' : '';
      this.lines.push(`  <rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="${style.node_radius}" fill="${style.card_background}" stroke="${style.card_border}" stroke-width="1"${shadowAttr}/>`);

      // 左侧装饰条
      const accentColor = style.accent_colors[index % style.accent_colors.length];
      this.lines.push(`  <rect x="${x}" y="${y}" width="6" height="${cardHeight}" rx="${style.node_radius}" fill="${accentColor}"/>`);

      // 序号
      this.lines.push(`  <text x="${x + cardWidth - 40}" y="${y + 40}" text-anchor="middle" class="number-large">${index + 1}</text>`);

      // 标题
      this.lines.push(`  <text x="${x + 30}" y="${y + 50}" class="card-title">${this.escapeXml(item.title)}</text>`);

      // 描述
      const desc = this.wrapText(item.description || '', cardWidth - 60, 24);
      desc.forEach((line, i) => {
        this.lines.push(`  <text x="${x + 30}" y="${y + 90 + i * 28}" class="card-text">${this.escapeXml(line)}</text>`);
      });
    });

    // 总结
    if (data.summary) {
      const summaryY = cursorY + Math.ceil(items.length / cols) * (cardHeight + 30) + 40;
      this.lines.push(`  <rect x="60" y="${summaryY}" width="${width - 120}" height="100" rx="${style.node_radius}" fill="${style.section_fill}" stroke="${style.section_stroke}" stroke-width="1"/>`);
      this.lines.push(`  <text x="${width / 2}" y="${summaryY + 60}" text-anchor="middle" class="card-title">${this.escapeXml(data.summary)}</text>`);
    }
  }

  /**
   * 渲染对比分析类型
   */
  renderComparisonType(data, width, height) {
    const style = this.style;
    const leftItems = data.left_items || [];
    const rightItems = data.right_items || [];
    const leftTitle = data.left_title || '选项 A';
    const rightTitle = data.right_title || '选项 B';

    let cursorY = this.renderTitleBlock(data, width);

    const colWidth = (width - 160) / 2;
    const leftX = 60;
    const rightX = 80 + colWidth;

    // 渲染左侧
    this.renderComparisonColumn(leftX, cursorY, colWidth, leftTitle, leftItems, style.accent_colors[0]);

    // 渲染右侧
    this.renderComparisonColumn(rightX, cursorY, colWidth, rightTitle, rightItems, style.accent_colors[1]);

    // 对比结论
    if (data.conclusion) {
      const conclusionY = cursorY + Math.max(leftItems.length, rightItems.length) * 80 + 120;
      this.lines.push(`  <rect x="60" y="${conclusionY}" width="${width - 120}" height="80" rx="${style.node_radius}" fill="${style.section_fill}" stroke="${style.section_stroke}"/>`);
      this.lines.push(`  <text x="${width / 2}" y="${conclusionY + 50}" text-anchor="middle" class="card-title">${this.escapeXml(data.conclusion)}</text>`);
    }
  }

  renderComparisonColumn(x, y, width, title, items, accentColor) {
    const style = this.style;

    // 列标题
    this.lines.push(`  <rect x="${x}" y="${y}" width="${width}" height="60" rx="${style.node_radius}" fill="${accentColor}" opacity="0.1" stroke="${accentColor}"/>`);
    this.lines.push(`  <text x="${x + width / 2}" y="${y + 40}" text-anchor="middle" class="card-title" fill="${accentColor}">${this.escapeXml(title)}</text>`);

    // 列内容
    items.forEach((item, index) => {
      const itemY = y + 80 + index * 80;
      this.lines.push(`  <rect x="${x}" y="${itemY}" width="${width}" height="70" rx="${style.node_radius}" fill="${style.card_background}" stroke="${style.card_border}"/>`);
      this.lines.push(`  <text x="${x + 20}" y="${itemY + 30}" class="label">${this.escapeXml(item.label)}</text>`);
      this.lines.push(`  <text x="${x + 20}" y="${itemY + 55}" class="card-title" font-size="20">${this.escapeXml(item.value)}</text>`);
    });
  }

  /**
   * 渲染流程类型
   */
  renderProcessType(data, width, height) {
    const style = this.style;
    const items = data.items || [];
    let cursorY = this.renderTitleBlock(data, width);

    const stepHeight = 120;
    const stepWidth = Math.min(800, width - 120);
    const startX = (width - stepWidth) / 2;

    items.forEach((item, index) => {
      const y = cursorY + index * (stepHeight + 20);

      // 步骤卡片
      const shadowAttr = style.shadow ? ' filter="url(#shadowCard)"' : '';
      this.lines.push(`  <rect x="${startX}" y="${y}" width="${stepWidth}" height="${stepHeight}" rx="${style.node_radius}" fill="${style.card_background}" stroke="${style.card_border}"${shadowAttr}/>`);

      // 步骤序号圆圈
      const accentColor = style.accent_colors[index % style.accent_colors.length];
      this.lines.push(`  <circle cx="${startX + 50}" cy="${y + stepHeight / 2}" r="30" fill="${accentColor}"/>`);
      this.lines.push(`  <text x="${startX + 50}" y="${y + stepHeight / 2 + 8}" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="700">${index + 1}</text>`);

      // 步骤标题
      this.lines.push(`  <text x="${startX + 100}" y="${y + 45}" class="card-title">${this.escapeXml(item.title)}</text>`);

      // 步骤描述
      const desc = this.wrapText(item.description || '', stepWidth - 140, 24);
      desc.forEach((line, i) => {
        this.lines.push(`  <text x="${startX + 100}" y="${y + 75 + i * 24}" class="card-text">${this.escapeXml(line)}</text>`);
      });

      // 连接箭头（除了最后一个）
      if (index < items.length - 1) {
        const arrowY = y + stepHeight + 10;
        this.lines.push(`  <line x1="${width / 2}" y1="${arrowY}" x2="${width / 2}" y2="${arrowY + 10}" stroke="${style.arrow_colors.primary}" stroke-width="3" marker-end="url(#arrowhead)"/>`);
      }
    });

    // 添加箭头标记定义
    this.lines.push('  <defs>');
    this.lines.push(`    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">`);
    this.lines.push(`      <polygon points="0 0, 10 3.5, 0 7" fill="${style.arrow_colors.primary}"/>`);
    this.lines.push(`    </marker>`);
    this.lines.push('  </defs>');
  }

  /**
   * 渲染数据展示类型
   */
  renderDataType(data, width, height) {
    const style = this.style;
    const items = data.items || data.data_points || [];
    let cursorY = this.renderTitleBlock(data, width);

    // 大数字展示
    const cols = Math.min(items.length, width > 1500 ? 4 : 3);
    const cardWidth = (width - 120 - (cols - 1) * 30) / cols;
    const cardHeight = 180;

    items.forEach((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = 60 + col * (cardWidth + 30);
      const y = cursorY + row * (cardHeight + 30);

      const accentColor = style.accent_colors[index % style.accent_colors.length];

      // 卡片背景
      const shadowAttr = style.shadow ? ' filter="url(#shadowCard)"' : '';
      this.lines.push(`  <rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="${style.node_radius}" fill="${style.card_background}" stroke="${accentColor}" stroke-width="2"${shadowAttr}/>`);

      // 数值
      this.lines.push(`  <text x="${x + cardWidth / 2}" y="${y + 80}" text-anchor="middle" font-size="56" font-weight="700" fill="${accentColor}">${this.escapeXml(item.value)}</text>`);

      // 标签
      this.lines.push(`  <text x="${x + cardWidth / 2}" y="${y + 120}" text-anchor="middle" class="card-title">${this.escapeXml(item.label)}</text>`);

      // 描述
      if (item.description) {
        this.lines.push(`  <text x="${x + cardWidth / 2}" y="${y + 150}" text-anchor="middle" class="card-text" font-size="14">${this.escapeXml(item.description)}</text>`);
      }
    });
  }

  /**
   * 渲染小红书类型
   */
  renderXiaohongshuType(data, width, height) {
    const style = this.style;
    const items = data.items || [];

    // 小红书风格使用更鲜艳的颜色
    let cursorY = 100;

    // 标题区域
    const title = data.title || '';
    this.lines.push(`  <text x="${width / 2}" y="${cursorY}" text-anchor="middle" font-size="52" font-weight="700" fill="${style.title_fill}">${this.escapeXml(title)}</text>`);

    if (data.subtitle) {
      cursorY += 50;
      this.lines.push(`  <text x="${width / 2}" y="${cursorY}" text-anchor="middle" font-size="28" fill="${style.subtitle_fill}">${this.escapeXml(data.subtitle)}</text>`);
    }

    cursorY += 80;

    // 内容卡片 - 竖版布局
    const cardWidth = width - 100;
    const cardHeight = 140;

    items.forEach((item, index) => {
      const y = cursorY + index * (cardHeight + 20);
      const accentColor = style.accent_colors[index % style.accent_colors.length];

      // 圆角卡片
      this.lines.push(`  <rect x="50" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="24" fill="${style.card_background}" stroke="${accentColor}" stroke-width="2" filter="url(#shadowCard)"/>`);

      // 图标区域
      this.lines.push(`  <circle cx="100" cy="${y + 70}" r="35" fill="${accentColor}" opacity="0.2"/>`);
      this.lines.push(`  <text x="100" y="${y + 80}" text-anchor="middle" font-size="32">${item.icon || '✨'}</text>`);

      // 标题
      this.lines.push(`  <text x="160" y="${y + 55}" font-size="28" font-weight="600" fill="${style.text_primary}">${this.escapeXml(item.title)}</text>`);

      // 描述
      this.lines.push(`  <text x="160" y="${y + 90}" font-size="18" fill="${style.text_secondary}">${this.escapeXml(item.description || '')}</text>`);
    });

    // 底部互动区
    if (data.interaction) {
      const interactionY = cursorY + items.length * (cardHeight + 20) + 40;
      this.lines.push(`  <rect x="50" y="${interactionY}" width="${cardWidth}" height="80" rx="20" fill="${style.accent_colors[0]}" opacity="0.1"/>`);
      this.lines.push(`  <text x="${width / 2}" y="${interactionY + 50}" text-anchor="middle" font-size="24" font-weight="600" fill="${style.accent_colors[0]}">${this.escapeXml(data.interaction)}</text>`);
    }
  }

  /**
   * 渲染科研图表类型
   */
  renderScientificType(data, width, height) {
    const style = this.style;
    const items = data.items || [];
    let cursorY = this.renderTitleBlock(data, width);

    // 更严谨的布局
    const cols = width > 1500 ? 2 : 1;
    const cardWidth = (width - 120 - (cols - 1) * 40) / cols;

    items.forEach((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = 60 + col * (cardWidth + 40);
      const y = cursorY + row * 140;

      // 简洁的卡片
      this.lines.push(`  <rect x="${x}" y="${y}" width="${cardWidth}" height="120" rx="4" fill="#fafafa" stroke="#e0e0e0"/>`);

      // 左侧标记线
      this.lines.push(`  <rect x="${x}" y="${y}" width="4" height="120" fill="#333333"/>`);

      // 序号
      this.lines.push(`  <text x="${x + 30}" y="${y + 35}" font-size="14" fill="#666666">[${index + 1}]</text>`);

      // 标题
      this.lines.push(`  <text x="${x + 30}" y="${y + 65}" font-size="20" font-weight="600" fill="#000000">${this.escapeXml(item.title)}</text>`);

      // 描述
      this.lines.push(`  <text x="${x + 30}" y="${y + 95}" font-size="16" fill="#333333">${this.escapeXml(item.description || '')}</text>`);
    });

    // 结论区域
    if (data.summary) {
      const summaryY = cursorY + Math.ceil(items.length / cols) * 140 + 40;
      this.lines.push(`  <rect x="60" y="${summaryY}" width="${width - 120}" height="100" rx="4" fill="#f5f5f5" stroke="#e0e0e0"/>`);
      this.lines.push(`  <text x="80" y="${summaryY + 40}" font-size="18" font-weight="600" fill="#000000">结论:</text>`);
      this.lines.push(`  <text x="80" y="${summaryY + 75}" font-size="16" fill="#333333">${this.escapeXml(data.summary)}</text>`);
    }
  }

  /**
   * 渲染时间线类型
   */
  renderTimelineType(data, width, height) {
    const style = this.style;
    const items = data.items || data.events || [];
    let cursorY = this.renderTitleBlock(data, width);

    const centerX = width / 2;
    const lineY = cursorY + 40;

    // 时间线主线
    this.lines.push(`  <line x1="80" y1="${lineY}" x2="${width - 80}" y2="${lineY}" stroke="${style.arrow_colors.primary}" stroke-width="4"/>`);

    items.forEach((item, index) => {
      const x = 120 + index * ((width - 240) / Math.max(items.length - 1, 1));

      // 时间点
      const accentColor = style.accent_colors[index % style.accent_colors.length];
      this.lines.push(`  <circle cx="${x}" cy="${lineY}" r="12" fill="${accentColor}" stroke="#ffffff" stroke-width="3"/>`);

      // 日期/时间
      this.lines.push(`  <text x="${x}" y="${lineY - 30}" text-anchor="middle" font-size="16" font-weight="600" fill="${accentColor}">${this.escapeXml(item.date || item.time || '')}</text>`);

      // 事件标题（上下交替）
      const titleY = index % 2 === 0 ? lineY + 50 : lineY + 80;
      this.lines.push(`  <text x="${x}" y="${titleY}" text-anchor="middle" font-size="18" font-weight="600" fill="${style.text_primary}">${this.escapeXml(item.title)}</text>`);

      // 描述
      if (item.description) {
        const descY = index % 2 === 0 ? lineY + 80 : lineY + 110;
        this.lines.push(`  <text x="${x}" y="${descY}" text-anchor="middle" font-size="14" fill="${style.text_secondary}">${this.escapeXml(item.description)}</text>`);
      }
    });
  }

  /**
   * 渲染思维导图类型
   */
  renderMindmapType(data, width, height) {
    const style = this.style;
    const items = data.items || data.branches || [];
    const centerX = width / 2;
    const centerY = height / 2;

    // 中心主题
    const centerRadius = 80;
    this.lines.push(`  <circle cx="${centerX}" cy="${centerY}" r="${centerRadius}" fill="url(#primaryGradient)"/>`);
    this.lines.push(`  <text x="${centerX}" y="${centerY + 8}" text-anchor="middle" font-size="24" font-weight="700" fill="#ffffff">${this.escapeXml(data.title || '中心主题')}</text>`);

    // 分支
    const angleStep = (2 * Math.PI) / Math.max(items.length, 1);
    items.forEach((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const branchLength = 200;
      const endX = centerX + Math.cos(angle) * branchLength;
      const endY = centerY + Math.sin(angle) * branchLength;

      const accentColor = style.accent_colors[index % style.accent_colors.length];

      // 连接线
      this.lines.push(`  <line x1="${centerX + Math.cos(angle) * centerRadius}" y1="${centerY + Math.sin(angle) * centerRadius}" x2="${endX}" y2="${endY}" stroke="${accentColor}" stroke-width="3"/>`);

      // 分支节点
      this.lines.push(`  <circle cx="${endX}" cy="${endY}" r="50" fill="${style.card_background}" stroke="${accentColor}" stroke-width="2"/>`);
      this.lines.push(`  <text x="${endX}" y="${endY + 6}" text-anchor="middle" font-size="16" font-weight="600" fill="${style.text_primary}">${this.escapeXml(item.title)}</text>`);
    });
  }

  /**
   * 文本换行
   */
  wrapText(text, maxWidth, fontSize) {
    const charsPerLine = Math.floor(maxWidth / (fontSize * 0.6));
    const lines = [];
    let currentLine = '';

    for (const char of String(text)) {
      if (currentLine.length >= charsPerLine) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine += char;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.slice(0, 3); // 最多3行
  }

  /**
   * XML 转义
   */
  escapeXml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * 保存 SVG 到文件
   */
  save(svgContent, outputPath) {
    fs.writeFileSync(outputPath, svgContent, 'utf-8');
    return outputPath;
  }

  /**
   * 导出为 PNG（使用 rsvg-convert）
   */
  exportPNG(svgPath, pngPath, width = null) {
    const w = width || this.dimensions.width;
    try {
      execSync(`rsvg-convert -w ${w} "${svgPath}" -o "${pngPath}"`, { stdio: 'inherit' });
      return pngPath;
    } catch (error) {
      console.error('PNG export failed:', error.message);
      throw error;
    }
  }
}

module.exports = { SVGRenderer };
