---
title: Ubuntu 上部署 docker
description: 在 Ubuntu 上部署 docker
layout: doc
tags:
  - Ubuntu
  - Linux
  - docker
---

# Ubuntu 安装 Docker 指南

本文档介绍如何在 Ubuntu 系统中安装 Docker Engine。

---

## 步骤 1：卸载旧版本

在安装 Docker Engine 之前，需要先卸载任何可能冲突的旧版本软件包。

Ubuntu 发行版可能提供非官方的 Docker 软件包（如 `docker.io`、`docker-compose`、`podman-docker` 等），这些软件包与 Docker
官方版本冲突。Docker Engine 依赖于 `containerd` 和 `runc`，官方安装包会将这些依赖打包为 `containerd.io`，如果之前单独安装过也需要卸载。

运行以下命令卸载所有冲突软件包：

```bash
sudo apt remove $(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc | cut -f1)
```

> 💡 如果 `apt` 提示未安装任何这些软件包，说明系统干净，可直接进行下一步。

> ⚠️ **注意**：存储在 `/var/lib/docker/` 中的镜像、容器、卷和网络不会随卸载自动删除。如需完全清理，请参考 Docker 官方卸载文档。

---

## 步骤 2：设置 Docker apt 软件源

在新主机上首次安装 Docker Engine 前，需要先配置 Docker 官方的 `apt` 软件源。

添加 Docker GPG 密钥：

```bash
# 更新 apt 包索引
sudo apt update

# 安装必要的依赖
sudo apt install ca-certificates curl

# 创建密钥目录
sudo install -m 0755 -d /etc/apt/keyrings

# 下载 Docker 官方 GPG 密钥
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

# 设置密钥权限
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

添加 Docker 软件源：

```bash
# 添加 Docker 软件源到 apt 源列表
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

# 更新 apt 包索引
sudo apt update
```

---

## 步骤 3：安装 Docker Engine

安装 Docker Engine 及相关组件：

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

> ✅ Docker 服务会在安装完成后自动启动。

验证 Docker 服务状态：

```bash
sudo systemctl status docker
```

如果服务未启动，可手动启动：

```bash
sudo systemctl start docker
```

如需设置开机自启：

```bash
sudo systemctl enable docker
```

---

## 步骤 4：验证安装

运行 `hello-world` 镜像验证 Docker 是否安装成功：

```bash
sudo docker run hello-world
```

该命令会执行以下操作：

1. Docker 客户端从 Docker Hub 下载 `hello-world` 测试镜像
2. Docker 守护进程创建容器并运行该镜像
3. 容器输出欢迎信息并退出

看到类似以下输出说明安装成功：

```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

---

## 步骤 5：将用户添加到 `docker` 组（可选）

默认情况下，只有 root 用户和 docker 组成员可以运行 Docker 命令。将你的用户添加到 `docker` 组后，可以使用 `docker` 命令而无需
`sudo`。

创建 `docker` 组（如果不存在）：

```bash
sudo groupadd docker
```

将当前用户添加到 `docker` 组：

```bash
sudo usermod -aG docker $USER
```

> 💡 **参数说明**：`-a` 表示追加（append），避免用户从其他组中被移除；`-G` 指定要添加到的组；`$USER` 会自动替换成你的当前用户名。

使组权限生效：

- **方法 A（推荐）**：完全注销当前用户会话，然后重新登录
- **方法 B（快速）**：在当前终端执行 `newgrp docker` 命令，仅对当前终端会话有效

验证是否成功：

```bash
docker ps
```

如果命令成功运行且没有出现 `Got permission denied` 错误，说明配置成功。

---

## 参考信息

| 项目         | 说明                                             |
|------------|------------------------------------------------|
| 官方文档       | https://docs.docker.com/engine/install/ubuntu/ |
| Docker Hub | https://hub.docker.com/                        |
| 数据目录       | `/var/lib/docker/`                             |

---

**文档版本：** 1.1
**更新日期：** 2026-04-08