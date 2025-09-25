---
date: '2025-06-25T00:00:00+0800'
title: 認識常見的 RFID 卡片及魔術卡
description: 介紹常見的 RFID 卡片以及市面上常見的魔術卡。
image: https://i.imgur.com/57CZ6Ym.png
tags:
  - RFID
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# 認識常見的 RFID 卡片及魔術卡

![](https://i.imgur.com/57CZ6Ym.png)

不知道在讀者的日常生活中，有沒有使用 RFID 門禁卡呢？常見的門禁卡有「低頻」跟「高頻」兩種，這兩種卡片的主要差異在於通訊頻率不同。

一個普通的門禁卡，通常在製造時會寫入一個不重複的卡號，這個卡號只能被讀取，無法被改寫。於是就有廠商專門販賣可以修改卡號的特殊卡片，這種卡片俗稱為「魔術卡」。所謂道高一尺，魔高一丈，當一個新的魔術卡出現後，門禁系統的廠商也會嘗試去偵測卡片是不是魔術卡，於是就會有廠商繼續推出新的魔術卡來避免被偵測，這就是在中國俗稱可以繞過防火牆的「防火牆卡」。

## 低頻卡

低頻卡常見的通訊頻率為 125 kHz、250 kHz、375 kHz、500 kHz，以下是針對各種常見低頻卡以及市面上常見的魔術卡介紹。

### ID 卡

在中國習慣把只能讀取卡號的低頻卡稱為 ID 卡，最常見的種類是通訊頻率為 125 kHz 的 [EM4100](https://docs.rs-online.com/6ee7/0900766b8161beae.pdf) 或 EM41XX。低頻卡在製造時，廠商會寫入一個不重複的卡號，卡號無法被改寫。這種卡片沒有加密機制，只要知道卡號就可以模擬低頻卡。除了 125 kHz 的頻率之外，還有使用 250 kHz、375 kHz、500 kHz 頻率的低頻卡。

### T5577、T5200

T5577 卡是一種可以模擬低頻卡的魔術卡，內部使用 [ATA5577 晶片](https://ww1.microchip.com/downloads/aemDocuments/documents/WSG/ProductDocuments/DataSheets/ATA5577C-Read-Write-LF-RFID-IDIC-100-to-150-kHz-Data-Sheet-DS70005357B.pdf)。T5577 卡的儲存容量雖然不大，但它具有許多模擬的參數以及保護方式可以設定。它可以透過寫入新的設定值來模擬通訊頻率 100 kHz 到 150 kHz 的低頻卡，並支援三種卡號讀取模式：一般模式、問答模式、密碼讀取。此外，它可以透過密碼保護，避免被他人修改設定及卡號。另外，T5200 這種卡片疑似與 T5577 相容，但均民對這種卡沒有研究。

### 82XX、8310 系列

8210、8211、8218、8265、8268、8310 是在淘寶上很常看到可以模擬低頻卡的魔術卡。這類的魔術卡通常都沒有公開協定，均民也對此沒有太多研究，目前只能靠市面上的鎖匠機修改相關資料。

## 高頻卡

接下來我們來介紹通訊頻率為 13.56 MHz 的常見高頻卡及其魔術卡。高頻卡最簡單的分辨方式，就是使用有 NFC 功能的智慧型手機讀取看看，能讀取的通常就是高頻卡。

### Mifare Classic 1K (M1 S50 卡)

在中國俗稱「M1 卡」或「S50 卡」，這種卡片在中國跟台灣都很常見。此卡容量為 1024 位元組，分為 16 個區段 (Sector)，每區段有 4 個區塊 (Block)，每區塊 16 位元組。卡號存於第 0 區塊，每個區段最後一個區塊會儲存兩組金鑰 A/B 與存取權限。更多資訊可參考 [MF1 IC S50](https://cdn-shop.adafruit.com/datasheets/S50.pdf) 與 [MF1S50YYX_V1](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf)。

### UID 卡

「UID 卡」是能模擬 M1 卡的第一代魔術卡，英語系常稱「MIFARE Classic Gen1A」。它提供後門指令，可修改卡號並無視存取控制及金鑰，適合研究與開發，不怕寫壞導致變磚。因誕生較早，許多門禁系統可偵測此卡。UID 卡的後門指令不受 Android 與 iPhone 內建 NFC 支援，需另用 RFID 讀卡機修改。

### CUID、FUID、UFUID 卡

這些是可模擬 M1 卡的第二代魔術卡，它有多個變種。CUID 卡的第 0 區塊可被一般 M1 寫入指令改寫，因此可用有 NFC 功能的智慧型手機直接修改，亦稱「MIFARE Classic Gen2」或「DirectWrite」。FUID 卡的第 0 區塊僅能寫入一次。UFUID 卡使用專屬鎖定指令後就變得與 M1 卡相同，第 0 區塊無法再改寫。由於它們出現時間較晚，較少門禁系統能偵測，因此有些大陸賣家又稱之為「防火牆卡」。

### 向下相容 M1 卡的其他特殊卡 (CPU 卡)

由於 M1 卡仍然是目前市佔率最高的卡片，這類卡片為了相容支援 M1 卡的系統，會在 M1 卡基礎上新增專屬指令 (如 Mifare Plus、DESFire、FeliCa、SmartMX-JCOP…等)。中國習慣稱這類卡為「CPU 卡」，它們通常使用更新的加密技術，目前尚未被破解，魔術卡也極為罕見。

## 相關連結

如果在看過文章之後，想跟我進行交流，歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。

- [Notes on Magic Cards, aka UID changeable](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md)
