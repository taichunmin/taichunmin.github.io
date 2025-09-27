---
date: "2020-11-21T00:00:00+0800"
title: 身為 Chatbot 開發者我該改用 Google Analytics 4 嗎？
description: 在 Google 發佈了第 4 版 Analytics 之後，身為 Chatbot 開發者的我們，要馬上改用第 4 版 Analytics 嗎？
image: https://i.imgur.com/gFKgrK6.png
tags:
  - LINE
  - Google Analytics
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# 身為 Chatbot 開發者我該改用 Google Analytics 4 嗎？

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

2020/10/14 時，Google 發佈了第 4 版 Analytics，整個後台的介面也大更新，那麼，身為 Chatbot 開發者的我們，要馬上改用第 4 版 Analytics 嗎？

![](https://i.imgur.com/KkGBpVt.png)

## 大家通常都怎麼用 Google Analytics？

為了分析產品的好壞，我們勢必要記錄使用者的行為，但是自己從頭做起實在是太辛苦了，所以通常大家都直接選擇一些現有的服務，例如網頁可以選擇 `gtag.js`，Android 和 iOS 的 APP 可以選擇 `Firebase`，在 Chatbot 我選擇使用 Google Analytics 的 [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1)。

在發佈第 4 版 Analytics 後，Measurement Protocol 也同時發佈了 [Measurement Protocol (Google Analytics 4)](https://developers.google.com/analytics/devguides/collection/protocol/ga4)，但由於該新版 API 還有一些問題存在：

## 問題 \#1: 目前 API 還在 Alpha 版本

<img src="https://i.imgur.com/wIvgfP4.png" style="width: 480px">

雖然 Google Analytics 4 已經正式發佈，但是相對應的 Measurement Protocol 還在 Alpha 版本，代表說還有可能有重大修改，不適合使用在正式產品上。

## 問題 #2: 無法取得必填欄位 `client_id`

使用 Measurement Protocol 時，他都會要求你傳送 `client_id` 以便識別使用者的裝置，在舊版中對於 `client_id` 的要求是只要符合 UUID 的規範即可，但是在新版的 API 中，被改成了這個流程：

![](https://i.imgur.com/IsbAHq7.png)

在這個流程中，呼叫 `gtag.js('get')` 取得 `client_id` 的動作必須在有載入 `gtag.js` 的環境下執行（也就是瀏覽器）。但是對於 Chatbot 來說，新使用者通常不是在瀏覽器中，沒辦法在純後端伺服器中幫新使用者建立一個新的 `client_id`。

## 總結

如果想要追蹤 chatbot 上面的使用者行為，目前只能先用回舊版的通用 Analytics，只能希望以後正式版的 Measurement Protocol (Google Analytics 4) 可以支援自訂的 `client_id`。

如果你想要改用舊版的通用 Google Analytics，你必須在建立時，選擇「建立通用 Analytics (分析) 資源」如下圖：

![](https://i.imgur.com/b7nsqX5.jpg)

That's all!

## 其他相關文章

* [讓聊天機器人也能看 Google Analytics (1)](https://taichunmin.idv.tw/blog/2020-04-28-lintbot-google-analytics.html)
* [讓聊天機器人也能看 Google Analytics (2)](https://taichunmin.idv.tw/blog/2020-05-25-linebot-google-analytics.html)
* [追蹤使用者有沒有看 LINE 訊息 (開信率)](https://taichunmin.idv.tw/blog/2020-06-17-linebot-google-analytics.html)
* [追蹤 LINE Notify 的閱讀率 (開信率)](https://taichunmin.idv.tw/blog/2020-06-29-linebot-google-analytics.html)
* [在 LINE Chatbot 中串接 Google Analytics 的經驗分享](https://coscup.org/2020/zh-TW/agenda/UR7WGZ)
