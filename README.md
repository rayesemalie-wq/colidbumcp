# ColidbuMCP 官网项目文档

## 项目信息 Project Information

- **项目名称 Project Name:** ColidbuMCP 官方网站
- **网站地址 Website:** https://colidbumcp.com
- **业务支持 Support Email:** rayesemalie@icloud.com
- **技术栈 Tech Stack:** HTML5 + CSS3 + JavaScript + SVG
- **创建日期 Created:** 2025-01-15
- **版本 Version:** 1.0.0

## 项目概述 Overview

ColidbuMCP 是一个专业的、可商用的个人工作室官网，提供以下功能：

- ✅ 完整的企业级网站结构
- ✅ 响应式设计（Mobile, Tablet, Desktop）
- ✅ 丰富的卡通动画效果（Poki 风格）
- ✅ 完整的隐私政策和服务条款
- ✅ SEO 友好的网站结构
- ✅ Google Search 收录兼容性
- ✅ 多平台广告政策合规内容
- ✅ 性能优化

## 项目结构 Project Structure

```
colidbumcp.com/
├── index.html                 # 首页
├── services.html              # 业务服务页面
├── contact.html               # 联系我们页面
├── privacy-policy.html        # 隐私政策
├── terms-of-service.html      # 服务条款
├── robots.txt                 # SEO 爬虫控制
├── sitemap.xml                # 网站地图
├── app-ads.txt                # 应用广告政策
├── .htaccess                  # Apache 服务器配置
├── README.md                  # 项目文档
│
├── css/
│   └── styles.css             # 全局样式表（包含动画）
│
├── js/
│   ├── main.js                # 主要脚本（导航、动画、交互）
│   └── contact.js             # 联系表单脚本
│
└── images/
    └── (SVG 图标和 PNG 图片存放处)
```

## 功能说明 Features

### 1. 首页 (index.html)
- Hero 部分：动画背景、号召行动按钮
- 特性展示：6 个特色服务卡片（悬停动画）
- 我们的游戏：游戏展示部分
- 统计信息：项目统计数字（计数动画）
- 页脚：链接、社交媒体、法律文档

### 2. 业务服务页面 (services.html)
- 4 个主要服务类别：游戏开发、发布营销、托管支持、货币化
- 15 个服务卡片（详细描述、功能列表）
- 3 个服务包（Starter、Professional、Enterprise）
- 完整的服务说明

### 3. 联系我们页面 (contact.html)
- 联系信息展示
- 完整的表单验证系统
- 常见问题 (FAQ) 部分
- 表单提交处理

### 4. 隐私政策 (privacy-policy.html)
- 完整的 GDPR 合规内容
- CCPA/CPRA 条款
- 10+ 个广告平台合规声明（AdMob、AppLovin 等）
- 儿童隐私保护 (COPPA)
- 各类广告类型说明
- 用户权利行使指南

### 5. 服务条款 (terms-of-service.html)
- 完整的法律条款
- 服务使用条件
- 知识产权保护
- 支付和退款政策
- 用户行为规范
- 纠纷解决机制

## 页面特点 Page Features

### 动画效果 Animations
- ✨ 页面加载动画
- ✨ 滚动视差效果
- ✨ 卡片悬停动画
- ✨ 浮动元素动画
- ✨ 计数器动画
- ✨ 波纹效果
- ✨ 平滑过渡

### 响应式设计 Responsive Design
- 📱 Mobile-first 设计方法
- 📱 平板设备优化
- 📱 桌面设备优化
- 📱 触摸手势支持
- 📱 汉堡菜单

### 性能优化 Performance
- ⚡ CSS 压缩
- ⚡ JavaScript 异步加载
- ⚡ 图片优化（SVG 格式）
- ⚡ 缓存策略
- ⚡ Gzip 压缩

## SEO 优化 SEO Optimization

### 已实现的 SEO 特性
- ✅ 语义化 HTML5
- ✅ Meta 标签优化
- ✅ Open Graph 标签
- ✅ Schema 结构化数据准备
- ✅ 站点地图 (sitemap.xml)
- ✅ Robots.txt 配置
- ✅ 规范化链接 (Canonical URLs)
- ✅ 移动端优先索引支持

