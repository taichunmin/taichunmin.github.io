---
date: "2020-05-25T00:00:00+0800"
title: 讓聊天機器人也能看 Google Analytics (2)
description: 分享如何在 LINE Chatbot 的後端 (Node.js) 批次送出使用者資料！
image: https://i.imgur.com/iyqwacH.png
tags:
  - LINE
  - Google Analytics
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---
# 讓聊天機器人也能看 Google Analytics (2)

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

如果你還沒看過上一篇可以點選[這個連結](https://taichunmin.idv.tw/blog/2020-04-28-lintbot-google-analytics.html)，如果要看完整的範例程式碼請直接看文章最底下。

為了在聊天機器人中追蹤使用者的行為，我們不得已要在後端傳送資料給 Google Analytics (以下簡稱 GA)，但是在效能上，是一個不可忽視的問題，如果在伺服器比較繁忙的時候送資料，無疑會讓聊天機器人的反應速度雪上加霜。

## GA 的資料補送功能 `qt=`

[根據文件](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#qt)，在傳送使用者行為資料給 GA 的時候，我們最多可以補送「四小時之前」的資料。

所以每當資料進來後，我們就應該幫資料標上現在的時間，然後使用資料庫把資料暫時存下來，盡可能的一次送出一堆資料給 GA，最後在送出資料前，透過 GA 的 `qt=` 參數來告訴 GA 這筆資料是多久以前的。

```js
// _.throttle 是用來限制 3 秒內只能執行 1 次
exports.flushThrottle = _.throttle(() => queue.add('flush', {}), 3000, { leading: false })

exports.hit = async payload => {
  payload.z = +new Date()
  const len = await redis.rpush(REDIS_BUFFER_KEY, JSON.stringify(payload))
  if (len >= BATCH_LIMIT) exports.flushThrottle()
}

exports.payloadStringify = payload => {
  payload = { ...PAYLOAD_DEFAULT, ...payload }
  if (!payload.qt && payload.z) payload.qt = new Date() - payload.z
  return exports.httpBuildQuery(payload)
}
```

## Batch API

GA 有提供一個 Batch API，允許我們將 20 筆資料合併送出，如果我們能夠把一堆資料一次送出，就可以省下很多不必要的浪費，如 TCP 三方握手、HTTP 標頭資料…等。

![](https://i.imgur.com/sVWuw1r.png)

```js
queue.process('batch', async job => {
  try {
    const body = _.join(_.map(job.data, exports.payloadStringify), '\r\n')
    await axios.post('https://www.google-analytics.com/batch', body)
  } catch (err) {
    console.log(JSON.stringify(job.data))
    console.log(err)
    throw err // 讓這個工作發生錯誤時可以重試
  }
})
```

## 強制送出機制

為了避免資料在資料庫中暫存過久，所以我們還需要額外設計一個強制送出的機制，在這個範例中，我讓程式每隔一分鐘就會把資料庫的資料全部送出：

```js
queue.add('flush', { force: 1 }, {
  jobId: 'flush',
  repeat: { cron: '* * * * *' },
})

queue.process('flush', async job => {
  let size, payloads, results
  try {
    const force = _.get(job, 'data.force', 0) // 是否為強制送出

    while (true) {
      size = await redis.llen(REDIS_BUFFER_KEY)
      if (size === 0 || (force === 0 && size < BATCH_LIMIT)) return
      results = await redis.multi()
        .lrange(REDIS_BUFFER_KEY, 0, BATCH_LIMIT - 1)
        .ltrim(REDIS_BUFFER_KEY, BATCH_LIMIT, -1)
        .exec()
      payloads = _.get(results, '0.1', [])
      if (!payloads.length) return // 沒抓到資料
      payloads = _.map(payloads, JSON.parse)
      await queue.add('batch', payloads)
    }
  } catch (err) {
    // 確保這個函式不會發生錯誤
    console.log(err)
  }
})
```

## Batch API 重試

為了避免送出資料時發生網路錯誤，所以我們使用工作隊列來確保程式嘗試送出 3 次：

```js
const queue = new Bull('ga', {
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: true,
  },
})
```

## 完整範例程式碼

```js
const _ = require('lodash')
const axios = require('axios')
const Bull = require('bull')
const Qs = require('qs')
const Redis = require('ioredis')

/**
 * Buffer 在 Redis 中所儲存的 key
 */
const REDIS_BUFFER_KEY = 'ga-buffer'

/**
 * GA Batch API 每次最多能送 20 筆資料
 */
const BATCH_LIMIT = 20

/**
 * GA 每次送出資料的預設 payload
 */
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

/**
 * 建立 Redis 資料庫連線
 */
const redis = new Redis()

/**
 * 工作隊列
 */
const queue = new Bull('ga', {
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: true,
  },
})

/**
 * 將物件轉成 query string
 */
exports.httpBuildQuery = obj => Qs.stringify(obj, { arrayFormat: 'brackets' })

/**
 * 將 payload 轉成 query string
 */
exports.payloadStringify = payload => {
  payload = { ...PAYLOAD_DEFAULT, ...payload }
  if (!payload.qt && payload.z) payload.qt = new Date() - payload.z
  return exports.httpBuildQuery(payload)
}

/**
 * 設定工作隊列 batch 工作的處理程式
 */
queue.process('batch', async job => {
  try {
    const body = _.join(_.map(job.data, exports.payloadStringify), '\r\n')
    await axios.post('https://www.google-analytics.com/batch', body)
  } catch (err) {
    console.log(JSON.stringify(job.data))
    console.log(err)
    throw err // 讓這個工作發生錯誤時可以重試
  }
})

/**
 * 設定 queue 的 flush 工作的處理程式
 * 當 Redis 中累積 20 筆資料，或是每隔一分鐘，
 * 就把資料放到 queue 的 batch 工作隊列
 */
queue.process('flush', async job => {
  let size, payloads, results
  try {
    const force = _.get(job, 'data.force', 0) // 是否為強制送出

    while (true) {
      size = await redis.llen(REDIS_BUFFER_KEY)
      if (size === 0 || (force === 0 && size < BATCH_LIMIT)) return
      results = await redis.multi()
        .lrange(REDIS_BUFFER_KEY, 0, BATCH_LIMIT - 1)
        .ltrim(REDIS_BUFFER_KEY, BATCH_LIMIT, -1)
        .exec()
      payloads = _.get(results, '0.1', [])
      if (!payloads.length) return // 沒抓到資料
      payloads = _.map(payloads, JSON.parse)
      await queue.add('batch', payloads)
    }
  } catch (err) {
    // 確保這個函式不會發生錯誤
    console.log(err)
  }
})

/**
 * 每隔一分鐘執行一次 queue 的 flush 工作
 * 並且帶入 force = 1 強制清空 Redis
 */
queue.add('flush', { force: 1 }, {
  jobId: 'flush',
  repeat: { cron: '* * * * *' },
})

/**
 * 限制 3 秒內最多只能在 queue 中新增 1 個 flush 工作
 * _.throttle 是用來限制 3 秒內只能執行 1 次
 */
exports.flushThrottle = _.throttle(() => queue.add('flush', {}), 3000, { leading: false })

/**
 * 每次有資料要送給 GA 的時候就要呼叫這個函式
 */
exports.hit = async payload => {
  payload.z = +new Date()
  const len = await redis.rpush(REDIS_BUFFER_KEY, JSON.stringify(payload))
  if (len >= BATCH_LIMIT) exports.flushThrottle()
}

/**
 * 處理 LINE userId
 */
exports.transformLineId = lineId => ({
  uid: lineId,
  cid: lineId.replace(/^U(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/, '$1-$2-$3-$4-$5'),
})

/**
 * 送出 GA 的 screen view
 */
exports.gaScreenView = (lineId, name, overrides = {}) => {
  return exports.hit({
    ...overrides,
    ...exports.transformLineId(lineId),
    t: 'screenview',
    cd: name,
  })
}

/**
 * 送出 GA 的 Event (Label)
 */
exports.gaEventLabel = (lineId, category, action, label, overrides = {}) => {
  return exports.hit({
    ...overrides,
    ...exports.transformLineId(lineId),
    t: 'event',
    ec: category,
    ea: action,
    el: label,
  })
}
```

## 預告

這系列的下一篇文章，預計將會分享如何在 LIFF 中使用 Google Analytics，敬請期待！

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License。
:::

* [當初在台中 chatbot.tw 分享的投影片](https://hackmd.io/@taichunmin/B1C4Glg9r)
* [追蹤使用者有沒有看 LINE 訊息 (開信率)](https://taichunmin.idv.tw/blog/2020-06-17-linebot-google-analytics.html)
