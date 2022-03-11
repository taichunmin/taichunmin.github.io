---
date: '2022-02-10T00:00:00+08'
title: 圖文選單遊樂場中文版：超快速認識圖文選單的功能！
description: 帶你認識 LINE 圖文選單的幾大功能，如：傳訊息、傳隱藏資料、開啟網址、選擇日期與時間、切換圖文選單…等。
image: https://i.imgur.com/jBawKfE.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---
# 圖文選單遊樂場中文版：超快速認識圖文選單的功能！

LINE [在 2022/02/22 的新聞](https://developers.line.biz/en/news/2022/02/02/rich-menu-playground/)中發布了[圖文選單的遊樂場](https://lin.ee/7ALASDvA)，這個遊樂場可以讓你用最快的速度去認識圖文選單所提供的幾大功能，如：傳訊息、傳隱藏資料、開啟網址、選擇日期與時間、切換圖文選單…等，同時還有附上詳細的文件方便你可以學習如何實現這些功能。

只不過這個遊樂場只有提供日文版本，所以筆者特地把遊樂場翻譯成中文版，並且移植到[「Flex 開發人員工具」](https://line.me/R/ti/p/@736cebrk)中，如果你不太會日文，但又想要快速認識圖文選單有什麼功能的話，現在你也能在[「Flex 開發人員工具」](https://line.me/R/ti/p/@736cebrk)裡面玩到喔！

## 加入官方帳號「Flex 開發人員工具」

[![](https://i.imgur.com/cP5purz.png)](https://line.me/R/ti/p/@736cebrk)

加入好友: <https://line.me/R/ti/p/@736cebrk>

## 啟用圖文選單遊樂場

::: tip 在「Flex 開發人員工具」啟用圖文選單遊樂場
如果你正在使用手機，你可以直接[開啟這個連結並送出文字](https://line.me/R/oaMessage/@736cebrk/?%2FrichmenuPlayground)。你也可以用手機在「Flex 開發人員工具」中直接送出 `/richmenuPlayground` 指令。
:::

請在手機上開啟上方連結後，按一下送出按鈕送出指令，等到程式回傳選單設定成功後，就可以把圖文選單打開：

![](https://i.imgur.com/tEaTFwo.jpeg)

## 圖文選單遊樂場的通用功能介紹

![](https://i.imgur.com/nphVkd8.jpg)

這個遊樂場的圖文選單上，有幾個通用的功能可以使用：

1. 點這幾個分頁可以切換到該動作進行測試
2. 點此可以切換更多可以測試的動作
3. 點此查看該動作的更多說明文件
4. 把這個圖文選單遊樂場結束掉

順帶一提，由於「Flex 開發人員工具」原本就會回傳事件的 JSON，所以這邊就保持原樣，沒有跟圖文選單遊樂場日文版同步。

![](https://i.imgur.com/crhSVEC.png)

## 目前可以在圖文選單遊樂場中測試的動作

### message 動作

在 `1. message` 這個分頁中，你可以測試 [message 動作](https://developers.line.biz/en/reference/messaging-api/#message-action)，你也可以點此觀看[這個圖文選單的程式碼](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-1.js)。

![](https://i.imgur.com/JDmkmjC.png)

### postback 動作

在 `2. postback` 這個分頁中，你可以測試 [postback 動作](https://developers.line.biz/en/reference/messaging-api/#postback-action)，當使用者點一下按鈕時，Webhook 就會收到一個 postback 事件，同時 `data` 的資料也會被傳送給 Webhook。你可以點此觀看[這個圖文選單的程式碼](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-2.js)。

![](https://i.imgur.com/mI9ejk6.png)

如果你有設定 `displayText` 這個屬性，當使用者按下按鈕後，在聊天室裡面就會顯示 `displayText` 裡面的文字，但是這個文字不會被傳給 Webhook。

### URI 動作

在 `3. URI` 這個分頁中，你可以測試 [URI 動作](https://developers.line.biz/en/reference/messaging-api/#uri-action)，當使用者按下按鈕之後，LINE APP 就會根據網址來開啟對應的瀏覽器，你也可以按下右邊的「查看網址」來取得該按鈕的網址設定。你可以點此觀看[這個圖文選單的程式碼](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-3.js)。

![](https://i.imgur.com/pp0hGsm.png)

### 選擇日期與時間的動作

在 `4. 選擇日時` 這個分頁中，你可以測試 [datetime picker 動作](https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action)，當使用者按下按鈕以後，就會先跳出系統內建的日期與時間選擇器，在使用者選擇以後，Webhook 就會收到一個 postback 事件，裡面會有使用者所選擇的日期與時間，同時 `data` 的資料也會被傳送給 Webhook。你還可以設定日期與時間選擇器的初始值跟上下限的設定。你可以點此觀看[這個圖文選單的程式碼](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-4.js)。

![](https://i.imgur.com/byzB9sn.png)

### 切換圖文選單的動作

在 `5. 切換選單` 這個分頁中，你可以測試 [richmenu switch 動作](https://developers.line.biz/en/reference/messaging-api/#richmenu-switch-action)，當使用者按下按鈕以後，就會切換到擁有指定 alias 的圖文選單，同時 Webhook 就會收到一個 postback 事件，裡面會有使用者所切換的圖文選單目標，同時 `data` 的資料也會被傳送給 Webhook。

![](https://i.imgur.com/0rg07pn.png)

![](https://i.imgur.com/gcXGaGd.png)

想要在不同大小的的圖文選單之間切換也沒問題，你可以按下「換成小型選單」進行測試：

![](https://i.imgur.com/6AA2R40.png)

你可以點此觀看這三個圖文選單的程式碼：

1. [綠色圖文選單](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-5.js)
2. [藍色圖文選單](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-6.js)
3. [小型圖文選單](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-7.js)

## 原始碼與相關連結

::: tip
本文範例程式的原始碼授權為 MIT License，如果有疑問可以透過 [Facebook](https://www.facebook.com/taichunmin) 跟我交流。
:::

* [新聞: LINE 2022/02/22 發佈的新聞](https://developers.line.biz/en/news/2022/02/02/rich-menu-playground/) by LINE
* [原始碼: Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)
* [文章: LINE 專屬的 Flex 訊息第三版更新](https://taichunmin.idv.tw/blog/2022-03-11-line-flex-message-v3.html)
* [文章: 快速測試 LINE Flex 訊息在手機上顯示的寬度](https://taichunmin.idv.tw/blog/2021-09-10-line-flex-width.html)
* [文章: LINE 官方帳號全都能用的多層選單功能](https://taichunmin.idv.tw/blog/2021-06-22-linebot-richmenu-alias.html)
* [文章: 快速測試 LINE 官方帳號及 Notify 能傳送的貼圖](https://taichunmin.idv.tw/blog/2021-04-16-linebot-test-sticker.html)
* [文章: Quick Reply 支援 URI Action](https://taichunmin.idv.tw/blog/2021-03-11-line-quickreply-uri.html)
* [文章:「Flex 開發人員工具」支援 mention 新功能](https://taichunmin.idv.tw/blog/2021-01-20-line-devbot-mention.html)
* [文章: LINE Simple Beacon for ESP32 工作坊](https://taichunmin.idv.tw/blog/2020-07-13-line-simple-beacon-workshop.html)
* [文章: 如何在 LIFF 傳送隱藏資料給機器人](https://taichunmin.idv.tw/blog/2020-04-07-line-liff-send-hidden-data.html)
* [文章: 輔助開發 LINE Flex 訊息的工具](https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html)
