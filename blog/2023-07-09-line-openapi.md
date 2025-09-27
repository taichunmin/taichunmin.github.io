---
date: '2023-07-09T00:00:00+0800'
title: LINE 的 OpenAPI 使用教學
description: LINE 最近發佈了 OpenAPI 格式的 API 文件，這篇文章會分享要怎麼使用它來節省你的開發時間！
image: https://hackmd.io/_uploads/S1Gpk7vFh.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# LINE 的 OpenAPI 使用教學

![](https://hackmd.io/_uploads/S1Gpk7vFh.png)

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

LINE 在 2023/7/5 發佈了一篇公告[(查看英文公告)](https://developers.line.biz/en/news/2023/07/05/open-api/)，把 LINE 針對開發者所提供的公開 API 寫成了 OpenAPI 格式，並[在 GitHub 上公開](https://github.com/line/line-openapi)，這份文件包含以下幾個部分：

* Messaging API
* Audience Group API
* Insight API
* Mission Stickers API
* LIFF API
* Channel Access Token API

OpenAPI 的前身是 Swagger，是一個被廣泛使用的公開規範，它使用方便程式讀取的格式，來描述 API 的結構、請求以及回應；用這種格式撰寫的 API 文件可以自動生成給開發者看的文件、程式碼以及測試程式；OpenAPI 的生態圈相當完整，主流的程式語言在網路上都有人提供相對應的工具可以使用，有利於節省開發時間。

所以均民特地寫了這篇文章來帶大家使用 LINE 所提供的 OpenAPI 文件。

## 查看文件

由於 LINE 是直接提供 YAML 格式的檔案，所以通常要先用工具轉換成給開發者看的文件，均民找了一個名為 Stoplight Elements 的工具，並且把每個文件的連結直接整理到 HackMD 上面方便大家使用：

::: tip LINE OpenAPI
* [請點此開啟均民整理的 LINE OpenAPI 文件清單](https://hackmd.io/@taichunmin/line-openapi/)
:::

開啟上方的連結後，你應該會看到的畫面如下：

![](https://hackmd.io/_uploads/SJs-BvIKn.png)

最左側的選單是使用 HackMD 的書本模式產生的選單，你可以在這個選單上面選擇你想查看的文件：

![](https://hackmd.io/_uploads/BJR58wIY2.png)

當你選擇你想看的文件之後，你就可以把這個使用 HackMD 的書本模式產生的選單收起來：

![](https://hackmd.io/_uploads/r1JuDv8Kh.png)

接下來看到 ENDPOINTS 的部分（以 `channel-access-token.yml` 為例），這個就是這份文件裡面描述的 API 清單：

![](https://hackmd.io/_uploads/HJtouwUtn.png)

點進 ENDPOINT 後，就可以看到詳細的說明文件（以 `issueChannelToken` 為例）：

![](https://hackmd.io/_uploads/S1aFFvLK3.png)


## 取得臨時 Channel Access Token

通常使用 OpenAPI 撰寫的文件有一個特色，就是可以直接在文件上面測試 API，現在讓我們直接在這份文件上面，幫我們的 Channel 發一個臨時的 Access Token 吧！

::: warning 警告
在 OpenAPI 文件上面測試 API 可能會有私密資訊洩漏的風險，建議只拿不重要的 Channel 來使用，避免你的 Channel Secret 或 Access Token 外洩。

文章截圖中的私密資訊在文章發佈後均已進行更換。
:::

首先我們要先有一個 Messaging API 或 LINE Login 的 Channel，建立的教學可以直接[查看官方的教學文件](https://developers.line.biz/en/docs/messaging-api/getting-started/)，在此不多加贅述。

![](https://hackmd.io/_uploads/H1ZQ0P8Kh.png)

接著我們回到 OpenAPI 文件，然後選擇「`channel-access-token.yml`」、「`issueChannelToken`」後，你應該會看到下方的畫面：

![](https://hackmd.io/_uploads/HJvMy_8th.png)

畫面中間的部分是這個 API 的說明，畫面右邊的部分就是可以直接填寫資料來測試 API 的地方：

![](https://hackmd.io/_uploads/ryaTkd8tn.png)

這個 API 需要 Channel 的 `client_id` 以及 `client_secret`，我們需要去 [LINE Developer Console](https://developers.line.biz/console/) 找到這兩個資訊：

![](https://hackmd.io/_uploads/B151-uUth.png)

![](https://hackmd.io/_uploads/rk_I-_Lth.png)

接下來請把資訊填到文件內如下，`grant_type` 請填 `client_credentials`：

![](https://hackmd.io/_uploads/ByYuMuUKn.png)

接下來按下「Send API Request」就可以成功拿到 Channel Access Token 囉！

![](https://hackmd.io/_uploads/Hy5qQuIKn.png)

::: tip
LINE 的部分 API 沒有給予跨來源資源共用（CORS）所需的 HTTP Headers，所以這部份的 API 會遇到 [CORS 的問題](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)，沒辦法直接在 OpenAPI 的所產生的文件上面測試。
:::

## 直接產生程式碼

OpenAPI 文件的另外一個特色就是可以快速產生程式碼，我們在上一步已經成功拿到 Access Token，接下來我們就可以產生程式碼來幫你節省開發時間，在此以「`messaging-api.yml`」、「`messaging-api`」、「`getBotInfo`」為例：

![](https://hackmd.io/_uploads/rk9bH_IYh.png)

接下來我們需要把剛剛取得的 `access_token` 填到 `Auth` 的 `Token` 欄位中：

![](https://hackmd.io/_uploads/B1fSep8Kh.png)

當你按下「Send API Request」後，會出現網路錯誤的訊息，這是瀏覽器的 [CORS 限制](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)所造成：

![](https://hackmd.io/_uploads/SklzI68Fn.png)

但我們還是可以請 OpenAPI 幫我們產生程式碼，以便我們測試 API 的執行結果，在此我們以 `JavaScript / Fetch` 為例：

![](https://hackmd.io/_uploads/BJsZwpLKn.png)

然後就可以把產生的程式碼複製下來：

![](https://hackmd.io/_uploads/rk9uP68Fn.png)

我們選擇的 `JavaScript / Fetch` 是可以直接在瀏覽器的開發者工具直接執行的程式碼，為了避免遇到 CORS 的問題，我們必須讓執行程式碼的網域相同，所以均民選擇開啟這個連結 <https://api.line.me/v2/bot/info>，開啟後看到的畫面如下：

![](https://hackmd.io/_uploads/ByAmu6UK2.png)

然後開啟 Chrome 瀏覽器的開發者工具（快捷鍵：`F12` 或是 `Cmd+Option+I`），並前往「主控台 (Console)」：

![](https://hackmd.io/_uploads/HJfoKaIY3.png)

然後貼上剛剛複製的程式碼後，按下 `ENTER` 即可執行：

![](https://hackmd.io/_uploads/HJc95a8th.png)

::: warning
在瀏覽器的開發者工具執行程式碼時務必小心，請勿複製來路不明的程式碼執行，以下是 Facebook 針對開發者工具的警告訊息：

![](https://hackmd.io/_uploads/BkhIopLKh.png)
:::

## 在 Postman 中使用 OpenAPI

Postman 是一個在開發 API 的過程中常用的工具之一，它讓開發者能夠輕鬆地測試、驗證和儲存 API。除此之外，Postman 也能夠對 API 進行自動化測試、以及協同合作的功能。

Postman 也支援匯入 OpenAPI 的檔案，你可以跟著 Postman 網站上的文章[（點此查看）](https://learning.postman.com/docs/integrations/available-integrations/working-with-openAPI/)來匯入 LINE 的 OpenAPI 檔案，讓你可以在 Postman 中快速使用 LINE 的 API。

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [新聞: LINE 2023/7/5 發佈的公告](https://developers.line.biz/en/news/2023/07/05/open-api/)
* [LINE OpenAPI 文件清單](https://hackmd.io/@taichunmin/line-openapi/)
