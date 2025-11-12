---
date: '2022-12-12T00:00:00+0800'
title: NFC 資安實戰 - 興大資訊社社課
description: NFC 技術在台灣已經非常普及，但在享受科技便利的同時，你是否有想過 NFC 技術到底安不安全呢？又隱藏了什麼安全危機呢？
image: https://i.imgur.com/PpkLAvk.png
tags:
  - NFC
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# NFC 資安實戰 - 興大資訊社社課

大家好，我是做出「LINE 數位版名片」的均民。

NFC 技術在台灣已經非常普及，舉凡搭乘大眾運輸工具會用到的悠遊卡跟一卡通、信用卡的感應付款、Google Pay、Apple Pay，甚至現在比較新的門鎖也都會採用這個技術；但在享受科技便利的同時，你是否有想過 NFC 技術到底安不安全呢？又隱藏了什麼安全危機呢？

## 免責聲明

本文章的內容僅限學術及研究用途，本文讀者請勿進行任何違法行為，否則後果自負。

## RFID 隨處可見

無線射頻辨識 (英語：Radio-Frequency IDentification，縮寫：RFID)，是一種無線通訊技術，NFC 只是其中一個子類別；RFID 技術很常被用在：門禁系統、旅館、車鑰匙、報到系統、競賽計時、公車、火車、門票、電子錢包、會員卡、非接觸式交易、護照、國道收費…

<details>
<summary>以 Tag 供電方式分類</summary>

* 被動式 (Passive)：Tag 沒有內部供電，只依賴外部供電，傳輸距離通常較短。
* 主動式 (Active)：Tag 有內部供電 (通常是電池)，傳輸距離通常較遠。

</details>

<details>
<summary>以通訊距離分類</summary>

|      | 低頻 (LF) | 高頻 (HF) | 超高頻 (UHF) | 微波 (microwave) |
| :--: | :--: | :--: | :--: | :--: |
| 常見頻率 | 120~150 kHz | 13.56 MHz | 443 MHz<br>865~868 MHz<br>902~928 MHz | 2450~5800 MHz<br>3.1~10 GHz |
| 通訊距離 | 10 cm | 10~100 m | 1~100 m | 1~200 m |
| 常見應用 | 門禁系統<br>寵物晶片 | 門禁系統<br>悠遊卡、一卡通<br>感應式信用卡 | 遠通 eTag<br>Apple AirTag | WiFi (2.4 GHz)<br>WiFi (5 GHz)<br>藍芽 |

