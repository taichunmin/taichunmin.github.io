---
date: "2020-04-19T00:00:00+0800"
title: 如何追蹤使用者從哪裡加入 LINE 官方帳號
description: 追蹤使用者從哪個管道加入的需求，可以很容易的用 LIFF v2 來達成！
image: https://i.imgur.com/ZkfbVn5.png
tags:
  - LINE
  - LIFF
  - referral
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---
# 如何追蹤使用者從哪裡加入 LINE 官方帳號

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

這是一篇在臉書社團看到的問題 [(提問網址1)](https://www.facebook.com/groups/chatbot.tw/permalink/1545595372285499/) [(提問網址2)](https://www.facebook.com/groups/linebot/permalink/2481273445536560/)，追蹤使用者從哪個管道加入的需求，可以很容易的用 LIFF v2 來達成！

在這裡我直接用我前陣子辦過的活動來舉例，因為公司的產品想要衝好友數，所以就決定辦一個活動時間內邀請好友就送獎品的活動，雖然活動時間已經結束，但是大家還是可以點選這個連結來試玩：

<https://liff.line.me/1653958047-59ZK2VNQ/referral?inviter=U118213b77e8b7d7ae0e38c454bbd6dc2>

## 範例及畫面

| 畫面 | 說明 |
| ---- | ---- |
| ![](https://i.imgur.com/WAV0gAB.png) | 在打開上面的那個邀請連結後，如果使用者沒登入，會先要求使用者登入 |
| ![](https://i.imgur.com/uQinqAK.png) | 登入以後就會看到 LIFF 的授權頁面。 |
| ![](https://i.imgur.com/G2etpab.png) | 這時候往下滑，就能看到在授權頁面也會幫你加入 LINE 官方帳號，這個就是 LINE v2 的專屬新功能 [Bot link feature](https://developers.line.biz/en/docs/line-login/link-a-bot/#displaying-the-option-to-add-your-line-official-account-as-a-friend) |
| ![](https://i.imgur.com/b01Fla8.png) | 這時候就會開啟 LIFF 畫面，通常沒意外的話，使用者也同時加入 LINE 官方帳號了。在此處我多放了一個連結，方便使用者按下去後可以直接打開 LINE 官方帳號。 |

## 運作原理

為了實現好友邀請的需求，所以我需要把邀請人放到 LIFF 的參數之中：

```
?inviter=U118213b77e8b7d7ae0e38c454bbd6dc2
```

當使用者打開邀請連結以後，LIFF 會先把網址導向 LIFF 所設定的 Endpoint URL：

```
https://example.com/liff/full?liff.state=%2Freferral%3Finviter%3DU118213b77e8b7d7ae0e38c454bbd6dc2
```

我為了避免 LIFF v2 的 js SDK 跳轉第二次，所以在後端直接解析 `liff.state` 中的資料，並且將 `liff.state` 的參數移除，最後讓後端改傳 `302 Found` 並且透過 Header 的 `Location` 給予新的網址：

```
Location: https://example.com/liff/full?lp=%2Freferral&inviter=U118213b77e8b7d7ae0e38c454bbd6dc2
```

最後，再從 LIFF 中呼叫 `liff.getProfile()` 取得使用者的 userId，在透過 AJAX 傳送 inviter 和 userId 給予後端，這樣就成功記錄是誰邀請這個使用者的囉！

## 實作過程需要注意的地方

### 記得將 LINE Login 改成 Publish

剛建立完 LINE Login 時，預設會是開發中的狀態，開發時因為自己是開發者所以都能正常執行，每次都是要給別人用的時候才想到忘記開成 Published。

| 1 | 2 | 3 |
| -------- | -------- | -------- |
| ![](https://i.imgur.com/nRWSRHL.jpg) | ![](https://i.imgur.com/mKgB0cd.jpg) | ![](https://i.imgur.com/4MM8drZ.jpg) |

### 小心 LIFF v2 `liff.state` 會掉參數

上線前務必親自測試，到底什麼參數能夠成功帶過去，特別注意 iOS 和 Android 平台最好都測試過。

### 務必使用同一個 Provider 來建立 LINE Login 及官方帳號

不然在 `liff.getProfile()` 會抓到不同的 userId 喔！

### Normal v.s. Aggressive

![](https://i.imgur.com/cPEk26g.png)

Bot link feature 提供了兩種方式可以提示使用者來加入 LINE 官方帳號，這個可以自行決定要用哪一個喔！

### 使用者可能會沒加入 LINE 官方帳號

Bot link feature 的授權頁面中，是允許使用者不加入的，所以如果需要要求使用者加入 LINE 官方帳號的話，需要後端額外判斷喔！

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License。
:::
