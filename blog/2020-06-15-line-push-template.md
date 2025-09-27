---
date: "2020-06-15T00:00:00+0800"
title: 能使用變數的 LINE 訊息推送小工具
description: 可以從 CSV 讀取資料，對每個 LINE 使用者推送專屬訊息！
image: https://i.imgur.com/MtBpKAr.png
tags:
  - LINE
  - pushMessage
  - csv
  - template
  - Lodash
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---

# 能使用變數的 LINE 訊息推送小工具

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

之前在公司的「YouBike Today - 小幫手」聊天機器人中，舉辦過一個抽獎活動，因為有報稅問題，所以需要跟使用者索取一些個資，但是由於這個聊天機器人不是開啟「聊天模式」，沒辦法跟使用者對話，所以我們想到了一個辦法，就是請使用者憑中獎通知的截圖到 Facebook 粉絲專頁去跟我們兌獎。

但是，要如何證明使用者的身份呢？於是，我對中獎的使用者傳送一個專屬的訊息，並且在訊息內寫出使用者的 LINE 名稱，透過這樣來判斷身份。

但是如果使用 pushMessage API 要推送不同訊息給不同使用者實在是太麻煩，於是我就寫出了這個小工具啦！

| ![](https://i.imgur.com/LpoN8bg.jpg) | ![](https://i.imgur.com/qXcYyTw.jpg) |
| -------- | -------- |
|  |  |

> 這個小工具會透過 [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) 來呼叫 LINE pushMessage API，如果擔心 Access Token 外洩的話請不要使用此工具。

## 使用教學

### 流程圖

![](https://i.imgur.com/mnTppgA.png)

### 準備名單

首先，我們需要先準備一份 CSV 當作資料來源，大家可以直接使用 [Google Sheets](https://www.google.com.tw/intl/zh-TW/sheets/about/) 來製作：

![](https://i.imgur.com/0NJv7s7.png)

請記得第一列要遵守 JS 的[命名規則](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/var_const_naming.html)，因為等等會當成變數名稱使用！

我在這份 CSV 中把使用者的 userId 放在 `line_id` 中，暱稱則放在 `nick_name` 中，這裡就是大家可以自由發揮的地方啦，例如說每個使用者發送不同的 [LINE POINTS](https://www.linebiz.com/tw/service/line-points/) 的兌換連結之類的。

### 取得 CSV 的公開網址

在 [Google Sheets](https://www.google.com.tw/intl/zh-TW/sheets/about/) 準備好要發送的資料以後，你就可以把 CSV 發布到網路上，以便讓這個小工具可以取得你準備的資料喔！

點選「檔案」➜「發布到網路」：

![](https://i.imgur.com/s37wJWs.png)

然後選擇你的工作表名稱「表單回應 1」，確認發布格式是「逗號分隔值 (.csv)」，然後在確認底下有勾選「內容有所變更時自動重新發布」，都確認以後就可以按下「發布」按鈕囉：

![](https://i.imgur.com/dr2cuIp.png)

發布成功以後，你就會看到一個網址，把它直接複製下來吧！

![](https://i.imgur.com/HclIWYq.png)

> 由於 Google Sheets 的「發布到網路」所發布的 CSV 會有 5 分鐘的快取，如果不想等的話，建議可以直接建立新的工作表，然後重新「發布到網路」喔！

### 編寫訊息

你可以參考[「LINE 訊息文件」](https://developers.line.biz/en/reference/messaging-api/#flex-message)以及[「Flex 訊息模擬器」](https://developers.line.biz/flex-simulator/)來寫出你想要的訊息內容。

為了要針對每位使用者傳送不同的資料，這個工具中使用了來自 Lodash 的 `_.template` 函式，這個函式可以使用的語法很像 JS，如果需要這個函式的[使用說明請點此](https://lodash.com/docs/#template)。此外，這個工具中也能夠使用所有 Lodash 中所提供的函式喔！

在此我們把使用者的名稱使用 `${nick_name}` 帶入，然後在每顆骰子的擲骰結果內寫上亂數函式 `${_.random(1,4)}`，寫好以後我們就可以從右上角的「View as JSON」複製寫好的 JSON！[(本文範例 JSON 在此)](https://gist.github.com/taichunmin/725af44befc5366962d83d380a74f564)

![](https://i.imgur.com/MUtSjBT.png)

> 這個工具支援 [JSON5 格式](https://json5.org/)喔！
> ```json5
> {
>   // comments
>   unquoted: 'and you can quote me on that',
>   singleQuotes: 'I can use "double quotes" here',
>   lineBreaks: "Look, Mom! \
> No \\n's!",
>   hexadecimal: 0xdecaf,
>   leadingDecimalPoint: .8675309, andTrailing: 8675309.,
>   positiveSign: +1,
>   trailingComma: 'in objects', andIn: ['arrays',],
>   "backwardsCompatible": "with JSON",
> }
> ```

### 訊息推送工具

把剛剛上面的東西都準備好以後，我們就可以開始推送訊息啦：

訊息推送工具網址：<https://taichunmin.idv.tw/pug/line-push-template.html>

> 再次提醒：這個小工具會透過 [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) 來呼叫 LINE pushMessage API，如果擔心 Access Token 外洩的話請不要使用此工具。

![](https://i.imgur.com/2qFHdsW.png)

打開工具後，你應該會看到以下幾個欄位需要填寫：

* CSV 網址：請填寫 Google Sheets 「發布到網路」所拿到的 CSV 網址
* 傳送給：如果在 CSV 中使用者 userId 的欄位名稱是 `line_id` 在這裡就填 `${line_id}`
* Access Token：請填寫頻道的 Access Token
* 訊息內容 JSON：請貼上你從 Flex 訊息模擬器複製出來的 JSON

這些欄位都填完以後，就可以按下左下的「推送訊息」按鈕囉！以下是本文送出的擲骰結果範例：

<img src="https://i.imgur.com/OuqBL2f.jpg" style="width: 480px">

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License。
:::

* [推送小工具原始碼](https://github.com/taichunmin/pug/blob/master/src/line-push-template.pug)
* [CORS Anywhere](https://github.com/Rob--W/cors-anywhere)
* [當初在台中 chatbot.tw 分享的投影片](https://hackmd.io/@taichunmin/B1rUayhjr)
* [LINE 訊息文件](https://developers.line.biz/en/reference/messaging-api/#flex-message)
* [Flex 訊息模擬器](https://developers.line.biz/flex-simulator/)
* [`_.template` 變數語法說明](https://lodash.com/docs/4.17.15#template)