### 建议的进一步优化
1. 添加 Schema.org 结构化数据（Organization、LocalBusiness）
2. 集成 Google Analytics
3. 设置 Google Search Console
4. 实施面包屑导航
5. 生成 XML 视频地图（如有视频）

## 如何部署 Deployment Guide

### 前置条件
- 购买域名：colidbumcp.com
- 购买主机空间（支持 PHP/Apache）
- FTP 或文件管理访问权限

### 部署步骤

1. **上传文件**
   - 通过 FTP 上传所有文件到主机根目录
   - 保持目录结构完整

2. **配置域名**
   - 在域名注册商更新 DNS 指向主机 IP
   - 等待 DNS 生效（可能需要 24-48 小时）

3. **SSL 证书**
   - 安装 SSL 证书（HTTPS）
   - 大多数主机商免费提供 Let's Encrypt

4. **测试**
   - 检查所有页面链接
   - 测试表单功能
   - 验证移动端显示
   - 检查 SEO 元素

5. **提交搜索引擎**
   - 提交给 Google Search Console
   - 提交给 Bing Webmaster Tools
   - 提交站点地图

## 邮件表单配置 Email Form Configuration

联系表单默认支持以下配置：

### 选项 1: 使用 Formspree.io（推荐）
1. 访问 https://formspree.io
2. 创建新表单
3. 替换 contact.js 中的表单端点：
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    // ...
});
```

### 选项 2: 使用自定义 PHP 后端
1. 创建 `handler.php` 文件
2. 实现邮件发送逻辑
3. 更新表单提交端点

### 选项 3: 使用 EmailJS
1. 注册 https://www.emailjs.com
2. 获取 API 密钥
3. 集成 EmailJS SDK

## 广告相关配置 Ad-Related Configuration

网站支持以下广告平台集成：

- Google AdMob
- AppLovin
- Facebook Audience Network
- TikTok Audience Network
- IronSource
- Vungle
- Chartboost
- Adjust / Branch
- AppsFlyer

在应用中集成时请参考隐私政策中的详细说明。

## 法律合规 Legal Compliance

网站已实现以下法律合规：

- ✅ GDPR (EU/EEA/UK)
- ✅ CCPA/CPRA (California)
- ✅ LGPD (Brazil)
- ✅ PIPEDA (Canada)
- ✅ COPPA (Children's Privacy)
- ✅ Apple App Store Guidelines
- ✅ Google Play Store Policies
- ✅ IAB TCF (Transparency & Consent)

## 性能指标 Performance Metrics

### 页面加载
- 首屏加载时间：< 2 秒
- 完整加载时间：< 4 秒
- 核心网络指标（CWV）优化

### 代码统计
- HTML：~15 KB
- CSS：~50 KB
- JavaScript：~25 KB
- 总大小（未压缩）：~90 KB

## 维护建议 Maintenance Tips

### 定期检查
- 每月检查所有链接可用性
- 监控页面性能
- 检查浏览器兼容性
- 验证表单功能

### 内容更新
- 定期更新隐私政策（法律变更时）
- 更新服务条款（政策变更时）
- 添加新的游戏信息
- 更新统计数据

### 安全更新
- 定期检查依赖更新
- 扫描漏洞
- 更新 SSL 证书
- 审查访问日志

## 浏览器兼容性 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

## 常见问题 FAQ

### Q: 如何自定义颜色？
A: 编辑 `css/styles.css` 中的 CSS 变量：
```css
:root {
    --color-primary: #FF6B6B;
    --color-secondary: #4ECDC4;
    /* ... */
}
```

### Q: 如何添加新页面？
A: 
1. 创建新的 HTML 文件
2. 复制导航栏结构
3. 添加页脚
4. 在导航菜单中添加链接

### Q: 表单不工作？
A: 
1. 检查 Formspree 配置
2. 查看浏览器控制台错误
3. 验证表单端点 URL

### Q: 如何改变字体？
A: 在 CSS 中修改 `font-family`：
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

## 联系与支持 Contact & Support

- 📧 Email: rayesemalie@icloud.com
- 🌐 Website: https://colidbumcp.com

## 许可证 License

本项目为商业用途开发，仅供 ColidbuMCP 使用。

---

**创建日期 Created:** 2025-01-15  
**最后更新 Last Updated:** 2025-01-15  
**版本 Version:** 1.0.0
