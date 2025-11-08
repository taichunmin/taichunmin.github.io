---
date: '2025-11-08T00:00:00+0800'
title: RFID 硬體介紹、購買及使用經驗分享
description: 想玩 RFID 研究，但口袋卻不夠深嗎？這是我的 RFID 硬體購買及使用經驗，涵蓋常見的 Proxmark3、變色龍、PN532、Flipper Zero 等硬體，讓你花錢花在刀口上，少走許多冤枉路！
image: https://i.imgur.com/YHCLV7C.png
tags:
  - ithelp-ironman
  - NFC
  - RFID
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# RFID 硬體介紹、購買及使用經驗分享

想要研究 RFID 的人，不可避免都要先花一筆不小的錢購買一批讀卡機硬體。均民特地寫這篇文章，來分享自己對於這些 RFID 硬體的購買經驗，幫助想踏入這個領域的朋友可以少踩一些坑，快速購買到符合自己所需的硬體。由於這類商品主要的賣家都在中國大陸，為了說明方便，均民會放上來自中國的商品截圖，請讀者見諒。

均民在這系列的文章中只會針對可以二次開發的常見硬體，依推薦程度由高到低介紹，無法二次開發的鎖匠機不會有過多著墨。

> 名詞解釋：
> - 二次開發：指的是除了使用賣家提供的程式之外，還有提供 API 文件，可以讓開發者自行編寫程式，然後實作自己想要的功能。
> - 鎖匠機：指的是做給一般鎖匠店使用的機器，通常會提供簡單的使用者介面，許多實作細節都會被隱藏。

## Proxmark3

