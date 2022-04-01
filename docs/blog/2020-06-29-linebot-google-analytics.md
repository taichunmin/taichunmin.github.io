---
date: "2020-06-29T00:00:00+08"
title: 追蹤 LINE Notify 的閱讀率 (開信率)
description: 示範如何在 LINE Notify 中追蹤使用者的閱讀率（開信率）！
image: https://i.imgur.com/5DLua0G.png
tags:
  - LINE
  - Google Analytics
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---

# 追蹤 LINE Notify 的閱讀率 (開信率)

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

繼上次的文章提到如何追蹤使用者是否看過 LINE 訊息，這篇文章要來示範如何在 LINE Notify 中追蹤使用者的閱讀率（開信率）！

> 如果你還沒有看過前幾篇相關文章，建議你先看過一遍：
> 1. [讓聊天機器人也能看 Google Analytics (1)](https://taichunmin.idv.tw/blog/2020-04-28-lintbot-google-analytics.html)
> 2. [追蹤使用者有沒有看 LINE 訊息 (開信率)](https://taichunmin.idv.tw/blog/2020-06-17-linebot-google-analytics.html)

## 準備一張圖片

由於在 LINE Notify 中，沒辦法像上次的文章把圖片以 1x1 的方式隱藏起來，所以需要準備一張看起來正常的圖片，避免使用者覺得很奇怪：

<img src="https://i.imgur.com/5KWq1al.png" style="width: 128px">

> Icon made by [**Kiranshastry**](https://www.flaticon.com/authors/kiranshastry) from [**www.flaticon.com**](https://www.flaticon.com)

## 透過後端傳送 Google Analytics

接下來我們要寫一個後端的程式，當使用者的裝置打開 LINE Notify 的聊天視窗時就會執行後端的程式，我們可以讓使用者跳轉到我們事先準備好的圖片網址，並且偷偷的把使用者的瀏覽紀錄傳送給 Google Analytics。

在此我選擇使用 Google Cloud Function 來完成這個後端，以下是範例 `Node.js` 程式碼：

* `index.js`

```js
const axios = require('axios')
const Qs = require('qs')

const PAYLOAD_DEFAULT = {
  aip: 1, // 忽略追蹤發送者 IP
  an: 'My App', // App Name
  av: '1.0.0', // App 版號
  de: 'UTF-8', // 字元編碼
  ds: 'app', // 資料來源，填寫為 app
  tid: 'UA-xxxxxxxxx-1', // GA 追蹤代碼
  ul: 'zh-tw', // locale
  v: 1, // api version
}

const httpBuildQuery = obj => Qs.stringify(obj, { arrayFormat: 'brackets' })

const transformLineId = lineId => ({
  uid: lineId,
  cid: lineId.replace(/^U(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/, '$1-$2-$3-$4-$5'),
})

function gaScreenView (lineId, name, overrides = {}) {
  if (!lineId || !name) return
  return axios.post('https://www.google-analytics.com/collect', httpBuildQuery({
    ...PAYLOAD_DEFAULT,
    ...overrides,
    ...transformLineId(lineId),
    t: 'screenview',
    cd: name,
  }))
}

exports.main = async (req, res) => {
  res.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000')
  res.redirect(301, 'https://i.imgur.com/5KWq1al.png')
  await gaScreenView(req.query.line_id, req.query.name)
}
```

> [點此可查看 Google Analytics Measurement Protocol 的文件](https://developers.google.com/analytics/devguides/collection/protocol/v1)

* `package.json`

```json
{
  "name": "sample-http",
  "version": "0.0.1",
  "dependencies": {
    "axios": "^0.19.0",
    "qs": "^6.9.4"
  }
}
```

> 如果還不會建立 Cloud Function 可以看 [👉這篇文章](https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html)

如果你想要自己寫後端來實做這個程式的話，需要特別注意的地方有幾個：

1. 使用 HTTP 301 跳轉到圖床來避免從 Cloud Function 直接送出圖片，造成巨大的網路流量費用。
2. 加上 `Cache-Control: public, max-age=31536000, s-maxage=31536000` 的 header 來避免使用者的裝置重複讀取圖片，造成瀏覽次數重複計算的狀況，在本文中我直接設定快取 365 天。(實測如果沒使用 `Cache-Control` 會導致瀏覽數被重複計算超過 10 倍以上)
3. 送資料給 Google Analytics 時一定要加上 `aip` 這個參數，因為使用者的瀏覽資料是後端程式代替送出的，所以後端程式的 IP 沒有意義。
4. 請記得將 `tid` 換成自己的 Google Analytics 的 ID。

## 推送 LINE Notify 給使用者

最後我們就可以透過 LINE Notify API 來送出訊息給使用者，在此以 `node.js` 來做示範：

```js
const axios = require('axios')
const Qs = require('qs')

function httpBuildQuery (obj) {
  return Qs.stringify(obj, { arrayFormat: 'brackets' })
}

function photoScreenView (lineId, name) {
  return `https://example.cloudfunctions.net/linebot-notify-ga-demo-20200629?${httpBuildQuery({
    name,
    line_id: lineId,
    z: +new Date(),
  })}`
}

async function sendLineNotify (token, message, ga) {
  await axios.post('https://cors-anywhere.herokuapp.com/https://notify-api.line.me/api/notify', httpBuildQuery({
    message,
    imageThumbnail: ga,
    imageFullsize: 'https://i.imgur.com/5KWq1al.png',
  }), { 
    headers: { Authorization: `Bearer ${token}` }
  })
}

sendLineNotify('line-notify-access-token', '測試 Google Analytics 追蹤', photoScreenView('line-user-id', '已閱讀 LINE Notify'))
```

如果你想要用自己的程式碼來實做這個部份，你需要注意的地方有：

1. 在網址中需要把中文字及特殊符號正確的做 `urlencode`
2. 在產生圖片預覽網址 `imageThumbnail` 時，須加上現在的時間戳記來確保圖片至少重新下載一次
3. 需要先取得使用者授權的 LINE Notify Access Token，本文中直接用發行存取權杖（開發人員用）來做示範

當你成功送出 LINE Notify 以後，在手機上面看起來會像是這樣：

<img src="https://i.imgur.com/n1iBsuP.jpg" style="width: 480px">

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License。
:::

* [Google Analytics 追蹤 Email 與點擊成效](https://www.oxxostudio.tw/articles/201706/google-analytics-tracking-email.html)
* [LINE Developer Meetup #12 開發者小聚活動後分享](https://engineering.linecorp.com/zh-hant/blog/line-developer-meetup-12/)
