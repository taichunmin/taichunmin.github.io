---
date: '2023-01-17T00:00:00+0800'
title: LINE 機器人的 replyToken 多久失效？實測告訴你！
description: 「Flex 開發人員工具」新功能！讓你可以快速實測 LINE 機器人的 replyToken 至少可以用多久。
image: https://i.imgur.com/Fwt31tF.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# LINE 機器人的 replyToken 多久失效？實測告訴你！

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

在 2022/04/19 時，LINE 曾經發佈過 Webhook 訊息重送的機制，當時[均民有寫過一篇文章](https://taichunmin.idv.tw/blog/2022-04-21-line-developers-update.html)實測過 Webhook 會重送幾次訊息，以及重送訊息的間隔。

但最近突然想到，好像也應該來測試一下 replyToken 到底多久以後會失效，所以均民特地把這個新功能加到「Flex 開發人員工具」上。

## 加入官方帳號「Flex 開發人員工具」

均民所開發的「Flex 開發人員工具」除了有這次新增的功能之外，也能夠輔助你開發 LINE 機器人喔，如果你也想要跟著嘗試看看的話，請掃描以下 QR Code 加入好友吧！

[![](https://i.imgur.com/cP5purz.png)](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)

加入好友: <https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk>

## 新增測試 replyToken 的指令

由於 replyToken 的失效時間在 LINE 的文件中沒有明確寫出來，代表這個時間很有可能會因時而異，你實測所得到的測試結果也只能代表當時的情況，可能每過一段時間後就需要重新測試一次。

因此均民特別在「Flex 開發人員工具」上面新增了一個可以測試 replyToken 失效時間的指令：

```
/replyAfterSleep [毫秒]
```

你會需要把上面指令內的 `[毫秒]` 替換成一個你想測試的延遲時間 (單位：毫秒)，然後傳送給機器人即可。

## 實測結果

在均民撰寫這篇文章的時候，replyToken 的失效時間至少不小於 16.5 分鐘，這應該是足以應付大部分的使用情境了。

<img src="https://i.imgur.com/yDMpsO3.png" style="width: 480px">

美中不足的是，均民並沒有實際測試出實際的上限，因為均民的「Flex 開發人員工具」架設在「GCP Cloud Function」上，為了避免收費過高，所以是利用重送機制來實作這個功能，所以能夠測試的時間上限會受到訊息重送機制的限制。

再次提醒，這個測試結果也只能代表當時的情況，replyToken 失效時間很有可能會因時而異，你可以每過一段時間就使用這個指令再次進行測試。

> 2023/09/27 補充：感謝網友「🔝決☀品村」的回饋，replyToken 有效時間有可能是 20 分鐘，但考量到可能的網路延遲，所以保守估計最多可以把 replyToken 保留 19 分鐘以便後續利用。

## 搭配後台關鍵字回覆提升使用者體驗

如果你的官方帳號有一些處理時間比較久的功能，你可以考慮使用 LINE Official Account Manager 所提供的關鍵字功能，先回覆一個訊息讓使用者耐心等候，然後等處理完成以後，再回覆訊息給使用者，範例如下：

![](https://i.imgur.com/OIe5cTX.png)

<img src="https://i.imgur.com/qLBevQe.png" style="width: 480px">

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [近期 LINE 針對開發者的更新：驗證圖文選單、LIFF 插件、Webhook 重送機制](https://taichunmin.idv.tw/blog/2022-04-21-line-developers-update.html)
* [原始碼: Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)
