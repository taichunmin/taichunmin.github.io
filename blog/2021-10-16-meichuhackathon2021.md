---
date: '2021-10-16T00:00:00+0800'
title: 2021 梅竹黑客松 LINE 工作坊
description: 以 Node.js, Express.js, Vue.js 和 CodeSandbox 來實作 Messaging API 和 LIFF 的工作坊。
image: https://i.imgur.com/wlB9nMj.jpeg
tags:
  - LINE
  - LIFF
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---
# 2021 梅竹黑客松 LINE 工作坊

[[TOC]]

## Messaging API 基礎知識

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

::: info 官方英文文件
<https://developers.line.biz/en/docs/messaging-api/>
:::

下圖是當使用者傳送訊息給官方帳號然後到收到回覆的時序圖：

![](https://i.imgur.com/5kBEOLW.png)

以下列出的是 Messaging API 的其中幾個重要功能：

### 接收使用者傳送的訊息

可以取得使用者傳送的文字、貼圖、圖片、影片、定位、事件、日期時間、Beacon...等訊息。

底下會介紹一個筆者所開發的「Flex 開發人員工具」可以測試大部分的訊息。

這邊要特別注意的是，使用者傳送的圖片跟影片只會保留在 LINE 的伺服器中一小段時間，超過就沒辦法存取了。

詳細內容可以看官方文件：<https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects>

### 回覆/推送訊息

可以回覆/推送多種不同類型的訊息給使用者：

* 文字訊息 Text
* 貼圖訊息 Sticker
* 圖片訊息 Image
* 影片訊息 Video
* 語音訊息 Audio
* 定位訊息 Location
* Imagemap 訊息
* ~~Template 訊息~~
* Flex 訊息

詳細內容可以看官方文件：<https://developers.line.biz/en/docs/messaging-api/message-types/>

### Flex 訊息

這裡特地把 Flex 訊息拉出來講，就是因為 Flex 訊息彈性非常大，可以做出很多很漂亮的訊息畫面，我們在 Messaging API 跟等等會提到的 LIFF 裡面都能夠使用 Flex 訊息。

官方有提供一個好用的[「Flex 訊息模擬器」](https://developers.line.biz/flex-simulator/)工具，另外筆者在開發 Flex 訊息時也很常用自己的「Flex 開發人員工具」。

### 圖文選單 Richmenu

圖文選單是一個高度客製化的選單，可以讓使用者快速瞭解怎麼使用官方帳號，但是只能在手機上看到圖文選單。你可以寫程式去新增、刪除、設定預設圖文選單，還能為特定使用者指定選單。

詳細內容可以看官方文件：<https://developers.line.biz/en/docs/messaging-api/using-rich-menus/>

### LINE Beacon

你可以製作一個 LINE Beacon 的藍牙裝置，當使用者靠近 LINE Beacon 時，你就會收到相關事件，並且決定官方帳號要傳送什麼訊息給使用者。

詳細內容可以看官方文件：

* [Webhook 能收到的 Beacon 事件](https://developers.line.biz/en/reference/messaging-api/#beacon-event)
* [LINE Simple Beacon 規範](https://github.com/line/line-simple-beacon)
* [LINE Beacon 規範](https://developers.line.biz/en/docs/messaging-api/beacon-device-spec/)

### 「Flex 開發人員工具」介紹及 DEMO

這是由筆者所開發的工具機器人，支援這幾個重要功能：

1. 直接用 JSON 印出收到的 Event
2. 以文字傳送訊息就會直接回覆
3. 直接顯示從 Flex Message Simulator 複製下來的 JSON

簡報網址（內有加入好友網址）：<https://hackmd.io/@taichunmin/chatbot-tw-202107>

## 到 CodeSandbox 建立專案

[CodeSandbox](https://codesandbox.io/) 是一個可以線上開發 Node.js 專案的練習網站，支援各大 JS 前端與後端框架。我們也可以用這個服務來建立一個 LINE 的 Messaging API 後端 Webhook。

![](https://i.imgur.com/qY6991m.png)

如果還沒註冊 [CodeSandbox](https://codesandbox.io/) 請先前往註冊。註冊完成後，請開啟下方的連結建立本次工作坊的範本：

::: info 從程式碼範本建立 CodeSandbox
請開啟此網頁來建立本次工作坊的範本：<https://githubbox.com/taichunmin/meichuhackathon2021>
:::

開啟上方的網址後，請點一下左上方的「Fork」按鈕來把這個範本存到自己的帳號內：

![](https://i.imgur.com/S4BtWwk.png)

這裡需要特別注意的地方是，如果 Fork 成功後，你看到的網址應該要跟圖片的不同：

![](https://i.imgur.com/L5XYoJd.png)

接下來我們就可以來設定 Messaging API 囉！

## 建立 Messaging API Channel

為了讓我們可以寫程式從 Webhook 接收使用者傳送到官方帳號的訊息，你需要先建立一個 Messaging API Chennel。

::: info 按照這個教學網頁建立 Messaging API
* <https://developers.line.biz/zh-hant/docs/messaging-api/getting-started/>
:::

Messaging API Chennel 建立完成之後，請前往 LINE Developer Console。

::: info 請點此開啟 LINE Develpers console
* <https://developers.line.biz/console/>
:::

開啟後台之後，去該頻道的設定頁面，開啟 Messaging API 分頁：

![](https://i.imgur.com/zgMcBPW.png)

在後台找到「Webhook settings」的部份，然後從 CodeSandbox 複製網址（每個人網址都不同） ：

![](https://i.imgur.com/aSNDrbf.png)

把剛剛複製的網址填到 Webhook URL 後，也要確認底下的「Use webhook」也是啟用的狀態：

![](https://i.imgur.com/VRTGFgn.jpeg)

在後台中找到「Channel access token (long-lived)」的部份，然後點選資料右側的複製按鈕。如果你的「Channel access token (long-lived)」中沒有 Access Token，你可以點選「Issue」建立一個。

![](https://i.imgur.com/2oFkbCW.png)

然後回到 CodeSandbox 切換到左側的「Server Control Panel」側邊欄，然後找到 Secret Keys 的設定：

![](https://i.imgur.com/QgzNm61.png)

請把剛剛複製的 Channel access token (long-lived) 貼到 Value 的輸入框中，然後 Name 填上 `LINEOA_ACCESS_TOKEN` （一樣可以在 Sandbox 中複製）：

![](https://i.imgur.com/zeuz8TS.png)

然後就可以按下「Add Secret」儲存了。

![](https://i.imgur.com/ULnO8nw.png)

在後台的「Basic Setting」分頁中找到「Channel secret」的資料，然後點選資料右側的複製按鈕：

![](https://i.imgur.com/48cgsid.png)

![](https://i.imgur.com/RJBlcRg.png)

然後回到 CodeSandbox，跟剛剛的步驟一樣，設定到 `LINEOA_SECRET` 的 Secret Keys 中：

![](https://i.imgur.com/ubevOLL.png)

設定完成以後，請在後台的「Messaging API」分頁找到剛剛設定「Webhook URL」的地方，點一下 Verify 按鈕：

![](https://i.imgur.com/w8U8gOD.png)

若是設定成功，應該會顯示成功的訊息。

![](https://i.imgur.com/43IQu96.png)

接下來打開自己的 LINE，掃描 QR Code 把這個 Messaging API 頻道加為好友。

![](https://i.imgur.com/Ieb2GRX.png)

然後輸入「test」確認 Webhook 設定成功。

<img src="https://i.imgur.com/IIt9WPl.jpeg" style="width: 480px">

## Messaging API 程式碼範本解說

::: info 記得自學基礎語法
這個工作坊不會教 express.js、javascript 跟 Node.js 的基礎語法，如果對這些語法還不太熟悉的朋友，建議可以去買書來學，或者是參考以下幾個線上的英文學習網站喔：

* <https://learnjavascript.online/>
* <https://javascript30.com/>
* <https://www.w3schools.com/js/default.asp>
:::

這個範本筆者是基於 Node.js 中最多人使用的 express 框架來開發的，筆者在 `line/index.js` 定義了處理 LINE Webhook 的程式：

```javascript
// 在這裡的 middleware 是 @line/bot-sdk 所提供用來檢查資料有沒有被竄改的函式
router.post('/', middleware, async (req, res) => {
  try {
    // express 會把 HTTP POST 的資料放在 req.body 內
    // _.get 是 lodash 提供的好用函式，避免變數未定義導致錯誤
    const events = _.get(req, 'body.events', [])
    // 使用 Promise.all 非同步處理所有的 event
    // 同時每個 event 都宣告一個新的物件當作 ctx
    // 裡面會有 event 和來自 express 框架的 req 可以使用
    // 等等底下會解釋 ctx 的用途
    await Promise.all(_.map(events, (event) => eventHandler({ event, req })))
    // 最後需要回傳資料來結束 HTTP POST
    res.json({})
  } catch (err) {
    debug(err)
    res.status(err.status || 500).json({ message: err.message })
  }
})
```

再來我們把目光放到 `eventHandler` 這個函式，這個函式就是真正處理每個 event 的函式，在此筆者參考另一個在 Node.js 中很有名的框架 Koa.js，這個框架有一個很方便使用的 middlewareCompose 的工具函式，可以把多個函式包成一個單獨的函式，然後透過一個特別的寫法來決定要不要繼續往下執行下一個函式。在此使用 `line/echo-text.js` 做說明：

```javascript
// 所有的 middleware 函式都必須是兩個參數
// 通常第一個參數取名為 ctx，是 context 的縮寫
// context 中文翻作「上下文」或「前後文」
// 裡面會存放處理這個 event 可能會需要用到的資料或函式
// 以免污染別的 event
// 當然你也可以多放入其他資料或函式給下一個 middleware 函式使用
// 通常第二個參數取名為 next，它會是一個函式
// 如果呼叫這個 next 代表你希望繼續執行下一個 middleware 函式
module.exports = async (ctx, next) => {
  // 從 ctx 中取出 event
  const { event } = ctx
  // 如果 event 不是文字訊息，就呼叫下一個 middleware 函式處理
  // 並且下一個 middleware 函式處理結束後
  // 直接 return 結束當前的 middleware 函式
  if (event.message?.type !== 'text') return await next()
  // 會執行到這裡，代表這是文字訊息
  // 所以就直接把 event 中的文字訊息原樣回傳給使用者
  await event.replyMessage({ type: 'text', text: event.message?.text })
}
```

當你寫好所有的 middleware 函式後，就可以決定它們的順序，然後把多個 middleware 函式包成一個，讓我們把焦點看到檔案 `line/index.js` 的 `eventHandler` 函式：

```javascript
// middlewareCompose 的這個工具函式
// 可以把多個 middleware 函式包成一個
// 然後真正呼叫函式時，就會由第一個 middleware 函式開始依序執行
// 並且決定在什麼情況下執行下一個 middleware 函式
const eventHandler = middlewareCompose([
  // 執行順序 1，這個 middleware 函式在佈置處理 event 所需的場地 (ctx)
  require('./event-init'),
  // 執行順序 2，這個 middleware 函式是等等 LIFF 要用的工具指令
  require('./liff-url'),
  // 執行順序 3，一個應聲蟲機器人，但是只能處理文字訊息
  require('./echo-text'),
])
```

在這次工作坊中，你在寫 Webhook 的處理程式時，幾乎就只需要新增更多的 middleware 函式，然後妥善決定好每個 middleware 的順序即可，所以我們再來多看一個 middleware 函式 `line/liff-url.js` 吧：

```javascript
const { liffUrl } = require('../libs/helper')

module.exports = async (ctx, next) => {
  // 從 ctx 中取出 event
  const { event } = ctx
  // 取得文字訊息，如果沒有這個資料，就會拿到空字串
  const text = event.message?.text || ''
  // 使用正規表示法判斷文字訊息是不是我們指定的格式
  // 格式是： /liff [size] [filename]
  const match = text.match(/^\/liff (full|tall|compact) ([A-Za-z0-9_-]+)$/)
  // 如果格式不正確，就交給下一個 middleware 處理
  // 並且下一個 middleware 函式處理結束後
  // 直接 return 結束當前的 middleware 函式
  if (!match) return await next()
  // 如果格式正確，我們就回傳指定大小的 LIFF 網址
  await event.replyMessage({ type: 'text', text: liffUrl(match[1], match[2]) })
}
```

接下來我們來看看檔案 `line/event-init.js` 裡面，筆者準備了什麼資料和函式給你處理 event 時可以使用吧：

```javascript
const _ = require('lodash')
const { line } = require('../libs/line')
const debug = require('../libs/debug')(__filename)

module.exports = async (ctx, next) => {
  // 從 ctx 中取出 event
  const { event } = ctx

  // 把 @line/bot-sdk 放到 ctx.line 以備不時之需
  ctx.line = line

  // 在 event 中宣告一個 replyMessage 函式讓你可以方便的回傳訊息
  event.replyMessage = async messages => {
    // 先把 event.replyToken 存到另一個變數中備用
    const replyToken = event?.replyToken
    // 如果沒有 replyToken 可以用，就不回傳訊息
    // 可能的原因有幾個
    // 1. 這個訊息本身就沒有 replyToken (例如 unfollow 訊息)
    // 2. 粗心寫錯程式 (呼叫了兩次 event.replyMessage 函式)
    if (!replyToken) return
    // 馬上把 event.replyToken 刪除
    // 避免粗心寫錯程式，呼叫了兩次 event.replyMessage 函式
    // 因為每個 replyToken 都只能用一次
    delete event.replyToken
    // 使用 replyToken 呼叫 line.replyMessage 回傳訊息
    await line.replyMessage(replyToken, messages)
  }

  // 由於我們的 middleware 函式可能會出現錯誤
  // 為了不要其中一個 event 出錯就導致其他 event 也出錯
  // 我們需要用 try catch 來把這個 event 的所有的錯誤都抓下來
  // 並且嘗試使用 replyToken 回傳錯誤訊息
  // 方便我們除錯
  try {
    // 一律執行接下來的 middleware 函式
    await next()
  } catch (err) {
    // 由於 @line/bot-sdk 和 axios 的錯誤
    // 都需要額外處理才能看到有用的錯誤訊息
    // 所以這邊在判斷是否有這兩個套件的特殊錯誤
    err.message = err.originalError?.response?.data?.message ?? err.response?.data?.message ?? err.message
    // 在紀錄錯誤的時候，同時也把 event 的內容記錄下來
    _.set(err, 'data.event', event)
    // 紀錄發生的錯誤
    debug('err = %j', err)
    // 嘗試回傳錯誤訊息
    await event.replyMessage({ type: 'text', text: err.message })
  }
}
```

有沒有稍微了解該怎麼寫新的 middleware 函式了呢？接下來請各位嘗試看看實做一個 middleware 函式，當使用者傳送了機器人不認識的訊息（如貼圖）時，告訴使用者一些資訊。

## 程式練習 1

這個練習請自由發揮，你可以讓機器人回覆很正常的內容（如：對不起，程式目前無法處理這個訊息），又或者是教使用者該怎麼使用你的機器人，甚至你還可以給使用者一個隨機笑話，降低使用者的挫敗感喔。

<details>

<summary>這是筆者提供的範例解答，別急著打開喔！</summary>

新增一個檔案 `line/unknown.js`，檔案內容如下：

```javascript
module.exports = async (ctx, next) => {
  const { event } = ctx
  await event.replyMessage({ type: 'text', text: '不好意思，我還沒辦法理解你傳送的訊息。' })
}
```

然後你會需要修改 `line/index.js` 把這個 middleware 函式加進去：

```javascript
const eventHandler = middlewareCompose([
  require('./event-init'),
  require('./liff-url'),
  require('./echo-text'),
  require('./unknown'), // 加在最後面
])
```

接下來，請按下「Restart Server」然後傳送一個貼圖給機器人，測試看看有沒有正確回傳這個文字訊息喔！

</details>

## 程式練習 2

嘗試在收到 Webhook 的 Follow 歡迎訊息時，回覆一個客製化訊息給使用者，並把使用者的 LINE 暱稱寫到文字中吧！

這是你可能會需要的參考連結：

* <https://developers.line.biz/en/reference/messaging-api/#follow-event>
* <https://line.github.io/line-bot-sdk-nodejs/api-reference/client.html>
* <https://developers.line.biz/en/reference/messaging-api/#get-profile>

<details>

<summary>這是筆者提供的範例解答，別急著打開喔！</summary>

新增一個檔案 `line/follow.js`，檔案內容如下：

```javascript
module.exports = async (ctx, next) => {
  const { event, line } = ctx
  if (event.type !== 'follow') return await next() // 不是 follow 訊息
  const userId = event.source?.userId
  if (!userId) return await next() // 沒有 userId
  const profile = await line.getProfile(userId)
  const displayName = profile?.displayName || '無名氏'
  await event.replyMessage({ type: 'text', text: `${displayName} 你好，這是由戴均民所開發的聊天機器人，請好好愛惜它喔！` })
}
```

然後你會需要修改檔案 `line/index.js`，把這個 middleware 函式加進去：

```javascript
const eventHandler = middlewareCompose([
  require('./event-init'),
  require('./follow'), // 加在 event-init 後面
  require('./liff-url'),
  require('./echo-text'),
  require('./unknown'),
])
```

然後你就可以先把官方帳號「封鎖」後再「解除封鎖」，應該就能夠收到我們新增的歡迎訊息囉！

| ![](https://i.imgur.com/H9RAfjY.jpeg) | ![](https://i.imgur.com/C93wtAH.jpeg) |
| -------- | -------- |
|  |  |

順帶一提，如果想要把內建的歡迎訊息關閉，可以到 [LINE Developer Console](https://developers.line.biz/console/) 中的「Messaging API」分頁，找到「Greeting messages」並改成 `Disabled` 就行囉。

![](https://i.imgur.com/HtnCrZc.jpeg)

</details>

## LIFF 基礎知識

::: info LIFF 官方英文文件
<https://developers.line.biz/en/docs/liff/>
:::

LINE Front-end Framework (簡稱 LIFF)，指的是使用 HTML 相關的技術配合 LIFF SDK 來製作網頁給使用者操作，你可以用來增加官方帳號的使用者體驗，你也可以只單純使用 LIFF 來提供使用者服務。

舉例來說，[理財動物園](http://checkchick.me/line)使用了 LIFF 來製作一個計算機方便使用者計算金額：

<img src="https://i.imgur.com/3xMJp2p.jpg" style="width: 480px">

筆者製作的[「LINE 數位版名片」](https://taichunmin.idv.tw/liff-businesscard/)就是一個純 LIFF 的專案。

LIFF 能夠在 Android、iOS 跟外部瀏覽器（如：電腦）中執行。如果是在手機上的 LINE 執行 LIFF 時，可以指定 Full (100%)、Tall (75%)、Compact (50%) 三種不同的大小。

以下列出的是 LIFF 所提供的幾個重要功能：

### 確認是不是 Messaging API Channel 的好友 `liff.getFriendship()`

如果你有透過「Linked OA」設定幫你的 LINE Login 指定過 Messaging API，你就可以呼叫這個 API 來確認 LIFF 的使用者是不是也是 Messaging API 的好友。

這個功能也可以被用來追蹤使用者加入 Messaging API 的管道，方便你分析不同廣告管道之間的成本與成效。

### 傳送訊息到聊天室 `liff.sendMessages()`

如果使用者是從 LINE 的 APP 開啟 LIFF 網頁，你可以把訊息傳送到聊天室內，底下會有這個 API 的範例。

### 分享訊息 `liff.shareTargetPicker()`

可以分享某些訊息給使用者所選擇的好友，也支援 Flex 訊息。

筆者用這個 API 製作了[「LINE 數位版名片」](https://taichunmin.idv.tw/liff-businesscard/)，這個專案可以簡單的用 Flex 訊息建立名片或傳單，並分享給好友。這是我最近所寫的教學文章：<https://taichunmin.idv.tw/blog/2021-07-09-line-card-create-carousel-1.html>

### 掃描 QRCode 碼

讓你可以在 LIFF 中開啟相機，然後掃描 QRCode 碼。如果想要嘗試看看，可以看我寫的文章：<https://taichunmin.idv.tw/blog/2021-09-30-liff-scan-code-v2.html>

## 建立 LINE Login 及設定 LIFF

為了要開發 LIFF，現在就讓我們來建立一個 LINE Login 吧：

::: warning
在建立 LINE Login 時有一個需要特別注意的地方，就是 LINE Login 和 Messaging API 頻道必須要建立在同一個 Provider 內，不然你會沒辦法抓到相同的 userId。
:::

::: info 按照這個教學網頁建立 LINE Login
* <https://developers.line.biz/en/docs/liff/getting-started/>
:::

建立完成以後，我們會需要幫 Full、Tall、Compact 三個不同大小的 LIFF 各建立一個 LIFF 並取得 LIFF ID，在此我們以 Full 做示範，請切換到「LIFF」分頁，然後點一下「Add」按鈕：

![](https://i.imgur.com/YegEPt9.jpeg)

在「LIFF app name」填上自己喜歡的名字（使用者可以看到這個名字），然後「Size」選擇「Full」：

![](https://i.imgur.com/1EcnBy2.png)

然後回到 CodeSandbox 的畫面，複製 Full 大小的 Endpoint URL：

![](https://i.imgur.com/sonNWMl.jpeg)

然後回到後台貼到「Endpoint URL」欄位中：

![](https://i.imgur.com/6mfC6d2.png)

接下來的幾個選項就照下圖的設定方式，注意「Scope」中的三個權限都要勾選：

![](https://i.imgur.com/R93UXBq.jpeg)

建立完成以後，就可以在列表中找到隨機產生的 LIFF ID，我們需要點選右邊的複製按鈕複製下來：

![](https://i.imgur.com/McBltp1.jpeg)

接下來回到 CodeSandbox 並且設定指定的環境變數：

![](https://i.imgur.com/YTQv2Iv.jpeg)

然後切換到「Server Control Panel」並且新增這個「LIFFID_FULL」的設定值：

![](https://i.imgur.com/6hFDVqp.jpeg)

依此類推，請把「LIFFID_TALL」跟「LIFFID_COMPACT」都設定完成，然後按下「Restart Server」按鈕。

![](https://i.imgur.com/X89CyiM.jpeg)

為了測試有沒有設定成功，請在官方帳號輸入「`/liff full profile`」然後打開機器人回覆的 LIFF 網頁，如果有設定成功，你應該就能夠從 LIFF 中看到自己的個人資料：

| ![](https://i.imgur.com/UKk4jld.jpeg) | ![](https://i.imgur.com/rSf4Lml.jpeg) |
| -------- | -------- |
|  |  |

## LIFF 程式碼範本解說

::: info 記得自學基礎語法
這個工作坊不會教 HTML、javascript、Bootstrap、express.js、Vue.js 跟 Pug 的基礎語法，如果對這些語法還不太熟悉的朋友，建議可以去買書來學，或者是參考以下幾個線上的英文學習網站喔：

* <https://expressjs.com/en/starter/installing.html>
* <https://pugjs.org/api/getting-started.html>
* <https://cn.vuejs.org/v2/guide/index.html>
* <https://getbootstrap.com/docs/4.6/getting-started/introduction/>
:::

這個範本筆者是基於 Node.js 中最多人使用的 express 框架來開發的，express.js 預設使用 pug.js 這個樣版引擎來產生 HTML，筆者在檔案 `views/liff/profile.pug` 寫了一個 LIFF 網頁，這個網頁使用了 Vue.js 作為前端的框架，讓網頁在啟動後取得使用者的個人資料並顯示在網頁上。

LIFF SDK 在使用前都會需要進行初始化，為了要取得使用者的個人資料，所以我們也會需要確認使用者是已經登入的狀態：

```javascript
// 這個 window.liffLogin 是用來確保 LIFF 初始化完成
// 並且確保使用者也是已經登入的狀態
// 透過宣告一個 async 函式並且馬上執行
// 我們就可以把執行這個函式回傳的 Promise
// 儲存在這個變數裡面以便我們後續的使用
window.liffLogin = (async () => {
  // LIFF SDK 使用前都需要初始化
  // 因為安全性考量，你必須在初始化時指定 LIFF ID 參數
  // 避免 LIFF 網頁被惡意人士攻擊
  // 在此筆者直接寫程式抓取環境變數並自動帶入
  // 所以如果要做新的 LIFF 網頁就依樣畫葫蘆即可
  await liff.init({ liffId: '#{liffid}' })
  // 判斷使用者是否已經登入
  // 如果是從 LINE APP 中開啟的使用者預設就會是登入狀態
  // 如果是外部瀏覽器就會需要先登入
  // 由於我們想要取得使用者的資料
  // 所以如果使用者沒有登入
  // 就要要求使用者登入
  if (!liff.isLoggedIn()) {
    // 登入並且在成功後跳轉回本頁
    liff.login({ redirectUri: location.href })
    // 這是為了讓這個 async 函式永遠不要結束
    // 因為我們正在要求使用者登入
    // 如果沒登入我們也沒辦法拿到個人資料
    // 所以接下來的程式沒有執行的必要
    await new Promise(resolve => {})
  }
})() // 馬上執行這個函式，並把回傳的 Promise 存下來
```

接下來，我們把目光看到 mounted 這個函式，在 Vue.js 中，呼叫 mounted 時就代表 Vue.js 已經初始化完成，通常筆者會在這個函式抓取畫面顯示所需的資料：

```javascript
// 這個是在 ES6 中宣告一個物件的成員函式的語法
// 所以不能加上 function
async mounted () {
  // 當寫可能發生錯誤的程式碼時
  // 就需要使用 try catch 來妥善處理錯誤
  try {
    // 為了要取得使用者的個人資料
    // 所以我們需要等這個 Promise 執行結束
    // 如果成功結束
    // 就代表 LIFF 已經初始化完成
    // 而且也已經確保使用者是登入的狀態
    await window.liffLogin
    // 呼叫 liff.getProfile() API
    // 可以取得使用的個人資料
    // Vue.js 的一個很方便的特性就是
    // 畫面上的內容會跟物件的屬性做綁定
    // 所以我們只需要把個人資料
    // 存到這個變數內即可
    this.profile = await liff.getProfile()
  } catch (err) {
    // 發生錯誤時把錯誤訊息紀錄到 console
    console.log(err)
  }
},
```

接下來讓我們看到畫面的部份：

```pug
block content
  //- 後面的 v-cloak 屬性是為了讓畫面一開始先不顯示
  //- 等 Vue.js 處理完成後才顯示畫面
  #app.py-3(v-cloak)
    .container.text-monospace
      h1 getProfile
      //- 把 profile 的內容先轉成 JSON 字串
      //- 然後再顯示到畫面上面
      pre #[code {{ JSON.stringify(profile, null, 2) }}]
```

## 程式練習 3

接下來，我們來幫這個 LIFF 網頁加上傳送訊息的功能吧！請用使用者的暱稱來寫成一段文字（自由發揮），然後傳送到聊天室內吧！

這是你可能會需要的參考連結：

* <https://developers.line.biz/en/reference/liff/#send-messages>

<details>

<summary>這是筆者提供的範例解答，別急著打開喔！</summary>

我們要先來修改 HTML 的部分，幫網頁加上一顆按鈕：

```pug
block content
  #app.py-3(v-cloak)
    .container.text-monospace
      h1 getProfile
      pre #[code {{ JSON.stringify(profile, null, 2) }}]
      //- 只有新增底下這一行程式，其他都不用動
      button.btn.btn-primary.btn-block(type="button", @click="btnSend") 送出訊息
```

然後我們要幫底下 Vue.js 的部分新增所需的程式，在 Pug 檔案內的程式碼縮進 (Indent) 是很重要的喔：

```javascript
window.vm = new Vue({
  el: '#app',
  data: {
    profile: null,
  },
  async mounted () {
    // 此處省略...
  },
  methods: {
    canSendMessages () {
      // 檢查是否是從 LINE APP 中開啟網頁
      // 因為外部瀏覽器沒辦法傳送訊息到聊天室內
      if (!liff.isInClient()) return false
      // 檢查聊天室的類型
      // 如果沒有正確的聊天室類型
      // 也一樣不能傳送訊息到聊天室內
      const contextType = _.get(liff.getContext(), 'type')
      if (!_.includes(['utou', 'room', 'group', 'square_chat'], contextType)) return false
      return true
    },
    async btnSend () {
      try {
        if (!this.canSendMessages()) throw new Error('請在聊天視窗內重新開啟網頁')
        await liff.sendMessages([{ type: 'text', text: `${this.profile?.displayName} 覺得很棒！` }])
        await Swal.fire({ icon: 'success', title: '傳送成功' })
        liff.closeWindow()
      } catch (err) {
        console.log(err)
        await Swal.fire({ icon: 'error', title: '傳送失敗', text: err.message })
      }
    },
  },
})
```

</details>

## 「數位版名片技術討論」社群

最近均民創立了一個社群，讓有使用數位版名片的網友可以在上面一起討論，群組內有一些常見問題的回答、名片健檢、以及跟這專案有關的最新消息，入群連結在此：<https://lihi1.com/CVjIx/blog>！

![](https://i.imgur.com/ylxMnwZ.png)

## 原始碼與相關連結

::: info
本文範例程式的原始碼授權為 MIT License，若您有任何疑惑，你可以透過 [Facebook](https://www.facebook.com/taichunmin) 與我聯繫。
:::

* [範本原始碼](https://github.com/taichunmin/meichuhackathon2021)
* [官方英文文件首頁](https://developers.line.biz/en/docs/)
* [Flex 訊息模擬器](https://developers.line.biz/flex-simulator/)
* [Flex 開發人員工具](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)
* [LINE 數位版名片](https://taichunmin.idv.tw/liff-businesscard/)
* [點此加入「數位版名片技術討論群」](https://lihi1.com/CVjIx/blog)
