---
date: '2022-10-25T00:00:00+0800'
title: LINE API 新功能：傳送訊息前先驗證內容
description: 均民所開發的「Flex 開發人員工具」也使用了這些新 API 囉，快來試試看有沒有更好用吧！
image: https://i.imgur.com/E18f3Yu.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# LINE API 新功能：傳送訊息前先驗證內容

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

2022/10/24 時，LINE 的 Messaging API 發布了幾個新的 API[（查看英文公告）](https://developers.line.biz/en/news/2022/10/24/validate-message-objects-api/)，讓我們可以在傳送訊息之前先驗證 Message Object 是否正確：

* [驗證 reply 訊息](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-reply-message)
* [驗證 push 訊息](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-push-message)
* [驗證 multicast 訊息](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-multicast-message)
* [驗證 narrowcast 訊息](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-narrowcast-message)
* [驗證 broadcast 訊息](https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-broadcast-message)

之前如果需要測試 Message Object 有沒有錯誤，通常都需要先發送一次給內部的人員做測試，在有了這些 API 以後，就可以增加客製化後台對使用者的友善程度，例如預約推送訊息可以先驗證 Message Object 是否正確，這樣就不用擔心預約時間到如果發送失敗會手忙腳亂啦！

## 加入官方帳號「Flex 開發人員工具」

均民所開發的「Flex 開發人員工具」也使用了這些新 API 囉，如果你也想要跟著嘗試看看的話，請掃描以下 QR Code 加入好友吧！

[![](https://i.imgur.com/cP5purz.png)](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)

加入好友: <https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk>

## 傳送錯誤的 Message Object 會告知內容有誤

均民開發的「Flex 開發人員工具」有提供一個好用的功能，就是可以把 Message Objects 的 JSON 傳送給機器人，機器人就會直接回傳顯示結果。

但是這個功能一直都有一個小缺點，因為機器人是透過 replyMessage 來回傳訊息，不論是否回傳成功或失敗，`replyToken` 都只能使用一次，為了避免產生額外費用，所以沒辦法改用 push 回傳錯誤訊息，所以當 Message Objects 內容有錯的話，只能直接把錯誤內容紀錄在 LOG 檔中，沒有辦法再次使用 `replyToken` 把錯誤的訊息告知使用者。

現在使用這些新的 API 後，機器人會先驗證內容，如果有錯誤就會直接顯示錯誤的內容，這樣在開發時使用會更加方便好用！

### 範例 1

首先，先傳送一個錯誤的 Message Object 給「Flex 開發人員工具」：

```json
{
  "type": "text",
  "text": "" // 漏填了 messages[0].text
}
```

然後稍等一下就會收到回傳的錯誤訊息，裡面會寫 `messages[0].text` 不能是空的。

![](https://i.imgur.com/HAhuzSl.png)

### 範例 2

接下來我們來測試傳送圖片，然後我們故意把圖片的網址填錯了：

```json
[
  {
    "originalContentUrl": "http://i.imgur.com/9CtzqdW.png",
    "previewImageUrl": "http://i.imgur.com/9CtzqdW.png",
    "type": "image"
  }
]
```

然後就可以收到網址錯誤的訊息：

![](https://i.imgur.com/VwTkCXP.png)

### 範例 3

接下來我們來測試一個比較困難的限制，就是 APNG 動圖在 Flex 訊息中不能超過 10 個的限制：

```json
{"type":"bubble","body":{"layout":"vertical","paddingAll":"10px","spacing":"xs","type":"box","contents":[{"layout":"horizontal","spacing":"xs","type":"box","contents":[{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]},{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]},{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]}]},{"layout":"horizontal","spacing":"xs","type":"box","contents":[{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]},{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]},{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]}]},{"layout":"horizontal","spacing":"xs","type":"box","contents":[{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]},{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]},{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]}]},{"layout":"horizontal","spacing":"xs","type":"box","contents":[{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]},{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]},{"flex":1,"layout":"vertical","type":"box","contents":[{"animated":true,"aspectMode":"cover","aspectRatio":"476:280","size":"full","type":"image","url":"https://i.imgur.com/l505I10.png"}]}]}]}}
```

新的 API 雖然會回傳有錯誤，但是並不會說哪邊有錯誤，還是需要自己猜測錯在哪邊：

![](https://i.imgur.com/PuXckWB.png)

## 測試貼圖能不能使用

這個是「Flex 開發人員工具」提供的另一個貼心功能，就是有些貼圖可以使用在 Messaging API 跟 LINE Notify，除了列在官方文件所提供的貼圖清單外，還有一些額外的貼圖可以使用，但是需要先行測試，除了自己寫程式呼叫 API 測試之外，你可以用均民開發的這個工具來測試[(點此查看教學文章)](https://taichunmin.idv.tw/blog/2021-04-16-linebot-test-sticker.html)。

以前這個工具所提供的 `/replySticker` 指令在發生錯誤時，機器人就不會有任何回應，但使用了這些新 API 以後，就可以正確偵測貼圖能不能使用在 reply 啦！

![](https://i.imgur.com/pw9yD9A.png)

## 後記

在試過這些新的 API 以後，發現還是有一些美中不足的地方：

第一個是這些 API 需要使用 Access Token 才能使用，代表開發者還是必須要申請一個 LINE Messaging API Channel；

第二個則是這些 API 沒有給予[跨來源資源共用（Cross-Origin Resource Sharing (CORS)）](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)的 HTTP Header，換句話說，沒辦法直接在使用者的瀏覽器內直接呼叫這些 API，開發者需要寫後端去轉送這些驗證請求的內容，所以就沒辦法開發成不用後端的小工具網頁給大家使用，畢竟 Access Token 有 Rate Limit，架設後端也會有一些費用產生；

第三個是這幾個 API 還是有些狀況檢查不到，例如上面的 APNG 動圖數量限制，以及在群組中 Message Object 會有的一些額外限制，像是 video 訊息的 `trackingId` 在群組中不能使用，但是這些 API 會檢查不出來。

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [新聞: LINE 2022/10/24 發佈的新聞](https://developers.line.biz/en/news/2022/10/24/validate-message-objects-api/) by LINE
* [原始碼: Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)
