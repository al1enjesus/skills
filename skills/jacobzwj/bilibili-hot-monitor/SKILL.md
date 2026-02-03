---
name: bilibili-monitor
description: 生成B站热门视频日报并发送邮件。触发词：B站热门、bilibili日报、视频日报、热门视频
metadata: {"openclaw":{"emoji":"📺","requires":{"bins":["python3"]},"os":["darwin","linux","win32"]}}
---

# B站热门视频日报

## 执行流程（分步询问）

### 检查配置文件

首先检查是否存在配置文件：
```bash
test -f {baseDir}/bilibili-monitor.json && echo "CONFIG_EXISTS" || echo "CONFIG_NOT_EXISTS"
```

- 如果输出 `CONFIG_EXISTS` → 跳到【直接执行】
- 如果输出 `CONFIG_NOT_EXISTS` → 进入【分步创建配置】

---

### 分步创建配置（首次使用）

**第1步：询问 B站 Cookies**
```
请提供 B站 Cookies：
（获取方法：登录B站 → F12 → Application → Cookies → 全选复制）
```
等待用户回复，保存为变量 `COOKIES`

**第2步：询问 B站 API 代理（新增）**
```
是否需要配置 B站 API 代理？
（仅海外部署需要，中国大陆用户选2跳过）
1 = 是（需要填写代理地址）
2 = 否
请回复数字：
```
- 如果选 1 → 询问代理地址：
```
请提供 B站 API 代理地址：
（格式：http://你的服务器IP:端口）
```
保存为 `PROXY_API`
- 如果选 2 → `PROXY_API` 留空

**第3步：询问 AI 点评服务**
```
是否需要 AI 点评功能？（使用 OpenRouter）
1 = 是（需要 OpenRouter API Key）
2 = 否
请回复数字：
```
等待用户回复

**第4步：如果选了 1（使用 AI 点评）**
```
请选择模型：
1 = Gemini（推荐，便宜快速）
2 = Claude（高质量）
3 = GPT
4 = DeepSeek（性价比）
```
等待用户回复，然后：
```
请提供 OpenRouter API Key：
（获取：https://openrouter.ai/keys）
```
保存为 `OPENROUTER_KEY` 和 `MODEL`

**第5步：询问发件邮箱**
```
请提供 Gmail 发件邮箱：
```
等待用户回复，保存为 `SMTP_EMAIL`

**第6步：询问应用密码**
```
请提供 Gmail 应用密码（16位）：
（获取：https://myaccount.google.com/apppasswords）
```
保存为 `SMTP_PASSWORD`

**第7步：询问收件人**
```
请提供收件人邮箱（多个用逗号分隔）：
```
保存为 `RECIPIENTS`

**第8步：生成配置文件**

根据收集的信息创建配置文件：
```bash
cat > {baseDir}/bilibili-monitor.json << 'EOF'
{
  "bilibili": {
    "cookies": "COOKIES值",
    "proxy_api": "PROXY_API值或空"
  },
  "ai": {
    "openrouter_key": "OPENROUTER_KEY值或空",
    "model": "MODEL值"
  },
  "email": {
    "smtp_email": "SMTP_EMAIL值",
    "smtp_password": "SMTP_PASSWORD值",
    "recipients": ["收件人1", "收件人2"]
  },
  "report": {"num_videos": 10}
}
EOF
```

---

### 直接执行（已有配置）

**生成报告：**
```bash
python3 {baseDir}/generate_report.py --config {baseDir}/bilibili-monitor.json --output /tmp/bilibili_report.md
```

**发送邮件（邮件标题自动使用当前日期）：**
```bash
python3 {baseDir}/send_email.py --config {baseDir}/bilibili-monitor.json --body-file /tmp/bilibili_report.md --html
```

---

## OpenRouter 模型映射

| 用户选择 | model 值 |
|---------|---------|
| 1 / Gemini | google/gemini-3-flash-preview |
| 2 / Claude | anthropic/claude-sonnet-4.5 |
| 3 / GPT | openai/gpt-5.2-chat |
| 4 / DeepSeek | deepseek/deepseek-chat-v3-0324 |

## 配置文件示例

见 `bilibili-monitor.example.json`

## ⚠️ 重要提示

**B站 AI 总结 API 地区限制：**
- 该 API 仅限中国大陆 IP 访问
- 海外部署需要配置 `proxy_api` 指向中国服务器的代理
- 中国大陆用户无需配置代理，直接使用即可
