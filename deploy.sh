#!/bin/bash

# 加载部署环境变量
if [ -f ".env.deploy" ]; then
  set -a
  source .env.deploy
  set +a
else
  echo "Error: .env.deploy file not found"
  exit 1
fi

git add .
git commit -m "Build $(date +%Y%m%d%H%M%S)" || true

# 构建项目
if ! npm run build; then
    echo "构建失败，终止部署流程"
    exit 1
fi

# 复制构建产物到输出目录
cp docker-compose.yml .output/

# 进入输出目录
cd .output/

# 初始化Git仓库并提交构建产物
if [ ! -d ".git" ]; then
  git init
  git remote add origin "$GIT_REMOTE"
fi
git add .
git commit -m "Build $(date +%Y%m%d%H%M%S)" || true

# 推送到远程服务器
git push origin master -f

# 返回到项目根目录
cd -