![](https://i.imgur.com/tZ2IloN.jpeg)

Proxmark3 俗稱 pm3，如果想要研究 RFID 的技術，不可或缺的硬體非它莫屬。這個硬體是目前市面上最強大的 RFID 開放原始碼讀卡機，支援世界範圍內幾十種不同的 RFID 卡片，只要搭配[冰人版的韌體](https://github.com/RfidResearchGroup/proxmark3)後，也幾乎可以完美破解台灣常見的 Mifare Classic 1K 卡片。某些進階的 RFID 攻擊手法甚至會需要兩台 Proxmark3 一起搭配進行。

> 名詞解釋：
> - 冰人版的韌體：Proxmark3 因為韌體本身是開源的，所以就會有很多不同的人會自己嘗試做出自己的版本。目前功能最多的，就是由 iceman1001 所主導的版本，中國俗稱冰人版的韌體。

### 常見產品及購買經驗分享

在淘寶可以找到很多不同的 Proxmark3 產品，均民會依推薦程度由高到低依序介紹，以下商品圖片均為文章撰寫當下的截圖，價格僅供參考。

#### Proxmark3 Easy

![](https://i.imgur.com/h1Hxr7U.jpeg)

這種版本是目前淘寶上面的主流，也是淘寶上面目前買得到最便宜的版本。在均民撰文當下，價格大約 270 人民幣 (運費另計)。這個版本通常沒有內建電池，需要使用 USB 透過電腦供電才能使用。由於購買後均民會直接燒錄成冰人版的韌體，所以在購買時通常不會加購店家的其他韌體及軟體。在淘寶上面有 256MB 跟 512MB 兩種，購買時注意要買 512MB 的版本。

#### Proxmark3 RDV2

![](https://i.imgur.com/pCvg2P0.jpeg)

這個版本算是目前淘寶上中間價位的版本。在均民撰文當下，價格大約 530 人民幣 (運費另計)。這個版本均民沒有買過，但相信應該也有不少同好是買這個版本，因為價格相對之下比最貴的 RDV4 便宜很多，外觀也比 Proxmark3 Easy 好看很多。購買後也一樣會直接燒錄成冰人版的韌體。均民身邊有購買這個硬體的朋友分享，這個版本雖然有電池，但好像還沒有辦法完全離線使用。

#### Proxmark3 RDV4

![](https://i.imgur.com/KzrSikD.jpeg)

![](https://i.imgur.com/PhiWvGt.png)

這個版本是目前淘寶上找得到最昂貴的版本。在均民撰文當下，單純主機的價格大約 2100 人民幣 (運費另計)。只不過價格真的太貴，所以均民也沒有真的買過。如果預算允許的話，建議可以加購電池及藍牙模組，這樣不用跟電腦連接就能獨立運作，比較適合攜帶出門使用。

## Chameleon 變色龍

![](https://i.imgur.com/aOexzEk.jpeg)

Chameleon 俗稱變色龍，這系列產品主打模擬卡片功能，有內建電池可以不用連接電腦獨立運作，甚至還能透過藍芽無線控制硬體。除了體積比 Proxmark3 小很多之外，價格也比 Proxmark3 親民許多。這個硬體非常適合隨身攜帶，雖然功能沒有 Proxmark3 那麼強大，但在針對 Mifare Classic 1K 的 MFKey32 攻擊上，變色龍肯是有無與倫比的優勢。

變色龍有兩種不同的版本，但由於舊版 (Mini & Tiny 系列) 因晶片問題已難以購買，因此均民在本文僅介紹新版本 (Ultra 系列)。兩種版本使用不同晶片，所以韌體並不相容，購買時需特別注意。

### 常見產品及購買經驗分享

在淘寶上可以找到許多不同的 Chameleon Ultra 產品，以下均民將依推薦程度由高到低介紹。所有商品圖片均為文章撰寫當下的截圖，價格僅供參考。

#### ChameleonUltra (XCOPY 黃鑰匙圖案)

![](https://i.imgur.com/5Y0HN8V.jpeg)

這是目前均民最推薦的版本，雖然外觀不顯眼，但價格較便宜且體積小巧，可燒錄 GitHub 上的開源韌體。賣家有宣稱天線品質優於 RRG 官方版本，但這點均民無法驗證，故不多做評論。在均民撰文當下，價格約為 80 人民幣 (運費另計)。

#### ChameleonUltra (XCOPY 超小紫色)

![](https://i.imgur.com/umhA3EW.jpeg)

若追求最小體積，這是目前均民在淘寶上找到的最小版本，甚至比 RRG 官方版本更薄更小，可燒錄 GitHub 上的開源韌體。此版本的按鈕位於側邊，不易誤按。賣家有宣稱天線品質優於 RRG 官方版本，但這點均民無法驗證，故不多做評論。在均民撰文當下，價格約為 180 人民幣 (運費另計)。

#### ChameleonUltra (XCOPY 藍變色龍圖案)

![](https://i.imgur.com/opeGbsA.jpeg)

這是目前均民在淘寶上能找到最便宜的版本，可燒錄 GitHub 上的開源韌體，但體積較大，建議購買較小的另一個 XCOPY 版本。賣家有宣稱天線品質優於 RRG 官方版本，但這點均民無法驗證，故不多做評論。在均民撰文當下，價格約為 60 人民幣 (運費另計)。

#### ChameleonUltra (RRG 官方版本)

![](https://i.imgur.com/EYio3CY.jpeg)

Chameleon Ultra 最初由 Proxgrind 設計，最早透過募資平台販售，募資結束後可在 [AliExpress](https://www.aliexpress.com/item/1005005865341237.html) 購買。在均民撰文當下，價格約為 58 美金 (運費另計)。

## PN532

![](https://i.imgur.com/HcLXc4D.jpeg)

PN532 是很便宜的硬體，同時是生態圈最豐富的 RFID 讀卡機之一，可以在 GitHub 上找到多種程式語言所實作的程式。雖然韌體本身沒有開源，但[提供了 Protocol 文件進行二次開發](https://www.nxp.com/docs/en/user-guide/141520.pdf)。除了可以主動讀取 RFID 卡片 (PCD 模式) 外，還可以被動被其他讀卡機讀取 (PICC 模式)。但如果想要模擬成 RFID 卡片的話，需要自己額外進行二次開發。

### 常見產品及購買經驗分享

在淘寶上有許多 PN532 的變體，在淘寶上也有賣家直接幫你整合電池跟 BLE，這樣除了電腦透過 USB 使用之外，還可以很方便地透過手機以及 BLE 來使用。以下均民將依推薦程度由高到低介紹。所有商品圖片均為文章撰寫當下的截圖，價格僅供參考。

#### 鋰電池 IC/ID 藍牙讀卡機 (mini532)

![](https://i.imgur.com/Lv8BIK1.png)

這款讀卡機內建鋰電池，體積小巧，可透過 USB 或藍牙連線。高頻部分整合了 PN532 晶片，低頻部分因為不清楚使用的晶片，目前只能針對高頻部分進行二次開發。在均民撰文當下，價格約為 60 人民幣 (運費另計)。

#### PN532 開發板 + USB-SERIAL 連接線

![](https://i.imgur.com/as6vVjo.png)

這是 PN532 的開發板，可透過 USB-SERIAL 連接線連接到電腦，或透過 HSU、SPI、I2C 連接到其他單晶片 (如 Arduino、Raspberry Pi)。在均民撰文當下，價格約為 30 人民幣 (運費另計)。

如果你的 USB-SERIAL 連接線使用的是 CH340，請按照以下方法與 PN532 連接：

![](https://i.imgur.com/3WTRTnl.jpeg)

![](https://i.imgur.com/8H6L4e9.jpg)

#### IC/ID 讀卡機 (mini532)

![](https://i.imgur.com/Erp8M5j.png)

如果不需要藍牙及鋰電池，可以考慮這款讀卡機。高頻部分整合了 PN532 晶片，低頻部分因為不清楚使用的晶片，目前只能針對高頻部分進行二次開發。在均民撰文當下，價格約為 35 人民幣 (運費另計)。

## Flipper Zero

![](https://i.imgur.com/xwb3YkL.jpeg)

[Flipper Zero](https://flipperzero.one/) 是一款在研究 RFID 領域的瑞士刀。除了 RFID 的高頻 HF、低頻 LF 功能之外，還支援了無線電、紅外線 (Infrared)、藍牙 (BLE)、USB、iButton 以及利用 GPIO 與硬體溝通。這個硬體還有一個小小的螢幕。但這個硬體在 RFID 方面並沒有比 Proxmark3 強大，而且價格偏貴。

![](https://i.imgur.com/jGvZqSf.jpeg)

Flipper Zero 目前可以模擬低頻及高頻卡的卡號，也能夠使用針對 Mifare Classic 1K 讀卡機的 MFKey32 攻擊，但目前無法像變色龍一樣模擬完整的 Mifare Classic 1K 卡片，也無法像 Proxmark3 一樣側錄 RFID 的通訊內容。除了 RFID 的功能之外，均民還有用 Flipper Zero 學習紅外線的遙控訊號，以取代遙控器的功能。至於其他功能均民自己其實也還沒有深入研究。

### 購買經驗分享

![](https://i.imgur.com/3r3JBgK.jpeg)

均民自己是直接從[官方商城](https://shop.flipperzero.one/)購買，然後透過集貨倉的服務轉運回台灣。在均民撰文當下，單純主機的價格大約 169 美金 (運費另計)。

### 可離線使用

因為 Flipper Zero 上有一個螢幕、多個按鈕以及內建電池，不必藉由手機或電腦控制就能獨立運作，非常適合隨身攜帶使用。如果有需要，也可以透過 USB 或藍牙連接電腦或手機來控制。

### 應用程式市集

![](https://i.imgur.com/NjYtrMc.png)

除了內建功能之外，Flipper Zero 還有一個應用程式市集，可以自由選擇安裝應用程式。市集上有超過一百種由網友開發並分享的應用程式，安裝的應用程式會存放在額外加裝的 micro SD 卡中，因此不必擔心儲存空間不足的問題。

### 禁售風波

由於 Flipper Zero 的功能過於敏感，部分商城 (如 Amazon) 以及國家 (如巴西) 禁售這個硬體 [(相關新聞)](https://www.ithome.com.tw/news/156318)。在中國的商店通常會以「電子寵物海豚」的名義來販賣 Flipper Zero。

### 非官方功能

如果 Flipper Zero 官方提供的功能不符需求，這個硬體也有不少其他網友提供的非官方功能。均民建議可以參考 [djsime1/awesome-flipperzero](https://github.com/djsime1/awesome-flipperzero) 進一步研究。
