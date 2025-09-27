---
date: "2020-09-07T10:00:00+0800"
title: 如何在 LINE LIFF 中確保用戶把官方帳號加為好友
description: 在 LIFF 使用 Bot Link 功能時，用戶可能會選擇不加好友，如何確保用戶成為好友呢？
image: https://i.imgur.com/Gq03jPM.png
tags:
  - LINE
  - LIFF
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# 如何在 LINE LIFF 中確保用戶把官方帳號加為好友

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

根據我之前寫的文章「[如何重新看到 LINE LIFF v2 的授權畫面？](https://taichunmin.idv.tw/blog/2020-08-21-liff-unlink.html)」裡面的測試，在 LIFF 使用 Bot Link 功能時，授權頁面中的「加入好友」選項預設不會勾選（這好像是需要額外付費才會有的功能），所幸，我們還是能用 LIFF SDK 來達成類似的需求。我特地寫了這篇文章來分享我最近在開發公司專案的活動中，如何在 LINE LIFF 中確保用戶把官方帳號加為好友。

## DEMO

這是我第一次實作這個機制，歡迎大家點下方「活動邀請連結」來試玩看看：

::: tip 「微笑小學堂」活動
* 活動說明：[https://kadacha.work/qUXoy](https://kadacha.work/qUXoy?openExternalBrowser=1)
* 活動期間：2020/9/7 到 2020/9/30（活動結束後不保證能執行）
* 這是我的[活動邀請連結](https://liff.line.me/1654198613-pV2QdV5Q/atvt200821-quest?inviter=Ud9c999fc1fe73e1460bfb1303bc80c94)
:::

首先，為了模擬用戶只授權 LIFF 但是沒有加入官方帳號，所以我在授權頁面的第一頁按下「許可」，在第二頁的時候按下「取消」：

| 圖 1-1 | 圖 1-2 |
| -------- | -------- |
| ![](https://i.imgur.com/dVp4zXZ.jpg) | ![](https://i.imgur.com/dY9Bsis.jpg) |

然後接下來就會開啟 LIFF 頁面，透過呼叫 LIFF 的 `liff.getFriendship()` 來得知用戶是否有加入好友，如果還沒加入，就要給用戶一個加入連結：

| 圖 1-3 | 圖 1-4 |
| -------- | -------- |
| ![](https://i.imgur.com/hf0mbk3.jpg) | ![](https://i.imgur.com/hc0TVjl.jpg) |

當用戶點選下方「加入好友」的連結之後，就會跳到官方的加入頁面，當用戶點選加入後，便會直接回到 LIFF 頁面中，當我們發現用戶已經成功加入好友後，就需要幫用戶切換到活動頁面：

| 圖 1-5 | 圖 1-6 |
| -------- | -------- |
| ![](https://i.imgur.com/rTlwD3L.jpg) | ![](https://i.imgur.com/5ZnY9SD.jpg) |

## Bot link 功能的兩種模式

官方 Bot Link 文件: <https://developers.line.biz/en/docs/line-login/link-a-bot/>

在 LIFF v2 中，官方提供了一個 Bot Link 功能，當你選擇啟用 `ON` 以後，有兩種模式可以選擇：

第一個是 `normal` 模式，也就是在 LIFF 的授權頁面中，會額外多一個「加入好友」或是「解除封鎖」的選項，但是這個選項預設不會勾選：

<table class="text-center">
  <tr>
    <th style="width: 49%">加入好友</th>
    <th style="width: 51%">解除封鎖</th>
  </tr>
  <tr>
    <td><img src="https://i.imgur.com/3efsMmM.jpg"></td>
    <td><img src="https://i.imgur.com/fLWs8bq.png"></td>
  </tr>
</table>

第二種是 `aggressive` 模式，這個模式會讓 LIFF 授權頁面變成兩步驟，第一步只有 LIFF 相關的權限，然後在第二步的時候，會有兩顆很明顯按鈕的讓用戶決定要不要加入好友：

| 1. 授權 LIFF | 2. 加入好友 |
| -------- | -------- |
| ![](https://i.imgur.com/ZsSPohK.jpg) | ![](https://i.imgur.com/ATS81tV.jpg) |

如果你的授權頁面中「加入好友」預設也是和我一樣不會勾選的話，建議選擇第二種模式，提高用戶加入好友的機會。

## 透過 JS 確保用戶把官方帳號加為好友

由於在 LIFF 的授權頁面之中，不管你選擇的是兩種模式中的哪一種，用戶都有可能會選擇不加為好友，所以我們可以在 LIFF 中用 JS 呼叫 LIFF 的 SDK 來確保用戶加入好友。

```javascript
// import _ from 'lodash'
// * 需要使用到 lodash 函式庫 (別名 _ )
async function isFriend () {
  return _.get(await liff.getFriendship(), 'friendFlag', false)
}
```

如果我們發現用戶沒有加入好友時，我們需要在網頁上提供一個加入好友的連結給用戶，引導用戶加入好友：（以 `@youbike` 為例）

```
https://line.me/R/ti/p/{LINE ID}
https://line.me/R/ti/p/@youbike
```

如果你跟我一樣使用上面那個加入連結的話，你會發現用戶在手機上加入好友以後，會回到剛剛的 LIFF 頁面中，為了讓用戶在加入好友後，能夠繼續 LIFF 頁面該有的流程，所以我們會需要不停的檢查用戶是否加入好友：

```javascript
async function waitAddFriend () {
  await loginPromise // 確保 LIFF 頁面初始化結束
  if (await isFriend()) return // 如果用戶已經是好友就直接結束
  showPage('follow') // 顯示加入好友的頁面，裡面要給用戶加入連結
  while (true) {
    // 避免過於頻繁執行 isFriend() 所以設定 0.5 秒的間隔
    await sleep(500)
    // 如果用戶已經是好友就結束
    if (await isFriend()) return
  }
}
```

接下來我來補充一下程式碼中的 `loginPromise`。

在 LIFF 網頁剛載入時，會需要進行 LIFF SDK 的初始化，初始化完成後，我會直接要求用戶登入 LINE。我通常會習慣自己另外寫一個 `loginPromise` 來確保我接下來的程式都是在登入之後才執行。

在這個 Promise 中，有幾個需要特別注意的地方：

1. 在 LIFF SDK 尚未處理 `liff.state` 參數前，我會透過一個不會結束的 Promise 避免程式繼續執行下去造成異常的執行結果。
2. 在用戶尚未登入 LINE 的時候也是透過一個不會結束的 Promise 避免程式繼續執行下去
3. 在宣告完 async 函式以後，就馬上執行 async 函式，並且把 Promise 保留下來

```javascript
const loginPromise = (async () => {
  await liff.init({ liffId: '#{liffId}' })
  if (new URL(location).searchParams.get('liff.state') !== null) {
    // 由於 SDK 尚未處理 liff.state 的跳轉
    // 所以透過一個不會結束的 Promise 避免程式繼續執行下去
    await new Promise(resolve => {})
  }
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: location.href })
    // 由於用戶尚未登入 LINE
    // 所以透過一個不會結束的 Promise 避免程式繼續執行下去
    await new Promise(resolve => {})
  }
  // ... 其他初始化程式碼 ...
})()
```

以下是比較完整的範例程式：

```javascript
// import _ from 'lodash'
const loginPromise = (async () => {
  await liff.init({ liffId: '#{liffId}' })
  if (new URL(location).searchParams.get('liff.state') !== null) {
    // 由於 SDK 尚未處理 liff.state 的跳轉
    // 所以透過一個不會結束的 Promise 避免程式繼續執行下去
    await new Promise(resolve => {})
  }
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: location.href })
    // 由於用戶尚未登入 LINE
    // 所以透過一個不會結束的 Promise 避免程式繼續執行下去
    await new Promise(resolve => {})
  }
  // ... 其他初始化程式碼 ...
})()

async function isFriend () {
  return _.get(await liff.getFriendship(), 'friendFlag', false)
}

async function sleep (t) {
  await new Promise(resolve => { setTimeout(resolve, t) })
}

async function waitAddFriend () {
  await loginPromise // 確保 LIFF 頁面初始化結束
  if (await isFriend()) return // 如果用戶已經是好友就直接結束
  showPage('follow') // 顯示加入好友的頁面，裡面要給用戶加入連結
  while (true) {
    // 避免過於頻繁執行 isFriend() 所以設定 0.5 秒的間隔
    await sleep(500)
    // 如果用戶已經是好友就結束
    if (await isFriend()) return
  }
}

async function init () {
  await waitAddFriend() // 等待用戶加入好友
  showPage('main') // 顯示主要頁面
}
```

## 相關連結

::: tip
本文範例程式的原始碼授權為 MIT License。
:::

* 我之前寫的文章：[如何重新看到 LINE LIFF v2 的授權畫面？](https://taichunmin.idv.tw/blog/2020-08-21-liff-unlink.html)
* 我之前寫的文章：[如何追蹤用戶從哪裡加入 LINE 官方帳號](https://taichunmin.idv.tw/blog/2020-04-19-line-offical-account-referral.html)
* [官方 Bot Link 文件](https://developers.line.biz/en/docs/line-login/link-a-bot/)
* [LINE URL scheme 文件](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/#sharing-line-official-account)
