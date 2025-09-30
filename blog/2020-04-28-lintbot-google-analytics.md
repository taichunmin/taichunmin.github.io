---
date: "2020-04-28T00:00:00+0800"
title: 讓聊天機器人也能看 Google Analytics (1)
description: 介紹在 LINE 官方帳號中使用 Google Analytics 追蹤使用者行為！
image: https://i.imgur.com/m86anNp.png
tags:
  - LINE
  - Google Analytics
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---
# 讓聊天機器人也能看 Google Analytics (1)

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

在聊天機器人內，難免都會想要追蹤使用者行為，除了自己寫程式追蹤之外，你還可以考慮直接把使用者的行為傳送給 Google Analytics (以下簡稱 GA) 進行追蹤喔！

## 建立 GA 帳戶

請先透過 [這篇教學](https://support.google.com/analytics/answer/1009694?hl=zh-Hant) 來建立一個 GA 帳戶。

請注意在第 2 步的「您想進行什麼評估？」的選項務必選擇「網頁」，如果選錯了就必須要重新建立：

![](https://i.imgur.com/UKvaFQw.png)

建立完成以後，你就可以成功看到你的追蹤代碼 `UA-xxxxxxxxx-1`。

![](https://i.imgur.com/aTb9gho.png)

## User-ID 設定

為了要讓後端送出的 GA 和 LIFF 中透過 `gtag.js` 送出的 GA 能夠被當成同一個使用者，所以一定要設定 User-ID 的選項，這個設定不溯及既往，所以務必在一開始就設定好。

![](https://i.imgur.com/xj88Zqt.png)

設定完 User-ID 後，需要建立一個 User-ID 視圖：

![](https://i.imgur.com/L1JwliC.png)

接下來的建立 User-ID 視圖畫面，需要確認以下的選項：

* 這項資料檢視應追蹤哪些資料？「行動應用程式」
* 顯示 User-ID 報表：「啟用」

![](https://i.imgur.com/246x0Rf.png)

等到建立完成以後，你應該就可以成功看到兩個資料檢視，分別為「所有網站資料」以及「跨裝置報表」：

![](https://i.imgur.com/W2wsi8T.jpg)

在「跨裝置報表」中，你看到的資料理論上就會是針對同一個使用者的資料囉！

## 如何在後端送出 GA

為了在後端送出 GA，我們需要使用 GA 的 [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1)，要送出使用者的互動資料，只需要對 API 送出 HTTP POST 即可：

![](https://i.imgur.com/5SpxQ4S.png)

在每一筆互動資料 (Hit) 中，有幾個參數是必填欄位如下：

![](https://i.imgur.com/DCQ3KfK.png)

為了方便追蹤使用者，我們將 LINE 所給予的 userId 直接拼裝成 GA 所需的 cid：

![](https://i.imgur.com/r4v40PS.png)

以下使用 Node.js 來送出一個畫面瀏覽（screen view）：

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
  return axios.post('https://www.google-analytics.com/collect', httpBuildQuery({
    ...PAYLOAD_DEFAULT,
    ...overrides,
    ...transformLineId(lineId),
    t: 'screenview',
    cd: name,
  }))
}
```

以下使用 Node.js 來送出一個事件標籤（event label）：

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

function gaEventLabel (lineId, category, action, label, overrides = {}) {
  return axios.post('https://www.google-analytics.com/collect', httpBuildQuery({
    ...PAYLOAD_DEFAULT,
    ...overrides,
    ...transformLineId(lineId),
    t: 'event',
    ec: category,
    ea: action,
    el: label,
  }))
}
```

如果你想要知道每個參數的詳細內容的話，你可以看 [參數文件](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters)。

## 預告

這系列的下一篇文章，我預計將會分享如何使用 Node.js 批次送出資料，敬請期待！

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License。
:::

* [當初在台中 chatbot.tw 分享的投影片](https://hackmd.io/@taichunmin/B1C4Glg9r)
* [讓聊天機器人也能看 Google Analytics (2)](https://taichunmin.idv.tw/blog/2020-05-25-linebot-google-analytics.html)
