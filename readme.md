<a href="https://travis-ci.org/ascoders/wokugame"><img src="https://img.shields.io/travis/ascoders/wokugame/master.svg?style=flat" alt="Build Status"></a>

# 本地开发

### 安装项目依赖

```bash
yarn
```

### 启动本地依赖服务

```bash
docker-compose --file docker-compose.dev.yml up -d
```

### 预编译

```bash
npm run start-before
```

### 开发模式

```bash
npm start
```

作用：

- 监听本地 `8080` 端口
- hot loader

# 提交

```bash
git push
```

作用：

- travis 测试
- travis 编译并把产出提交到 built 分支
- push 触发 github webhook
- app 部署端收到 webhook，更新产出并重启应用

# 本地生产环境

### 生产模式构建

```bash
npm run production
```

### 生产模式服务启动

```bash
npm run server-production
```

# 服务器部署

**只需要部署一次**，除非部署脚本（/deploy）有修改。

部署后，每次 built 分支的提交都会更新应用代码，并重启应用服务。

### 拉取产出分支代码

```bash
git clone https://github.com/ascoders/wokugame.git -b built --depth=1
```

### 运行 docker

```bash
docker-compose up -d
```

# 服务器停止

```bash
docker-compose down
```

- [目录结构说明](docs/directory.md)