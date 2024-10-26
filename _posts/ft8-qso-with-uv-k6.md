---
title: "UV-K6 基于 CEC 固件进行 FT8 通联"
date: "2024-06-14T10:18:00.000Z"
---

## 什么是 FT8

FT8 (Franke-Taylor 设计的 8-FSK 调制) 适用于业余无线电通信的一种数字模式，由 K9AN (Steve Franke) 和 K1JT (Joe Taylor) 在
2017 年发布。得益于 FT8 的高效 (50Hz 窄带) 和低信噪比 (低至 -24dB)，适合在低功率和恶劣传播条件下的通信。FT8
包含一组固定的消息格式，可以用于交换呼号、信号报告和 QTH 等信息。与 FT8 一同发布的软件 WSJT (
后来发展成为开源软件 [WSJT-X](https://wsjt.sourceforge.io/index.html))
可以自动应答和呼叫，实现自动挡通联。

## 固件选择

[CEC](https://github.com/phdlee/uvk5cec) 是众多 UV-K6
开源固件中的一个，在最近更新的 [0.3Q](https://github.com/phdlee/uvk5cec/releases/tag/v0.3q) 版本开始，支持了 FT8 模式以及与
WSJT-X 的数字通信。

![CEC 0.3V](/assets/posts/ft8-qso-with-uv-k6/downloads.png)

截至这篇文章编写之日，CEC 最新的版本为 0.3V，该版本新增了多数常用的 FT8 频率；更新了 UV-K5 DigiManager，可以直接发送 FT8
测试数据。下载上图中的 **0.3v.zip**、**UVK5DigManager_v1.0.zip**、**wsjtx-2.6.1-win64_forUVK5.exe**

关于如何刷入固件，请参考其他教程。推荐使用 BD8DFN 开发的 [K5Web](https://mm.md/#/tool/flash) 工具在线刷入

## 线缆制作

我们需要改造或制作一根专用线缆，以实现 WSJT-X 与 UV-K6 之间的数字通信和数据收发。

- 泉盛 UV-K6
- Kenwood 连接头 (K 头) 或 3.5mm+2.5mm 三段音频线
- 3.5mm 4 段音频线

### 接线方式

CEC 给出的线缆接线方案如图，这样制作的线缆是全功能的 CAT 线缆：

![CEC Cable](/assets/posts/ft8-qso-with-uv-k6/cec_cable.png)

实际上使用 FT8 的话，只需要三根线即可，下面是我简化的版本：

![FT8 Cable](/assets/posts/ft8-qso-with-uv-k6/ft8_only_cable.png)

### 成品

制作比较粗糙，功能正常

![Cable](/assets/posts/ft8-qso-with-uv-k6/cable.png)

将引出的红色 RX 线直接链接到 USB 转 TTL 的 TX 脚即可

![Cable](/assets/posts/ft8-qso-with-uv-k6/usb2ttl.png)

## 使用 WSJT-X 进行 FT8 通联

首先将制作好的线连接到 UV-K6，3.5mm 头插入电脑音频麦克风复合口（或分线器），USB 转 TTL 连接到电脑 USB 接口。

解压并打开下载的 **UVK5DigManager_v1.0**，勾选 **"Bridge to WSJT-X"**，选择串口号并连接

![Cable](/assets/posts/ft8-qso-with-uv-k6/digimanager.png)

安装并打开 **WSJT-X**，进入设置，按照下面流程进行设置

![wsjt-x 1](/assets/posts/ft8-qso-with-uv-k6/wsjt-setup1.png)
![wsjt-x 2](/assets/posts/ft8-qso-with-uv-k6/wsjt-setup2.png)
![wsjt-x 3](/assets/posts/ft8-qso-with-uv-k6/wsjt-setup3.png)
![wsjt-x 4](/assets/posts/ft8-qso-with-uv-k6/wsjt-setup4.png)

然后就可以开始愉快的进行 FT8 通联了
