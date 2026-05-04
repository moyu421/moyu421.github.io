---
title: Ubuntu 上修改 hostname
description: 在 Ubuntu 上修改 hostname
layout: doc
tags:
  - Ubuntu
  - Linux
---

# Ubuntu 修改主机名指南

本文档介绍如何在 Ubuntu 系统中查看和修改主机名（hostname）。

---

## 步骤 1：查看当前主机名

使用以下命令可以查看当前主机名及系统详细信息：

```bash
hostnamectl
```

或者使用更简短的命令直接输出主机名：

```bash
hostname
```

---

## 步骤 2：修改主机名

使用 `hostnamectl set-hostname` 命令更改主机名。将 `<your-new-hostname>` 替换为你想要的新名称：

```bash
sudo hostnamectl set-hostname <your-new-hostname>
```

> ✅ 执行后，新主机名会立即在当前会话中生效，无需重启系统。

---

## 步骤 3：同步 `/etc/hosts` 文件（重要）

⚠️ **此步骤非常关键**。`hostnamectl` 命令不会自动更新 `/etc/hosts` 文件，这可能导致 `sudo` 等命令执行缓慢或出现网络解析问题。

1. 使用 `vim` 打开 `/etc/hosts` 文件：

    ```bash
    sudo vim /etc/hosts
    ```

2. 找到以 `127.0.0.1` 开头的行，将其后的旧主机名修改为新主机名：

    ```bash
    127.0.0.1 <your-new-hostname>
    ```

3. 保存文件并退出。在 vim 编辑器中，输入 `:wq` 即可。

---

## 步骤 4：验证修改

再次执行以下命令，确认新主机名已生效：

```bash
hostname
# 或
hostnamectl
```

---

## 常见问题

### 1. 修改后 `sudo` 命令变慢

通常是因为 `/etc/hosts` 文件未同步更新。请确保 `127.0.0.1` 对应的主机名与当前主机名一致。

### 2. 新主机名不生效

- 检查是否以 `sudo` 权限执行命令
- 重新登录或重启终端会话
- 必要时重启系统

### 3. 主机名命名规范

- 只能包含小写字母、数字和连字符（`-`）
- 不能以连字符开头或结尾
- 建议长度不超过 63 个字符

---

**文档版本：** 1.0  
**更新日期：** 2026-04-07