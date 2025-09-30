---
date: '2023-03-11T00:00:00+0800'
title: 快速產生 LINE 網址的小工具
description: 使用 LINE 網址讓你可以直接打開 LINE 的指定畫面或執行 LINE 的某些功能。
image: https://i.imgur.com/IAJNOjV.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

![](https://i.imgur.com/IAJNOjV.png)

# 快速產生 LINE 網址的小工具

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

在開發 LINE 聊天機器人時，除了使用 Messaging API 以及 LINE Front-end Framework (LIFF) 之外，不知道你還知不知道有 [LINE URL scheme](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/) 可以使用呢？

[LINE URL scheme](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/) 這功能在 Android 及 iOS 上面都能使用，主要功能就是讓你在使用手機的瀏覽器或 LINE 時，可以直接打開 LINE 的指定畫面或執行 LINE 的某些功能，但在電腦上的 LINE 支援度比較差。

為了讓非程式背景的人或初學者能快速認識這個功能，均民這次特地開發了一個小工具，讓你不用寫程式就能快速產生 [LINE URL scheme](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/) 進行測試，快來看看要如何使用吧！

## 加入官方帳號「Flex 開發人員工具」

在接下來的文章中均民會以「Flex 開發人員工具」來進行示範，還沒加入的朋友可以用下面的連結馬上加入喔！

[![](https://i.imgur.com/cP5purz.png)](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)

加入好友: <https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk>

## 產生器使用教學

::: info LINE 網址產生器
* 網址：<https://taichunmin.idv.tw/pug/line-url-generator.html>
:::

開啟上方的網址後，你應該會看到的畫面如下：

![](https://i.imgur.com/xOlyqeG.png)

一開始你會需要選擇一個你想要的 LINE 網址類型。你可以點一下那個按鈕來查看目前產生器支援的所有網址類型。

每個網址類型的第一行是名稱，在名稱的下方會有一些標籤，代表這個網址類型所支援的平台及聊天室（如：`手機 官帳` 代表可以在手機內的官方帳號中使用），在標籤下方則是這個 LINE 網址類型的說明。

![](https://i.imgur.com/JyXf7SH.png)

網址類型的下方有「說明文件」按鈕，點選按鈕就可以前往官方提供的 [LINE URL scheme](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/) 英文版說明文件。

![](https://i.imgur.com/ZpmkVTc.png)

預覽網址的下面有幾個藍色按鈕，這些按鈕都是用來輔助測試網址支援度：

1. 點一下「打開」按鈕就會直接開啟網址，在網頁上直接開啟視同在聊天室外開啟，你可以在手機及電腦上都測試看看。
2. 點一下「複製」按鈕，就會把網址複製到剪貼簿內，你可以把網址貼到你想測試的地方。
3. 第三顆「分享」按鈕會使用瀏覽器內建的分享功能，如果你的瀏覽器有支援的話，就可以直接把網址分享到別的應用程式內測試能否正常開啟。
4. 第四顆「透過 LINE 傳送網址」可以直接把網址傳送給所選的聊天室，讓你可以快速測試網址在各種不同類型聊天室中的支援度。

![](https://i.imgur.com/MKMRUT8.png)

在介紹完產生器的使用教學後，均民要來介紹幾種比較特別的網址類型：

## 傳送文字訊息

這個網址類型允許填上一段文字訊息，然後使用者點選後，就可以選擇把這個文字訊息傳送給誰，你也可以直接指定使用者點選後就把文字訊息傳送給指定的官方帳號，產生器下方的「透過 LINE 傳送網址」的按鈕也是透過這個網址來實現的：

![](https://i.imgur.com/WU1edNV.png)

## 指定方式開網址

你可以指定使用者在 LINE 中打開網址時是否要使用外部瀏覽器開啟，在某些功能上可以有效的增加使用者體驗，如直接開啟 Google 地圖的連結。

![](https://i.imgur.com/eu3imzj.png)

## 分享官方帳號

均民寫的這個產生器，目前蒐集了 5 種可以靠官方帳號 ID 產生的分享官方帳號網址，每個種類的支援度不盡相同，可以根據你的需求來選擇：

![](https://i.imgur.com/CqZ6tYP.png)

以「Flex 開發人員工具」的官方帳號 ID `@736cebrk` 為例，產生的網址如下：

```
https://line.me/R/ti/p/@736cebrk

https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk

https://page.line.me/?accountId=736cebrk

https://line.me/R/ti/p/~@736cebrk

https://line.me/R/nv/recommendOA/@736cebrk
```

其中有一個網址還能支援使用者的 LINE ID，可以用來產生固定的加入好友連結，但缺點是如果網址外流，你的 LINE ID 就會洩漏：

![](https://i.imgur.com/dv25EOp.png)

## 傳送位置資訊

這個網址類型只能在手機的官方帳號中使用，它可以讓使用者傳送所選的位置資訊給 Webhook，除了使用這個網址之外，你還可以使用 Messaging API 的 QuickReply 訊息做到類似的功能。

![](https://i.imgur.com/RLjxFQB.png)

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [LINE URL scheme](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/)
* [原始碼: Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)
* [原始碼: LINE 網址產生器](https://github.com/taichunmin/pug/blob/master/src/line-url-generator.pug)
