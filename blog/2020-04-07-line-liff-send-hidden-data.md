---
date: "2020-04-07T00:00:00+0800"
title: 如何在 LIFF 傳送隱藏資料給機器人
description: Postback 可以附帶隱藏資料，但是如何在 LIFF 做到類似的事呢？
image: https://i.imgur.com/kocTL0R.png
tags:
  - LINE
  - LIFF
  - postback
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---

# 如何在 LIFF 傳送隱藏資料給機器人

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

Hi 大家好，我今天來分享一個小技巧，讓你可以在 LIFF 中傳送隱藏資料給聊天機器人，並且還可以免費回覆訊息，很適合做出很漂亮的 LIFF 給使用者選擇東西喔！

在 LINE 的聊天機器人中，如果你希望使用者按下按鈕後看不到你傳的資料，你可以使用 postback 這個 action 來傳送隱藏資料，同時你也會拿到一個 replyToken 讓你回傳訊息。

但是在 LIFF 中該怎麼做到類似的事情呢？我們直接先用範例程式來試玩看看吧！

[![](https://i.imgur.com/VsOitU7.png)](https://line.me/R/ti/p/%40336zwcug)

> 由於後端採用 Google Cloud Function，為了避免用量過高被收錢，所以有鎖執行上限，如果無回應的話，可以重新傳送訊息試試喔！

## 範例程式

加入這個聊天機器人後，你應該就能看到這個畫面：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/iOLMwZo.jpg) | ![](https://i.imgur.com/5wwTX3o.png) |

然後請點選第一個選擇 sender 的 LIFF 連結，點下去以後就會出現 Brown、Cony 和 Sally 給你選擇：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/mA9LzOn.jpg) | ![](https://i.imgur.com/7peCe3Q.png) |

如果我們點選 Brown 以後，你就會看到聊天機器人用[最新的 Icon Switch 功能](https://engineering.linecorp.com/zh-hant/blog/chatbot-icon-switch/)來跟你打招呼囉！

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/eFTDnjy.jpg) | ![](https://i.imgur.com/cuNeo7l.png) |

如果你把這段文字複製到[「輔助開發 LINE Flex 訊息的工具」](https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html)文章裡面所介紹的「DEMO 開發 Flex」機器人中：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/yDPv0rG.jpg) | ![](https://i.imgur.com/c4nkN1J.png) |

並且在這個工具裡面打開 LIFF 選擇 sender 的話，你就可以成功看到這個 LIFF 到底送出了什麼隱藏內容喔！

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/G43kCFA.jpg) | ![](https://i.imgur.com/ejkdQkt.png) |

## 運作原理

首先，我們需要準備一張 `3x1` 的透明 png 圖：

```
https://i.imgur.com/MwS42AE.png
```

然後把隱藏資料放在 Image 的網址中：

```
https://i.imgur.com/MwS42AE.png?sender=Brown
```

接著，就可以在 LIFF 中呼叫 `liff.sendMessages()` 來把 Image 送給機器人：

```js
await liff.sendMessages([{
  type: 'image',
  originalContentUrl: 'https://i.imgur.com/MwS42AE.png?sender=Brown',
  previewImageUrl: 'https://i.imgur.com/MwS42AE.png?sender=Brown'
}])
```

然後在聊天機器人中就會收到類似這樣的 Event：

```json
{
  "type": "message",
  "replyToken": "bfd16af576304062931ee39249d1c362",
  "source": {
    "userId": "Udeadbeefdeadbeefdeadbeefdeadbeef",
    "type": "user"
  },
  "timestamp": 1586196950201,
  "mode": "active",
  "message": {
    "type": "image",
    "id": "11738027154079",
    "contentProvider": {
      "type": "external",
      "originalContentUrl": "https://i.imgur.com/MwS42AE.png?sender=Brown",
      "previewImageUrl": "https://i.imgur.com/MwS42AE.png?sender=Brown"
    }
  }
}
```

這時候聊天機器人就可以把 `event.message.contentProvider.originalContentUrl` 資料解析出來處理，並且還有 replyToken 可以使用喔！

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License。
:::

* [Webhook 原始碼](https://gist.github.com/taichunmin/684839958fed6ff9b4f368c3d23a385b)
* [LIFF 原始網址](https://taichunmin.idv.tw/pug/line-liff-20200406.html)
* [2020/05 在台中 chatbot.tw 分享的投影片](https://hackmd.io/@taichunmin/chatbot-tw-202005)
* [2020/05 在台中 chatbot.tw 分享的錄影檔](https://youtu.be/PuGOObhI5oA)
* [輔助開發 LINE Flex 訊息的工具](https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html)
* [使用 Icon Switch 來變更聊天機器人的暱稱與圖示](https://engineering.linecorp.com/zh-hant/blog/chatbot-icon-switch/) by Evan Lin
