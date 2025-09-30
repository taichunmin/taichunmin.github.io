---
date: '2023-05-20T00:00:00+0800'
title: 想知道自己的數位版名片被多少裝置看過嗎？
description: 帶你認識最近做出來的曝光次數報表，它可以幫助你評估名片的吸引力並計算成本，趕快點擊連結，探索數位版名片的新功能吧！
image: https://hackmd.io/_uploads/S16W0EUH3.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# 想知道你的數位版名片被多少裝置瀏覽過嗎？

![](https://hackmd.io/_uploads/S16W0EUH3.png)

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

相較於一般的紙本名片，數位版名片有一個重要的優點，就是能夠追蹤你的名片及宣傳被多少裝置瀏覽過。這有助於評估你的名片是否具有吸引力，並幫助你優化名片內容，同時計算每次曝光的成本。

均民兩年前在開發這個專案時，就有為每個免費樣板都使用了 Google Analytics 3（簡稱GA3）進行追蹤。然而，GA3 免費版只能在 GA 內建的後台中查看數據，這個後台需要使用 Google 帳號登入，因此無法公開提供給大家自由查詢。

最近，由於 GA3 即將停用，所以均民花了一些時間將追蹤程式改為 Google Analytics 4（簡稱GA4）。由於 GA4 提供了免費的匯出至 BigQuery 功能，均民利用這個功能創建了一份報表。如果你是使用免費樣板製作名片，你可以輕鬆通過這份報表自由查看曝光數量的統計報表。

## LINE 數位版名片 曝光次數報表

::: info 想知道你的數位版名片被多少裝置瀏覽過嗎？
> 目前這份報表仍是測試版，因為均民需要幾個月的時間觀察報表的穩定度以及成本。如果成本過高，可能會決定取消此報表。
* [點我前往 LINE 數位版名片 曝光次數報表](https://lihi2.com/F2Xgb/blog)
:::

請點擊上方的曝光次數報表連結，你將看到以下畫面：

![](https://hackmd.io/_uploads/Bk8YYXPSn.png)

此報表從 2023/05/11 開始收集曝光記錄，曝光記錄的統計資料每天會更新至報表中。曝光記錄的時區為 UTC+0，統計資料的更新可能會有 2 到 4 天的延遲。你可以在報表左上方選擇自己想查看的日期範圍：

![](https://hackmd.io/_uploads/rJBRKmDSh.png)

![](https://hackmd.io/_uploads/BynecmDH2.png)

在日期範圍控制項下方，是曝光次數前 10 名的日期與曝光次數折線圖：

![](https://hackmd.io/_uploads/B1FFi7wH2.png)

接下來的表格是曝光次數的詳細數據，你可以透過點擊表格的欄位名稱來自由調整排序方式：

![](https://hackmd.io/_uploads/HyUNnmDS2.png)

如果你想下載原始資料以進一步處理，可以在右上角的更多按鈕中找到「匯出」功能：

![](https://hackmd.io/_uploads/BJOb6mwrn.png)

![](https://hackmd.io/_uploads/BJEnpmwH2.png)

![](https://hackmd.io/_uploads/BkVaTXwHh.png)

如果對於曝光記錄報表有任何問題或建議，歡迎加入「數位版名片技術討論」社群一起討論！社群加入連結在文章底部。

## 曝光次數表格欄位說明

首先，我們來看「名片名稱+樣板名稱」欄位。基本上，名片名稱是根據樣板的程式碼生成的。例如，樣板「多頁訊息 1」會自動將第一張卡片的標題文字設定為名片名稱。

![](https://hackmd.io/_uploads/HkKUC7Drh.png)

接下來是「裝置曝光數」欄位。這個數字是計算名片曝光的裝置數量，而不是使用者數量。當分享名片時，程式會為名片生成一個透明追蹤圖片，當裝置讀取該圖片時，曝光數就會增加 1。由於這個圖片會被裝置快取，因此短時間內的曝光次數不會被重複計算。

這個透明追蹤圖片是根據「分享人」和「名片內容」產生的。因此，如果名片被不同人多次分享，或者名片內容被修改，裝置曝光數將再次被計算。

![](https://hackmd.io/_uploads/rJ-D0mDS2.png)

「不重複分享人」欄位可以追蹤分享名片的人數。如果數量很多，可能代表你的名片有病毒式擴散的現象。由於報表每天更新一次，該欄位實際上是每天不重複分享人數的總和。如果你查看的報表時間跨越多天，該欄位將是多天數量的總和。

![](https://hackmd.io/_uploads/Hk9wAQvSh.png)

「總天數」欄位表示名片有多少天的曝光記錄。該欄位只計算不重複的數量，因此曝光記錄的日期不一定是連續的。

![](https://hackmd.io/_uploads/HJ7_CXDSn.png)

「名片版本數」欄位表示名片有多少個版本的曝光記錄。程式根據「名片內容」生成一個指紋，然後計算不重複的版本指紋數量。如果你多次修改名片，這個數字就會增加。

![](https://hackmd.io/_uploads/SJTuCXwrh.png)

## 「數位版名片技術討論」社群

最近均民創立了一個社群，讓有使用數位版名片的網友可以在上面一起討論，群組內有一些常見問題的回答、名片健檢、以及跟這專案有關的最新消息，入群連結在此：<https://lihi1.com/CVjIx/blog>！

![](https://i.imgur.com/ylxMnwZ.png)

## 原始碼與相關連結

::: info
本文範例程式的原始碼授權為 MIT License，若您有任何疑惑，你可以[點此加入「數位版名片技術討論群」](https://lihi1.com/CVjIx/blog)然後在社群內發問。
:::

* [免費樣版網站 - LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)
* [原始碼 - LINE 數位版名片](https://github.com/taichunmin/liff-businesscard)
* [點此加入「數位版名片技術討論群」](https://lihi1.com/CVjIx/blog)
* [看起來很專業的 LINE 數位版名片](https://taichunmin.idv.tw/blog/2020-07-12-liff-businesscard.html)
* [不用寫程式也能做 LINE 數位版名片](https://taichunmin.idv.tw/blog/2020-07-21-liff-businesscard.html)
* [LINE 數位版名片工作坊](https://taichunmin.idv.tw/blog/2020-10-14-liff-businesscard-workshop.html)
* [快速測試 LINE Flex 訊息在手機上顯示的寬度](https://taichunmin.idv.tw/blog/2021-09-10-line-flex-width.html)
* [數位版名片帶你蹭一波 ChatGPT](https://taichunmin.idv.tw/blog/2023-04-18-liff-businesscard-chatgpt.html)
