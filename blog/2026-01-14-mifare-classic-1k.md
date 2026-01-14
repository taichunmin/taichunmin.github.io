---
date: '2026-01-14T00:00:00+0800'
title: Mifare Classic 1k 卡片完全解析
description: 你知道每天在用的門禁卡肚子裡裝什麼嗎？這篇帶你深入底層，從資料結構、可用指令到權限控制完全解析。搞懂這些硬核細節，才不會在玩卡片時，不小心把它變磚喔！
image: https://i.imgur.com/46p5s9X.png
tags:
  - NFC
  - RFID
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---

# Mifare Classic 1k 卡片完全解析

![](https://i.imgur.com/46p5s9X.png)

## 資料結構

M1 卡的儲存容量為 1024 位元組，分成 16 個區段 (Sector)，每個區段分成 4 個區塊 (Block)，每個區塊有 16 位元組，每次讀寫都是以區塊為單位。卡號被存在第 0 區塊，然後在每個區段的最後一個區塊會儲存兩個金鑰 A/B 以及存取權限。

![](https://i.imgur.com/yvIbm0i.jpeg)

### 製造商區塊 (Manufacturer block)

M1 卡的製造商區塊位於第 0 區塊，在卡片被製造時會被寫入製造商的資料，這個區塊是唯讀無法被修改的，以下分別是 4 位元組卡號以及 7 位元組卡號的資料格式：

![](https://i.imgur.com/GA316AA.png)

製造商區塊內除了卡號之外，大多數的魔術卡會把防碰撞的資料也存在製造商區塊內，以便讓你可以修改防碰撞的資料：

![](https://i.imgur.com/Alx5jaq.jpeg)

在 M1 魔術卡 4 位元組卡號的製造商區塊中，有一個 BCC 的欄位，這個欄位是用來驗證卡號的正確性，其計算公式為：

```
// ^ 是 XOR 運算子
BCC = UID0 ^ UID1 ^ UID2 ^ UID3
```

### 資料區塊 (Data blocks)

除了區段 0 只有兩個資料區塊以外，其他區段的前三個區塊 Block 是資料區塊，可透過區段的「存取控制位元」設定區塊的讀寫權限以及「值區塊」的相關權限。

### 值區塊 (Value blocks)

只要把一個特殊的格式寫入到「資料區塊」，這個區塊就可以當成「值區塊」來使用。「值區塊」除了一般的讀寫操作之外，還支援額外的加值 (increment)、減值 (decrement)、還原 (restore)、轉存 (transfer) 指令，通常會被用來儲存電子錢包的餘額。

「值區塊」的資料格式包含兩個資料，資料會被重複儲存以便用來錯誤偵測、修正以及備份：

* `value`：4 個位元組的有號整數，以 little endian 格式儲存在 byte 0-3 以及 byte 8-11，然後把資料進行 [2 進位補數](https://zh.wikipedia.org/zh-tw/%E4%BA%8C%E8%A3%9C%E6%95%B8)後儲存在 byte 4-7。
* `adr`：1 個位元組的無號整數，儲存在 byte 12 及 14，然後把資料進行 [2 進位反相](https://zh.wikipedia.org/zh-tw/%E5%8F%8D%E7%9B%B8%E5%99%A8)後儲存於 byte 13 及 15。可用來紀錄這個值區域是哪個值區域的備份，在進行值區域的專屬操作時 (increment、decrement、restore、transfer)，都不會修改這個值，這個值只能透過寫入操作來修改。

下圖是值區塊的資料格式，以及一個以 `value = 0x0012D687, adr = 0x11` 為例的值區塊：

![](https://i.imgur.com/Nxfmu3a.png)

### 區段尾端區塊 (Sector trailer)

區段尾端是指每個區段中的第四個區塊 (block 3)，這個區塊儲存該區段的 Key A、Key B (選擇性) 及存取權限 (ACL)。

如果不使用 Key B 也可以把這 6 個位元組拿來儲存一般資料（需要設定相對應的存取權限）。

區段尾端區塊的 byte 6-8 是用來紀錄存取權限，byte 9 可以用來儲存資料，存取權限跟 byte 6-8 相同，Key A 在讀取時只會回傳 6 個位元組的 `0x00`，如果 Key B 設定成不可讀取時，同樣會在讀取時回傳 6 個位元組的 `0x00`。

![](https://i.imgur.com/HfAigVe.png)

## 存取權限

::: info
計算 Mifare Classic 存取權限的網頁工具
- <https://taichunmin.idv.tw/chameleon-ultra.js/mifare1k-acls.html>
:::

接下來我們要來認識規則比較複雜的「區段存取控制位元」。如果想偷懶，可以直接使用上方均民提供的網頁工具。

每個資料區塊及區段尾端區塊的存取權限，都是透過 3 個存取控制位元 (bit) 來表示，存取控制位元會以一份原始資料與一份[反相後的資料](https://zh.wikipedia.org/zh-tw/%E5%8F%8D%E7%9B%B8%E5%99%A8)存在「區段尾端區塊」內。

存取控制位元可以用來控制 Key A 及 Key B 的記憶體存取權限，可以透過正確的金鑰及存取權限來修改。如果存取控制位元有誤，整個區段就會發生不可逆的拒絕存取 (俗稱變磚)。

![](https://i.imgur.com/VDWF8W7.png)

### 資料區塊的存取權限表 (Access conditions for data blocks)

取出代表該「資料區塊」的 3 個存取控制位元後，就可以透過查表來確認 Key A 及 Key B 能進行的記憶體操作：

![](https://i.imgur.com/bcfacSQ.png)

需要特別注意的是，如果 Key B 被視為普通資料時，無法用來進行「資料區塊」及「區段尾端區塊」的記憶體操作。

### 區段尾端區塊的存取權限表 (Access conditions for the sector trailer)

取出代表「區段尾端區塊」的 3 個存取控制位元後，就可以透過查表來確認 Key A 及 Key B 能進行的記憶體操作：

![](https://i.imgur.com/L8U7MJt.png)

需要特別注意的是，如果 Key B 被視為普通資料時，無法用來進行「資料區塊」及「區段尾端區塊」的記憶體操作。

### 區段存取控制位元範例：`FF078069`

將 `FF078069` 先轉成二進位：

```
1111 1111
0000 0111
1000 0000
0110 1001
```

接下來就可以透過查表，來轉換每個區塊的存取權限如下：

![](https://i.imgur.com/gymoYGY.jpeg)

## 如何使用卡片

### 卡片指令清單

![](https://i.imgur.com/z4n6rnH.png)

### 卡片使用狀態圖

![](https://i.imgur.com/nfya44b.png)

* 尋卡請求 / 喚醒卡片：在通電啟動（英文：Power-On Reset，縮寫：POR）後，卡片會在收到 `REQA` (REQuest type A 的縮寫) 或是 `WUPA` (Wake-Up Protocol type A 的縮寫) 指令後回傳 `ATQA` (Answer To Request type A 的縮寫)。
* 防衝突迴圈：在防衝突迴圈中，讀卡機會讀取卡號，如果有讀取到多張卡片，讀卡機會透過卡號來選擇一張卡片，沒有被選中的卡片會回到待命狀態。
* 選擇卡片：當讀卡機傳送選擇卡片的指令後，卡片會回傳 `SAK` (Select AcKnowledge 的縮寫)，可以用來判斷卡片類型。
* 區段三階段驗證：成功選擇卡片以後，讀卡機會指定區段，並透過目標區段的 Key 來進行三階段的驗證，驗證成功後，接下來的指令跟卡片回應也都會被加密。驗證的三階段大致上為：
  1. 卡片傳送一個隨機數 `nt` 給讀卡機
  2. 讀卡機使用卡號及 Key 把 `nt` 加密為 `nr` 並連同一個隨機數 `ar` 傳送給卡片
  3. 卡片會驗證 `nr` 是否正確，正確的話就會使用卡號及 Key 把 `ar` 加密為 `at` 傳送給卡片
* 暫停：需要在區段三階段驗證之後，將 `HLTA` (Halt Type A 的縮寫) 指令加密傳送才有效。

### 記憶體操作指令

![](https://i.imgur.com/mBiANQn.png)

卡片提供以下幾種操作記憶體的指令，在進行任何記憶體操作以前，都需要先「尋卡請求 / 喚醒卡片」、「防衝突迴圈」、「選擇卡片」然後「區段三階段驗證」：

* 讀取 `read`：讀取一個區塊。
* 寫入 `write`：寫入一個區塊。
* 加值 `increment`：把一個值區塊的值加上指定的 4 位元組有號整數後，存在內部的轉存緩衝區中。
* 減值 `decrement`：把一個值區塊的值扣掉指定的 4 位元組有號整數後，存在內部的轉存緩衝區中。
* 還原 `restore`：把一個值區塊的值存在內部的轉存緩衝區中。
* 轉存 `transfer`：把內部的轉存緩衝區中的資料寫到指定的值區塊。

## 相關連結

如果你在看完文章後，對這個主題有興趣或是有任何問題，都歡迎隨時透過 [Facebook](https://www.facebook.com/taichunmin) 找我聊聊！

- [MF1S50YYX_V1.pdf](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf)
