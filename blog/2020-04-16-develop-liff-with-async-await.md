---
date: "2020-04-16T00:00:00+0800"
title: 你可以用 async/await 來開發 LINE LIFF
description: 使用 async/await 來進行開發，讓你遠離 Promise 地獄！
image: https://i.imgur.com/SPHXp8d.png
tags:
  - LINE
  - LIFF
  - async
  - await
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---
# 你可以用 async/await 來開發 LINE LIFF

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

最近 js 的世界在非同步執行的部分，經歷了三個主要世代：`callback`、`Promise` 以及 `async/await`，其中使用 `async/await` 來開發的程式碼是其中最容易維護的。

> * 如果還不熟悉 Promise 可以看 [使用 Promise](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)
> * 如果還不熟悉 async/await 可以看 [異步函數 - 提高 Promise 的易用性](https://developers.google.com/web/fundamentals/primers/async-functions)
> * 如果想知道 callback 和 promise 為什麼不好維護，可以搜尋關鍵字 `callback hell` 以及 `promise hell`
> 
> 下圖取自 [Node 7.6 + Koa 2: asynchronous flow control made right](https://medium.com/ninjadevs/node-7-6-koa-2-asynchronous-flow-control-made-right-b0d41c6ba570)
> ![](https://i.imgur.com/ykrMHMK.png)

雖然 LINE LIFF 的官方文件都是用 Promise 來寫範例，但是你知道 LINE LIFF 的 sdk 也可以使用 `async/await` 來進行開發嗎？

## async/await 其實只是 Promise 的[語法糖](https://zh.wikipedia.org/wiki/%E8%AF%AD%E6%B3%95%E7%B3%96)

當你看到

1. 你想要用的 Function 跟你說它會回傳 `Promise`
2. 範例程式碼中，使用了 `.then()` 的寫法

基本上就代表你可以無痛改用 `async/await`。以下我們將 `setTimeout` 包成 Promise：

```js
function sleep(t) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, t)
  })
}
```

如果你要等候 `sleep()` 結束，用 Promise 的寫法是這樣：

```js
console.log('before sleep')
sleep(1000).then(function () {
  console.log('after sleep')
})
```

然後你也可以使用 `async/await` 的寫法：

```js
async function main() {
  console.log('before sleep')
  await sleep(1000)
  console.log('after sleep')
}
main() // 最後別忘記要執行 main
```

## 瀏覽器相容性

以下相容性表格是取自[這篇 MDN 文章](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function)，因為 `async/await` 是屬於 ES2017 的規範，基本上只要主流瀏覽器有正常更新到最新版本的話，只有 IE 不支援而已。

![](https://i.imgur.com/xmHfjhF.png)

## 範例

接著，來示範將幾個常用的 LIFF API 改用 `async/await` 來寫吧！

### liff.init()

<https://developers.line.biz/en/reference/liff/#initialize-liff-app>

```js
async function main () {
  try {
    await liff.init({
      liffId: "1234567890-abcedfgh" // 請用自己的 liffId
    })
    // 從這裡開始使用 liff 的 API
  } catch (err) {
    // 發生錯誤
    console.log(err.code, err.message)
    alert(err.message)
  }
}
main() // 最後別忘記要執行 main
```

### 取得環境資料

<https://developers.line.biz/en/docs/liff/developing-liff-apps/#getting-environment>

```js
async function main () {
  await liff.init({
    liffId: "1234567890-abcedfgh" // 請用自己的 liffId
  })
  // 從這裡開始使用 liff 的 API
  const language = liff.getLanguage()
  const version = liff.getVersion()
  const isInClient = liff.isInClient()
  const isLoggedIn = liff.isLoggedIn()
  const os = liff.getOS()
}
main() // 最後別忘記要執行 main
```

### liff.login()

<https://developers.line.biz/en/reference/liff/#login>

通常我都會把 `liff.init()` 和 `liff.login()` 搭配，讓我能夠在 PC 上面用瀏覽器開發：

```js
async function main () {
  await liff.init({ liffId: '1234567890-abcedfgh' }) // 請用自己的 liffId
  // 從這裡開始使用 liff 的 API
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: location.href })
    return
  }
  // 有登入的流程
}
main() // 最後別忘記要執行 main
```

### liff.getAccessToken()

<https://developers.line.biz/en/docs/liff/developing-liff-apps/#getting-access-token>

```js
async function main () {
  try {
    await liff.init({
      liffId: "1234567890-abcedfgh" // 請用自己的 liffId
    })
    // 從這裡開始使用 liff 的 API
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: location.href })
      return
    }
    const accessToken = liff.getAccessToken()
  } catch (err) {
    // 發生錯誤
    console.log(err.code, err.message)
    alert(err.message)
  }
}
main() // 最後別忘記要執行 main
```

### liff.getProfile()

<https://developers.line.biz/en/reference/liff/#get-profile>

這個 API 所回傳的 Promise 會包含 `profile` 資料，如果用 `async/await` 來寫會像是這樣：

```js
async function main () {
  try {
    await liff.init({
      liffId: "1234567890-abcedfgh" // 請用自己的 liffId
    })
    // 從這裡開始使用 liff 的 API
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: location.href })
      return
    }
    const profile = await liff.getProfile()
    const name = profile.displayName
  } catch (err) {
    // 發生錯誤
    console.log(err.code, err.message)
    alert(err.message)
  }
}
main() // 最後別忘記要執行 main
```

### liff.sendMessages()

<https://developers.line.biz/en/reference/liff/#send-messages>

傳送訊息的 API 只能在聊天視窗內打開的 LIFF 中使用，所以我會多檢查 context。

```js
async function main () {
  try {
    await liff.init({
      liffId: "1234567890-abcedfgh" // 請用自己的 liffId
    })
    // 從這裡開始使用 liff 的 API
    if (!liff.isInClient()) throw new Error('liff.isInClient() = false')
    const contextType = (liff.getContext() || {}).type
    const notInChat = ~['utou', 'room', 'group'].indexOf(contextType)
    if (notInChat) throw new Error(`liff.getContext().type = ${contextType}`)
    await liff.sendMessages([{
      type: 'text',
      text: 'Hello world'
    }])
  } catch (err) {
    // 發生錯誤
    console.log(err.code, err.message)
    alert(err.message)
  }
}
main() // 最後別忘記要執行 main
```

如果希望 `liff.sendMessages()` 等到使用者點擊後才進行，可以改寫成這樣：

```js
liff.init({
  liffId: "1234567890-abcedfgh" // 請用自己的 liffId
})

async function sendMessage () {
  try {
    await liff.ready // 確保 init 必須執行完畢
    // 從這裡開始使用 liff 的 API
    if (!liff.isInClient()) throw new Error('liff.isInClient() = false')
    const contextType = (liff.getContext() || {}).type
    const notInChat = ~['utou', 'room', 'group'].indexOf(contextType)
    if (notInChat) throw new Error(`liff.getContext().type = ${contextType}`)
    await liff.sendMessages([{
      type: 'text',
      text: 'Hello world'
    }])
  } catch (err) {
    // 發生錯誤
    console.log(err.code, err.message)
    alert(err.message)
  }
}
document.getElementById('sendMessageButton').addEventListener('click', sendMessage)
```

## Next

在我的上一篇文章[「如何在 LIFF 傳送隱藏資料給機器人」](https://taichunmin.idv.tw/blog/2020-04-07-line-liff-send-hidden-data.html)中，LIFF 的程式都是用 `async/await` 的寫法 [(LIFF 原始碼)](https://github.com/taichunmin/pug/blob/master/src/line-liff-20200406.pug)，如果想要參考我是怎麼寫的朋友可以去看看。

另外，如果想要知道其他沒提到的 LIFF Function 要如何改寫成 `async/await` 可以直接告訴我，如果同時很多人想知道的話，我就會補在這篇文章裡面喔！

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License。
:::
