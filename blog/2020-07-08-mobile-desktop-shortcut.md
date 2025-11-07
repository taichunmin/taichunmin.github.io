---
date: "2020-07-08T00:00:00+0800"
title: 讓聊天機器人佔領手機主畫面
description: 把聊天機器人加到使用者的手機主畫面，讓使用者可以更方便打開聊天機器人喔！
image: https://i.imgur.com/SiyFKsh.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---

# 讓聊天機器人佔領手機主畫面

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

在使用 LINE 購物的時候，看到商店頁面上有一顆按鈕，可以把商店的捷徑加到主畫面上，於是我就想到，也可以把聊天機器人加到使用者的手機主畫面，讓使用者可以更方便打開聊天機器人喔！

| Step 1 | Step 2 |
| :-----: | :-: |
| ![](https://i.imgur.com/Io4B18E.jpg) | ![](https://i.imgur.com/e4Y4Lws.png) |

## 產生捷徑到手機主畫面

首先，先開啟 LINE Developers，然後按右鍵複製 LINE Developer Console 處理過的圖示網址，圖示尺寸是 `256x256`。

![](https://i.imgur.com/5dZom6w.png)

然後在 LINE Developers 上面複製聊天機器人的 `{LINE ID}`，並且根據[官方文件](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/#sharing-line-official-account)組成聊天機器人的加入網址 `https://line.me/R/ti/p/@youbike`：

![](https://i.imgur.com/3cLvGsn.png)

然後點此打開[手機桌面捷徑產生器](https://taichunmin.idv.tw/pug/mobile-desktop-shortcut.html)，然後填上「圖示」、「名稱」及「網址」。

![](https://i.imgur.com/jAnejBN.png)

建議先用 iOS 和 Android 手機測試一次圖示是否可以正常顯示，按一下「測試」按鈕就能進行測試囉：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/yoXIiey.jpg) | ![](https://i.imgur.com/KlH1skO.png) |

然後就依照網頁上的教學，按一下「加到主畫面」：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/gjPNqRe.jpg) | ![](https://i.imgur.com/bDHs40N.png) |

然後接下來手機會詢問使用者要把改捷徑設定成什麼名字：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/Gy0wdxH.jpg) | ![](https://i.imgur.com/DGXgT67.png) |

最後就成功加到主畫面上啦：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/crsBDJ8.jpg) | ![](https://i.imgur.com/KeyAjHw.png) |

# 從主畫面開啟捷徑

當使用者在主畫面按一下捷徑後，iOS 和 Android 的行為也不盡相同：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/W0SzCOd.jpg) | ![](https://i.imgur.com/Aw2RQYm.png) |

使用者會需要多按一下，才能順利跳到聊天機器人視窗內：

| Android | iOS |
| :-----: | :-: |
| ![](https://i.imgur.com/PvmgSKk.jpg) | ![](https://i.imgur.com/60mF7h2.png) |

# 有關 deeplink

LINE 雖然目前仍然支援使用 `line://` 開頭的網址，透過這個網址可以讓使用者開啟聊天機器人時少一個「啟動 LINE 應用程式」的頁面，但是 [LINE 先前已經宣布這種格式的網址已經不建議使用](https://developers.line.biz/en/news/2020/03/25/line-url-scheme-deprecation/)。

另外 Android 上面還有 [`intent://` 開頭的網址](https://developer.chrome.com/multidevice/android/intents)，iOS 上面則是有 [Universal Link](https://developer.apple.com/ios/universal-links/)，如果需要讓使用者體驗更好，可以考慮去研究看看，但是手機作業系統支援度的問題就需要自己研究以及排除，如果沒有心力測試多台手機的話，還是乖乖使用 LINE 現在所提供的建議網址吧！

# 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License。
:::

* [手機桌面捷徑產生器](https://taichunmin.idv.tw/pug/mobile-desktop-shortcut.html)
* [原始碼 1](https://github.com/taichunmin/pug/blob/master/src/mobile-desktop-shortcut.pug)
* [原始碼 2](https://github.com/taichunmin/pug/blob/master/src/mobile-desktop-shortcut-redirect.pug)
* [LINE URL scheme 官方文件](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/#sharing-line-official-account)
* [LINE URL scheme of `line://` is deprecated](https://developers.line.biz/en/news/2020/03/25/line-url-scheme-deprecation/)
* [Android Intents with Chrome](https://developer.chrome.com/multidevice/android/intents)
* [iOS Universal Link](https://developer.apple.com/ios/universal-links/)
