---
date: '2022-12-27T00:00:00+0800'
title: LIFF 即將無法取得 groupId
description: 預計在 2023 年初將無法在 LIFF 中取得聊天室 ID，如果你的程式有用到，記得提早改用替代方案，才不會到時候手忙腳亂喔！
image: https://i.imgur.com/8WHJV13.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# LIFF 即將無法取得 groupId

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

最近 LINE 在開發者新聞中宣佈[（查看英文公告 1）](https://developers.line.biz/en/news/2022/12/27/liff-spec-change/)、[（查看英文公告 2）](https://developers.line.biz/en/news/2023/01/25/liff-spec-change/)、[（查看英文公告 3）](https://developers.line.biz/en/news/2023/02/06/liff-spec-change/)，於 2023/02/06 時將無法在 LIFF 中取得聊天室的相關辨識用 ID（`roomId`, `groupId`, `utouId`），這個修改不管你的 LIFF SDK 使用什麼版本都會被影響，記得要趕快檢查一下自己的 LIFF 程式中有沒有用到，如果有的話記得提早使用本文提供的替代方案進行修改，才不會到時候手忙腳亂喔！

## 影響範圍

在開發者新聞中有說明這次的修改主要會影響 LIFF 的兩個功能：

1. [`liff.getContext()` 的回傳資料](#impact-1)
2. [LINE Login 裡面跟 issue、refresh、verify access token 有關的 API 回傳值](#impact-2)

### `liff.getContext()` 的回傳資料 <a id="impact-1" />

在均民寫這篇文章時，`liff.getContext()` 中可以取得的資料如下：

<details>

<summary>One-on-one chat</summary>

```json
{
  "accessTokenHash": "Lwo84VP2mkMcf7biW5DxwQ",
  "endpointUrl": "https://taichunmin.idv.tw/pug/line-liff-20200406.html",
  "liffId": "1654046335-DzXpM8mx",
  "permanentLinkPattern": "concat",
  "type": "utou",
  "userId": "U039423df742116d5ee31878c9dfeb11b",
  "utouId": "UUa4e02fcbc417ba728cbcb13e389a4544735404c12dfc54f48f7d386ca7f4ad819196b92f7796a8e7639d8d516790c20d1f574c2b734bb87446c762abcf962087",
  "viewType": "tall",
  "availability": {
    "addToHomeScreen": {
      "minVer": "9.16.0",
      "permission": false
    },
    "bluetoothLeFunction": {
      "minVer": "9.14.0",
      "permission": false
    },
    "getAdvertisingId": {
      "minVer": "7.14.0",
      "permission": false
    },
    "multipleLiffTransition": {
      "minVer": "10.18.0",
      "permission": true
    },
    "scanCode": {
      "minVer": "9.4.0",
      "permission": false
    },
    "scanCodeV2": {
      "minVer": "11.7.0",
      "permission": false
    },
    "shareTargetPicker": {
      "minVer": "10.3.0",
      "permission": true
    },
    "skipChannelVerificationScreen": {
      "minVer": "11.14.0",
      "permission": false
    },
    "subwindowOpen": {
      "minVer": "11.7.0",
      "permission": false
    }
  },
  "menuColorSetting": {
    "adaptableColorSchemes": [
      "light"
    ],
    "darkModeColor": {
      "iconColor": "#FFFFFF",
      "progressBackgroundColor": "#111111",
      "progressBarColor": "#06C755",
      "statusBarColor": "white",
      "titleBackgroundColor": "#111111",
      "titleButtonColor": "#FFFFFF",
      "titleSubtextColor": "#949494",
      "titleTextColor": "#FFFFFF"
    },
    "lightModeColor": {
      "iconColor": "#111111",
      "progressBackgroundColor": "#EFEFEF",
      "progressBarColor": "#07B53B",
      "statusBarColor": "black",
      "titleBackgroundColor": "#FFFFFF",
      "titleButtonColor": "#111111",
      "titleSubtextColor": "#B7B7B7",
      "titleTextColor": "#111111"
    }
  },
  "scope": [
    "chat_message.write",
    "profile"
  ],
  "utsTracking": {
    "mode": "none",
    "sendRatio": 1
  }
}
```

</details>

<details>

<summary>Group</summary>

```json
{
  "accessTokenHash": "EbDb3-9VFSisckstIMnRqg",
  "endpointUrl": "https://taichunmin.idv.tw/pug/line-liff-20200406.html",
  "groupId": "C8c9b9dbcca620a2c356259ad8462b128",
  "liffId": "1654046335-DzXpM8mx",
  "permanentLinkPattern": "concat",
  "type": "group",
  "userId": "U039423df742116d5ee31878c9dfeb11b",
  "viewType": "tall",
  "availability": {
    "addToHomeScreen": {
      "minVer": "9.16.0",
      "permission": false
    },
    "bluetoothLeFunction": {
      "minVer": "9.14.0",
      "permission": false
    },
    "getAdvertisingId": {
      "minVer": "7.14.0",
      "permission": false
    },
    "multipleLiffTransition": {
      "minVer": "10.18.0",
      "permission": true
    },
    "scanCode": {
      "minVer": "9.4.0",
      "permission": false
    },
    "scanCodeV2": {
      "minVer": "11.7.0",
      "permission": false
    },
    "shareTargetPicker": {
      "minVer": "10.3.0",
      "permission": true
    },
    "skipChannelVerificationScreen": {
      "minVer": "11.14.0",
      "permission": false
    },
    "subwindowOpen": {
      "minVer": "11.7.0",
      "permission": false
    }
  },
  "menuColorSetting": {
    "adaptableColorSchemes": [
      "light"
    ],
    "darkModeColor": {
      "iconColor": "#FFFFFF",
      "progressBackgroundColor": "#111111",
      "progressBarColor": "#06C755",
      "statusBarColor": "white",
      "titleBackgroundColor": "#111111",
      "titleButtonColor": "#FFFFFF",
      "titleSubtextColor": "#949494",
      "titleTextColor": "#FFFFFF"
    },
    "lightModeColor": {
      "iconColor": "#111111",
      "progressBackgroundColor": "#EFEFEF",
      "progressBarColor": "#07B53B",
      "statusBarColor": "black",
      "titleBackgroundColor": "#FFFFFF",
      "titleButtonColor": "#111111",
      "titleSubtextColor": "#B7B7B7",
      "titleTextColor": "#111111"
    }
  },
  "scope": [
    "chat_message.write",
    "profile"
  ],
  "utsTracking": {
    "mode": "none",
    "sendRatio": 1
  }
}
```

</details>

<details>

<summary>OpenChat</summary>

```json
{
  "accessTokenHash": "_w9LYgeBGCawI8t0xmEp1g",
  "endpointUrl": "https://taichunmin.idv.tw/pug/line-liff-20200406.html",
  "liffId": "1654046335-DzXpM8mx",
  "permanentLinkPattern": "concat",
  "squareChatId": "M176a2d293f592466505741540e56441e",
  "squareId": "Sb90956211a48e2dbe7f5b897a642d20e",
  "squareMemberId": "Pf38deca9da7e850de54c82e8f2ac075a",
  "type": "square_chat",
  "viewType": "tall",
  "availability": {
    "addToHomeScreen": {
      "minVer": "9.16.0",
      "permission": false
    },
    "bluetoothLeFunction": {
      "minVer": "9.14.0",
      "permission": false
    },
    "getAdvertisingId": {
      "minVer": "7.14.0",
      "permission": false
    },
    "multipleLiffTransition": {
      "minVer": "10.18.0",
      "permission": true
    },
    "scanCode": {
      "minVer": "9.4.0",
      "permission": false
    },
    "scanCodeV2": {
      "minVer": "11.7.0",
      "permission": false
    },
    "shareTargetPicker": {
      "minVer": "10.3.0",
      "permission": true
    },
    "skipChannelVerificationScreen": {
      "minVer": "11.14.0",
      "permission": false
    },
    "subwindowOpen": {
      "minVer": "11.7.0",
      "permission": false
    }
  },
  "menuColorSetting": {
    "adaptableColorSchemes": [
      "light"
    ],
    "darkModeColor": {
      "iconColor": "#FFFFFF",
      "progressBackgroundColor": "#111111",
      "progressBarColor": "#06C755",
      "statusBarColor": "white",
      "titleBackgroundColor": "#111111",
      "titleButtonColor": "#FFFFFF",
      "titleSubtextColor": "#949494",
      "titleTextColor": "#FFFFFF"
    },
    "lightModeColor": {
      "iconColor": "#111111",
      "progressBackgroundColor": "#EFEFEF",
      "progressBarColor": "#07B53B",
      "statusBarColor": "black",
      "titleBackgroundColor": "#FFFFFF",
      "titleButtonColor": "#111111",
      "titleSubtextColor": "#B7B7B7",
      "titleTextColor": "#111111"
    }
  },
  "scope": [
    "chat_message.write",
    "profile"
  ],
  "utsTracking": {
    "mode": "none",
    "sendRatio": 1
  }
}
```

</details>

.  
`liff.getContext()` 可以用來取得 LIFF 網址被開啟的這個聊天室的類型（一對一聊天、群組聊天、多人聊天室、社群、外部瀏覽器），在這個修改生效後，以下的欄位將無法再透過這個 API 來取得：

* One-on-one chat ID `utouId`
* Group ID `groupId`
* Room ID `roomId`

在 [`liff.getContext()` 的英文文件](https://developers.line.biz/en/reference/liff/#get-context)也已經可以看到這些欄位即將被棄用（Deprecated）的警告：

![](https://i.imgur.com/5BCM1WV.png)

如果想要知道更多細節，你可以查看 [`liff.getContext()` 的英文文件](https://developers.line.biz/en/reference/liff/#get-context)。

### LINE Login 裡面跟 issue、refresh、verify access token 有關的 API 回傳值 <a id="impact-2" />

如果你的 LIFF 有用到 `chat_message.write` 這個 scope，原本在以下的 API 可以拿到 `utouId`，在這個修改生效後，將不會再拿到 `utouId`：

* [Issue access token](https://developers.line.biz/en/reference/line-login/#issue-access-token)
* [Refresh access token](https://developers.line.biz/en/reference/line-login/#refresh-access-token)
* [Verify access token validity](https://developers.line.biz/en/reference/line-login/#verify-access-token)

![](https://i.imgur.com/rvfckx0.png)

如果想要知道更多細節，你可以查看 [Issue access token](https://developers.line.biz/en/reference/line-login/#issue-access-token)、[Refresh access token](https://developers.line.biz/en/reference/line-login/#refresh-access-token)、[Verify access token validity](https://developers.line.biz/en/reference/line-login/#verify-access-token) 的英文文件。

## 替代方案

如果你的程式內有用到這次所提到即將移除的資料欄位，你可以考慮採用以下列出的幾個替代方案：

1. [由你的程式自行產生一個獨立的 ID](#alternative-1)
2. [改由 webhook 事件中取得 `groupId` 以及 `roomId`](alternative-2)

### 由你的程式自行產生一個獨立的 ID <a id="alternative-1" />

在給予 LIFF 網址的同時，你的程式應該要透過網址帶入一個由你的程式自行產生的獨立 ID，以便辨識使用者是在哪個聊天室開啟你的 LIFF；以下是簡單的範例：

```
https://liff.line.me/{liffId}/?talk_id={ID generated by your service}
```

以下則是這個替代方案的使用者流程比較：

| 現有流程範例 | 替代方案 |
| -------- | -------- |
| <ol><li>使用者 A 開啟 LIFF 網址</li><li>使用者 A 在 LIFF 網頁上進行某些操作（如：建立一個遊戲房間、分享給好友）</li><li>使用者 A 透過 `liff.shareTargetPicker()` 或 `liff.sendMessages()` 把你的 LIFF 網址分享到一個聊天室內</li><li>使用者 B 在聊天室開啟這個 LIFF 網址</li><li>你的程式取得 `liff.getContext()` 回傳值中的聊天室 ID 來記錄使用者 B 的操作行為</li></ol> | <ol><li>使用者 A 開啟 LIFF 網址</li><li>使用者 A 在 LIFF 網頁上進行某些操作（如：建立一個遊戲房間、分享給好友）</li><li>你的程式產生一個新的 LIFF 網址，網址上包含你的程式自行產生的獨立 ID</li><li>使用者 A 透過 `liff.shareTargetPicker()` 或 `liff.sendMessages()` 把新產生的 LIFF 網址分享到一個聊天室內</li><li>使用者 B 在聊天室開啟這個 LIFF 網址</li><li>你的程式取得 LIFF 網址打開後第二次跳轉中的獨立 ID 來記錄使用者 B 的操作行為</li></ol> |

如果你不知道怎麼使用 LIFF 網址，請查看 [LIFF app development guidelines](https://developers.line.biz/en/docs/liff/development-guidelines/) 文件。

如果想要知道更多有關 LIFF 網址打開後第二次跳轉的細節，請查看 [Create a secondary redirect URL](https://developers.line.biz/en/docs/liff/opening-liff-app/#setting-second-redirect) 文件。

### 改由 webhook 事件中取得 `groupId` 以及 `roomId` <a id="alternative-2" />

如果你目前是透過 `liff.getContext()` 來取得 `groupId` 或 `roomId`，你可以改從 Webhook 的事件中取得。

| 現有流程範例 | 替代方案 |
| -------- | -------- |
| <ol><li>一個官方帳號被加到群組或多人聊天室中</li><li>官方帳號傳送 LIFF 網址到聊天室中</li><li>使用者 A 開啟 LIFF 網址</li><li>從 `liff.getContext()` 的回傳值中取得聊天室 ID `groupId` 或 `roomId`</li><li>把聊天室 ID 傳送給後端伺服器</li><li>透過聊天室 ID 呼叫 [Send push messages API](https://developers.line.biz/en/reference/messaging-api/#send-push-message) 來傳送訊息到聊天室</li></ol> | <ol><li>一個官方帳號被加到群組或多人聊天室中</li><li>從 Webhook 事件中取得聊天室 ID `groupId` 或 `roomId`</li><li>透過聊天室 ID 呼叫 [Send push messages API](https://developers.line.biz/en/reference/messaging-api/#send-push-message) 來傳送訊息到聊天室</li></ol> |

如果想要知道更多細節，請查看 Messaging API 文件中的 [Webhook events for one-on-one chats or group chats and multi-person chats](https://developers.line.biz/en/docs/messaging-api/receiving-messages/#webhook-event-in-one-on-one-talk-or-group-chat) 以及 [Webhook Event Objects](https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects)。

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [新聞: LINE 2022/12/27 發佈的開發者新聞](https://developers.line.biz/en/news/2022/12/27/liff-spec-change/)
