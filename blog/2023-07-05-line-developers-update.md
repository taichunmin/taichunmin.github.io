---
date: '2023-07-05T00:00:00+0800'
title: (新功能) 大量替換或取消連結用戶的圖文選單
description: LINE 最近發佈了幾個新功能，包含可以大量更換用戶的圖文選單，以及 Flex 訊息第 4 版更新。
image: https://hackmd.io/_uploads/BkqYZyGYh.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# (新功能) 大量替換或取消連結用戶的圖文選單

![](https://hackmd.io/_uploads/BkqYZyGYh.png)

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

LINE 在 2023/7/4 發佈了幾個跟官方帳號開發者有關的新功能：（查看英文[公告1](https://developers.line.biz/en/news/2023/07/04/messaging-api-updated/)、[公告2](https://developers.line.biz/en/news/2023/07/04/flex-message-update-4-released/)）

1. 可以用更簡單的方式大量更換用戶的圖文選單
2. Flex 訊息支援更多的卡片尺寸
3. Flex 訊息內的文字大小可以根據用戶的設定自動縮放

以下是均民針對這幾個新功能的介紹。

## 大量更換用戶的圖文選單

這次 LINE 發佈了三個跟圖文選單有關的新 API，分別是：

1. 大量替換或取消連結用戶的圖文選單
2. 取得執行狀態 (針對大量控制圖文選單的 API)
3. 驗證輸入資料 (針對大量控制圖文選單的 API)

### 大量替換或取消連結用戶的圖文選單[（官方文件）](https://developers.line.biz/en/reference/messaging-api/#batch-control-rich-menus-of-users)

你可以透過這個新的 API 針對用戶的圖文選單進行以下的操作：

1. 將所有連結到圖文選單 A 的用戶全部替換成圖文選單 B
2. 將所有連結到圖文選單 A 的用戶全部取消連結
3. 取消連結所有用戶的圖文選單

以前如果想要大量替換或把用戶的圖文選單取消連結，你需要在 API 內指定所有用戶的 `userId`，除了要記錄所有用戶的 `userId` 以外，你還需要用資料庫來記錄用戶目前所在的圖文選單，這樣才能夠去判斷要替換哪些用戶的圖文選單；現在透過這個 API 你只需要指定 `richMenuId` 即可。

這個 API 有一個需要特別注意的地方是，一次請求允許指定多個圖文選單的操作，這些操作會以用戶為單位進行並行處理。

如果想要知道有關這個 API 的更多說明，請[查看官方文件](https://developers.line.biz/en/reference/messaging-api/#batch-control-rich-menus-of-users)。

### 取得執行狀態 (針對大量控制圖文選單的 API)[（官方文件）](https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status)

因為大量控制圖文選單的 API 通常沒辦法在短時間內執行完成，所以這個請求會在背景非同步執行，你可以使用這個 API 來取得該請求的執行狀態。你最多可以取得過去 14 天以內（336 小時）的執行狀態。

如果想要知道有關這個 API 的更多說明，請[查看官方文件](https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status)。

### 驗證輸入資料 (針對大量控制圖文選單的 API)[（官方文件）](https://developers.line.biz/en/reference/messaging-api/#validate-batch-control-rich-menus-request)

這個 API 可以在送出正式請求之前先驗證輸入的資料，由於大量控制圖文選單的 API 有呼叫的頻率限制，透過使用這個 API 可以提前驗證輸入資料的正確性。

如果想要知道有關這個 API 的更多說明，請[查看官方文件](https://developers.line.biz/en/reference/messaging-api/#validate-batch-control-rich-menus-request)。

### 如何正確的重新執行大量控制圖文選單的 API[（官方文件）](https://developers.line.biz/en/news/2023/07/04/messaging-api-updated/#bach-control-example-20230704)

在官方文件中有提到，可以透過指定 `resumeRequestKey`，來確保大量控制圖文選單的 API 可以在發生錯誤時，應該如何正確的重新執行，詳情請[查看官方文件](https://developers.line.biz/en/news/2023/07/04/messaging-api-updated/#bach-control-example-20230704)。

## Flex 訊息第 4 版更新

以下是 LINE 這次針對 Flex 訊息的更新內容，但目前 Flex 訊息模擬器對於以下的新功能只有部分支援，建議可以透過均民開發的[「Flex 開發人員工具」](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)進行實測喔！

### Flex 訊息支援更多的卡片尺寸[（官方文件）](https://developers.line.biz/en/reference/messaging-api/#bubble)

這次的更新幫 Flex 訊息新增了兩個卡片的尺寸：`deca` 以及 `hecto`，卡片的尺寸由小到大排列後依序為：`nano`、`micro`、`deca`、`hecto`、`kilo`、`mega` 以及 `giga`。

均民之前在[「快速測試 LINE Flex 訊息顯示的寬度」](https://taichunmin.idv.tw/blog/2021-09-10-line-flex-width.html)這篇文章中分享過如何測試寬度，下圖是加上兩個新卡片尺寸後的測試結果：

![](https://hackmd.io/_uploads/SkjOuRZFn.png)

如果想知道如何實測，可以查看均民之前寫的[「快速測試 LINE Flex 訊息顯示的寬度」](https://taichunmin.idv.tw/blog/2021-09-10-line-flex-width.html)這篇文章。

如果想要知道這個功能的詳細說明，請[查看官方文件](https://developers.line.biz/en/reference/messaging-api/#bubble)。

### Flex 訊息內文字可以根據用戶的設定自動縮放[（官方文件）](https://developers.line.biz/en/docs/messaging-api/flex-message-layout/#size-scaling)

有時候用戶會在 LINE APP 中設定文字大小，只要設定 `"scaling": true` 以後，訊息內的文字大小就會根據用戶的設定自動縮放。

![](https://hackmd.io/_uploads/SywfGCbt3.png)

如果想要知道這個功能的詳細說明，請[查看官方文件](https://developers.line.biz/en/docs/messaging-api/flex-message-layout/#size-scaling)。

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [新聞: LINE 2023/7/4 發佈的公告 1](https://developers.line.biz/en/news/2023/07/04/messaging-api-updated/)
* [新聞: LINE 2023/7/4 發佈的公告 2](https://developers.line.biz/en/news/2023/07/04/flex-message-update-4-released/)
* [「快速測試 LINE Flex 訊息顯示的寬度」](https://taichunmin.idv.tw/blog/2021-09-10-line-flex-width.html)
