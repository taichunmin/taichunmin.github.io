---
date: '2023-04-18T00:00:00+0800'
title: 數位版名片帶你蹭一波 ChatGPT
description: LINE 數位版名片讓你可以在 LINE 上模擬 ChatGPT 的問答，吸引使用者的注意力！
image: https://i.imgur.com/ueCT5VO.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# 數位版名片帶你蹭一波 ChatGPT

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

最近 ChatGPT 紅極一時，許多人會在社群媒體上分享如何使用 ChatGPT，於是均民想到可以在「LINE 數位版名片」中新增一個樣板，讓使用者可以模擬 ChatGPT 的問答畫面，吸引使用者的注意力，讓你的廣告效果更上一層樓。

## 幫你要打廣告的東西想文案

首先，你需要先想一個吸引人的文案，均民先針對 LINE 數位版名片寫出了一個文案如下：

```
LINE 數位版名片是一個可以在 LINE 這個通訊軟體上分享圖文並茂的名片或廣告傳單給群組或你的好友，LINE 目前在台灣已經是市佔率極高的通訊軟體，好好運用這個免費且開源的工具，你的名片或產品絕對會讓人眼睛一量！除此之外，還可以追蹤分享出去後的觀看數，或是寫簡單的程式一次幫全公司的同事製作名片喔！
```

接下來，你需要設計一個吸引人的問答文案，這個文案要讓使用者覺得像是在和 ChatGPT 互動，引起他們的興趣並吸引他們繼續閱讀。

所以這種事情我們就交給 ChatGPT 來做，以下是我寫的提示語法：

```
請先模擬成一個使用者寫一個五十個字以內的問句來問 ChatGPT，然後再根據剛剛的問句產生一個五十個字以內的回答，內容需要結合我產品的特色，並且要盡量避免內容看起來像是廣告。以下是我的產品的相關介紹：

// 省略
```

然後 ChatGPT 很快速的就幫我產生好文案如下圖：

![](https://i.imgur.com/wdf26CO.png)

但我想要 ChatGPT 幫我強調免費的這個特色，於是我就請 ChatGPT 再幫我改一下：

![](https://i.imgur.com/eRugK9x.png)

雖然結果可能不太完美，字數也有點出入，但我們先用這份結果來繼續進行下一個步驟吧！

## 建立測試用群組來測試實際結果

::: info 筆者開發的測試用機器人
[![](https://i.imgur.com/cP5purz.png)](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)
加入好友: <https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk>
:::

在開始製作之前，建議大家可以建立一個測試名片用的群組。

因為這個程式內建的預覽的功能會跟實際在手機上顯示的結果有落差，建議先分享名片到這個測試用群組，測試過後再把名片分享出去。

![](https://i.imgur.com/8MMJ4RV.png)

為了要建立一個自己私有的測試群組，除了把親戚朋友拖下水之外，你其實可以把一個任意的官方帳號加入群組中，在此推薦筆者的「Flex 開發人員工具」，你可以點上方連結加入好友。

加入「Flex 開發人員工具」好友以後，你接下來就會需要建立一個群組，幫群組取一個好記的名字（以 `DEV 群組` 為例），並且把「Flex 開發人員工具」邀請到群組內：

| ![](https://i.imgur.com/o8ifoN8.png) | ![](https://i.imgur.com/70QA0HK.png) |
| ------------------------------------ | ------------------------------------ |
|                                      |                                      |

如果加入成功以後，你應該就會看到「Flex 開發人員工具」會回覆 `join` 事件的 JSON。

<img src="https://i.imgur.com/Ivjpjlu.png" style="width: 480px">

以後在製作數位版名片的時候，你就可以把名片分享到這個 `DEV 群組` 進行測試囉！

## 「ChatGPT 問與答」樣板

::: info 「ChatGPT 問與答」樣板
* 製作頁面 <https://taichunmin.idv.tw/liff-businesscard/forms/chatgpt-1.html>
:::

請開啟上方連結開啟「ChatGPT 問與答」製作頁面，你應該會看到如下圖的畫面：

![](https://i.imgur.com/ucdneq8.png)

網頁上面已經預先填好範例資料，你可以自行改成你所需要的文案，修改完成後請點一下「建立名片」按鈕：

![](https://i.imgur.com/2mk3YEO.png)

然後接下來就會進入到分享頁面如下：

![](https://i.imgur.com/lSUsRxp.png)

然後請點一下「分享好友」按鈕，並選擇我們建立的測試群組（可以透過文字搜尋）：

![](https://i.imgur.com/umQKmjI.png)

分享到測試群組以後，記得在手機上面測試能不能成功打開連結以及再次分享，如果都成功，就可以正式分享出去給好友或群組囉！

<img src="https://i.imgur.com/KlLsreN.png" style="width: 480px">

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
* [想知道自己的數位版名片被多少裝置看過嗎？](https://taichunmin.idv.tw/blog/2023-05-20-liff-businesscard-impression.html)
