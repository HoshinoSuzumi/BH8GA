---
title: 在 Arch Linux 上使用虚拟串口
date: 2024-10-26 10:22:00
excerpt: 使用 socat 创建虚拟串口对进行通信
tags:
  - archlinux
---

最近在 Linux 上使用 Qt 进行串口开发，需要频繁的串口收发测试。在电脑上连接两个物理串口，并交叉连接 Tx/Rx 是可行的，但显然这样并不高效和方便，况且我手头也没有两个 USB 串口设备，于是研究了一下在 Linux 上创建虚拟串口对进行通信。

## 需求

- 创建一对虚拟串口 `/dev/ttyS0` 和 `/dev/ttyS1`，两个串口间互通
- 虚拟串口**可以被非 root 用户访问**

默认情况下，`/dev/ttyS*` 的设备权限为 `root:uucp`，且没有组外用户的读写权限，因此需要对串口设备的权限进行修改。

## 使用 socat 创建虚拟串口

### 安装 socat

```sh
sudo pacman -S socat
```

### 处理权限问题

在非 root 用户下（并不建议在 root 用户下操作 pty），直接使用 socat 创建虚拟串口会遇到权限问题，按如下方法进行配置可以解决。

#### 将用户加入 uucp 组

在 Arch Linux 中，所有的串口设备都属于 uucp 组

```sh
sudo usermod -aG uucp $USER
```

[Users and groups - Arch Wiki](https://wiki.archlinux.org/title/Users_and_groups#User_groups)

#### 创建 udev 规则

`/dev/ttyS*` 组外用户访问权限

```sh
touch /etc/udev/rules.d/99-serial.rules
```

编辑文件，写入如下规则

```js
KERNEL=="ttyS[0-9]*", MODE="0666"
```

重新加载并触发 udev 规则，这样当前用户就有权限直接访问 `/dev/ttyS*` 设备了。

```sh
sudo udevadm control --reload && sudo udevadm trigger
```

### 创建虚拟串口对

```sh
socat -d -d PTY,link=/dev/ttyS0,raw,echo=0,perm=0666 PTY,link=/dev/ttyS1,raw,echo=0,perm=0666
```

其中 `perm=0666` 设置映射的伪终端 `/dev/pts/*` 的权限，使得所有用户都有读写权限。启动之后保持当前终端打开，就可以在程序或串口工具中进行测试了。

## 测试

### screen

Arch 不自带 `screen`，没有安装的话先安装

```sh
sudo pacman -S screen
```

```sh
screen /dev/ttyS0 9600
```

再打开一个终端

```sh
screen /dev/ttyS1 9600
```

现在就可以在两个终端之间进行双向串口通信了。

![Test serial port with screen](/assets/posts/virtual-serialport-in-arch-linux/test-with-screen.png)

### cat

接收端

```sh
cat /dev/ttyS0
```

发送端

```sh
echo "Hello, world!" > /dev/ttyS1
```

![Test serial port with cat](/assets/posts/virtual-serialport-in-arch-linux/test-with-cat.png)
