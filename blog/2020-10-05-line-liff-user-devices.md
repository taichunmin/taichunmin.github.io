---
date: '2020-10-05T00:00:00+0800'
title: LINE LIFF 裝置支援度分析
description: 在 2020-09-07 至 2020-09-30 的活動中 LINE LIFF 裝置支援度分析。
image: https://i.imgur.com/RWPllHT.png
tags:
  - LINE
  - LIFF
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# LINE LIFF 裝置支援度分析

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

2020-09-07 至 2020-09-30 這段期間，在公司的某個聊天機器人專案中舉辦了一個活動，這份圖表是在這段期間透過 LIFF 埋入 Google Analytics 所製作的使用者裝置支援度分析。

::: danger 免責聲明
由於以下幾點因素，圖表的內容可能會有所誤差，僅供參考：

* 由於活動的遊戲規則，資料可能會被大量灌水
* 由於 Google Analytics 的免費版限制，資料可能會經過取樣
* 由於使用者可能會安裝反追蹤程式，資料可能會比實際少
:::

## 作業系統與版本（有效樣本數 13653）

在這份圖表中顯示，作業系統與版本在前 9 名內的使用者大約有 73.3%。

![](https://i.imgur.com/cZvbSZx.png)

## 裝置品牌（有效樣本數 13653）

在這份圖表中顯示，Android 使用者的前四大品牌是 `Samsung`、`Xiaomi`、`Asus` 和 `OPPO`。

![](https://i.imgur.com/SIBo7eN.png)

## 瀏覽器（有效樣本數 13653）

在這份圖表中顯示，97.5% 的使用者會以 LINE 內部的瀏覽器開啟活動網頁。

![](https://i.imgur.com/L3Ukk5j.png)

![](https://i.imgur.com/lWEjPEB.png)

## `liff.getOS()`（有效樣本數 14153）

這個部分的樣本數較多的原因，很有可能是使用者在這段期間有使用多個裝置參加活動。

在這份數據中顯示，Android 的使用者略勝 iOS 的使用者，在非手機的瀏覽器開啟的使用者少之又少。

| 作業系統 | 使用者 | 百分比 |
| --------:| ------:| ------:|
|  android |   7702 | 54.42% |
|      ios |   6120 | 43.24% |
|      web |    331 |  2.34% |

## LINE 版本（有效樣本數 15368）

這個部分的樣本數較多的原因，很有可能是使用者在這段期間有包含多個 LINE 的版本。

在這份圖表中顯示，支援 `liff.shareTargetPicker()` 的使用者高達 98.9%，支援 LIFF 的 share 按鈕的使用者也已達九成。

![](https://i.imgur.com/Eh2e6VA.png)

![](https://i.imgur.com/BfsRS98.png)
