---
date: '2021-09-10T00:00:00+0800'
title: 快速測試 LINE Flex 訊息在手機上顯示的寬度
description: 這篇文章會分享如何在各種不同尺寸的手機上，快速測試 Flex 訊息顯示的寬度。
image: https://i.imgur.com/dQF4QeH.png
tags:
  - 電子名片
  - LINE Flex Message
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# 快速測試 LINE Flex 訊息顯示的寬度

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

::: info 2023/07/04 更新
Flex 訊息有新增幾個新的卡片尺寸，卡片尺寸由小到大依序為：`nano`、`micro`、`deca`、`hecto`、`kilo`、`mega` 以及 `giga`。
:::

自從 LINE 發佈了 Flex 訊息並經歷了幾次改版以後，Flex 訊息已經非常有彈性，你可以用它來排出很華麗的訊息，並透過 `Messaging API` 或是 `liff.shareTargetPicker()` 傳送，我所開發的 [LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/) 也是透過這個技術來實做的。

但是使用者的手機有大有小，如果想要做出一個好的 Flex 訊息，勢必要能夠在各種尺寸的手機上正常顯示，卡米哥於 2021/09/10 在 [Chatbots Meetup](https://chatbots.kktix.cc/) 所分享的「深入 Flex 訊息- 以對話遊戲為例」議程中，特地分享了他對於 Flex 訊息中各種 bubble size 的測試結果：

![](https://hackmd.io/_uploads/SkjOuRZFn.png)

卡米哥同時也在這個議程中，以對話遊戲為例教大家怎麼製作 Flex 訊息，如果沒有聽過這場分享的話，可以[透過這個連結觀看錄影](https://youtu.be/wgiDAG9yr7E)，也可以[透過這個連結查看簡報](https://docs.google.com/presentation/d/1jpdOnQ2G5QVZJ37VfiaPE-34piqUqPp69nABYcmNSfI/edit?usp=sharing)。

## 如何快速測試朋友手機的寬度？

::: info 透過數位版名片分享給好友來快速實測 Flex 寬度
* [測試寬度名片 1](https://lihi1.com/zzUs3): 可用來測試 `nano`、`micro`、`deca`、`hecto`、`kilo`。
* [測試寬度名片 2](https://lihi2.com/dMG82): 可用來測試 `mega`、`giga`。
:::

在卡米哥的分享中，有提到他是怎麼測試大家手機所顯示的寬度：

![](https://i.imgur.com/3tIooEX.png)

於是我就想到可以把這個 Flex 訊息做成 [LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)，方便大家可以傳送給想要測試的人，你可以直接點選上方的連結來傳送這個測試寬度名片。

## 測試寬度名片是如何製作的？

我們會需要寫一個自己的 Flex 訊息來使用「[LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)」，於是我先使用 [Flex Message Simulator](https://developers.line.biz/flex-simulator/) 來製作一個雛形：

![](https://i.imgur.com/uqYJOrU.png)

<details>

<summary>點此查看 JSON 原始碼</summary>

```json
{
  "type": "bubble",
  "size": "nano",
  "body": {
    "height": "140px",
    "layout": "horizontal",
    "paddingAll": "0px",
    "type": "box",
    "action": {
      "type": "uri",
      "uri": "https://lihi1.com/zzUs3"
    },
    "contents": [
      {
        "backgroundColor": "#cccccc",
        "height": "20px",
        "layout": "horizontal",
        "offsetStart": "0px",
        "offsetTop": "0px",
        "position": "absolute",
        "type": "box",
        "width": "20px",
        "contents": [
          {
            "align": "center",
            "gravity": "center",
            "size": "xxs",
            "text": "1",
            "type": "text"
          }
        ]
      },
      {
        "flex": 0,
        "layout": "vertical",
        "offsetBottom": "5px",
        "offsetStart": "5px",
        "position": "absolute",
        "type": "box",
        "contents": [
          {
            "size": "xxs",
            "text": "Bubble: nano\nBlock: 20x20\n點擊可分享",
            "type": "text",
            "wrap": true
          }
        ]
      }
    ]
  }
}
```

</details>

根據卡米哥在議程中所整理的表格，我們可以知道每個 bubble size 所需的小方塊數量：

```json5
{
  nano: 7,
  micro: 9,
  deca: 12,
  hecto: 13,
  kilo: 14,
  mega: 16,
  giga: 26,
}
```

我所開發的「[LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)」有支援 Lodash 的 template 語法，所以我可以透過這個語法來寫一個 JS 的函式來產生 Flex 訊息：

<details>

<summary>點此查看 JS 原始碼節錄</summary>

```js
// 原始碼節錄
(blocks, size) => ({
  altText: size,
  type: 'flex',
  contents: {
    size,
    type: 'bubble',
    body: {
      height: `${20 * blocks}px`,
      layout: 'horizontal',
      paddingAll: '0px',
      type: 'box',
      action: {
        type: 'uri',
        uri: 'https://lihi1.com/zzUs3',
      },
      contents: [
        ..._.times(blocks, i => ({
          backgroundColor: '#cccccc',
          height: '20px',
          layout: 'horizontal',
          offsetStart: `${20 * i}px`,
          offsetTop: `${20 * i}px`,
          position: 'absolute',
          type: 'box',
          width: '20px',
          contents: [{
            align: 'center',
            gravity: 'center',
            size: 'xxs',
            text: `${i + 1}`,
            type: 'text',
          }],
        })),
        {
          flex: 0,
          layout: 'vertical',
          offsetBottom: '5px',
          offsetStart: '5px',
          position: 'absolute',
          type: 'box',
          contents: [{
            size: 'xxs',
            text: `Bubble: ${size}\nBlock: 20x20\n點擊可分享`,
            type: 'text',
            wrap: true,
          }],
        },
      ],
    },
  },
})
```

</details>

將寫好的程式放在 [GitHub Gist](https://gist.github.com/) 中，並取得「Raw」按鈕的連結，然後把網址中的版本刪除：

```
// Gist 網址
https://gist.github.com/taichunmin/f7741777fe93aa55b9816c859a02d363

// Raw 所取得的網址
https://gist.githubusercontent.com/taichunmin/f7741777fe93aa55b9816c859a02d363/raw/f3d63c4a77373a80f6a4868a1aad257575661d6f/flex-width-1.js

// 刪除版本後的網址
https://gist.githubusercontent.com/taichunmin/f7741777fe93aa55b9816c859a02d363/raw/flex-width-1.js
```

開啟「[LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)」的網頁，點選「CSV」來建立名片，由於這個樣版不需要 CSV 當作資料來源，所以只需要填寫名片樣版的網址即可：

![](https://i.imgur.com/FpnykXX.png)

最後，複製名片分享網址並更新到 LiHi 短網址的設定中：

![](https://i.imgur.com/WBbzTt0.png)

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
* [免費製作電子傳單 (多頁訊息) - LINE 數位版名片](https://taichunmin.idv.tw/blog/2021-07-09-line-card-create-carousel-1.html)
* [數位版名片帶你蹭一波 ChatGPT](https://taichunmin.idv.tw/blog/2023-04-18-liff-businesscard-chatgpt.html)
* [想知道自己的數位版名片被多少裝置看過嗎？](https://taichunmin.idv.tw/blog/2023-05-20-liff-businesscard-impression.html)
* [(新功能) 大量替換或取消連結用戶的圖文選單](https://taichunmin.idv.tw/blog/2023-07-05-line-developers-update.html)
