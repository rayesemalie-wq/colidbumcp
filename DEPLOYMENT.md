# ColidbuMCP 网站配置指南
# Configuration Guide

## 1. 域名配置 Domain Configuration

### DNS 设置
- **A 记录:** 指向您的服务器 IP 地址
- **AAAA 记录:** IPv6 地址（可选）
- **MX 记录:** 邮件服务器（如使用自定义邮箱）

示例配置：
```
@        A       123.456.789.0
www      CNAME   colidbumcp.com
mail     A       123.456.789.0
```

## 2. SSL/HTTPS 配置

### Let's Encrypt 自动配置（推荐）
大多数现代主机商提供一键配置。

### 手动配置（如需要）
1. 获取证书
2. 安装到服务器
3. 配置 HTTP 到 HTTPS 重定向

## 3. 邮件表单配置 Email Form Configuration

### 推荐方案：Formspree.io

步骤：
1. 访问 https://formspree.io
2. 注册账户
3. 创建新表单
4. 获取表单 ID
5. 更新 `js/contact.js` 中的表单端点

代码示例：
```javascript
// 在 contact.js 中找到这一行
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### 替代方案：PHP 邮件处理

创建 `mail-handler.php`：
```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');
    
    $to = 'rayesemalie@icloud.com';
    $subject = 'New Contact from ColidbuMCP Website';
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false]);
    }
}
?>
```

## 4. 搜索引擎提交

### Google Search Console
1. 访问 https://search.google.com/search-console
2. 选择"URL前缀"
3. 输入：https://colidbumcp.com
4. 验证所有权
5. 提交 sitemap.xml

### Bing Webmaster Tools
1. 访问 https://www.bing.com/webmasters
2. 添加网站
3. 验证所有权
4. 提交站点地图

## 5. 分析工具配置

### Google Analytics 4
在 HTML head 中添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 6. 性能优化配置

### .htaccess 服务器配置
已包含：
- ✅ Gzip 压缩
- ✅ 浏览器缓存
- ✅ URL 重写
- ✅ 安全头部

## 7. 内容交付网络 (CDN) 配置

### CloudFlare 配置（推荐）
1. 注册 CloudFlare
2. 更改域名 DNS 指向 CloudFlare
3. 启用缓存、Gzip、minification
4. 启用 HTTPS/SSL

## 8. 环境变量 Environment Variables

创建 `.env` 文件（不要提交到 Git）：
```
# 邮件配置
MAIL_FROM=rayesemalie@icloud.com
MAIL_TO=rayesemalie@icloud.com

# API 配置
FORMSPREE_ID=your_formspree_id

# 分析
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 9. 安全配置

### 1. 隐藏敏感文件
已在 `.htaccess` 中配置：
```apache
<FilesMatch "\.(env|config|db|json)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```

### 2. 添加安全头部
```apache
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

### 3. 定期备份
- 每周备份文件
- 每周备份数据库
- 异地存储备份

## 10. 监测与告警

### 建议的监测工具
- UptimeRobot（正常运行时间监测）
- Pingdom（性能监测）
- Google Search Console（搜索问题）
- Sentry（错误追踪）

## 11. 更新维护

### 定期检查清单
- [ ] 检查 SSL 证书过期时间
- [ ] 验证表单功能
- [ ] 测试所有页面链接
- [ ] 检查移动端显示
- [ ] 查看服务器日志
- [ ] 验证备份完整性

## 12. 部署前检查清单

```
□ 所有文件上传完毕
□ DNS 已生效
□ SSL 证书已安装
□ 表单配置完成
□ 邮件测试通过
□ 分析工具已配置
□ 搜索引擎已提交
□ 移动端测试通过
□ 所有链接正常
□ 页面性能测试通过
□ SEO 元素验证通过
□ 法律文档正确显示
□ 备份已建立
```

## 常见问题排查 Troubleshooting

### 表单不发送邮件
- 检查 Formspree 配置
- 确认表单端点 URL 正确
- 查看浏览器控制台错误
- 检查邮件垃圾箱

### 页面加载缓慢
- 启用 Gzip 压缩
- 优化图片大小
- 启用浏览器缓存
- 使用 CDN

### 搜索引擎不收录
- 检查 robots.txt
- 检查 meta robots 标签
- 提交 sitemap.xml
- 使用 Search Console 检查问题

## 技术支持 Technical Support

遇到问题请：
1. 检查此配置文件
2. 查看 README.md
3. 联系：rayesemalie@icloud.com

---

**版本:** 1.0.0  
**最后更新:** 2025-01-15
