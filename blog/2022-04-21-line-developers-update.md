---
date: '2022-04-21T00:00:00+0800'
title: 近期 LINE 針對開發者的更新：驗證圖文選單、LIFF 插件、Webhook 重送機制
description: 快速瞭解近期 LINE 針對開發者的更新，以及 Webhook 重送機制的實測結果。
image: https://i.imgur.com/F0Vce9n.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# 近期 LINE 針對開發者的更新：驗證圖文選單、LIFF 插件、Webhook 重送機制

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

近期 LINE 針對開發者發布了幾個更新，分別是驗證圖文選單[（查看英文公告）](https://developers.line.biz/en/news/2022/04/05/release-validate-rich-menu-object/)、LIFF 插件[（查看英文公告）](https://developers.line.biz/en/news/2022/04/18/release-liff-2-19-1/)、Webhook 重送機制[（查看英文公告）](https://developers.line.biz/en/news/2022/04/19/webhook-redelivery/)，這篇文章就是來帶大家快速瞭解這幾個更新的內容！

## 驗證圖文選單 API

::: tip
* [驗證圖文選單 API 的英文文件](https://developers.line.biz/en/reference/messaging-api/#validate-rich-menu-object)
:::

這個 API 可以讓開發者在新增圖文選單之前，先驗證圖文選單的 JSON 是否正確。可惜這個 API 目前需要 `channel access token`，也沒有提供 CORS 的 Header，所以目前比較適合的使用方式是透過 Postman 使用這個 API。

![](https://i.imgur.com/0YGRGrr.png)

## LIFF 插件

::: tip
* [LIFF 插件的英文文件](https://developers.line.biz/en/docs/liff/liff-plugin/)
:::

這個功能是讓開發者可以自己寫程式幫 LIFF SDK 增加新的功能。

![](https://i.imgur.com/kzi1jub.png)

一個 LIFF 的 Plugin 必須要有 `name` 以及一個 `install()`，剩下的部分就可以自由定義。在 `install()` 中有兩個參數可以使用，分別是 `context` 跟 `option`：

![](https://i.imgur.com/QV4dfpV.png)

LIFF 插件還能夠使用 LIFF SDK 的 hook 功能，目前有兩個內建的 hook：

![](https://i.imgur.com/RevdlBZ.png)

除了使用內建的 hook 之外，你也可以新增自定義的 hook。

![](https://i.imgur.com/rn6P9JE.png)

## Webhook 重送機制

這個 Webhook 重送機制是當你的 Webhook 沒有在時間內正確回傳 `2xx` 的狀態碼時，LINE 就會重新傳送這個事件給你的 Webhook。這個功能預設是被關閉的，在啟用這個功能之前，你需要[先看過這些注意事項](https://developers.line.biz/en/news/2022/#notes-2022-04-19)，然後你可以在 [LINE Developers Console](https://developers.line.biz/console/) 的 Messaging API Channel 中啟用。

![](https://i.imgur.com/MOhDrVA.png)

為了避免 Webhook 重複處理同一個事件，有兩個新的資料被加到 Event 的共通屬性中：

![](https://i.imgur.com/ztiaihs.png)

另外，針對傳送錯誤的次數，也有一個開關可以產生錯誤次數的報表，你一樣可以在 [LINE Developers Console](https://developers.line.biz/console/) 的 Messaging API Channel 中啟用這個功能：

![](https://i.imgur.com/wUobFDs.png)

### Webhook 重送機制實測

::: tip
* [Webhook 重送機制實測原始碼在此](https://gist.github.com/taichunmin/2fee2f839d6b84859576f2851167a3c2)，歡迎自行建立一個自己的 Google Cloud Functions 進行測試
:::

為了實測 Webhook 的重送機制，我用 Google Cloud Functions 寫了一個 linebot，當目前的秒數介於 `0-29` 之間就會回傳 `418` 狀態碼，介於 `30-59` 之間就會回傳 `200` 狀態碼：

![](https://i.imgur.com/EFDUye7.jpeg)

把程式碼部署好以後，我們就可以對 LINE 官方帳號傳送訊息：

![](https://i.imgur.com/GsBeIrF.jpeg)

在使用這個程式初步測試以後，我們可以發現 LINE 大約每 60 秒重新傳送一次訊息，然後在傳送 16 次都失敗後就會停止傳送：

![](https://i.imgur.com/3Ld7o4h.png)

另外一個值得注意的地方是，重新傳送的訊息會拿到相同的 `replyToken`，但 `replyToken` 還是只能使用一次，所以後面幾次都會收到 `Invalid reply token` 的錯誤訊息：

![](https://i.imgur.com/cu8vGrM.png)

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [Webhook 重送機制實測原始碼](https://gist.github.com/taichunmin/2fee2f839d6b84859576f2851167a3c2)
* [新聞: LINE 2022/04/05 發佈的新聞](https://developers.line.biz/en/news/2022/04/05/release-validate-rich-menu-object/)
* [新聞: LINE 2022/04/18 發佈的新聞](https://developers.line.biz/en/news/2022/04/18/release-liff-2-19-1/)
* [新聞: LINE 2022/04/19 發佈的新聞](https://developers.line.biz/en/news/2022/04/19/webhook-redelivery/)
