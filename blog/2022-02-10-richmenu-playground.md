---
date: '2022-02-10T00:00:00+0800'
title: 圖文選單遊樂場中文版：超快速認識圖文選單的功能！
description: 帶你認識 LINE 圖文選單的幾大功能，如：傳訊息、傳隱藏資料、開啟網址、選擇日期與時間、切換圖文選單…等。
image: https://i.imgur.com/bM0nJFZ.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---
# 圖文選單遊樂場中文版：超快速認識圖文選單的功能！

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

LINE [在 2022/02/22 的新聞](https://developers.line.biz/en/news/2022/02/02/rich-menu-playground/)中發布了[圖文選單的遊樂場](https://lin.ee/7ALASDvA)，這個遊樂場可以讓你用最快的速度去認識圖文選單所提供的幾大功能，如：傳訊息、傳隱藏資料、開啟網址、選擇日期與時間、切換圖文選單…等，同時還有附上詳細的文件方便你可以學習如何實現這些功能。

只不過這個遊樂場只有提供日文版本，所以筆者特地把遊樂場翻譯成中文版，並且移植到[「Flex 開發人員工具」](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)中，如果你不太會日文，但又想要快速認識圖文選單有什麼功能的話，現在你也能在[「Flex 開發人員工具」](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)裡面玩到喔！

::: info 本文章的 45 分鐘影片版
本文有在「Will 保哥的技術交流中心」線上分享，[該次分享直播存檔的網址在此](https://fb.watch/biM1mKan93/)。
:::

## LINE 的圖文選單是什麼？

如果你有在用 LINE 的官方帳號，不知道你有沒有注意到像是「疾管家」或是「YouBike 微笑單車」這兩個官方帳號，在手機上打開時會出現在下方的這個選單？

| ![](https://i.imgur.com/pyP1Gmjh.jpeg) | ![](https://i.imgur.com/2adj9EFh.jpeg) |
| -------- | -------- |
|   |   |

這個選單的主要目的就是為了要用最快的速度，讓使用者知道你的官方帳號有提供什麼功能，並且可以簡單的透過點擊選單上面的按鈕來快速使用這些功能。

目前 LINE 的官方帳號有提供兩種可以設定圖文選單的方法：

![](https://i.imgur.com/DEjP5bR.png)

第一個方法是透過[「LINE Official Account Manager」](https://manager.line.biz/)來設定，這一種方法的優點是不太需要寫程式，只要透過官方提供的圖形化介面去做設定即可。

第二種方法則是要透過程式呼叫 Messaging API 來進行設定，這種方法的優點是可以進行更深度的客製化，也可以有一些第一種方法做不到的進階動作可以使用。

## 透過 LINE Official Account Manager 設定圖文選單

進到[「LINE Official Account Manager」](https://manager.line.biz/)後台之後，前往「主頁」➜「聊天室相關」➜「圖文選單」的頁面，頁面上會有一顆「建立」的按鈕可以建立圖文選單：

![](https://i.imgur.com/QxcvDUP.png)

建立選單的第一步就是要選擇圖文選單的版型，目前這個後台提供的版型大致上可以分成「大型」跟「小型」兩類，大型的最多就是 6 個按鈕，小型的最多就是 3 個按鈕，你可以根據你的需要自行選擇：

![](https://i.imgur.com/JpwXlnuh.png)

選完版型以後，下一步就是需要上傳或是建立圖文選單的圖片，如果你想要透過後台快速建立圖片的話，你可以點選「建立圖片」的按鈕：

![](https://i.imgur.com/uEvba6c.png)

點選建立圖片的按鈕以後，LINE 有提供一個簡單易用的圖形化介面給你設計圖文選單的圖片，你可以上傳整體圖文選單的底圖，或是選擇其中一格，上傳圖片、直接在上面打字或是變更按鈕的顏色：

![](https://i.imgur.com/vBpTNruh.png)

等你設計完圖文選單的圖片之後，你就需要幫圖文選單的按鈕設定按下去之後的動作，目前有這些動作可以設定，比較常用的大概就是「連結」以及「文字」：

![](https://i.imgur.com/uEvba6c.png)

## 透過 Messaging API 設定圖文選單

基本上這種方法就是要請程式設計師幫你透過 Postman 或是寫程式幫你設定圖文選單，但你可以透過本文提供的這個「圖文選單遊樂場中文版」來快速瞭解透過「Messaging API」來設定的圖文選單能玩出什麼花樣，方便你可以去思考要怎麼用這些功能，來規劃出自己想要的功能。

## 加入官方帳號「Flex 開發人員工具」

為了要使用「圖文選單遊樂場中文版」，你會需要先加入均民所開發的這個「Flex 開發人員工具」，然後輸入指定的關鍵字才能啟用。

[![](https://i.imgur.com/cP5purz.png)](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)

加入好友: <https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk>

## 啟用圖文選單遊樂場

::: info 在「Flex 開發人員工具」啟用圖文選單遊樂場
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

在 `1. message` 這個分頁中，你可以測試 [message 動作](https://developers.line.biz/en/reference/messaging-api/#message-action)，這個動作基本上就是幫使用者輸入一個你預先指定的文字，然後你的 Webhook 就能知道使用者輸入的文字是什麼，[如果想看這個動作的原始碼可以點此觀看](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-1.js)。

![](https://i.imgur.com/xuna4zV.png)

### postback 動作

在 `2. postback` 這個分頁中，你可以測試 [postback 動作](https://developers.line.biz/en/reference/messaging-api/#postback-action)，當使用者點一下按鈕時，Webhook 就會收到一個 postback 事件，同時 `data` 的資料也會被傳送給 Webhook。[如果想看這個動作的原始碼可以點此觀看](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-2.js)。

![](https://i.imgur.com/iRbnMTT.png)

如果你有設定 `displayText` 這個屬性，當使用者按下按鈕後，在聊天室裡面就會顯示 `displayText` 裡面的文字，但是這個文字不會被傳給 Webhook。

### URI 動作

在 `3. URI` 這個分頁中，你可以測試 [URI 動作](https://developers.line.biz/en/reference/messaging-api/#uri-action)，當使用者按下按鈕之後，LINE APP 就會根據網址來開啟對應的瀏覽器，你也可以按下右邊的「查看網址」來取得該按鈕的網址設定。[如果想看這個動作的原始碼可以點此觀看](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-3.js)。

![](https://i.imgur.com/phSK2zz.png)

### 選擇日期與時間的動作

在 `4. 選擇日時` 這個分頁中，你可以測試 [datetime picker 動作](https://developers.line.biz/en/reference/messaging-api/#datetime-picker-action)，當使用者按下按鈕以後，就會先跳出系統內建的日期與時間選擇器，在使用者選擇以後，Webhook 就會收到一個 postback 事件，裡面會有使用者所選擇的日期與時間，同時 `data` 的資料也會被傳送給 Webhook。你還可以設定日期與時間選擇器的初始值跟上下限的設定。[如果想看這個動作的原始碼可以點此觀看](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-4.js)。

![](https://i.imgur.com/GjSm4C0.png)

### 切換圖文選單的動作

在 `5. 切換選單` 這個分頁中，你可以測試 [richmenu switch 動作](https://developers.line.biz/en/reference/messaging-api/#richmenu-switch-action)，當使用者按下按鈕以後，就會切換到擁有指定 alias 的圖文選單，同時 Webhook 就會收到一個 postback 事件，裡面會有使用者所切換的圖文選單目標，同時 `data` 的資料也會被傳送給 Webhook。

![](https://i.imgur.com/0KBhjYO.png)

![](https://i.imgur.com/YoOvVYl.png)

想要在不同大小的的圖文選單之間切換也沒問題，你可以按下「換成小型選單」進行測試：

![](https://i.imgur.com/v4EC2Y7.png)

你可以點此觀看這三個圖文選單的程式碼：

1. [綠色圖文選單](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-5.js)
2. [藍色圖文選單](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-6.js)
3. [小型圖文選單](https://github.com/taichunmin/gcf-line-devbot/blob/master/richmenu/playground-7.js)

## 原始碼與相關連結

::: info
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
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
