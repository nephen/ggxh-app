# 关关相互 - 公众号互助平台

![关关相互 Logo](public/logo.png)

**项目线上体验地址：** [https://ggxh.nephen.cn/](https://ggxh.nephen.cn/)

关关相互是一个基于Nuxt.js构建的公众号互助平台，旨在帮助公众号运营者通过互助方式提升文章阅读量和粉丝数量。平台提供文章互阅、粉丝互关、任务奖励等功能，采用智能匹配算法连接有互助需求的用户。

## 功能特点

- **文章互助**：发布文章获取互助阅读，提升阅读量和在看数
- **粉丝互关**：互相关注公众号，增加粉丝数量
- **任务系统**：完成每日任务获取阅豆奖励
- **推荐奖励**：邀请好友使用平台获得额外奖励
- **提现管理**：支持阅豆提现，管理员后台处理提现申请
- **数据统计**：查看文章阅读报告和收益记录
- **智能匹配**：系统自动匹配互助伙伴，提高互助效率

## 技术栈

- **前端**：Nuxt.js 3, Vue 3, TypeScript, Tailwind CSS
- **后端**：Node.js, Nitro, MongoDB, Mongoose
- **部署**：Docker, Docker Compose
- **其他**：JWT认证, Axios, Cheerio

## 项目结构

```
/ggxh-app
├── components/      # Vue组件
├── pages/           # 页面路由
├── server/          # 后端API和数据库模型
├── public/          # 静态资源
├── store/           # 状态管理
├── utils/           # 工具函数
├── docker-compose.yml # Docker配置
└── nuxt.config.ts   # Nuxt配置
```

## 环境配置

1. 复制环境变量示例文件并修改为您的配置：
```bash
cp .env.example .env
```

2. 编辑.env文件，设置必要的环境变量：
```
MONGODB_URI=mongodb://root:password@mongo:27017/ggxh?authSource=admin
BASE_URL=https://your-domain.com
JWT_SECRET=your-jwt-secret
NODE_ENV=production
OSS_REGION=your-oss-region
OSS_ACCESS_KEY_ID=your-access-key
OSS_ACCESS_KEY_SECRET=your-secret-key
OSS_BUCKET=your-bucket-name
```

## 安装依赖

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 部署方式

### 使用Docker Compose（推荐）

```bash
# 构建并启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 数据库迁移
docker-compose exec app npm run db:migrate
```

### 手动部署

1. 安装依赖
```bash
npm install
```

2. 构建应用
```bash
npm run build
```

3. 启动服务
```bash
npm start
```

4. 数据库迁移
```bash
# 导出数据
mongodump --db ggxh --out ./mongodb_backup

# 导入数据
mongorestore --db ggxh ./mongodb_backup/ggxh
```

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/nephen/ggxh-app.git
cd ggxh-app

# 配置环境变量
cp .env.example .env
# 编辑.env文件设置必要参数

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Database

将MongoDB中 test 数据库的数据迁移到 ggxh 数据库，可以使用MongoDB自带的 mongodump 和 mongorestore 工具。
```bash
# 导出整个数据库
mongodump --db test --out ./mongodb_backup
# 导入到新数据库
mongorestore --db ggxh ./mongodb_backup/test

# 导出单个集合
mongodump --db test --collection users --out ./mongodb_backup
# 导入到新数据库
mongorestore --db ggxh --collection users ./mongodb_backup/test/users.bson
```

## 故障排除

ali-oss无法编译通过的临时解决办法：node_modules/ali-oss/lib 下面的ts文件全部删除，重新打包应该就可以了。
```bash
# 删除所有的ts文件
find ./node_modules/ali-oss/lib -name "*.ts" -type f -delete
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 许可证

本项目采用MIT许可证 - 详情参见 [LICENSE](LICENSE) 文件

## 鸣谢

- [Nuxt.js](https://nuxt.com/) - 基于Vue.js的服务端渲染框架
- [MongoDB](https://www.mongodb.com/) - 文档型数据库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架