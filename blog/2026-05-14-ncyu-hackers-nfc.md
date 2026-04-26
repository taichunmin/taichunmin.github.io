---
date: '2026-05-14T00:00:00+0800'
title: NFC 資安實戰 - 嘉大駭客社社課
description: NFC 技術在台灣已經非常普及，但在享受科技便利的同時，你是否有想過 NFC 技術到底安不安全呢？又隱藏了什麼安全危機呢？
image: https://i.imgur.com/XCR5KUW.jpeg
tags:
  - NFC
  - RFID
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# NFC 資安實戰 - 嘉大駭客社社課

大家好，我是「[chameleon-ultra.js](https://taichunmin.idv.tw/chameleon-ultra.js/)」的作者均民。

NFC 技術在台灣已經非常普及，舉凡搭乘大眾運輸工具會用到的電子票證、信用卡的感應付款、Google Pay、Apple Pay，甚至現在比較新的門鎖也都會採用這個技術；但在享受科技便利的同時，你是否有想過 NFC 技術到底安不安全呢？又隱藏了什麼安全危機呢？

## 免責聲明

本文章的內容僅限學術及研究用途，本文讀者請勿進行任何違法行為，否則後果自負。點此查看[近年電子票證相關的資安新聞](https://zh.wikipedia.org/zh-tw/%E6%82%A0%E9%81%8A%E5%8D%A1#%E8%B3%87%E8%A8%8A%E5%AE%89%E5%85%A8)。

## RFID 與我們的生活息息相關

無線射頻辨識 (英語：Radio-Frequency IDentification，縮寫：RFID)，是一種無線通訊技術，RFID 技術已經廣泛的被運用在：

- 機器可讀文件 (如：護照)
- 防盜系統 (如：車鑰匙、車輛防盜系統、電子門鎖)
- 門禁系統 (如：旅館、會員卡、門票)
- 報到系統 (如：上班打卡、上課點名)
- 物品追蹤 (如：競賽計時、防丟器、迪卡儂)
- 大眾運輸系統 (如：公車、火車)
- 電子錢包 (如：電子支付)
- 國道收費系統 (如：遠通 eTag)

## RFID 頻率的分類

|      | 低頻 (LF) | 高頻 (HF) | 超高頻 (UHF) |
| :--: | :--: | :--: | :--: |
| 常見頻率 | 120~150 kHz | 13.56 MHz | 443 MHz<br>865~868 MHz<br>902~928 MHz |
| 通訊距離 | &lt; 10 cm | 10~100 m | 1~100 m |
| 常見應用 | 門禁系統<br>寵物晶片 | 門禁系統<br>電子票證<br>電子支付 | 遠通 eTag<br>Apple AirTag<br>迪卡儂 |

> 資料來源：[維基百科](https://en.wikipedia.org/wiki/Radio-frequency_identification#Frequencies)

## 低頻 (LF) 的特性

![](https://i.imgur.com/xT1498H.jpeg)

- 晶片功能簡單：通常卡片的晶片設計極其單純，運算能力有限。
- 單向通訊為主：資料傳輸通常為單向，缺乏複雜的握手協議。
- Tag 發起通訊：大多數情況下由標籤 (Tag) 主動靠近讀卡機發起通訊。
- 線圈圈數較多：因頻率低，線圈圈數需明顯多於高頻 (HF) 與超高頻 (UHF)。

### 低頻常見的攻擊手法

- 克隆 (clone)：複製合法標籤的所有數據到新標籤中。
- 模擬 (simulation)：使用硬體設備模擬合法標籤的行為與信號。
- 重放 (replay)：錄下合法的通訊資料，然後重新發送進行欺騙。
- 被武裝的讀卡機：改裝讀卡機以竊取資料或進行攻擊。

### 低頻相關技術

![](https://i.imgur.com/oy6D705.png)

上圖是由 Iceman 及 Kirils 整理的清單，但很多技術均民自己也沒看過，均民自己生活週邊比較常看到的是 EM 以及 T55xx 這兩種技術的低頻卡。

> 資料來源：[TROPPERS25: Decoding RFID - A comprehensive overview of security, attacks and the latest innovations](https://youtu.be/5kAN3hfRWOA?si=hwBufLI-G8DfCZXi)

### 低頻相關技術的安全性

![](https://i.imgur.com/B2PWgi9.png)

上圖是這些技術在 2025 年時的安全性程度：

- 紅色：代表可以被克隆、模擬及重放，幾乎沒有安全性可言
- 橘色：已有攻擊手法被公開，但還沒有很好的辦法可以實作，如：太過罕見、使用冷門的頻率、系統太老舊
- 綠色：代表目前還算安全

## 高頻 (HF) 的特性

![](https://i.imgur.com/UBp97zn.jpeg)

- 複雜晶片功能：相較於低頻，高頻晶片具備更強大的運算與邏輯處理能力。
- 進階加密技術：支援更進階的加密算法，防止未經授權的數據存取。
- 數位簽章保護：某些技術具備數位簽章機制，確保資料完整性與來源真實性。
- 廣泛的 NFC 支援：具備 NFC 功能的智慧型手機，可直接辨識與讀取多數高頻標籤。

### NFC (Near Field Communication)

在日常生活中，NFC 這個詞其實比 RFID 更常看到，有時候還可能會跟 RFID 搞混：

- NFC 不等於 RFID：NFC 是 RFID 的子集，專注於近距離的資料交換。
- 可搭配 NDEF：可搭配通用的 NFC Data Exchange Format 進行資料交換。
- 多樣化應用場景：分享網址、文字、名片、圖片，或作為身分證件與鑰匙卡。
- 明文傳輸：在資料傳輸過程中未加密，有被攔截的風險，可能需自行實作加密機制。

#### NDEF message 的資料結構

![](https://i.imgur.com/54peFT7.png)

#### NDEF 常見資料類型

![](https://i.imgur.com/hVVc4Jt.png)

- 純文字 Text
- URL (如：http/https)
- URN

### 高頻常見的攻擊手法

- 克隆 (clone)：複製卡片內容到魔術卡，藉此偽造合法身分。
- 模擬 (simulation)：使用硬體設備模擬特定卡片的通訊行為與應答模式。
- 重放 (replay)：錄下合法的通訊資料，然後重新發送進行欺騙。
- 中繼 (relay)：透過中間設備，將遠端卡片的訊號即時轉發給讀卡機。
- 嗅探 (sniffing)：在通訊過程中被動攔截空氣中的無線電訊號資料。
- 密碼學攻擊 (crypto attacks)：針對加密演算法漏洞或弱金鑰進行破解以取得原始資料。
- 被武裝的讀卡機：改裝讀卡機以竊取資料或進行攻擊。

### 高頻相關技術

![](https://i.imgur.com/PQlWwJy.png)

上圖是由 Iceman 及 Kirils 整理的清單。在台灣最常見的就是 MIFARE Classic，但近年已經漸漸的被汰換成別的技術。

> 資料來源：[TROPPERS25: Decoding RFID - A comprehensive overview of security, attacks and the latest innovations](https://youtu.be/5kAN3hfRWOA?si=hwBufLI-G8DfCZXi)

### 高頻相關技術的安全性

![](https://i.imgur.com/m5YBGSh.png)

上圖是這些技術在 2025 年時的安全性程度：

- 紅色：代表可以被克隆、模擬及重放，幾乎沒有安全性可言
- 橘色：已有攻擊手法被公開，但還沒有很好的辦法可以實作，如：太過罕見、使用冷門的頻率、系統太老舊
- 綠色：代表目前還算安全

## 超高頻 (UHF) 的特性

![](https://i.imgur.com/KaQliWJ.jpeg)

- 通訊距離遠：距離較遠，可達 1m ~ 100m
- 傳輸速度快：因頻率較高，單位時間內資料傳輸量大
- 無線電傳輸：並非使用感應電流 (non-inductive)

### 超高頻常見的攻擊手法

- 克隆與模擬：包含克隆 (clone) 與硬體設備模擬 (simulation) 通訊行為。
- 嗅探與密碼攻擊：攔截無線訊號 (sniffing) 或針對加密演算法漏洞進行破解。
- 被武裝的讀卡機：改裝讀卡機以竊取資料或進行攻擊。
- 阻斷服務攻擊 (DDoS)：透過大量垃圾訊息癱瘓系統處理能力。
- UHF Kill 破壞標籤：直接讓超高頻標籤失效的物理或指令攻擊。
  - 內建的 kill 指令：永久停用標籤
  - 高電壓：燒毀標籤晶片或天線

## 如何增進 RFID 的安全性？

![](https://i.imgur.com/sfGaLTh.jpeg)

- 硬體
  - 使用「唯讀」或「一次性寫入」的卡片
  - 選用安全性較高的卡片硬體
  - 使用硬體安全元件 (Secure Element)
- 加密與驗證機制
  - 對資料進行額外加密
  - 透過 CMAC/HMAC 驗證資料完整性
- 加密演算法
  - 使用安全性高的加密技術 (如 DES/3DES/AES)
  - 請勿使用自己發明的加密技術 (DON'T ROLL YOUR OWN CRYPTO)
- 使用多樣化金鑰 (diversified keys)：採用多樣化金鑰管理策略，大幅提升攻擊門檻。
  - Key Diversification Functions (KDF)
  - Rolling-Key 滾動金鑰機制
  - Per Card / Per Site 獨立金鑰管理

## RFID 常見開源硬體

想要研究 RFID 的人，不可避免都要先花一筆不小的錢購買一批硬體。

市面上販賣的硬體有分成「開源」跟「鎖匠機」兩大類，在此只會分享可以進行二次開發的硬體。

> 名詞解釋：
> - 開源硬體：具備社群支持、文件公開，適合研究人員進行韌體修改與二次開發。
> - 鎖匠專用機：多為封閉系統，強調易用性，適合一般鎖匠快速作業，擴充性較低。

### Proxmark3

![](https://i.imgur.com/tZ2IloN.jpeg)

Proxmark3 俗稱 pm3，這個硬體是目前市面上最強大的 RFID 開放原始碼讀卡機，支援世界範圍內幾十種不同的 RFID 卡片，只要搭配[冰人版的韌體](https://github.com/RfidResearchGroup/proxmark3)後，也幾乎可以完美破解台灣常見的 Mifare Classic 1K 卡片。

> 名詞解釋：
> - 冰人版的韌體：Proxmark3 因為韌體本身是開源的，所以就會有很多不同的人會自己嘗試做出自己的版本。目前功能最多的，就是由 iceman1001 所主導的版本，在中國俗稱冰人版的韌體。

### Chameleon Ultra 變色龍

![](https://i.imgur.com/aOexzEk.jpeg)

Chameleon Ultra 俗稱變色龍，主打卡片模擬功能，是目前市面上最小的硬體，內建藍牙及電池適合隨身攜帶；因問世較晚，生態圈仍在成長中。這個硬體，雖然功能沒有 Proxmark3 那麼強大，但在針對 Mifare Classic 1K 的 MFKey32 攻擊上，變色龍肯是有無與倫比的優勢。

### PN532

![](https://i.imgur.com/HcLXc4D.jpeg)

價格低廉的硬體，功能陽春，生態圈豐富，沒有模擬功能。雖然韌體本身沒有開源，但[有提供文件](https://www.nxp.com/docs/en/user-guide/141520.pdf)可以進行二次開發。

### [Flipper Zero](https://flipperzero.one/)

![](https://i.imgur.com/xwb3YkL.jpeg)

如同瑞士刀，易用性高，功能多樣但通常不夠深入。除了 RFID 的高頻 HF、低頻 LF 功能之外，還支援了無線電、紅外線 (Infrared)、藍牙 (BLE)、USB、iButton 以及利用 GPIO 與硬體溝通。

### [Proxmark5](https://www.indiegogo.com/zh/projects/rfidresearchgroup/proxmark5) 眾籌中

跟 Proxmark3 相比，Proxmark5 採用了新的處理器及新的 FPGA；涵蓋五個低頻的頻率，包括 250、375 和 500 kHz；原生支援 Flipper Zero 連接；內建 BLE 和 WiFi；兩個 Type-C 端口；10 位元 ADC；可調整的天線驅動電壓。

## RFID 常用的 Android APP

除了開源硬體之外，在具備 NFC 功能的 Android 手機上，也有一些實用的 APP 可以使用，以下是均民推薦的 APP。

### NFC TagInfo by NXP

> [Google Play 商店連結](https://play.google.com/store/apps/details?id=com.nxp.taginfolite)

- 使用手機內建 NFC
- 辨識高頻卡類型
- 讀取卡號及資料
- NXP 官方原廠晶片檢查

### MIFARE Classic Tool

> [Google Play 商店連結](https://play.google.com/store/apps/details?id=de.syss.MifareClassicTool)
> [GitHub 連結](https://github.com/ikarus23/MifareClassicTool)

- 使用手機內建 NFC
- 針對 Mifare Classic 卡
- 讀取卡號；讀取及寫入卡片
- 金鑰字典檔攻擊
- 備份、匯入匯出、比較卡片和字典
- 支援中國魔術卡 CUID

### Chameleon Ultra GUI

> [Google Play 商店連結](https://play.google.com/store/apps/details?id=io.chameleon.ultra)

- 使用 Chameleon Ultra 硬體
- 支援 Windows/Linux/macOS/Android/iOS
- 官方推薦第三方 GUI
- 支援多國語系
- 支援更新變色龍韌體 (DFU)
- 保存、管理卡片和字典
- 支援多種中國魔術卡

### NFC TagWriter by NXP

> [Google Play 商店連結](https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter)

- 使用手機內建 NFC
- 管理及讀寫 NDEF 卡片

### MTools BLE - BLE RFID Reader

> [Google Play 商店連結](https://play.google.com/store/apps/details?id=com.mtoolstec.mtoolsLite)

- 支援使用多種讀卡機
    - PN532 BLE
    - ChameleonUltra
    - Pixl.js
    - PN532Killer
- 支援多種中國魔術卡
- 支援更新變色龍韌體 (DFU)
- 付費軟體 (一次性)

## [chameleon-ultra.js](https://taichunmin.idv.tw/chameleon-ultra.js/) 介紹

> [專案網址](https://taichunmin.idv.tw/chameleon-ultra.js/)

- 透過 USB 及 BLE 控制變色龍
- 支援 Chrome 瀏覽器及 Node.js
- 支援 Windows/Linux/macOS/Android/iOS
- 支援更新變色龍韌體 (DFU)

## 2025 年該如何開始 RFID 研究之旅？

![](https://i.imgur.com/PH0yZbs.png)

1. 取得 Proxmark3 Easy 或 RDV4
2. 燒錄 Iceman 版本的韌體
3. 對任何卡片使用 hf search 及 lf search 指令
4. 加入 Discord 討論群 [discord.gg/iceman](https://discord.gg/iceman)
5. 查看有興趣的頻道並深入研究

## MIFARE Classic 1K

MIFARE Classic 1K 是高頻卡的一種，在中國俗稱為「M1」或「S50」卡。由於這種卡片在全球的普及，自 2008 年開始，就陸陸續續有研究人員發表針對這種卡片的攻擊手法，時至今日，因破解的成本極低，這種卡片已幾乎沒有安全性可言。

### 資料結構

![](https://i.imgur.com/yvIbm0i.jpeg)

M1 卡內有 1KB 的儲存空間，分成 16 個區段 (Sector)，每個區段有 4 個區塊 (Block)，每個區塊能儲存 16 bytes 的資料。

區塊根據功能又可分成以下三種：

- 製造商區塊：儲存卡號及製造商資訊
- 資料區塊：儲存資料
- 區段尾端區塊：金鑰與存取控制

### 透過 Proxmark3 辨識 M1 卡

![](https://i.imgur.com/6KGY6EU.jpeg)

執行 hf search 指令，然後確認以下幾個特徵：

- ATQA：0x0004
- SAK：0x08 或 0x88
- MIFARE Classic 1K

### 透過 NFC TagInfo by NXP 辨識 M1 卡

透過有 NFC 功能的 Android 手機，使用 APP 讀取，然後確認以下幾個特徵：

- ATQA：0x0400 (Little Endian)
- SAK：0x08 或 0x88
- IC Type：MIFARE Classic

![](https://i.imgur.com/XuEViIH.png)

### 卡號 (CARD UID)

![](https://i.imgur.com/EAmZf5f.jpeg)

![](https://i.imgur.com/EztDHdh.jpeg)

M1 卡都會有卡號，卡號通常有以下幾個特徵：

- 有三種長度：分別為 4, 7, 10 位元組
- 理論上是唯讀，不可被修改
- 有時候會直接印在卡片上
- 有可能會需要進位或格式轉換

### 只驗證卡號的系統

- 只讀取卡號，不讀取其他資料
- 通常會有卡號的白名單
- 支援各種不同的卡片廠商
- 為了方便性，犧牲安全性

### 只驗證卡號的系統安全嗎？

- 卡號隨處可得？
    - 直接印在卡片上
    - 直接印在收據上
- 直接用讀卡機讀取
    - 放在桌上
    - 掛在身上
- 直接猜測卡號

#### 卡號隨處可得？直接印在卡片上！

![](https://i.imgur.com/ZbaVGKC.jpeg)

![](https://i.imgur.com/ckoSHn9.jpeg)

#### 卡號隨處可得？直接印在收據上！

![](https://i.imgur.com/Ph40VxB.jpeg)

![](https://i.imgur.com/7Beh9jv.png)

![](https://i.imgur.com/75WpZFf.jpeg)

成功拿到卡號以後，有時候可能需要做個進制轉換，可以透過[均民開發的小工具](https://taichunmin.idv.tw/pug/base-endian-converter.html)進行輔助：

![](https://i.imgur.com/PK2Fm6d.png)

#### 卡號隨處可得？直接用讀卡機讀取！

- 任意讀卡機
    - 有 NFC 功能的 Android 手機
    - 內建電池的小型讀卡機 (如：Chameleon Ultra)
- 搭配適合的程式
    - [NFC TagInfo by NXP](https://play.google.com/store/apps/details?id=com.nxp.taginfolite)
    - [ISO/IEC 14443-A Scanner](https://taichunmin.idv.tw/chameleon-ultra.js/hf14a-scanner.html)
    - [Chameleon Ultra GUI](https://play.google.com/store/apps/details?id=io.chameleon.ultra)
    - [MTools BLE - BLE RFID Reader](https://play.google.com/store/apps/details?id=com.mtoolstec.mtoolsLite) (付費)

#### 卡號隨處可得？直接猜測卡號！

![](https://i.imgur.com/kxjP6Ts.jpeg)

如果廠商是透過遞增來產生卡號，如果已知某些卡號時，就有可能透過增減卡號來猜到其他人的卡片！

### 卡號拿到以後呢？

讀取到卡號以後，我們就可以透過特殊硬體來模擬成這張卡片，或是透過魔術卡克隆：

- 讀卡機 + 魔術卡 (Magic Card)
    - UID 卡 (俗稱 Gen1a)
    - CUID 卡 (俗稱 Gen2)
- 特殊硬體
    - Proxmark3
    - Chameleon Ultra

#### 透過 Proxmark3 模擬卡號

![](https://i.imgur.com/MZr3uvj.jpeg)

可透過以下指令來模擬成這張卡片：

```shell
hf mf sim --1k -u 45687b31 --atqa 0004 --sak 08
```

![](https://i.imgur.com/rof84zH.png)

#### 透過 Chameleon Ultra 模擬卡號

![](https://i.imgur.com/REpgwrE.png)

工具連結：[Mifare Keychain](https://taichunmin.idv.tw/chameleon-ultra.js/mifare-keychain.html)

- 直接讀卡 or 手動填寫 UID
- 選擇卡槽 (SLOT)
- 按下 Emulate 按鈕

#### 透過 PN532 寫入魔術卡

![](https://i.imgur.com/D12nlhU.png)

工具連結：[Mifare 卡號拷貝工具](https://taichunmin.idv.tw/pn532.js/m1-uid4b-writer.html)

- 手動填寫 UID
- 按下「寫入卡片」按鈕

![](https://i.imgur.com/saeztOu.png)

### 魔術卡 (Magic Card)

原廠 M1 卡的卡號不易重複且無法改寫。於是就有廠商專門販賣可以修改卡號的特殊卡片，這種卡片俗稱為「魔術卡」。以下是 M1 卡的常見魔術卡。

若想了解更多其他的魔術卡可以查看 [Magic Card Notes](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md)。

#### UID 卡

「UID 卡」是能模擬 M1 卡的第一代魔術卡，英語系常稱「MIFARE Classic Gen1A」。它提供後門指令，可修改卡號並無視存取控制及金鑰，適合研究與開發，不怕寫壞導致變磚。因誕生較早，許多門禁系統可偵測此卡。UID 卡的後門指令不支援 Android 與 iPhone 內建 NFC，需另用 RFID 讀卡機修改。

- 可透過後門指令讀寫任何資料
- 大多數只支援 4 位元組卡號

#### CUID、FUID、UFUID 卡

這些是可模擬 M1 卡的第二代魔術卡，它有多個變種。CUID 卡的第 0 區塊可被一般 M1 寫入指令改寫，因此可用有 NFC 功能的智慧型手機直接修改，亦稱「MIFARE Classic Gen2」或「DirectWrite」。FUID 卡的第 0 區塊僅能寫入一次。UFUID 卡使用專屬鎖定指令後就變得與 M1 卡相同，第 0 區塊無法再改寫。由於它們出現時間較晚，較少門禁系統能偵測，因此有些大陸賣家俗稱之為「防火牆卡」。

- 可透過一般寫入指令改寫卡號資料
- 有 NFC 功能的 Android 手機也能改
- 大多數只支援 4 位元組卡號
- 卡號資料有指定規則，寫錯就會壞掉 (俗稱：變磚)

#### 透過 Proxmark3 辨識魔術卡

```shell
hf mf info
```

![](https://i.imgur.com/oK12UFj.jpeg)

![](https://i.imgur.com/mSMEzjh.jpeg)

### 未加密 / 半加密 / 全加密 的 M1 卡介紹

- 未加密 M1 卡
  - 所有 Sector 都使用預設金鑰或常見金鑰
- 半加密 M1 卡
  - 部分 Sector 使用不常見的金鑰
  - 但其他 Sector 仍使用預設金鑰或常見金鑰
- 全加密 M1 卡
  - 所有 Sector 都使用不常見的金鑰

#### 使用 半加密 / 全加密 的 M1 卡安全嗎？

非常不安全！M1 卡使用了由 NXP 公司所設計的 Crypto-1 加密。但 Crypto-1 加密存在先天缺陷，只要攻擊者獲得 任何一組已知金鑰，即可透過演算法漏洞，進一步破解出該卡片中所有其他未知的金鑰！

#### 半加密卡及全加密卡的攻擊步驟

1. 先找出至少一組金鑰
    - 金鑰字典檔攻擊
    - darkside 攻擊
    - mfkey32 攻擊
    - 嗅探 (sniff) + mfkey64 攻擊
2. 用已知金鑰破解其他金鑰
    - nested 攻擊
    - hardnested 攻擊
    - staticnested 攻擊
  
#### 使用 Proxmark3 全自動攻擊 (autopwn)

![](https://i.imgur.com/KGGtgMp.jpeg)

```shell
hf mf autopwn
```

- 金鑰字典檔攻擊
- darkside 攻擊
- 如果有找到金鑰
    - nested 攻擊
    - hardnested 攻擊
    - staticnested 攻擊

#### MFKey32 攻擊

![](https://i.imgur.com/o5VWuG1.png)

工具網址：[MFKey32](https://taichunmin.idv.tw/chameleon-ultra.js/mfkey32.html)

- 使用 Chameleon Ultra 模擬卡片
- 讓讀卡機讀取 Chameleon Ultra (重複 3 次)
- 嘗試計算讀卡機所使用的金鑰
- 使用金鑰讀取卡片 (驗證金鑰是否正確)
- 重複步驟 1 直到沒有新的金鑰為止

#### 嗅探 (sniff) + MFKey64 攻擊

![](https://i.imgur.com/WoTGqbk.jpeg)

1. 執行嗅探指令 `hf 14a sniff`
2. 把 Proxmark3 放在讀卡機跟卡片中間 (示意圖如右)
3. 讓讀卡機成功讀寫卡片
4. 執行 `trace list -u -t mf` 指令查看嗅探結果

![](https://i.imgur.com/gG4pRzO.jpeg)

### M1 卡的指令清單及流程圖

![](https://i.imgur.com/z4n6rnH.png)

![](https://i.imgur.com/nfya44b.png)

> 資料來源：[NXP MF1S50YYX Datasheet](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf)

## 實戰練習：把學生證的卡號克隆到魔術卡內

- 使用有 NFC 功能的 Android 手機
- 透過 USB / Serial 來使用 PN532
- 使用 Chameleon Ultra
- 使用 Proxmark3

### 使用有 NFC 功能的 Android 手機

#### 所需物品

- 有 NFC 功能的 Android 手機
- CUID 魔術卡
- 搭配 APP：[MIFARE Classic Tool](https://play.google.com/store/apps/details?id=de.syss.MifareClassicTool)

#### 操作步驟

![](https://i.imgur.com/ZhIlGsu.jpeg)

![](https://i.imgur.com/P0yjGP8.jpeg)

### 透過 USB / Serial 來使用 PN532

#### 所需物品

- PN532 讀卡機
    - 已整合 USB 及藍牙的 PN532 讀卡機
    - PN532 開發板 + USB to TTL/UART 的轉接器 + 杜邦線
- 魔術卡 (UID 或 CUID)
- 工具網址：[Mifare 卡號拷貝工具](https://taichunmin.idv.tw/pn532.js/m1-uid4b-writer.html) (請用 Chrome 瀏覽器打開)

#### 連接開發板

- USB to TTL/UART 的轉接器
    - CH340
    - PL2303
- 杜邦線

![](https://i.imgur.com/7xQyHD5.png)

![](https://i.imgur.com/3WTRTnl.jpeg)

#### 轉接器驅動

如果 Windows 無法辨識轉接器，就需要安裝驅動程式：

- [CH340 驅動程式](https://www.wch.cn/downloads/CH341SER_EXE.html)
- [PL2303 驅動程式](https://www.prolific.com.tw/portfolio-item/pl2303gc/), [(32&64-bit)](https://www.prolific.com.tw/wp-content/uploads/2026/03/PL23XX-M_LogoDriver_Setup_4900_20260306.zip), [(ARM64)](https://www.prolific.com.tw/wp-content/uploads/2026/03/PL2303G-ARM_LogoDriver_Setup_6500_20260206.zip)

#### 操作步驟

![](https://i.imgur.com/abRDZ8D.jpeg)

### 使用 Chameleon Ultra

#### 所需物品

- Chameleon Ultra
- 魔術卡 (UID 或 CUID)
- 工具網址：[Mifare Keychain](https://taichunmin.idv.tw/chameleon-ultra.js/mifare-keychain.html) (請用 Chrome 瀏覽器打開)

#### 操作步驟

![](https://i.imgur.com/isLhu3u.jpeg)

### 使用 Proxmark3

#### 所需物品

- Proxmark3 Easy 或 RDV4
- 魔術卡 (UID 或 CUID)
- 工具網址：[Proxmark3GUI](https://github.com/wh201906/Proxmark3GUI/blob/master/doc/README/README_zh_CN.md) [(下載連結)](https://sourceforge.net/projects/proxmark3gui/files/latest/download)

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

- [doegox/awesome-rfid-talks](https://github.com/doegox/awesome-rfid-talks)
- [NXP MF1S50YYX Datasheet](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf)
- [一群草臺班子，讓 99% 的門禁卡都在裸奔：如何破解門禁卡？【柴知道】](https://www.youtube.com/watch?v=cpGo6Dg66qk)
