---
date: '2021-10-12T00:00:00+0800'
title: liff.shareTargetPicker() 新增 isMultiple 參數
description: LIFF v2.16.0 新增了 isMultiple 參數，讓我們一起來看文件，然後用筆者寫的測試程式來測試看看吧！
image: https://i.imgur.com/Bs1tlRI.jpeg
tags:
  - LINE
  - LIFF
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# `liff.shareTargetPicker()` 新增 `isMultiple` 參數

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

`liff.shareTargetPicker()` 是 LINE 的 Front-end Framework 中一個很強大的 API，它可以讓開發者在網頁上產生 LINE 中專屬的 Message Object，然後請使用者分享給他的好友或者群組。

[LINE 官方部落格在 2021/10/12 發佈了 LIFF v2.16.0](https://developers.line.biz/en/news/2021/10/12/release-liff-2-16-0/)，幫這個 API 新增了一個 `isMultiple` 參數，讓我們能夠限制使用者一次只能傳給一個對象。[讓我們一起來看文件](https://developers.line.biz/en/reference/liff/#share-target-picker)，然後用筆者寫的測試程式來測試看看吧！

## [isMultiple 參數說明文件](https://developers.line.biz/en/reference/liff/#share-target-picker)

這個 `isMultiple` 參數的功能，是用來控制訊息能不能被使用者一次分享給多個目標，當 `isMultiple: true` 時，選擇好友的畫面會跟之前的版本相同；當 `isMultiple: false` 時，使用者就沒辦法一次選擇多個對象，同時也不允許使用者把訊息傳送到「群組」跟「聊天」。

![](https://i.imgur.com/yHrRMno.png)

在文件中有特別提醒，雖然指定 `isMultiple: false` 時一次只能選擇一個對象，但是使用者還是可以嘗試多分享幾次，所以如果真的想要嚴格限制可以分享的人數，你會需要在 LIFF 中寫對應的程式碼進行限制。

文件中提供的建議作法是，產生一個一次性連結，放在訊息中讓使用者分享出去，如果這個連結被開啟過一次就會失效，這樣才是真的限制使用者只能把訊息分享給一個對象。

## 測試程式

::: info 筆者所寫的測試網頁
* <https://liff.line.me/1654046335-4BDKExAV/20211012-share-target-picker-is-multiple.html>
:::

請點選上方筆者開發的測試網頁，為了方便截圖紀錄，筆者特地把裝置的一些資料也顯示在網頁上：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/4F7PsyM.jpeg) | ![](https://i.imgur.com/kbVe6Oe.jpeg) |

接下來，讓我們先點選 `isMultiple: true` 的按鈕，你可以在選擇好友的視窗看到有「群組」、「好友」和「聊天」三大分類：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/UVIAb7C.jpeg) | ![](https://i.imgur.com/QoYJZT7.jpeg) |

然後目前一次最多可以選擇 10 個對象：

| ![](https://i.imgur.com/r0uHI4O.jpeg) | ![](https://i.imgur.com/Yshq0OB.jpeg) |
| :-----: | :-: |
| ![](https://i.imgur.com/j8s9aPr.jpeg) | ![](https://i.imgur.com/Yj1v57q.jpeg) |

如果使用者選擇至少一個對象分享後，就會回傳分享成功：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/07PZW1W.jpeg) | ![](https://i.imgur.com/0Sgx2Rg.jpeg) |

如果使用者沒有分享，又或者是使用者的 LINE 版本太舊（介於 LINE `10.3.0` ~ `10.10.0` 之間），這個 API 就不會有回傳值：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/Jd0YxlC.jpeg) | ![](https://i.imgur.com/NtHwQik.jpeg) |

接下來，讓我們先點選 `isMultiple: false` 的按鈕，你可以在選擇好友的視窗看到只剩下「好友」分類：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/zcj1OcL.jpeg) | ![](https://i.imgur.com/Ontob2Q.jpeg) |

而且使用者最多只能選擇一個對象，如果選了其他的，之前選取的對象就會被取消：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/iX7QjnD.jpeg) | ![](https://i.imgur.com/1bsgLOr.jpeg) |

## 原始碼與相關連結

::: info
本文範例程式的原始碼授權為 MIT License，若您有任何疑惑，你可以透過 [Facebook](https://www.facebook.com/taichunmin) 與我聯繫。
:::

* [新聞: LINE 2021/10/12 發佈的新聞](https://developers.line.biz/en/news/2021/10/12/release-liff-2-16-0/) by LINE
* [isMultiple 參數說明文件](https://developers.line.biz/en/reference/liff/#share-target-picker)
* [測試網頁原始碼](https://github.com/taichunmin/pug/blob/master/src/liff-full/20211012-share-target-picker-is-multiple.pug)