> 資料來源：[維基百科](https://en.wikipedia.org/wiki/Radio-frequency_identification)

</details>

你的 Android 智慧型手機可以辨識大多數的高頻 (HF) RFID。

## NXP Mifare 卡片

目前在台灣市占率最高的 NFC 卡片是 NXP Mifare 系列的卡片 (如：Mifare Ultralight、Mifare Classic、Plus、DESFire)，這類的卡片使用 ISO 14443A 的規範，通訊頻率是 13.56 MHz，其中又以 Mifare Classic 1K 最為常見，本文主要針對這種卡片來進行說明。

## 常見開源硬體

市面上有賣很多可以讀寫 NFC 的硬體，但大多數都不是開源的，沒辦法簡單的做二次開發，以下是幾款均民推薦的開源或是常見的軟硬體，如果有興趣的可以根據你的需求購買。

<details>
<summary>RC522</summary>

![](https://i.imgur.com/qwS8ezy.jpeg)

* 開發板市價約新台幣 35 元起
* 只能當作讀卡機
* 適合嵌入式設備使用 (如 Arduino)，須有轉接器才能在電腦使用

> 資料來源：
> 1. [MFRC522 Standard performance MIFARE and NTAG frontend](https://www.nxp.com/docs/en/data-sheet/MFRC522.pdf)
> 2. [miguelbalboa/rfid: Arduino library for MFRC522](https://github.com/miguelbalboa/rfid)

</details>

<details>
<summary>PN532</summary>

![](https://i.imgur.com/EtTkIgQ.jpeg)

* 開發板市價約新台幣 150 元起
* 可當成讀卡機或模擬成卡片
* 勉強可以破解 Mifare Classic 卡片，但速度較慢
* 適合嵌入式設備使用 (如 Arduino)，須有轉接器才能在電腦使用

> 資料來源：
> 1. [PN532 User Manual](https://www.nxp.com/docs/en/user-guide/141520.pdf)
> 2. [elechouse/PN532: NFC library for Arduino](https://github.com/elechouse/PN532)
> 3. [nfc-tools/libnfc](https://github.com/nfc-tools/libnfc)
> 4. [RfidResearchGroup/RFIDtools: RFID Tools android app](https://github.com/RfidResearchGroup/RFIDtools)

</details>

<details>
<summary>ACR122U</summary>

![](https://i.imgur.com/T7yowvu.jpeg)

* 市價約新台幣 650 元起
* 內部使用 PN532 晶片
* 適合在電腦使用

</details>

<details>
<summary>Proxmark3 Easy</summary>

![](https://i.imgur.com/IFGDQw6.jpeg)

* 市價約新台幣 1350 元起
* 可當成讀卡機、模擬成卡片、嗅探資料
* 破解 Mifare Classic 卡片的首選，網路上有很多資源
* 適合在電腦使用

> 資料來源：
> 1. [RfidResearchGroup/proxmark3](https://github.com/RfidResearchGroup/proxmark3)
> 1. [Proxmark/proxmark3](https://github.com/Proxmark/proxmark3)

</details>

<details>
<summary>變色龍 Chameleon (Mini / Tiny)</summary>

* Mini 市價約新台幣 1500 元起
* Tiny 市價約新台幣 2500 元起 (疑似因晶片荒缺貨中)
* 主打功能是模擬成卡片、也可當成讀卡機、嗅探資料

> 資料來源：
> 1. [RfidResearchGroup/ChameleonMini](https://github.com/RfidResearchGroup/ChameleonMini)
> 2. [emsec/ChameleonMini](https://github.com/emsec/ChameleonMini)

</details>

## Android 上的 App

<details>
<summary>NFC TagInfo</summary>

* [Google Play 下載網址](https://play.google.com/store/apps/details?id=at.mroland.android.apps.nfctaginfo)
* 可以讀取卡號及檢測高頻卡的卡片類型，例如捷運、悠遊卡新舊卡、一卡通新舊卡、愛金卡、自然人憑證、無線感應信用卡、護照、NFC SIM。

</details>

<details>
<summary>MIFARE Classic Tool</summary>

* [Google Play 下載網址](https://play.google.com/store/apps/details?id=de.syss.MifareClassicTool)
* 針對 Mifare Classic 卡片所提供的工具包。這個應用程式可以讀取、寫入、及修改 CUID 中國魔術卡。

</details>

<details>
<summary>RFID Tools</summary>

* [Google Play 下載網址](https://play.google.com/store/apps/details?id=com.rfidresearchgroup.rfidtools)
* 支援以 USB OTG 或藍芽的方式控制支援的 NFC 讀卡機。

</details>

<details>
<summary>Credit Card Reader NFC (EMV)</summary>

* [Google Play 下載網址](https://play.google.com/store/apps/details?id=com.github.devnied.emvnfccard)
* 讀取無線感應信用卡的資料。

</details>

## 只讀取卡號的系統安全嗎？

RFID 卡片都會有卡號 (CARD UID)，卡號通常有以下幾個特徵：

* 4 到 10 個位元組的資料
* 可以被隨意讀取
* 由製造商所指定
* 不能被修改

這類系統通常會預先建立好卡號清單，根據讀取的卡號來給予不同的權限。

## 讀取卡號

<details>
<summary>使用 Android 手機來讀取卡號</summary>

基本上智慧型手機現在都可以直接讀取高頻卡的卡號，在 Android 上我比較推薦使用 [NFC TagInfo](https://play.google.com/store/apps/details?id=at.mroland.android.apps.nfctaginfo) 來讀取卡片的資訊：

![](https://i.imgur.com/VHGt08i.png)

一代悠遊卡是比較常見的 Mifare Classic 1k 卡片，下圖中的 NUID 就是這張卡片的卡號。

![](https://i.imgur.com/IJc36fp.png)

</details>

<details>
<summary>使用 PN532.js 透過 BLE 來讀取卡號</summary>

PN532.js 這個程式是由均民所開發的開源專案，可以在手機及電腦上的 Google Chrome 透過藍牙 BLE 來跟讀卡機進行連線。

### 準備一個支援 BLE 的 PN532 讀卡機

你可以使用淘寶買的現成 BLE 讀卡機，通常直接打開電源即可：

![](https://i.imgur.com/v4F1BnQ.jpg)

如果手邊有 PN532 模組以及 Serial 轉 BLE 的模組 (如 `JDY-33`)，也可以考慮自己製作，製作教學如下：

1. [How to make PN532 work on Bluetooth](https://shop.mtoolstec.com/how-to-make-pn532-work-on-bluetooth.html)
2. [How To Test PN532 Working With Bluetooth Module?](https://shop.mtoolstec.com/how-to-test-pn532-working-with-bluetooth-module.html)

### 開啟 PN532.js 的範例程式

如果是淘寶買的現成讀卡機，就先把電源開關打開，如果是自行製作的讀卡機，就需要接上 `VCC` 以及 `GND` 供電。

然後在讀卡機上放一張卡片，用 Google Chrome 開啟[這個網頁](https://taichunmin.idv.tw/pn532.js/m1-uid4b-writer.html)，然後請選擇「透過藍牙 BLE 連線」的方式，然後按下讀取卡片：

![](https://i.imgur.com/9AMAAVy.png)

如果你是在手機上的 Google Chrome 第一次使用 BLE 功能，你可能會需要給予「定位」、「鄰近裝置」等權限，然後打開「藍牙」跟「定位」。

接下來 Chrome 會要你選擇要連線的裝置，選擇裝置以後，按下配對按鈕：

![](https://i.imgur.com/Ruzlny0.png)

如果在網頁上成功顯示十六進位的 UID，就代表成功讀取到卡號囉！

</details>

<details>
<summary>使用 PN532.js 透過 USB 來讀取卡號</summary>

均民所開發的 PN532.js 這個程式除了支援 BLE 連線之外，還支援透過 USB Serial 進行連線，但這個目前只能在電腦上使用。

#### 準備讀卡機及驅動程式

你可以使用淘寶買的現成讀卡機，通常直接透過 USB 接到電腦上即可，下圖是均民實測過有支援的讀卡機：

![](https://i.imgur.com/H3hWTxt.jpg)

你也可以使用 [PN532 開發板](https://www.taiwansensor.com.tw/product/pn532-nfc-rfid-v3-%E8%BF%91%E5%A0%B4%E9%80%9A%E4%BF%A1%E6%A8%A1%E7%B5%84/)以及一條 USB to UART/Serial 的轉接線 (最常見的型號是 `CH340` 以及 `PL2303`)。

![](https://i.imgur.com/7xQyHD5.png)

如果你的 `CH340` 或 `PL2303` 是 GPIO 接腳的版本，你可以用四條杜邦線進行連結：

![](https://i.imgur.com/UKbUMcd.jpg)

如果你的 Windows 沒有辦法辨識 USB to UART/Serial 的轉接線，就可能需要安裝驅動程式：

* [CH340 驅動程式](https://www.wch.cn/downloads/CH341SER_EXE.html)
* [PL2303 驅動程式](https://www.prolific.com.tw/US/ShowProduct.aspx?pcid=41&showlevel=0017-0037-0041) | [直接下載連結](https://www.prolific.com.tw/UserFiles/files/PL23XX_Prolific_DriverInstaller_v408.zip) | [Windows11 專用版本](https://www.prolific.com.tw/UserFiles/files/PL23XX_Prolific_DriverInstaller_v206.zip)

![](https://i.imgur.com/imJWrgj.png)

如果你的作業系統不是 Windows，你可以參考[這篇英文的教學文章](https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers)。

#### 把讀卡機透過 CH340 連接

如果你用的是 CH340 轉接線，通常會有紅黑綠白四個顏色的線，連接方式如下：

* 紅線：PN532 的 `VCC`
* 黑線：PN532 的 `GND`
* 綠線：PN532 的 `SCL / RXD`
* 白線：PN532 的 `SDA / TXD`

小心不要接錯線，因為接錯很有可能會導致模組燒壞。

![](https://i.imgur.com/im00DB2.jpg)

如果你用的 CH340 是接腳的版本，你需要把 PN532 跟 CH340 照以下的方法連接：

```
        VCC ->> VCC
   USB  GND ->> GND  PN532
Serial  TXD ->> RXD  Module
        RXD ->> TXD
```

![](https://i.imgur.com/8H6L4e9.jpg)

#### 開啟 PN532.js 的範例程式

請把讀卡機接到電腦上，然後在讀卡機上放一張卡片，用 Google Chrome 開啟[這個網頁](https://taichunmin.idv.tw/pn532.js/m1-uid4b-writer.html)，然後請選擇「透過 USB Serial 連線」的方式，然後按下讀取卡片：

![](https://i.imgur.com/KNpEWPQ.png)

接下來 Chrome 會要你選擇要連線的裝置，選擇裝置以後，按下連線按鈕：

![](https://i.imgur.com/r6Rd8Bs.png)

如果在網頁上成功顯示十六進位的 UID，就代表成功讀取到卡號囉！

</details>

<details>
<summary>透過 Proxmark3 來讀取卡號</summary>

Proxmark3 是目前提供最多功能的開源讀卡機，雖然成本也比較高一些，但如果想破解 NFC 高頻卡的話基本上都一定會入手一台，均民自己是買相對便宜的 Proxmark Easy：

![](https://i.imgur.com/jZtM4uj.jpg)

目前 Proxmark3 有兩大主流的開源韌體，均民比較推薦使用 `Iceman/RRG` 版本的韌體，所以通常拿到 Proxmark3 第一步就是先把韌體刷成這個版本，如果你是用 Windows 的話，推薦可以在以下的頁面下載熱心網友包好的執行環境，均民在寫這篇文章時的[最新版本是 `v4.15864`](https://github.com/wh201906/Proxmark3GUI/releases)：

![](https://i.imgur.com/SdewVpd.png)

如果你的 Proxmark3 還沒有刷成相對應的韌體，你可以執行這幾個腳本來刷韌體：

![](https://i.imgur.com/X3DcNWV.png)

然後就可以執行 `pm3.bat` 來開啟終端機畫面：

![](https://i.imgur.com/NqZM7Bv.png)

![](https://i.imgur.com/l4vCQOF.png)

如果要取得卡片的基本資訊以及卡號，你會需要執行 `hf 14a info` 的指令：

![](https://i.imgur.com/i9tchT6.png)

</details>

### 卡號隨處可得？

這類只讀取卡號的系統其實非常不安全，因為任何讀卡機都能讀到卡號，也有很多系統會把卡號當作公開資料對待，例如：去 7-11 儲值悠遊卡，收據上會直接把卡號印出來。

![](https://i.imgur.com/MzhwU17.png)

![](https://i.imgur.com/7Beh9jv.png)

甚至有的卡片也會直接把卡號印在卡片上面，只要被有心人士猜出卡號的規則，就有可能被拷貝！

![](https://i.imgur.com/UeDfVpN.png)

### 卡號讀到了以後呢？

讀取到卡號以後，接下來就可以把讀取到的卡號寫到專門用來拷貝用的特殊卡片：

<details>
<summary>透過 PN532.js 來寫入卡號</summary>

首先，你要把你的 UID 或是 CUID 卡片放到讀卡機上，然後回到[這個網頁](https://taichunmin.idv.tw/pn532.js/m1-uid4b-writer.html)點選「寫入卡片」的按鈕，如果寫入成功，就會看到寫入成功的畫面，如果失敗就會看到失敗原因。

</details>

## 讀取半加密卡的系統安全嗎？

首先，我們要來介紹一下什麼是半加密卡。

通常卡片製造廠商在出貨的時候，會幫卡片設定一組預設的卡片金鑰，如果系統開發者在使用卡片的時候，忘記修改金鑰或是只有修改其中的部份金鑰，那麼這種卡片就稱為半加密卡。

但在台灣很常見的 Mifare Classic 1k 卡上，有一些已經被公開的攻擊手法，只要知道卡片的某個金鑰，就可以破解出其他的金鑰，只要使用 Proxmark3 的 `hf mf autopwn` 指令就能很簡單的進行攻擊：

![](https://i.imgur.com/Vnf75gv.png)

開源專案 [ikarus23/MifareClassicTool](https://github.com/ikarus23/MifareClassicTool) 中也有整理網路上已知的廠商出廠預設金鑰字典檔 [(連結在此)](https://github.com/ikarus23/MifareClassicTool/tree/master/Mifare%20Classic%20Tool/app/src/main/assets/key-files)。

## 讀取全加密卡的系統安全嗎？

如果想破解所有卡片金鑰都被修改過的全加密卡，你就會需要先想辦法弄到一組金鑰。

### 利用 Proxmark3 進行無卡嗅探

無卡嗅探的原理是，模擬已知卡片的 UID，讓讀卡機使用這個卡片的金鑰進行讀取，雖然會讀取失敗，但因為 Mifare Classic 1K 加密方式有漏洞，所以可以透過多次嘗試來算出讀取時用的金鑰。

首先，你要先執行 `hf 14a info` 來取得卡片的 UID：

![](https://i.imgur.com/tl3h2oE.png)

然後根據讀取到的卡片資訊來寫 `hf mf sim` 指令：

```bash
hf mf sim --1k -i -x -u 65535d33
#         --1k          Mifare Classic 1k
#              -i       Console will not be returned until simulation finishes or is aborted
#                 -x    Performs the 'reader attack', nr/ar attack against a reader
#                    -u UID
```

執行指令後，就要把 Proxmark3 拿去讀卡機刷卡，記得要至少刷三次以上，如果有成功你就會看到 `Reader is trying authenticate with: Key B, sector 02: [a9ac67832330]`，這個就是我們進行無卡嗅探騙到的卡片金鑰。如果刷了很多次都沒有成功，也不用太氣餒，你還可以試試看其他攻擊手法。

![](https://i.imgur.com/JYTzPv4.png)

接下來我們就要透過 Proxmark3 來破解卡片：

```bash
hf mf autopwn --1k -s 2 -b -k a9ac67832330
#             --1k            Mifare Classic 1k
#                  -s 2       提供第 2 個 Sector 的金鑰，Block 11 除以 4 無條件捨去後就會得到 Sector 2
#                       -b    提供 key B
#                          -k 卡片金鑰
```

如果一切順利的話，稍等一下就會看到全部的卡片金鑰囉！

![](https://i.imgur.com/pEsYbQt.png)

> 可以透過這種方式來騙取卡片金鑰，是因為 Mifare Classic 所使用的 [Crypto 1 加密技術](https://en.wikipedia.org/wiki/Crypto-1) 在設計上有漏洞，這個加密技術一開始是在 1994 年被發明的，但大約在 2008 年時就有針對這個加密技術的攻擊方式被公開。雖然 NXP 有釋出新的卡片 (MIFARE Classic EV1) 來應對，但大約在 2015 年時又有被公開新的攻擊方式。
>
> 資料來源：[維基百科](https://en.wikipedia.org/wiki/Crypto-1)

### 利用 Proxmark3 進行有卡嗅探

有卡嗅探的原理是，使用 Proxmark3 側錄讀卡機與卡片的通訊內容，然後逆推讀取用的卡片金鑰。

首先，你要先執行 `hf 14a sniff` 進入側錄模式：

![](https://i.imgur.com/r2bAHTs.png)

然後把 Proxmark3 放在讀卡機跟卡片的中間，進行兩三次刷卡的動作，然後按下 Proxmark3 上面的按鈕停止側錄。

![](https://i.imgur.com/lxpbPac.png)

然後再執行 `trace list -u -t mf` 指令顯示側錄的內容：

![](https://i.imgur.com/UPh3xQT.png)

接下來我們就要找到以下幾組逆推卡片金鑰所需的資料：

1. 根據 SELECT_UID 找到卡號
2. 根據 `AUTH-A` 或 `AUTH-B` 找到要對哪個 Block 使用哪個 key 進行認證
3. 往下依序找到逆推金鑰所需的 `nt`, `nr`, `ar`, `at`

![](https://i.imgur.com/ULpqpvr.png)

然後接下來可以使用均民在 PN532.js 專案中所開發的線上工具來逆推出卡片金鑰，請[開啟 mfkey.html](https://taichunmin.idv.tw/pn532.js/mfkey.html)，並在 `mfkey64` 的區塊填寫逆推金鑰所需的 `uid`, `nt`, `nr`, `ar`, `at`，然後按下破解金鑰：

![](https://i.imgur.com/J2XSdD8.png)

成功逆推出卡片的金鑰後，我們就一樣使用 `hf mf autopwn --1k -s 2 -b -k A9AC67832330` 指令破解卡片，這個指令上面已經提過了，所以這邊就不再贅述。

## 拷貝卡片

現在我們成功把卡片金鑰破解出來後，接下來我們就可以開始拷貝卡片。但通常一個正常的卡片都會有一些安全性的限制，所以市面就有在賣專門用來拷貝用的特殊卡以及硬體，以下是一些常見的種類：

### 低頻卡 T5577

這種卡片俗稱 ID 卡，卡片內只能存卡號，所以要複製也不難，只要買到可以複製 ID 卡的讀卡機即可。

### 中國魔術卡 (Chinese Magic Card)

這種卡片通常是專門針對 Mifare Classic 的拷貝卡，為了確保卡號的唯一性及安全性，一張正常的卡片在出廠時，卡號是無法進行修改的，但是網路上有人製作了可以修改卡號的卡片，這類卡片通稱為中國魔術卡。

在中國魔術卡問世以後，讀卡機廠商也會嘗試去偵測卡片是不是中國魔術卡，於是網路上就出現了各種不同的中國魔術卡來嘗試繞過讀卡機的偵測機制，以下是幾種市面上常見的中國魔術卡。

> 更多的中國魔術卡介紹可以看[網友整理的文件](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md)。

#### 中國魔術卡 Gen1a (UID)

這類卡片有提供後門指令，只要使用後門指令後，就允許讀寫任何資料。由於這種卡片問世的時間最早，所以很多讀卡機都知道如何偵測這類卡片。目前市面上有很多這類卡片的變種，有的變種也會偷工減料，例如不支援 `increment/decrement/restore/transfer` 指令（會導致無法模擬部份卡片）。

<details>
<summary>透過 PN532.js 寫入資料</summary>

如果你剛剛有成功使用 Proxmark3 讀出卡片資料，你應該會看到底下有 dump 檔案產生：

![](https://i.imgur.com/w80SFdm.png)

接下來請開啟由均民所開發的另一個範例程式 [Mifare 1k EML 工具](https://taichunmin.idv.tw/pn532.js/m1-eml-toolkit.html)：

![](https://i.imgur.com/ZHyZx3s.png)

接下來請用任何純文字編輯器打開 dump 檔案（通常可以在 `client` 資料夾下找到）並複製全部內容：

![](https://i.imgur.com/U9i16ao.png)

然後回到網頁上，點選「編輯卡片資料」按鈕：

![](https://i.imgur.com/8YJEkd3.png)

然後把剛剛複製的 dump 貼上後，按下「匯入」按鈕：

![](https://i.imgur.com/iG3XX2C.png)

然後接下來就可以點選 UID 的「寫入資料」按鈕來寫入資料：

![](https://i.imgur.com/oWIbtAJ.png)

如果寫入成功，就會看到寫入成功的畫面，如果失敗就會看到失敗原因。

![](https://i.imgur.com/OsfLz2P.png)

</details>

<details>
<summary>使用 Proxmark3 寫入資料</summary>

如果你剛剛有成功使用 Proxmark3 讀出卡片資料，你應該會看到底下有 dump 檔案產生：

![](https://i.imgur.com/w80SFdm.png)
  
接下來請使用 `hf mf cload` 指令寫入卡片：

```bash
hf mf cload -f hf-mf-01020304-dump.eml
#           -f 剛剛讀取出來的 dump 檔
```

![](https://i.imgur.com/N24zb7r.png)

</details>

#### 中國魔術卡 Gen2 (CUID)

這類卡片特色是卡號所在的區塊可以使用一般的寫卡指令修改（所以 Android 手機也能直接改），但需要特別小心的是，因為這種卡片沒有後門指令，所以如果不小心寫錯資料會導致卡片被寫壞 (Dead Sector)。由於這種卡片問世的時間比 Gen1a 晚，相對之下會偵測這類卡片的讀卡機比較少。

<details>
<summary>透過 PN532.js 寫入資料</summary>

如果你剛剛有成功使用 Proxmark3 讀出卡片資料，你應該會看到底下有 dump 檔案產生：

![](https://i.imgur.com/w80SFdm.png)

接下來請開啟由均民所開發的另一個範例程式 [Mifare 1k EML 工具](https://taichunmin.idv.tw/pn532.js/m1-eml-toolkit.html)：

![](https://i.imgur.com/ZHyZx3s.png)

接下來請用任何純文字編輯器打開 dump 檔案（通常可以在 `client` 資料夾下找到）並複製全部內容：

![](https://i.imgur.com/U9i16ao.png)

然後回到網頁上，點選「編輯卡片資料」按鈕：

![](https://i.imgur.com/8YJEkd3.png)

然後把剛剛複製的 dump 貼上後，按下「匯入」按鈕：

![](https://i.imgur.com/iG3XX2C.png)

然後接下來就可以點選 CUID 的「寫入資料」按鈕來寫入資料：

![](https://i.imgur.com/9nRmNvS.png)

如果寫入成功，就會看到寫入成功的畫面，如果失敗就會看到失敗原因。

![](https://i.imgur.com/OsfLz2P.png)

</details>

<details>
<summary>使用 Proxmark3 寫入資料</summary>

如果你剛剛有成功使用 Proxmark3 讀出卡片資料，你應該會看到底下有 dump 檔案產生：

![](https://i.imgur.com/w80SFdm.png)
  
目前 Proxmark3 只能一次寫入一個 Block 的資料，所以要寫入 64 個 blocks 需要執行 64 次指令：

```bash
hf mf wrbl --blk 1 -k FFFFFFFFFFFF -d 000102030405060708090a0b0c0d0e0f
#          --blk 區塊的編號 (1~63)
#                  -k 區塊的金鑰
#                                  -d 區塊資料 (16 bytes)
```
  
這個指令對卡號所在的 block 0 有防呆機制，所以如果想要修改 CUID 卡的 block 0 需要額外加上 `--force` 參數，但需要小心寫入錯誤的資料會導致卡片被寫壞！

</details>

#### 中國魔術卡 Gen2 (FUID, UFUID)

這類卡片特色，在鎖定前卡號所在的區塊可以使用一般的寫卡指令修改（跟 CUID 很像，所以 Android 手機也能直接改），在鎖定後卡號所在的區塊就無法被修改，`FUID` 卡是卡號所在的區塊在寫入一次之後自動鎖定，`UFUID` 卡則是提供了一個不可逆的鎖定指令。這種卡片因為鎖定後就跟正常卡片一樣，所以理論上在鎖定後讀卡機是無法偵測是不是中國魔術卡。

### 透過變色龍模擬 Chameleon (Mini / Tiny)

Chameleon 是很強大的卡片模擬工具，能模擬的卡片也不限於 Mifare Classic 1k，但因為成本高昂，所以在本文中不會深入介紹。

## Mifare Classic 1k 技術細節

### 卡片存取流程圖

![](https://i.imgur.com/nfya44b.png)

* 尋卡請求 / 喚醒卡片：在通電啟動（英文：Power-On Reset，縮寫：POR）後，卡片會在收到 `REQA` (REQuest type A 的縮寫) 或是 `WUPA` (Wake-Up Protocol type A 的縮寫) 指令後回傳 `ATQA` (Answer To Request type A 的縮寫)。
* 防衝突迴圈：在防衝突迴圈中，讀卡機會讀取卡號，如果有讀取到多張卡片，讀卡機會透過卡號來選擇一張卡片，沒有被選中的卡片會回到待命狀態。
* 選擇卡片：當讀卡機傳送選擇卡片的指令後，卡片會回傳 `SAK` (Select AcKnowledge 的縮寫)，可以用來判斷卡片類型。
* 區段三階段驗證：成功選擇卡片以後，讀卡機會指定區段，並透過目標區段的 Key 來進行三階段的驗證，驗證成功後，接下來的指令跟卡片回應也都會被加密。驗證的三階段大致上為：
  1. 卡片傳送一個隨機數 `nt` 給讀卡機
  2. 讀卡機使用卡號及 Key 把 `nt` 加密為 `nr` 並連同一個隨機數 `ar` 傳送給卡片
  3. 卡片會驗證 `nr` 是否正確，正確的話就會使用卡號及 Key 把 `ar` 加密為 `at` 傳送給卡片
* 暫停：需要在區段三階段驗證之後，將 `HLTA` (Halt Type A 的縮寫) 指令加密傳送才有效。

### 記憶體操作

卡片提供以下幾種操作記憶體的指令，在進行任何記憶體操作以前，都需要先「選擇卡片」然後「區段認證」：

* 讀取 `read`：讀取一個區塊。
* 寫入 `write`：寫入一個區塊。
* 加值 `increment`：把一個值區塊的值加上指定的 4 位元組有號整數後，存在內部的轉存緩衝區中。
* 減值 `decrement`：把一個值區塊的值扣掉指定的 4 位元組有號整數後，存在內部的轉存緩衝區中。
* 還原 `restore`：把一個值區塊的值存在內部的轉存緩衝區中。
* 轉存 `transfer`：把內部的轉存緩衝區中的資料寫到指定的值區塊。

![](https://i.imgur.com/mBiANQn.png)

### 記憶體結構

Mifare Classic 1k 卡片內有 1024 Bytes 的記憶體，可切分成 16 個區段 (Sector)；每個區段有 64 Bytes 的記憶體，又可切分成 4 個區塊 (Block)，每個區塊有 16 Bytes 的記憶體。

![](https://i.imgur.com/NwKTR7S.png)

![](https://i.imgur.com/jHIA9ln.png)

### 製造商區塊 (Manufacturer block)

卡片的 Sector 0 Block 0 被規劃成製造商區塊，這個區塊會在製造時寫入一個唯讀的資料，這資料會包含 7-bytes UID (Unique Identifier) 或是 4-bytes NUID (Non-unique Identifier)，製造商區塊會保持在唯獨模式，不會受到存取權限的影響。

![](https://i.imgur.com/GA316AA.png)

在卡號的後面會有一個 byte 的 BCC，是由卡號的所有 bytes 進行 XOR 運算的結果，目的是用來驗證卡號是否正確，如果資料有誤就會讀卡失敗。

卡號會因為不同系統的解讀方式而看起來不太一樣，比較常見的呈現方式有：

* 十六進位 (Big Endian 或 Little Endian)
* 十進位 (Big Endian 或 Little Endian)

### 資料區塊 (Data blocks)

除了區段 0 只有兩個資料區塊以外，其他的區段都有三個資料區塊，可透過區段的 ACL 把區塊設定成「可讀可寫區塊」以及「值區塊」。

### 值區塊 (Value blocks)

值區塊可以被用來當作電子錢包的餘額，除了一般的讀寫操作之外，還支援額外的加值 increment、減值 decrement、還原 restore、轉存 transfer 操作。值區塊有一個固定的資料格式，這格式可以用來錯誤偵測，修正以及備份。

要使用值區塊，要先寫入一個值區塊的格式，這個格式包含兩個資料：

* `value`：4 個位元組的有號整數，以 little endian 格式儲存在 byte 0-3 以及 byte 8-11，然後取 2 進位的補數後儲存在 byte 4-7。
* `adr`：1 個位元組的無號整數，儲存在 byte 12 及 14，然後取 2 進位的反向後儲存於 byte 13 及 15。可用來紀錄這個值區域是哪個值區域的備份，在進行值區域的專屬操作時 (increment、decrement、restore、transfer)，都不會修改這個值，這個值只能透過寫入操作來修改。

下圖是值區塊的資料格式，以及一個以 `value = 0x0012D687, adr = 0x11` 為例的值區塊：

![](https://i.imgur.com/Nxfmu3a.png)

### 區段尾端區塊 (Sector trailer)

區段尾端是指每個區段中的第四個區塊 (block 3)，這個區塊儲存該區段的 Key A、Key B (選擇性) 及存取權限 (ACL)。

如果不使用 Key B 也可以把這 6 個位元組拿來儲存一般資料（需要設定相對應的存取權限）。

區段尾端區塊的 byte 6-8 是用來紀錄存取權限，byte 9 可以用來儲存資料，存取權限跟 byte 6-8 相同，Key A 在讀取時只會回傳 6 個位元組的 `0x00`，如果 Key B 設定成不可讀取時，同樣會在讀取時回傳 6 個位元組的 `0x00`。

![](https://i.imgur.com/HfAigVe.png)

### 區段存取權限 (Access conditions)

存取權限這部份的規則比較複雜，如果偷懶可以直接找線上工具來產生。(搜尋 `MIFARE Classic 1K Access Bits Calculator` 就能找到)

每個資料區塊及區段尾端區塊的存取權限，都是透過 3 個位元 (bit) 來表示，並且透過多儲存一次存取權限的 2 進位反向來保護資料。

存取權限可以用來控制 Key A 及 Key B 是否能夠進行指定的記憶體操作，存取權限可以透過指定的 Key 以及存取權限來修改，如果寫入的存取權限內容有誤，整個區段就會發生不可逆的拒絕存取 (俗稱變磚)。

![](https://i.imgur.com/E3gywgm.png)

### 存取權限表：區段尾端區塊 (Access conditions for the sector trailer)

取出存取權限中代表區段尾端區塊的 3 個位元後，就可以透過查表來確認 Key A 及 Key B 能進行的記憶體操作：

![](https://i.imgur.com/L0vrD8x.png)

需要特別注意的是，如果存取權限被設定成 `001` 時，Key B 會被當作儲存一般資料，無法用來取得區塊授權，該區段中其他資料區塊的存取也都會被拒絕。

### 存取權限表：資料區塊 (Access conditions for data blocks)

取出存取權限中代表該資料區塊的 3 個位元後，就可以透過查表來確認 Key A 及 Key B 能進行的記憶體操作：

![](https://i.imgur.com/q6MYgez.png)

以下是「值區域」的存取權限使用情境：

1. 如果該資料區塊的存取權限是 `001`，代表這個資料區塊是「值區域」，Key A 跟 Key B 都能讀取及減值，可以用來當作不能增加數值的卡片。
2. 如果該資料區塊的存取權限是 `110`，代表這個資料區塊是「值區域」，Key A 跟 Key B 都能讀取及減值，Key B 能用來寫入或是加值數值。

### Mifare Classic 指令列表

這個指令列表在使用 Sniff 嗅探時會用到。

![](https://i.imgur.com/z4n6rnH.png)

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [均民所開發的 PN532.js](https://github.com/taichunmin/pn532.js)
* [RFID 硬體資安實戰 - 捲毛](https://docs.google.com/presentation/d/1lkqBsTXZg8GDRcJM7XvAXn7BACtiFTur/edit?usp=sharing&ouid=101162932021298598667&rtpof=true&sd=true)
* [PN532 User Manual v1.6 | NXP](https://www.nxp.com/docs/en/user-guide/141520.pdf)
* [MF1S50YYX_V1 v3.2 | NXP](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf)
* [A 2018 practical guide to hacking NFC/RFID](https://smartlockpicking.com/slides/Confidence_A_2018_Practical_Guide_To_Hacking_RFID_NFC.pdf)
* [Magic Cards Notes](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md)
* [elechouse/PN532: NFC library for Arduino](https://github.com/elechouse/PN532)
* [nfc-tools/libnfc](https://github.com/nfc-tools/libnfc)
* [RfidResearchGroup/RFIDtools: RFID Tools android app](https://github.com/RfidResearchGroup/RFIDtools)
