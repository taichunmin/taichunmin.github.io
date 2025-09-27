---
date: '2021-09-30T00:00:00+0800'
title: LINE LIFF 新掃碼 API 功能測試
description: 快速實測 LINE LIFF 新掃碼 API liff.scanCodeV2() 的使用體驗以及裝置的支援度！
image: https://i.imgur.com/XLlpnAv.png
tags:
  - LINE
  - LIFF
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# LINE LIFF 新掃碼 API 功能測試

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

在 [LINE 官方部落格 2021/09/30 發佈的新聞](https://developers.line.biz/en/news/2021/09/30/release-liff-2-15-0/)中，在 LINE LIFF 的 SDK 上釋出新版掃描 QRCode 的 API `liff.scanCodeV2()`，同時舊版的 API `liff.scanCode()` 也被標示為不建議使用 (Deprecated)。

以前舊版掃描 QRCode 的 `liff.scanCode()` 剛釋出時，iOS 和 Android 兩大平台都有支援，但是在 2019/11/29 時，因為作業系統的技術問題 [(詳情請見此公告)](https://developers.line.biz/en/news/2019/11/29/liff-functions-suspended/)，這個舊版的 API 變成僅限 Android 使用，暌違將近兩年，終於又重新釋出新的掃碼 API，這個新版 API 在各大平台的支援程度為何？到底使用起來體驗如何？讓我們一起來試試看吧！

## 各大平台支援度

這是在 2021/09/30 根據官方文件所整理的支援度表格：

![](https://i.imgur.com/GbhTx0k.png)

在這個表格中，需要注意的是 `liff.scanCodeV2()` 在手機上都必須[在 Full 大小的 LIFF 中](https://developers.line.biz/en/docs/liff/overview/#screen-size)才能使用，在外部瀏覽器中則是需要有 [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) 的支援。

## 在手機上使用掃碼 API

::: tip 筆者所寫的測試網頁
* <https://liff.line.me/1654046335-4BDKExAV/20210930-scan-code-v2.html>
:::

請點選上方的測試網頁，為了方便截圖紀錄，筆者特地把裝置的一些資料也顯示在網頁上：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/VqtTczY.jpg) | ![](https://i.imgur.com/6XuorG2.png) |

接下來就可以來測試新舊 API 的不同以及支援度，你可以掃描底下的 QRCode 來測試：

| [Flex 開發人員工具](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk) | Hello World |
| :-----: | :-: |
| ![](https://i.imgur.com/cP5purz.jpg) | ![](https://i.imgur.com/S964jwx.png) |

在此筆者先用 Android 手機點選舊版的 API 進行測試，舊版不會跳確認框給使用者，掃碼後也會直接關閉：

| ![](https://i.imgur.com/mvsiwRb.png) | ![](https://i.imgur.com/W4Hwl8U.png) |
|:------------------------------------:|:------------------------------------:|
|                                      |                                      |

再來，筆者用同一台 Android 手機點選新版的 API 進行測試，如果有仔細觀察的話，可以注意到新版的掃碼功能會開啟一個 Tall 大小的 LIFF 網頁，每一次使用都會跳出確認視窗，使用者同意之後才能開始掃碼：

| ![](https://i.imgur.com/9JG1LgQ.png) | ![](https://i.imgur.com/CjUfMby.png) |
|:------------------------------------:|:------------------------------------:|
|                                      |                                      |

掃碼成功後，這個 Tall 大小的 LIFF 網頁也會直接關閉，如果使用者沒有同意相機權限，就會看到右邊的圖片：

| ![](https://i.imgur.com/DmbGsYW.png) | ![](https://i.imgur.com/ueVmx9F.png) |
|:------------------------------------:|:------------------------------------:|
|                                      |                                      |

再來是測試掃描非網址的 QRCode，在筆者的 Android 手機上都能成功掃描：

| ![](https://i.imgur.com/ZvPJ2Jy.png) | ![](https://i.imgur.com/9Q7oyj5.png) |
|:------------------------------------:|:------------------------------------:|
|                                      |                                      |

都測試完成後，網頁上的按鈕會根據成功或失敗顯示成綠色或紅色，由於筆者的 iPhone 卡在 iOS 12 沒辦法升級，所以下面截圖中的兩個按鈕都是紅的，就請讀者自行測試比較新的 iPhone 啦：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/BRkCHj2.jpg) | ![](https://i.imgur.com/a2k7Rc8.png) |

## 中文支援測試 2021/10/01 (已修正)

::: tip
2022/02/14 更新：中文讀取後會變成亂碼的錯誤已經於 LIFF v2.18.2 修正。
:::

經臉書的網友 Lanma Chiu 測試，新的 `liff.scanCodeV2()` 讀取中文時會出現亂碼，以下是使用兩個版本的 API 掃描台灣的簡訊實聯制的結果：

| ![](https://i.imgur.com/7cOijYs.jpeg) | ![](https://i.imgur.com/sfcdrpb.jpeg) |
|:------------------------------------:|:------------------------------------:|
|                                      |                                      |

目前也不知道 LINE 官方會不會修正這個錯誤，如果想要把 `liff.scanCodeV2()` 拿來掃描台灣的簡訊實聯制或是電子發票的開發者，可能需要再考量一下。

## 在 PC 上使用新版掃碼 API

雖然文件說有支援 PC 使用新版的掃碼 API，但是不知道為什麼筆者用 macOS 按下新版的按鈕後，就只會開啟一個空白網頁，什麼都沒有發生，如果有更進一步的消息再做補充囉！

10/01 補充：如果想要在 PC 上使用新版的掃碼 API，你需要先使用 `liff.login()` 要求使用者登入，否則你就會看到以下的錯誤：

![](https://i.imgur.com/q8U8N6D.png)

如果不知道要怎麼使用 `liff.login()` 可以查看[測試網頁的原始碼](https://github.com/taichunmin/pug/blob/master/src/liff-full/20210930-scan-code-v2.pug)。在 PC 上點選新版的掃碼 API 按鈕後，就會開一個新的頁面，並且跟使用者索取相機權限：

![](https://i.imgur.com/g7Dizkm.png)

跟使用者索取相機權限的對話框不會每次都跳，只要使用者同意相機權限後，就可以用電腦的攝影機來掃碼囉！

## 原始碼與相關連結

::: tip
本文範例程式的原始碼授權為 MIT License，若您有任何疑惑，你可以透過 [Facebook](https://www.facebook.com/taichunmin) 與我聯繫。
:::

* [新聞: LINE 2019/11/29 發佈的新聞](https://developers.line.biz/en/news/2019/11/29/liff-functions-suspended/) by LINE
* [新聞: LINE 2021/06/21 發佈的新聞](https://developers.line.biz/en/news/2021/09/30/release-liff-2-15-0/) by LINE
* [測試網頁原始碼](https://github.com/taichunmin/pug/blob/master/src/liff-full/20210930-scan-code-v2.pug)
