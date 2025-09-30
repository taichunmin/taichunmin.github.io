---
date: '2024-02-06T00:00:00+0800'
title: LINE 新功能實測：複製文字到剪貼簿
description: LINE 最近發佈了可以把文字複製到剪貼簿的新功能，均民在文章中寫了幾個範例，讓大家可以快速實測這個新功能！
image: https://i.imgur.com/FxWJ9qO.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# LINE 新功能實測：複製文字到剪貼簿

![](https://i.imgur.com/FxWJ9qO.png)

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

LINE 在 2024/02/05 發佈了可以把文字複製到剪貼簿的新功能[(查看英文公告)](https://developers.line.biz/en/news/2024/02/05/messaging-api-updated/)，這功能在版本大於 `14.0.0` 的手機版 LINE APP 才支援。

均民會在這篇文章中，帶領大家在「Flex 開發人員工具」這個官方帳號中，實測這個 clipboard 動作。

## 加入官方帳號「Flex 開發人員工具」

均民所開發的「Flex 開發人員工具」除了有這次新增的功能之外，也能夠輔助你開發 LINE 機器人喔，如果你也想要跟著嘗試看看的話，請掃描以下 QR Code 加入好友吧！

[![](https://i.imgur.com/cP5purz.png)](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)

加入好友: <https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk>

## 測試 Flex 訊息中的 clipboard 動作

首先，均民先透過 [Flex 訊息模擬器](https://developers.line.biz/flex-simulator/) 製作了一個 Flex 訊息，但因為均民在寫文章時，Flex 訊息模擬器還不支援這個新功能，所以需要編輯製作好的 JSON，把動作改成 `clipboard` 動作，製作完成的程式碼如下：

<details>

<summary>點此展開範例 JSON 程式碼</summary>

```json
{
  "type": "bubble",
  "body": {
    "layout": "vertical",
    "type": "box",
    "contents": [
      {
        "color": "#666666",
        "size": "sm",
        "text": "轉帳完成",
        "type": "text"
      },
      {
        "size": "3xl",
        "text": "$100",
        "type": "text",
        "weight": "bold"
      },
      {
        "layout": "vertical",
        "margin": "lg",
        "spacing": "sm",
        "type": "box",
        "contents": [
          {
            "layout": "baseline",
            "spacing": "sm",
            "type": "box",
            "contents": [
              {
                "color": "#aaaaaa",
                "flex": 0,
                "size": "sm",
                "text": "轉入帳戶",
                "type": "text"
              },
              {
                "align": "end",
                "color": "#666666",
                "flex": 1,
                "size": "sm",
                "text": "00000000000000000",
                "type": "text",
                "wrap": true
              }
            ]
          },
          {
            "layout": "baseline",
            "spacing": "sm",
            "type": "box",
            "contents": [
              {
                "color": "#aaaaaa",
                "flex": 0,
                "size": "sm",
                "text": "轉出帳戶",
                "type": "text"
              },
              {
                "align": "end",
                "color": "#666666",
                "flex": 1,
                "size": "sm",
                "text": "主帳戶",
                "type": "text",
                "wrap": true
              }
            ]
          },
          {
            "layout": "baseline",
            "spacing": "sm",
            "type": "box",
            "contents": [
              {
                "color": "#aaaaaa",
                "flex": 0,
                "size": "sm",
                "text": "帳戶餘額",
                "type": "text"
              },
              {
                "align": "end",
                "color": "#666666",
                "flex": 1,
                "size": "sm",
                "text": "$10,000",
                "type": "text",
                "wrap": true
              }
            ]
          },
          {
            "layout": "baseline",
            "spacing": "sm",
            "type": "box",
            "contents": [
              {
                "color": "#aaaaaa",
                "flex": 0,
                "size": "sm",
                "text": "轉帳手續費",
                "type": "text"
              },
              {
                "align": "end",
                "color": "#666666",
                "flex": 1,
                "size": "sm",
                "text": "免費 (本月優惠剩28次)",
                "type": "text",
                "wrap": true
              }
            ]
          }
        ]
      }
    ]
  },
  "footer": {
    "flex": 0,
    "layout": "vertical",
    "spacing": "sm",
    "type": "box",
    "contents": [
      {
        "height": "sm",
        "style": "link",
        "type": "button",
        "action": {
          "clipboardText": "嗨！我已經從824 LINE Bank (帳號末五碼：00000) 轉帳新臺幣100元到您的帳戶囉 (凱基商業銀行，帳號末五碼：00000)！請確認一下！",
          "label": "點此複製轉帳文字",
          "type": "clipboard"
        }
      }
    ]
  },
  "hero": {
    "aspectMode": "cover",
    "aspectRatio": "20:13",
    "size": "full",
    "type": "image",
    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
    "action": {
      "type": "uri",
      "uri": "http://linecorp.com/"
    }
  }
}
```

</details>

製作完成後，就可以直接把 JSON 貼到「Flex 開發人員工具中」，然後你就可以在手機上點選按鈕，應該就可以看到剪貼簿中已經複製了你所指定的文字（如圖）：

![](https://i.imgur.com/U2PjjIE.png)

## 測試圖文選單中的 clipboard 動作

::: info 在「Flex 開發人員工具」啟用圖文選單遊樂場
如果你正在使用手機，你可以直接[開啟這個連結並送出文字](https://line.me/R/oaMessage/@736cebrk/?%2FrichmenuPlayground)。你也可以用手機在「Flex 開發人員工具」中直接送出 `/richmenuPlayground` 指令。
:::

除了 Flex 訊息之外，圖文選單也支援 clipboard 動作，均民特地更新了之前開發的「圖文選單遊樂場」，新增了一個複製文字的圖文選單。

請在手機上開啟上方連結後，按一下送出按鈕送出指令，等到程式回傳選單設定成功後，就可以把圖文選單打開：

![](https://i.imgur.com/Jw3Bm1E.png)

切換到「6. 複製文字」的選單後，你應該可以看到如下圖的選單，你可以直接點選「複製文字」按鈕，然後應該就可以看到你所指定的文字被複製到剪貼簿囉！

![](https://i.imgur.com/FQTPA2J.png)

## 數位版名片也新增了「複製網址」按鈕

如果你是有使用「數位版名片」的使用者，你現在可以直接在 Flex 訊息上面看到一個「複製網址」的按鈕，按下去就可以快速把分享網址複製到剪貼簿喔！

![](https://i.imgur.com/6JMzu2M.png)

## 原始碼與相關連結

::: info
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [新聞: LINE 2024/02/05 發佈的新聞](https://developers.line.biz/en/news/2024/02/05/messaging-api-updated/) by LINE
* [原始碼: Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)
* [文章: 圖文選單遊樂場中文版：超快速認識圖文選單的功能！](https://taichunmin.idv.tw/blog/2022-02-10-richmenu-playground.html)
* [文章: 輔助開發 LINE Flex 訊息的工具](https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html)
