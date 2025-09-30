---
date: '2021-11-17T00:00:00+0800'
title: 強制在手機版 LINE 中開啟 LIFF 網址
description: 分享筆者記憶中的 LIFF v1 的網址規則，可能的使用情境，以及使用上需要注意的地方。
image: https://i.imgur.com/EKOBjvW.jpeg
tags:
  - LINE
  - LIFF
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---
# 強制在手機版 LINE 中開啟 LIFF 網址

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

最近在 [LINE 官方部落格 2021/11/02 發佈的新聞](https://developers.line.biz/en/news/2021/11/02/new-liff-starter-and-playground/)中，終於把 [LIFF 的官方範例 LIFF starter app](https://github.com/line/line-liff-v2-starter) 和 [可以馬上試玩 LIFF SDK 的 LIFF Playground](https://liff-playground.netlify.app/) 都更新了，不知道大家試玩過了沒有？

如果讀者已經試玩過的話，不知道有沒有注意到，在 LIFF Playground 右上角有一個「Open In LINE」的按鈕，按下去就會強制在手機版 LINE 裡面開啟這個網頁，這是怎麼做到的呢？

<img src="https://i.imgur.com/fFPcCr4.jpeg" style="width: 480px">

## 已經被宣布為不建議使用的 LIFF v1 網址

在 LIFF Playground 右上角的這個按鈕，其實是利用已經被宣布為不建議使用的 LIFF v1 網址，但是不知道為什麼還是出現在官方 LIFF v2 的這個 Playground 程式碼中，如果讀者是從 LIFF v2 才開始接觸，可能會不知道 LIFF v1 網址的規則，因為在 LINE 目前版本的 LIFF 文件中已經找不到 v1 網址的說明文件。

![](https://i.imgur.com/Q992147.png)

## 什麼情況下會需要 LIFF v1 網址？

這是筆者根據自己的開發經驗，列出的幾個可能的使用情境：

### 防止打開瀏覽器內建的開發者工具

LIFF v1 的網址，如果在外部瀏覽器開啟，或是在電腦版 LINE 中開啟時，就會導向 LINE 的網頁，所以可以防止一般使用者按 F12 打開瀏覽器內建的開發者工具。

### 防止 LIFF 連結太容易洩漏

如果你開發的 LIFF 程式不適合讓使用者複製網址，也可以考慮使用 LIFF v1，因為在手機版 LINE 中開啟 LIFF 時很難複製 LIFF 網址，然後在電腦版打開時會被導向 LINE 的網頁，如果再搭配 Flex 訊息、Imagemap 或是 quickReply 這幾個功能，就能做到防止 LIFF 連結太容易洩漏。

### 自動登入 LINE

如果使用外部瀏覽器開啟 LIFF，難免會需要使用者登入 LINE，可能會讓使用者望之卻步，這時候可以考慮使用 LIFF v1 連結，讓使用者在 LINE APP 中開啟 LIFF，省略登入的步驟，增加使用者體驗。

### 強制在 LINE APP 中開啟

如果有在手機的其他 APP (如：Facebook) 中讓使用者開啟 LIFF 的需求，但是那個 APP 預設是使用 Webview 來開啟網頁的話，就可能會有部分的功能異常（如：`liff.shareTargetPicker()` 因為無法開啟跳窗所以會無法使用），這時候也可以考慮使用 LIFF v1 的網址強制使用者跳回 LINE App 中開啟。

## 使用 LIFF v1 有什麼缺點？

### 沒辦法用電腦版 LINE 開啟

如果是在電腦版 LINE 開啟 LIFF v1 的連結，會直接導向 LINE 官網，所以使用者可能會以為你的程式壞掉，沒注意到只能用手機版 LINE 開啟，所以需要在給予網址的同時，告知使用者只能用手機版 LINE 開啟網頁。

### 網址只能用 query 帶參數

LIFF v1 的網址只支援透過 URL 的 query 帶入參數，所以不像 LIFF v2 能支援 path、query 跟 hash，如果你的程式或是某些網頁框架如果有用到這些，可能就無法正常運作。

### 可能會隨時停止支援

由於 LIFF v1 已經被官方宣布為不建議使用，所以如果真的有一天 LIFF v1 的功能被移除，你的 LIFF 程式可能就會無法正常運作。但是目前在更新後的 LIFF Playground 裡面有用到，相信短時間內應該還能使用。

## LIFF v1 網址規則

由於 LIFF v1 已經被官方宣布為不建議使用，所以在 LIFF 的官方文件中已經找不到相關的文件，筆者只能根據自己的記憶寫出 LIFF v1 的網址規則，不保證資料的正確性，如果讀者想要使用，記得要多做一些測試。

首先，假設你的 `LIFF_ID` 是 `1656508316-k7jNojXm`，則網址看起來會長這樣：

```
v1:  https://line.me/R/app/1656508316-k7jNojXm
v2:  https://liff.line.me/1656508316-k7jNojXm
```

如果需要額外帶入參數，LIFF v1 只支援使用 URL 的 query 語法來帶入額外參數：

```
https://line.me/R/app/1656508316-k7jNojXm?a=1&b=2
```

如果你是使用 js 來產生 LIFF v1 網址，可以使用以下的函式來處理 escape 的問題：

```javascript
function liffV1 (liffId, params) {
  const url = new URL(`https://line.me/R/app/${liffId}`)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  return url.href
}
// liffV1('1656508316-k7jNojXm', { a:1, b:2 })
```

## 透過三個 LINE LIFF ID 創造出無限的 LIFF

如果有看過筆者之前寫的文章[「透過三個 LINE LIFF ID 創造出無限的 LIFF」](https://taichunmin.idv.tw/blog/2020-09-18-line-three-size-liff.html)，你可以考慮把想要前往的網頁放在額外參數中，然後在 endpoint 的這個跳轉網頁上撰寫 js 來相容 LIFF v1 和 LIFF v2 的網址：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no">
    <title>分享 LINE 數位版名片</title>
  </head>
  <body>
    <script crossorigin="anonymous" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <script>
      (async () => {
        await liff.init({ liffId: '#{liffidFull}' })
        const redirect = new URL(location).searchParams.get('redirect')
        if (typeof redirect === 'string') location.href = new URL(redirect, location).href
      })()
    </script>
  </body>
</html>
```

以下是 LIFF v1 和 LIFF v2 網址的比較：

```
v1:  https://line.me/R/app/1656508316-k7jNojXm?redirect=abc%2Fdef
v2:  https://liff.line.me/1656508316-k7jNojXm/abc/def
```

## 原始碼與相關連結

::: info
本文範例程式的原始碼授權為 MIT License，若您有任何疑惑，你可以透過 [Facebook](https://www.facebook.com/taichunmin) 與我聯繫。
:::

* [透過三個 LINE LIFF ID 創造出無限的 LIFF (by 均民)](https://taichunmin.idv.tw/blog/2020-09-18-line-three-size-liff.html)
