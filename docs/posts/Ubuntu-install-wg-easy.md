---
title: Ubuntu 上部署 wg-easy
description: 在 Ubuntu 上部署 wg-easy
layout: doc
tags:
  - 计算机网络
  - wg-easy
  - WireGuard
  - VPN
  - Ubuntu
  - Linux
---

# Ubuntu Install wg-easy && iptables

1. 安装 wg-easy

   sudo mkdir -p /etc/docker/containers/wg-easy

   sudo curl -o
   /etc/docker/containers/wg-easy/docker-compose.yml https://raw.githubusercontent.com/wg-easy/wg-easy/master/docker-compose.yml

   cd /etc/docker/containers/wg-easy

   sudo vim docker-compose.yml

    ```yaml
    volumes:
      etc_wireguard:
    
    services:
      wg-easy:
        environment:
          - INIT_ENABLED=true
          - INIT_USERNAME={管理用户名}
          - INIT_PASSWORD={管理密码}
          - INIT_HOST={公网ip}
          - INIT_PORT={暴露端口}
          - INSECURE=true
          - INIT_ALLOWED_IPS={内网网段}/24,10.8.0.0/24
          - INIT_DEFAULT_ADDRESS=10.8.0.x
          - INIT_DEFAULT_DNS=192.168.0.1,114.114.114.114
          - WG_IPTABLES=enabled
    
        image: ghcr.io/wg-easy/wg-easy:15
        container_name: wg-easy
        networks:
          wg:
            ipv4_address: 10.42.42.42
            ipv6_address: fdcc:ad94:bacf:61a3::2a
        volumes:
          - etc_wireguard:/etc/wireguard
          - /lib/modules:/lib/modules:ro
          - /run/xtables.lock:/run/xtables.lock:ro
        ports:
          - "{暴露端口}:{暴露端口}/udp"
          - "51821:51821/tcp"
        restart: unless-stopped
        cap_add:
          - NET_ADMIN
          - SYS_MODULE
          - NET_RAW # ⚠️ Uncomment if using Podman
        sysctls:
          - net.ipv4.ip_forward=1
          - net.ipv4.conf.all.src_valid_mark=1
          - net.ipv6.conf.all.disable_ipv6=0
          - net.ipv6.conf.all.forwarding=1
          - net.ipv6.conf.default.forwarding=1
    
    networks:
      wg:
        driver: bridge
        enable_ipv6: true
        ipam:
          driver: default
          config:
            - subnet: 10.42.42.0/24
            - subnet: fdcc:ad94:bacf:61a3::/64
    
    ```

   sudo docker compose up -d

2. 安装 iptables

   sudo apt install iptables

   sudo vim /etc/sysctl.conf

    ```conf
    net.ipv4.ip_forward=1
    ```

   sudo sysctl -p

3. wg-easy的安全配置

   用户名：admin

   密码：5bnnGTGbuEiPB5M

   服务访问ip：111.9.61.84

   端口：20001/udp

   服务停止脚本：sudo docker compose down

   管理页面：192.168.0.192:51821（内网，不对外暴露）

   容器id：2cda4e55d52b

   容器名：ghcr.io/wg-easy/wg-easy:15