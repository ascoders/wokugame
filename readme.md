<a href="https://travis-ci.org/ascoders/wokugame"><img src="https://img.shields.io/travis/ascoders/wokugame/master.svg?style=flat" alt="Build Status"></a>

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

**只需要部署一次**，除非部署脚本（/deploy）有修改。

部署后，每次 built 分支的提交都会更新应用代码，并重启应用服务。

### 拉取产出分支代码

```bash
git clone https://github.com/ascoders/wokugame.git -b built --depth=1
```

### 生成 docker image

```bash
docker build -t woku-app ./
```

### 运行 docker

```bash
docker run --restart=always -p 5000:8000 -d woku-app
```

- 这样网页跑在本机的 5000 端口，对应 docker 的 8000 端口

- [目录结构说明](docs/directory.md)