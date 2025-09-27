---
date: '2022-05-14T00:00:00+0800'
title: 新功能：在官方帳號開關選單、切換文字或語音輸入
description: 在圖文選單遊樂場中快速體驗 inputOption 的魅力吧！
image: https://i.imgur.com/P7FQj9p.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# 新功能：在官方帳號開關選單、切換文字或語音輸入

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

LINE 在 2022/05/13 針對開發者發布了一個新功能[（查看英文公告）](https://developers.line.biz/en/news/2022/05/13/richmenu-keyboard/)，讓使用者在官方帳號的圖文選單、Flex 訊息或 quickReply 中按下有 postback 動作的按鈕時，可以幫使用者切換以下幾種輸入方式：

1. 開啟圖文選單
2. 關閉圖文選單
3. 切換文字輸入
4. 切換語音輸入

均民也在自己所開發的官方帳號「Flex 開發人員工具」加上相關範例以及應用，本文就是來帶你快速測試這個新功能！

## 加入官方帳號「Flex 開發人員工具」

本文會使用均民自己所開發的官方帳號「Flex 開發人員工具」進行測試，如果你也想要跟著嘗試看看的話，請掃描以下 QR Code 加入好友吧！

[![](https://i.imgur.com/cP5purz.png)](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)

加入好友: <https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk>

## 啟用圖文選單遊樂場

::: tip 在「Flex 開發人員工具」啟用圖文選單遊樂場
如果你正在使用手機，你可以直接[點此並送出文字](https://line.me/R/oaMessage/@736cebrk/?%2FrichmenuPlayground)。你也可以用手機在「Flex 開發人員工具」中直接送出 `/richmenuPlayground` 指令。
:::

如果想要測試 postback 動作的 inputOption 屬性，你可以直接透過均民製作的「圖文選單遊樂場」範例來體驗，啟用圖文選單遊樂場步驟如下：

1. 在手機上開啟上方連結
2. 如果還沒加入請先加入官方帳號
3. 點選「送出」按鈕送出文字
4. 點選「開啟選單」按鈕
5. 切換到「postback 動作」的分頁
6. 點選「測試 inputOption 屬性」按鈕

![](https://i.imgur.com/Bu9Ofdh.jpg)

## 測試 inputOption 屬性

在「測試 inputOption 屬性」的範例中，左上角的按鈕可以切換成文字輸入，右上角的按鈕可以切換成語音訊息，下方按鈕則是按下去會關閉圖文選單，並且額外傳送一個「測試 inputOption 屬性」的 Flex 訊息。

![](https://i.imgur.com/VG5R2jn.png)

在這個 Flex 訊息中，除了剛剛的三個按鈕之外，還額外多了一個開啟圖文選單的按鈕可以測試。此外，這個 Flex 訊息也同時提供了 quickReply 版本的按鈕可以測試 inputOption 屬性。

![](https://i.imgur.com/BkWuXoZ.jpg)

## openKeyboard 還可以指定預設文字

在 openKeyboard 的功能中，還可以透過 `fillInText` 功能來填寫預設文字，這個功能其實跟 LINE URL Scheme 中的 Send text messages 功能[（查看英文文件）](https://developers.line.biz/en/docs/line-login/using-line-url-scheme/#sending-text-messages)很類似，但這個功能會多送 postback 中的 data 給伺服器：

![](https://i.imgur.com/pnDunVe.png)

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [新聞: LINE 2022/05/13 發佈的新聞](https://developers.line.biz/en/news/2022/05/13/richmenu-keyboard/) by LINE
* [原始碼: Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)
* [文章: 圖文選單遊樂場中文版：超快速認識圖文選單的功能！](https://taichunmin.idv.tw/blog/2022-02-10-richmenu-playground.html)
