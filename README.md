# VocabMaster 📚

AI 智能背单词 · 在阅读中轻松记住每一个单词

**公网地址：[https://vocabmaster-fz4f.onrender.com](https://vocabmaster-fz4f.onrender.com)**

## 功能

- **📖 七大词库** — 高考 / CET-4 / CET-6 / 考研 / IELTS / TOEFL / GRE，近万个精选核心单词
- **📝 生词本** — 添加生词，分类统计，持久化存储
- **✨ AI 故事生成** — 选 3-10 个生词，AI 自动生成英文短篇故事，生词高亮显示，在语境中记忆
- **🔈 TTS 发音** — 点击喇叭朗读单词（Web Speech API，零依赖）
- **📊 复习进度追踪** — 掌握程度（未复习 / 学习中 / 已掌握），复习次数统计，进度条可视化

## 技术栈

| 层 | 技术 |
|------|------|
| 前端 | React 19 + TypeScript + Vite 8 |
| UI | Tailwind CSS v4 |
| 状态 | Zustand（persist 中间件，存 localStorage） |
| 路由 | React Router v7 |
| 后端 | Express 5（服务 API + 静态前端） |
| AI | DeepSeek API（`deepseek-chat`） |
| TTS | Web Speech API（浏览器内置） |
| 部署 | Render Free Plan |

## 项目结构

```
vocab-app/
├── src/
│   ├── components/
│   │   ├── layout/       # AppShell, Sidebar, TopBar, MobileNav
│   │   ├── notebook/     # NotebookList, NotebookStats, NotebookWordCard
│   │   ├── story/        # GenrePicker, StoryDisplay, StoryHistory
│   │   ├── ui/           # Button, SpeakButton, Badge, Toast, Spinner...
│   │   └── word/         # WordCard, WordDetail, WordList, SearchBar...
│   ├── data/words/       # 7 个词库数据文件
│   ├── hooks/            # useTTS
│   ├── pages/            # 6 个页面
│   ├── services/         # API 调用
│   ├── stores/           # Zustand stores
│   └── types/            # TypeScript 类型定义
├── server/
│   ├── index.ts          # Express 入口
│   ├── routes/story.ts   # AI 故事 API
│   └── services/aiService.ts  # DeepSeek 调用
└── scripts/
    └── convert-words.ts  # 词库转换脚本
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动前端开发服务器（localhost:5173）
npm run dev

# 启动后端 API 服务器（localhost:3001）
npm run dev:server
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥（不设则使用 Mock 故事模板） |
| `PORT` | 服务端口（默认 3001） |

## 构建与部署

```bash
# 生产构建
npm run build

# 启动生产服务器
npm start
```

Render 自动从 `deploy-test` 分支构建部署。推送即上线。

## Checkpoint

当前进度 checkpoint：`checkpoint-v1-20260604`

```bash
git checkout checkpoint-v1-20260604    # 回退到初始版本
```
