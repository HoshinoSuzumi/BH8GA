# BH8GA 项目 Nuxt 重构计划

> 作者：Copilot  
> 日期：2026-03-09  
> 状态：草案

---

## 目录

1. [背景与目标](#1-背景与目标)
2. [现有技术栈分析](#2-现有技术栈分析)
3. [可行性分析](#3-可行性分析)
4. [技术选型](#4-技术选型)
5. [模块映射与迁移策略](#5-模块映射与迁移策略)
6. [工作量评估](#6-工作量评估)
7. [迁移路线图](#7-迁移路线图)
8. [风险与挑战](#8-风险与挑战)
9. [结论与建议](#9-结论与建议)

---

## 1. 背景与目标

### 1.1 项目概述

BH8GA 是一个面向业余无线电爱好者的个人网站，功能包括：
- 多语言个人博客（中/英/日）
- QSL 卡片画廊与交换系统
- 管理员仪表盘（增删改查）
- GitHub OAuth 身份验证
- 交互式地图足迹展示
- 作品集展示

### 1.2 重构目标

将项目从 **Next.js 14（React 技术栈）** 迁移至 **Nuxt 3（Vue 技术栈）**，要求：
- 所有已有功能与用户体验保持不变
- 使用最新稳定版本的 Nuxt 及生态工具
- 保持 TypeScript 强类型
- 保持 SEO、i18n、暗色模式等能力
- 维持在 Vercel 上的部署能力

---

## 2. 现有技术栈分析

### 2.1 框架与运行时

| 层级 | 当前技术 | 版本 |
|------|---------|------|
| 框架 | Next.js (App Router) | 14.2.3 |
| UI 库 | React + React DOM | 18.x |
| 语言 | TypeScript | 5.x |

### 2.2 UI 组件与样式

| 层级 | 当前技术 | 版本 |
|------|---------|------|
| UI 组件库 | NextUI | 2.4.1 |
| CSS 框架 | Tailwind CSS | 3.4.x |
| 动画 | Framer Motion | 11.x |
| 样式预处理 | SCSS (sass) | 1.77.x |
| 排版插件 | @tailwindcss/typography | 0.5.x |

### 2.3 数据与 API

| 层级 | 当前技术 | 版本 |
|------|---------|------|
| 数据库客户端 | Kysely (SQL query builder) | 0.27.x |
| 数据库适配器 | @vercel/postgres-kysely | 0.8.x |
| 类型生成 | kysely-codegen | 0.15.x |
| 客户端数据获取 | SWR | 2.2.x |
| 日期处理 | dayjs | 1.11.x |
| UUID | @uniiem/uuid | 0.2.x |

### 2.4 认证

| 层级 | 当前技术 | 版本 |
|------|---------|------|
| OAuth 框架 | next-auth | 5.0.0-beta.19 |
| 提供商 | GitHub OAuth | - |

### 2.5 国际化

| 层级 | 当前技术 | 版本 |
|------|---------|------|
| i18n 框架 | next-intl | 3.14.x |
| 语言支持 | 中文(zh)、英文(en)、日文(ja) | - |
| 路由策略 | `localePrefix: 'never'`（无前缀） | - |

### 2.6 内容处理

| 层级 | 当前技术 | 版本 |
|------|---------|------|
| Markdown 解析 | remark + unified | 15.x / 11.x |
| HTML 转换 | remark-html / rehype-stringify | 16.x / 10.x |
| 语法高亮 | @shikijs/rehype | 1.22.x |
| 数学公式 | remark-math + rehype-katex | 6.x / 7.x |
| GFM 扩展 | remark-gfm | 4.x |
| 目录生成 | remark-toc | 9.x |
| Frontmatter 解析 | gray-matter | 4.x |

### 2.7 地图

| 层级 | 当前技术 | 版本 |
|------|---------|------|
| 地图引擎 | mapbox-gl | 3.8.x |
| React 封装 | react-map-gl | 7.1.x |

### 2.8 主题

| 层级 | 当前技术 | 版本 |
|------|---------|------|
| 主题切换 | next-themes | 0.3.x |

---

## 3. 可行性分析

### 3.1 结论：**技术上完全可行**

Nuxt 3 与 Next.js 14 在架构理念上高度对齐（均为 SSR/SSG 全栈框架），功能集也基本一一对应：

| 能力 | Next.js 14 | Nuxt 3 | 可行性 |
|------|-----------|--------|--------|
| SSR / SSG / ISR | ✅ App Router | ✅ Nitro 渲染引擎 | ✅ |
| API 路由 | ✅ Route Handlers | ✅ server/api/ | ✅ |
| Server Actions | ✅ `'use server'` | ✅ `server/api/` + composables | ✅ |
| 文件系统路由 | ✅ | ✅ pages/ | ✅ |
| TypeScript 原生支持 | ✅ | ✅ | ✅ |
| i18n | ✅ next-intl | ✅ @nuxtjs/i18n | ✅ |
| 认证 | ✅ next-auth | ✅ nuxt-auth-utils | ✅ |
| 暗色模式 | ✅ next-themes | ✅ @nuxtjs/color-mode | ✅ |
| Tailwind CSS | ✅ | ✅ @nuxtjs/tailwindcss | ✅ |
| Markdown 处理 | ✅ 自定义管道 | ✅ @nuxt/content 或自定义 | ✅ |
| PostgreSQL | ✅ Kysely | ✅ Drizzle ORM 或继续 Kysely | ✅ |
| 地图 | ✅ react-map-gl | ✅ vue-maplibre-gl 或原生 mapbox-gl | ✅ |
| Vercel 部署 | ✅ | ✅ nuxt-vercel | ✅ |

### 3.2 主要差异点

1. **组件模型**：React (JSX/TSX) → Vue 3 (SFC `.vue` + Composition API)
2. **状态管理**：React hooks → Vue `ref/reactive/computed` + Pinia
3. **数据获取**：SWR → `useFetch` / `useAsyncData`（Nuxt 内置）
4. **Server Actions**：Next.js 内置 → Nuxt server/api routes + `$fetch`
5. **UI 组件库**：NextUI（React Only）→ Nuxt UI v3（Vue）
6. **动画**：Framer Motion（React Only）→ @vueuse/motion 或 GSAP
7. **路由 API**：`next/navigation` → `useRouter` / `navigateTo`（Nuxt 内置）

---

## 4. 技术选型

### 4.1 核心框架

| 选型 | 推荐 | 理由 |
|------|------|------|
| **框架** | **Nuxt 3.x（最新稳定版）** | 官方活跃维护，生态成熟，与当前 Next.js 功能对齐度最高 |
| **UI 运行时** | **Vue 3 + Composition API** | 对应 React 18 Hooks 模式，TypeScript 支持完善 |
| **语言** | **TypeScript 5.x** | 与现有一致 |

### 4.2 UI 组件与样式

| 选型 | 推荐 | 理由 |
|------|------|------|
| **UI 组件库** | **Nuxt UI v3** | NuxtLabs 官方出品，Tailwind CSS v4 支持，与 Next.js 侧的 NextUI 定位相同，API 简洁 |
| **CSS 框架** | **Tailwind CSS v4** | 最新版，Nuxt UI v3 依赖；性能更好，配置更简单 |
| **动画** | **@vueuse/motion** | 直接对应 Framer Motion，语义相近，Vue 生态原生 |
| **样式预处理** | **SCSS（保留）** | 现有 SCSS 文件可直接复用 |

> **备选方案**：Shadcn-Vue + Tailwind CSS（更轻量，自主控制）

### 4.3 数据层

| 选型 | 推荐 | 理由 |
|------|------|------|
| **ORM** | **Drizzle ORM** | 现代化 TypeScript-first ORM，无运行时开销，类型安全，比 Kysely 更主流，支持 Vercel Postgres |
| **数据库** | **Vercel Postgres（保持不变）** | 无需迁移基础设施 |
| **类型生成** | **Drizzle 内置（schema 即类型）** | 替代 kysely-codegen，无需额外步骤 |
| **客户端数据获取** | **useAsyncData / useFetch（Nuxt 内置）** | 替代 SWR，功能更整合，支持 SSR |

> **备选方案**：保留 Kysely + @vercel/postgres-kysely（降低迁移工作量）

### 4.4 认证

| 选型 | 推荐 | 理由 |
|------|------|------|
| **认证框架** | **nuxt-auth-utils** | NuxtLabs 官方出品，轻量级，支持 OAuth providers，与 H3 原生集成 |
| **OAuth 提供商** | **GitHub OAuth（保持不变）** | 逻辑完全相同 |

> **备选方案**：@sidebase/nuxt-auth（功能更全，类似 next-auth，支持 nuxt-auth-utils 和 authjs）

### 4.5 国际化

| 选型 | 推荐 | 理由 |
|------|------|------|
| **i18n 框架** | **@nuxtjs/i18n v9** | 官方 Nuxt 模块，功能对标 next-intl，支持 lazy loading，SSR，路由集成 |
| **语言支持** | **中/英/日（保持不变）** | 现有 JSON 翻译文件可直接迁移 |
| **路由策略** | **`prefix: 'off'`（无前缀，对应现有）** | 与现有 `localePrefix: 'never'` 等价 |

### 4.6 内容处理

| 选型 | 推荐 | 理由 |
|------|------|------|
| **博客内容** | **@nuxt/content v3** | 官方内容模块，内置 Markdown 支持、语法高亮（Shiki）、MDC 语法、frontmatter 解析，替代整个 remark/rehype 管道 |
| **数学公式** | **@nuxt/content + rehype-katex 插件** | @nuxt/content 支持自定义 rehype 插件 |

> **备选方案**：保留现有 remark/rehype 自定义管道，在 Nuxt server 端执行（完全兼容）

### 4.7 地图

| 选型 | 推荐 | 理由 |
|------|------|------|
| **地图组件** | **原生 mapbox-gl + Vue 封装** | mapbox-gl 本身无框架依赖，可在 Vue onMounted 中初始化；或使用 vue-mapbox-gl |
| **备选** | **MapLibre GL（开源替代）** | 若不需要 Mapbox 商业特性，MapLibre 完全兼容 API |

### 4.8 主题切换

| 选型 | 推荐 | 理由 |
|------|------|------|
| **暗色模式** | **@nuxtjs/color-mode** | Nuxt 官方模块，替代 next-themes，API 类似，支持 SSR |

### 4.9 字体

| 选型 | 推荐 | 理由 |
|------|------|------|
| **字体加载** | **@nuxt/fonts** | 官方字体模块，自动优化 Google Fonts，替代 next/font |

### 4.10 完整技术选型汇总

```
Nuxt 3.x（最新稳定）
├── Vue 3 + Composition API
├── TypeScript 5.x
├── Nuxt UI v3 （UI 组件库）
├── Tailwind CSS v4
├── @vueuse/motion（动画）
├── SCSS（保留）
├── Drizzle ORM + Vercel Postgres
├── nuxt-auth-utils（GitHub OAuth）
├── @nuxtjs/i18n v9（中/英/日）
├── @nuxt/content v3（Markdown 博客）
├── @nuxtjs/color-mode（暗色模式）
├── @nuxt/fonts（Google Fonts 优化）
├── mapbox-gl（地图，无框架依赖）
└── dayjs（日期处理，保留）
```

---

## 5. 模块映射与迁移策略

### 5.1 目录结构对比

```
Next.js 14（当前）              Nuxt 3（目标）
─────────────────────────────────────────────────────
app/[locale]/                   pages/
app/[locale]/page.tsx           pages/index.vue
app/[locale]/posts/             pages/posts/
app/[locale]/gallery/           pages/gallery/
app/[locale]/dashboard/         pages/dashboard/
app/api/                        server/api/
app/actions/                    server/utils/ + composables/
components/                     components/（直接对应）
_posts/                         content/posts/（@nuxt/content）
intl/                           i18n/locales/（重命名即可）
navigation.ts                   app.vue + router（Nuxt 内置）
i18n.ts                         nuxt.config.ts（i18n 配置）
middleware.ts                   middleware/（Nuxt 中间件）
auth.ts                         server/utils/auth.ts
tailwind.config.ts              tailwind.config.ts（大部分可复用）
```

### 5.2 页面/路由迁移

| 当前路由 | Nuxt 目标文件 | 迁移复杂度 |
|---------|-------------|-----------|
| `/` | `pages/index.vue` | 中（重写 JSX → SFC） |
| `/posts` | `pages/posts/index.vue` | 低 |
| `/posts/[slug]` | `pages/posts/[slug].vue` | 低（@nuxt/content 简化） |
| `/gallery` | `pages/gallery/index.vue` | 低 |
| `/dashboard/send-card` | `pages/dashboard/send-card.vue` | 中 |
| `/dashboard/card-designs` | `pages/dashboard/card-designs.vue` | 中 |

### 5.3 API 路由迁移

| 当前 API | Nuxt 目标文件 | 说明 |
|---------|-------------|------|
| `GET /api/card/design` | `server/api/card/design.get.ts` | 复用 Drizzle 查询 |
| `POST /api/card/design` | `server/api/card/design.post.ts` | |
| `PUT /api/card/design` | `server/api/card/design.put.ts` | |
| `PATCH /api/card/design` | `server/api/card/design.patch.ts` | |
| `DELETE /api/card/design` | `server/api/card/design.delete.ts` | |
| `GET/POST /api/auth/[...nextauth]` | `server/plugins/auth.ts` + nuxt-auth-utils | OAuth 逻辑重写 |

### 5.4 组件迁移

所有 React 组件（`.tsx`）需重写为 Vue 3 SFC（`.vue`）：

| 组件 | 迁移策略 | 复杂度 |
|------|---------|--------|
| `ActionBar.tsx` | 逻辑+样式迁移，Nuxt UI 替换 NextUI | 中 |
| `providers.tsx` | 改为 `app.vue` + Nuxt UI 配置 | 低 |
| `Hero.tsx` | 重写为 Vue SFC，保留 SCSS | 低 |
| `Footer.tsx` | 简单重写 | 低 |
| `auth-components.tsx` | 使用 nuxt-auth-utils composable 重写 | 低 |
| `LanguageChanger.tsx` | 使用 @nuxtjs/i18n `useI18n` 重写 | 低 |
| `CardDetail.tsx` | Nuxt UI Modal 替换 NextUI Modal | 中 |
| `PostItem.tsx` | 简单重写 | 低 |
| `Icons/*.tsx` | 全部替换为 Iconify (`nuxt-icon`/`@nuxt/icon`) | 低 |
| `SectionBlock.tsx` | 简单重写 | 低 |
| 地图相关 | 在 `onMounted` 中初始化 mapbox-gl | 低 |

> **图标优化**：43 个手写 SVG 图标组件可统一替换为 `@nuxt/icon` + Iconify Tabler 集，大幅减少代码量。

### 5.5 认证迁移（nuxt-auth-utils）

```typescript
// 当前 auth.ts（next-auth）
signIn callback: profile?.id === process.env.ADMIN_GITHUB_ID

// 目标 server/utils/auth.ts（nuxt-auth-utils）
// GitHub OAuth handler in server/routes/auth/github.get.ts
// Session validation middleware in server/middleware/auth.ts
```

### 5.6 i18n 迁移

现有三个 JSON 翻译文件（`intl/zh.json`、`intl/en.json`、`intl/ja.json`）可**直接复用**，无需修改：
```
intl/zh.json → i18n/locales/zh.json
intl/en.json → i18n/locales/en.json
intl/ja.json → i18n/locales/ja.json
```

### 5.7 内容迁移（博客文章）

现有 `_posts/*.md` 文件可直接移至 `content/posts/`，`@nuxt/content` 自动处理 frontmatter 和 Markdown 渲染：

```
_posts/ → content/posts/
# frontmatter 格式完全兼容
```

### 5.8 数据库迁移（Kysely → Drizzle）

Drizzle schema 定义示例，对应当前 `ga_card_designs` 表：

```typescript
// 无需迁移数据库本身，仅更换 ORM 客户端
// Drizzle schema 与现有表结构对应
```

---

## 6. 工作量评估

### 6.1 任务分类

| 分类 | 具体任务 | 预估工时（人天） |
|------|---------|----------------|
| **项目初始化** | Nuxt 3 脚手架、模块安装、配置文件、CI/CD | 0.5 |
| **核心配置** | Nuxt UI、i18n、color-mode、fonts 配置 | 0.5 |
| **认证系统** | nuxt-auth-utils GitHub OAuth、中间件 | 1 |
| **数据库层** | Drizzle ORM schema、迁移脚本、CRUD 封装 | 1.5 |
| **API 路由** | 5 个 card design 端点重写 | 0.5 |
| **公共组件** | ActionBar、Footer、Hero、SectionBlock 等 | 1 |
| **图标系统** | @nuxt/icon 接入，替换 43 个 SVG 组件 | 0.5 |
| **首页** | 完整首页（Hero、About、Works、Map、Blog预览、Gallery预览） | 2 |
| **博客模块** | 文章列表、文章详情（@nuxt/content）、代码高亮、数学公式 | 1.5 |
| **Gallery 模块** | QSL 卡片画廊、Modal 查看器 | 1 |
| **Dashboard** | 发送卡片、卡片设计管理（CRUD UI） | 2 |
| **地图集成** | Mapbox GL 初始化、GeoJSON 标记 | 0.5 |
| **主题切换** | 暗色/亮色模式 | 0.5 |
| **字体优化** | @nuxt/fonts 迁移 Google Fonts | 0.25 |
| **SCSS 样式** | 保留现有 SCSS，适配 Nuxt 约定 | 0.5 |
| **SEO** | useSeoMeta、OG Tags、sitemap | 0.5 |
| **测试与调试** | 功能回归测试，跨浏览器验证 | 1.5 |
| **部署配置** | Vercel nuxt 适配，环境变量迁移 | 0.25 |

### 6.2 总工作量

| 估算项 | 工时 |
|--------|------|
| **总计（人天）** | **约 16.5 人天** |
| **按每天 8 小时** | **约 132 小时** |
| **单人全职开发** | **约 3.5 周** |
| **双人并行** | **约 2 周** |

### 6.3 复杂度评级

| 模块 | 复杂度 | 原因 |
|------|--------|------|
| 认证系统 | ⭐⭐⭐ | nuxt-auth-utils API 与 next-auth 有差异 |
| 首页 Main 组件 | ⭐⭐⭐ | 563 行，多个子区块，地图集成 |
| Dashboard | ⭐⭐⭐ | 表单验证、CRUD 操作、状态管理 |
| 博客渲染 | ⭐⭐ | @nuxt/content 简化了大部分工作 |
| 图标系统 | ⭐ | 批量替换，机械性工作 |
| 翻译迁移 | ⭐ | JSON 文件直接复用 |

---

## 7. 迁移路线图

### 阶段一：项目初始化与核心配置（第 1-2 天）

- [ ] `npx nuxi@latest init bh8ga-nuxt` 创建项目
- [ ] 安装核心模块：Nuxt UI v3、@nuxtjs/i18n、@nuxtjs/color-mode、@nuxt/fonts、@nuxt/content、@nuxt/icon
- [ ] 配置 `nuxt.config.ts`（替换 `next.config.mjs`）
- [ ] 配置 Tailwind CSS v4
- [ ] 配置 TypeScript 路径别名
- [ ] 迁移环境变量（`.env`）
- [ ] 配置 Vercel 部署（`nitro.preset: 'vercel'`）

### 阶段二：基础设施（第 3-4 天）

- [ ] **数据库层**：Drizzle ORM schema 定义，配置 Vercel Postgres 连接
- [ ] **认证系统**：nuxt-auth-utils 配置 GitHub OAuth，编写登录/登出 server routes，迁移管理员 ID 校验逻辑
- [ ] **i18n**：翻译文件迁移，路由配置（`no-prefix`）
- [ ] **中间件**：Dashboard 路由保护（对应现有 `middleware.ts`）

### 阶段三：API 路由（第 5 天）

- [ ] `server/api/card/design.get.ts` - 获取所有卡片设计
- [ ] `server/api/card/design.post.ts` - 创建卡片设计
- [ ] `server/api/card/design.put.ts` - 更新卡片设计
- [ ] `server/api/card/design.patch.ts` - 变更状态
- [ ] `server/api/card/design.delete.ts` - 删除卡片设计

### 阶段四：公共组件（第 6 天）

- [ ] `components/AppBar.vue`（ActionBar）- 导航栏
- [ ] `components/AppFooter.vue`（Footer）
- [ ] `components/Hero.vue` - 保留 SCSS
- [ ] `components/SectionBlock.vue`
- [ ] `components/AuthButton.vue`（auth-components）
- [ ] `components/LanguageChanger.vue`
- [ ] `@nuxt/icon` 图标接入（替换 43 个 SVG 组件）

### 阶段五：内容模块（第 7-8 天）

- [ ] `content/posts/` 迁移博客文章
- [ ] `pages/posts/index.vue` - 文章列表页
- [ ] `pages/posts/[slug].vue` - 文章详情页（@nuxt/content `<ContentDoc>`）
- [ ] 配置代码高亮（Shiki，@nuxt/content 内置）
- [ ] 配置数学公式渲染（rehype-katex 插件）
- [ ] 阅读时间估算 composable（`composables/useReadingTime.ts`）

### 阶段六：画廊模块（第 9 天）

- [ ] `pages/gallery/index.vue` - QSL 画廊
- [ ] `components/CardDetail.vue` - 卡片详情 Modal
- [ ] `components/QSLCard.vue` - 卡片展示组件

### 阶段七：首页（第 10-11 天）

- [ ] `pages/index.vue` - 主页（hero、about、works、map、blog-preview、gallery-preview）
- [ ] `components/MapFootprint.vue` - Mapbox 地图组件（onMounted 初始化）
- [ ] `components/WorkCard.vue` - 作品展示卡片
- [ ] `components/ContactCard.vue` - 联系链接卡片

### 阶段八：Dashboard（第 12-13 天）

- [ ] `middleware/auth.ts` - Dashboard 路由守卫
- [ ] `pages/dashboard/card-designs.vue` - 卡片设计管理
- [ ] `pages/dashboard/send-card.vue` - 发送卡片
- [ ] `composables/useCardDesigns.ts` - 替换 SWR 数据获取

### 阶段九：测试与优化（第 14-16 天）

- [ ] 功能回归测试（所有页面手动验证）
- [ ] SEO 优化（`useSeoMeta`、`defineOgImage`）
- [ ] 性能优化（图片懒加载、代码分割）
- [ ] 暗色模式测试
- [ ] i18n 切换测试（中/英/日）
- [ ] 移动端响应式测试
- [ ] 部署至 Vercel 预览环境验证

---

## 8. 风险与挑战

### 8.1 高风险项

| 风险 | 描述 | 缓解措施 |
|------|------|---------|
| **认证系统差异** | nuxt-auth-utils 与 next-auth API 设计不同，Session 管理方式不同 | 先研究 nuxt-auth-utils 文档，编写 PoC 验证 |
| **Nuxt UI v3 成熟度** | Nuxt UI v3 目前仍处于活跃开发阶段，部分组件 API 可能有变动 | 锁定版本，关注 changelog；备选用 Nuxt UI v2 |
| **@nuxt/content 博客迁移** | 现有 remark 管道有自定义配置（数学公式、TOC），@nuxt/content 的配置方式不同 | 评估后若复杂度过高，可保留自定义 remark 管道在 Nitro server utils 中 |
| **Mapbox GL 集成** | react-map-gl 的 React 生命周期绑定在 Vue 中需要适配 | 使用原生 mapbox-gl 在 `onMounted` 初始化，避免 Vue 绑定问题 |

### 8.2 中风险项

| 风险 | 描述 | 缓解措施 |
|------|------|---------|
| **Framer Motion 功能** | 首页有精细的进入动画，@vueuse/motion 功能子集与 Framer Motion 存在差异 | 逐一核对动画效果；复杂动画可用 CSS transitions 替代 |
| **Drizzle 迁移** | 从 Kysely 切换 ORM 需要重写所有查询和 schema | 若工期紧张，可保留 Kysely（与 Nuxt 完全兼容） |
| **SSR 水合错误** | Mapbox GL 等客户端库可能导致 SSR 水合不匹配 | 使用 `<ClientOnly>` 包裹地图组件 |

### 8.3 低风险项

| 风险 | 描述 | 缓解措施 |
|------|------|---------|
| **翻译文件** | JSON 格式差异（next-intl 与 @nuxtjs/i18n） | 测试后确认，格式基本兼容 |
| **SCSS 兼容性** | 现有 SCSS 无框架特定语法，可直接复用 | 直接迁移，调试 |
| **Vercel 部署** | Nuxt Vercel preset 成熟稳定 | 标准部署流程 |

---

## 9. 结论与建议

### 9.1 结论

**迁移到 Nuxt 3 技术上完全可行，功能完整保留有保障。**

核心原因：
1. Nuxt 3 与 Next.js 14 在架构理念上高度对齐
2. 所有关键功能都有成熟的 Nuxt 生态对应方案
3. 静态内容（翻译文件、Markdown 文章、SCSS 样式）可直接迁移
4. 数据库和外部服务（Vercel Postgres、Mapbox、GitHub OAuth）无需变动

### 9.2 建议优先顺序

**推荐采用「功能驱动的增量迁移」策略**，按优先级逐步推进：

1. **优先完成核心基础设施**（认证、数据库、i18n）
2. **其次迁移核心用户功能**（博客、画廊）
3. **最后完成 Dashboard**（管理功能影响面有限）

### 9.3 技术选型最终建议

| 优先选择 | 降级备选 |
|---------|---------|
| Drizzle ORM | 保留 Kysely（降低风险） |
| @nuxt/content v3 | 保留自定义 remark 管道 |
| Nuxt UI v3 | Nuxt UI v2（更稳定） |
| nuxt-auth-utils | @sidebase/nuxt-auth（功能更完整） |

### 9.4 不建议同时进行的变更

- 不建议在迁移过程中同时升级数据库表结构
- 不建议在迁移过程中同时添加新功能
- 不建议在迁移完成前下线现有 Next.js 版本

---

*本计划为技术可行性探索阶段输出，最终实施方案以实际开发过程中的技术验证结果为准。*
