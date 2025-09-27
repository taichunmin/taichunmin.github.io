---
date: '2020-09-18T00:00:00+0800'
title: 透過三個 LINE LIFF ID 創造出無限的 LIFF
description: 讓你只需要在專案中建立三個大小的 LIFF ID 就能產生出無限多的 LIFF
image: https://i.imgur.com/MwR2Cwk.png
tags:
  - LINE
  - LIFF
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# 透過三個 LINE LIFF ID 創造出無限的 LIFF

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

今天要分享的主題是我從 LIFF v1 使用至今的小技巧，是在跟「卡米狗」的作者[卡米哥](https://medium.com/@EtrexKuo)交流時學到的。以前我是透過後端伺服器來處理，但是最近在做「[LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)」的時候，由於沒有後端伺服器，需要用純靜態網頁達成類似功能，於是我特地把這個技巧寫成文章分享給大家。

## 為什麼需要這個技巧？

在公司的專案上，為了多個開發者合作，通常需要建立一堆環境：

1. 正式環境
2. 測試環境（DEMO 用）
3. 開發環境 x 開發者人數（每個開發者都有自己的開發站）

如果你的專案中有 50 個 LIFF，每次都需要人工比對，這樣至少就會有 150 個 LIFF 需要比對，如果開發環境又是使用 ngrok 進行開發，每次 ngrok 的網址一更換，你就需要把每個 LIFF 的網址都換一遍，這真的是對開發者非常的不友善阿…

在我學到這個技巧前，曾經為了偷懶寫了一個程式處理這個問題，這程式做的事情大概是：

1. 取得目前的 LIFF 清單
2. 與自訂的 LIFF 設定檔比對
3. 自動新增不存在的 LIFF
4. 取得目前的 domain name
5. 更新 LIFF 的 Endpoint 網址

當初 LIFF v1 升級到 LIFF v2 時，我這個程式所需的 API 曾經一度要刪除，那時候我真的不想升級成 LIFF v2… 還好後來學會這個技巧以後，基本上每個環境只會有三個 LIFF，手動建立一下也就結束了，就算遇到 ngrok 更換網址，也只需要換三個，真的會讓開發過程方便很多喔！

## 建立三個 LIFF ID

![](https://i.imgur.com/mni3tOV.png)

LIFF v2 需要透過 LINE Login Channel 來建立 LIFF，這部份請直接參考[官方文件](https://developers.line.biz/zh-hant/docs/liff/)。

在建立的過程中，有幾個需要特別注意的地方：

1. 我們需要針對不同大小的 LIFF 各建立一個 LIFF ID，並且設定不同的 Endpoint URL（以下只是範例）：
    - Full: `https://example.com/liff-full/`
    - Tall: `https://example.com/liff-tall/`
    - Compact: `https://example.com/liff-compact/`
2. LIFF 網址的轉換方式記得選擇 `Concatenate`
    ![](https://i.imgur.com/gHA3fKq.png)
3. Scopes 記得要好要滿
    ![](https://i.imgur.com/KowxDWG.png)
4. LINE Login 記得要 Publish，否則只有你自己能用！
    ![](https://i.imgur.com/PIxdxFu.png)

> 在「[LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)」中只有用到 Full Size 的 LIFF，所以我也只有建立一個 Full 的 LIFF ID。

在取得三個 LIFF ID 以後，就可以把這些設定到環境變數中，讓每個環境都有自己的設定（以 `dotenv` 為例）：

```
LIFFID_FULL=1234567890-xxxxxxxx
LIFFID_TALL=1234567890-xxxxxxxx
LIFFID_COMPACT=1234567890-xxxxxxxx
```

## 撰寫跳轉頁 `/liff-xxxx/index.html`

![](https://i.imgur.com/8YNLhF2.png)

當你在 LIFF URL 中帶入額外的網址（如：`https://liff.line.me/{LIFF_ID}/share.html`）時，使用者實際上會先連線到 `https://example.com/liff-xxxx/index.html`，所以我們需要在這個頁面呼叫 `liff.init()` 讓 LIFF URL 的 Concatenate 功能執行，這樣才能夠成功讓 LIFF 跳轉到我們期望的網址 `https://example.com/liff-xxxx/share.html`。

以下範例改寫自[「LINE 數位版名片」的跳轉頁 (Pug 語法)](https://github.com/taichunmin/liff-businesscard/blob/master/src/liff-full/index.pug)：

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
      liff.init({ liffId: '#{liffidFull}' })
    </script>
  </body>
</html>
```

這個跳轉頁必須盡量讓它執行的越快越好，避免載入不需要的程式碼，以增加頁面載入速度。

> LIFF URL 的詳細 Concatenate 規則請看[官方文件](https://developers.line.biz/en/docs/liff/opening-liff-app/)。

## 處理 `liff.login()` 的 `redirectUri` 問題

::: warning Deprecated
由於時過境遷，本段落的內容已經過時了，僅作為歷史留存之用，內容僅供參考。
:::

![](https://i.imgur.com/uhk5g3E.png)

LINE Login 是 OAuth2 協定，這個協定會驗證 `redirectUri` 是否合法，在 LIFF 中，唯一合法的 `redirectUri` 就是你設定的 `Endpoint URL`，其他自訂的頁面（如：`https://example.com/liff-xxxx/share.html`）都會驗證失敗，所以我們在呼叫 `liff.login()` 之前，需要先把現在的網址存下來，並且在登入完成後把使用者帶回原本的頁面。

當我們發現使用者沒有登入時，先把目前的網址存到 `sessionStorage` 中，然後才呼叫 `liff.login()`。

以下程式碼節錄自[「LINE 數位版名片」的分享頁 (Pug 語法)](https://github.com/taichunmin/liff-businesscard/blob/master/src/liff-full/share.pug)：

```javascript
const loginPromise = (async () => {
  await liff.init({ liffId: '#{liffidFull}' })
  if (window.getSearchParam('liff.state')) await new Promise(resolve => {}) // 永遠不會結束的 Promise
  if (!liff.isLoggedIn()) {
    sessionStorage.setItem('liffLoginRedirect', location.href)
    liff.login()
    await new Promise(resolve => {}) // 永遠不會結束的 Promise
  }
  // ... 其他程式碼 ...
})()
```

然後在跳轉頁中，如果發現有之前存下來的登入前網址，就需要額外進行跳轉。

以下程式碼改寫自[「LINE 數位版名片」的跳轉頁 (Pug 語法)](https://github.com/taichunmin/liff-businesscard/blob/master/src/liff-full/index.pug)：

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
    <script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <script>
      (async () => {
        await liff.init({ liffId: '#{liffidFull}' })
        if (new URL(window.location).searchParams.get('liff.state')) return
        const liffLoginRedirect = sessionStorage.getItem('liffLoginRedirect')
        if (_.isString(liffLoginRedirect)) {
          sessionStorage.removeItem('liffLoginRedirect')
          location.href = liffLoginRedirect
        }
      })()
    </script>
  </body>
</html>
```

## 「數位版名片技術討論」社群

最近均民創立了一個社群，讓有使用數位版名片的網友可以在上面一起討論，群組內有一些常見問題的回答、名片健檢、以及跟這專案有關的最新消息，入群連結在此：<https://lihi1.com/CVjIx/blog>！

![](https://i.imgur.com/ylxMnwZ.png)

## 原始碼與相關連結

::: tip
本文範例程式的原始碼授權為 MIT License。
:::

* 程式及原始碼
    * [LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)
    * [LINE 數位版名片原始碼](https://github.com/taichunmin/liff-businesscard)
    * [點此加入「數位版名片技術討論群」](https://lihi1.com/CVjIx/blog)
* 相關連結
    * [官方文件 LINE Front-end Framework](https://developers.line.biz/zh-hant/docs/liff/)
    * [官方文件 Opening a LIFF app](https://developers.line.biz/en/docs/liff/opening-liff-app/)
    * [卡米哥的部落格](https://medium.com/@EtrexKuo)
