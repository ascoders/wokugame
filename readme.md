<p align="center">
  <a href="https://travis-ci.org/ascoders/wokugame"><img src="https://img.shields.io/travis/ascoders/wokugame/master.svg?style=flat" alt="Build Status"></a>
</p>

# 本地开发

### 安装依赖

```bash
yarn
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

以下部署只需要部署一次，除非部署脚本（／deploy）有变更。

部署后，每次 built 分支的提交都会更新应用代码，并重启应用服务。

### 生成 docker image

```bash
docker build -t woku-app ./
```

### 运行 docker

```bash
docker run -p 8080:8080 -d woku-app
```

- [目录结构说明](docs/directory.md)