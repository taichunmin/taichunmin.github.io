---
date: '2022-02-24T00:00:00+0800'
title: 高雄燈會 LINE Beacon 體驗紀錄
description: 這是均民特地去 2022 高雄燈會後所寫的紀錄文章，以便以後可以拿來當作 LINE Beacon 的參考案例。
image: https://i.imgur.com/9m0PSUP.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# 高雄燈會 LINE Beacon 體驗紀錄

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

台灣第一次把 LINE Beacon 應用在燈會活動上，在 [2022 高雄燈會的網站](https://tw-light.tw/line-beacon.html)上面寫佈建了將近 700 顆 LINE Beacon，均民在工作上的專案「YouBike 微笑單車」官方帳號上也有 LINE Beacon 的相關應用，所以這次藉著去高雄參觀 2022 高雄燈會活動的同時，順便體驗一下別的技術廠商是如何將 LINE Beacon 用在活動上，並順手寫成部落格以便以後可以拿來當做案例參考。

> 這次活動的技術廠商為關貿網路股份有限公司工作團隊：劉運洲、賀安平、葉怡君、吳賢煜；太和光股份有限公司

## LINE Beacon 是什麼？

在提到 LINE Beacon 之前，我們需要先介紹 Beacon，在藍牙協定中 Beacon 就是一個不停在進行藍牙廣播的裝置，程式設計師可以在手機上開發 APP 來接收並處理藍牙廣播訊號，並利用藍牙廣播的訊號大小，來偵測使用者大概距離 Beacon 多遠。如果使用者同時偵測到多個 Beacon 的藍牙廣播訊號，就可以用來精準定位使用者的位置，在室內收不到 GPS 訊號時，Beacon 就是一個很好的定位方法。

LINE Beacon 就是由 LINE 所定義的特殊藍芽廣播訊號，當手機的 LINE APP 收到這個藍芽廣播時，就會把廣播內容送給 LINE 的伺服器，在 LINE 的伺服器驗證過以後，才會傳送 Beacon 的事件給指定的 Webhook，但是 LINE 的伺服器並不會給 Webhook 藍牙訊號大小的資料，所以沒辦法做精準的室內定位，只能知道使用者進入 Beacon 的藍牙廣播訊號範圍內。

在台灣使用 LINE Beacon 的優點大概有：

1. 在台灣 LINE 的使用者很多
2. 除了 LINE APP 之外，不需要額外安裝別的 APP
3. 專注在開發 Webhook 即可，不用擔心 Beacon 跨平台的相容性

缺點則大概有：

1. 沒辦法從藍牙訊號大小推測使用者距離 Beacon 多遠
2. 只能知道使用者進入藍牙訊號的範圍內
3. 沒辦法知道使用者什麼時候離開藍牙訊號的範圍
4. 想知道使用者在藍牙訊號的範圍內待多久需要額外申請 (可能需付費)

## 建置 LINE Beacon

![](https://i.imgur.com/XLo45E1.png)

> 左圖是實際去高雄燈會拍的 LINE Beacon (感謝 `@dabo_huang` 提供照片)，右圖是太和光所生產的 LINE Beacon。

要使用 LINE Beacon，你就需要先建置 LINE Beacon，目前有分成 LINE Simple Beacon 跟 LINE Beacon 兩種，前者是僅供開發者開發使用，可以[參考我之前寫過的工作坊文章](https://taichunmin.idv.tw/blog/2020-07-13-line-simple-beacon-workshop.html)來自行製作，後者目前台灣還沒辦法直接在網路上購買，需要去[購買日本的產品](https://beacon.theshop.jp/items/6617930)或是[聯繫 LINE Biz 進行 LINE Beacon 的相關合作](https://tw.linebiz.com/service/account-solutions/line-beacon/)。

## [LINE Beacon 權限開啟教學](https://tw-light.tw/line-beacon.html)

![](https://i.imgur.com/F4dXocj.png)

> 這張圖片的來源是[「官方教學：第一次設定 LINE Beacon 就上手！」](https://official-blog-tw.line.me/archives/84312676.html)

要舉辦 LINE Beacon 的活動，難免需要花很多教育使用者開啟 LINE Beacon 所需系統權限的成本，這次高雄燈會是直接放上官方教學的圖片，並提供開啟[該教學的按鈕](https://official-blog-tw.line.me/archives/84312676.html)。

一般使用者比較常會卡住的部分，大概就是比較新的 Android 和 iOS 對 Beacon 的權限做了更多的限制，需要多做一些額外的設定才能夠收到 LINE Beacon 的訊號。

如果是 Android 12 以上，除了「藍牙」、「位置」、「高精確度」之外，還需要額外允許 LINE 取得「精確位置」。

至於 iOS 系統除了「藍牙」、「定位服務」之外，如果是 iOS 13 以上，需要額外允許LINE 在背景取得「位置」，如果是 iOS 14 以上，還需要額外允許 LINE 取得「準確位置」。

## LINE Beacon 在活動中主要功能

![](https://i.imgur.com/JHekDrT.png)

> 這張圖片的來源是高雄燈會的網站。

這次燈會活動透過佈建 LINE Beacon 來滿足防疫實名制、景點導覽、抽紅包、贊助商廣告。在參觀高雄燈會的過程中，收到 LINE Beacon 的訊息數量真的很多，在此特地把我有收到的幾大類訊息做個截圖紀錄，並簡單做個統計。

### 景點導覽

![](https://i.imgur.com/gBUAbPC.jpg)

這類景點導覽的訊息是在靠近景點的時候會收到，景點圖片拍的很漂亮，圖片上面還有加上文字，感覺做的還不錯。這類訊息我大約收到 11 則，都沒有重複收到。

### 抽紅包

![](https://i.imgur.com/WWbGtCS.png)

![](https://i.imgur.com/f4zm0iD.png)

> 下面那張圖片來源是高雄燈會的網站。

這類訊息是會連同景點介紹的訊息一起發送，這類訊息我大概收到 13 則，獎品看起來是那種無限量的折價券或是體驗券，雖然我其實很懷疑真的會有人為了這個紅包的獎品，去蒐集全部的景點導覽來獲取抽獎機會嗎？

### 燈會交通指引

![](https://i.imgur.com/ElbKm5d.png)

在高雄捷運收到的 LINE Beacon 好像都是燈會交通指引，我總共收到 7 次訊息，分成幾種不同的文案，訊息下方的按鈕會前往這個網址: <https://tw-light.tw/transport.html>

### 服務台

![](https://i.imgur.com/2wcUQ5x.png)

在服務台附近會收到這個訊息，我總共收到 5 次訊息，訊息下方的按鈕會前往這個網址: <https://tw-light.tw/loveriver.html?display=service>，雖然服務台每則訊息看起來都是有不同的文案，只不過我好奇的是，服務台其實很顯眼，收到訊息的時候理論上早就看到服務台了，應該不需要靠 LINE Beacon 提醒吧？

`@dabo_huang` 補充：他在做服務台志工的時候，蠻多民眾在設定上遇到困難，所以服務台的點推測是為了當使用者找服務台協助設定時，方便測試有沒有設定成功用的。

### 廁所

![](https://i.imgur.com/GT9JfwX.png)

在廁所附近會收到這個訊息，我總共收到 3 次訊息，訊息下方的按鈕會前往這個網址: <https://tw-light.tw/loveriver.html?display=restroom>，這訊息跟服務台的一樣讓人覺得困惑，因為廁所其實也很顯眼，收到訊息的時候理論上早就看到廁所了。

### 贊助商廣告

![](https://i.imgur.com/60Vfucb.png)

這應該就單純是贊助商廣告，我總共收到 4 次訊息。

### 防疫（類似簡訊實聯制）

![](https://i.imgur.com/gfCEvCK.jpg)

![](https://i.imgur.com/VI3Qw75.png)

> 圖片來源是[高雄旅遊網的網站](https://khh.travel/zh-tw/event/news/4292)。

高雄燈會在活動場地的各大出口，都有工作人員在檢查你的 LINE，必須要收到 LINE Beacon 的訊息才能進入會場，感覺用在防疫上面其實是一個很不錯的應用，因為 LINE 在台灣的使用者很多，不用多下載一個 APP 真的是一個很大的優勢，雖然也會擔心人數過多導致 4G 的訊號不好，導致 LINE Beacon 的進入事件沒辦法上傳給 LINE 的伺服器。

### 其他訊息

![](https://i.imgur.com/Z6Q2uqL.png)

這類訊息就比較沒辦法分類，從按鈕文字上面知道這幾個不是同一類型的訊息，但沒辦法確定是為了什麼目的而需要使用 LINE Beacon。

## 結語

這次高雄燈會活動的日期是 2/1 ~ 2/28，如果有計畫去逛燈會的朋友，也可以去體驗看看這個 LINE Beacon，我衛武營跟愛河灣各去逛了一天，但在等無人機表演時，因為人太多所以 4G 網路幾乎無法使用，這大概也是一個使用 LINE Beacon 辦大型活動會有的風險。整體來說燈會辦的還不錯，如果有跟我一樣是外縣市的朋友，可以考慮購買「五行暢遊碼」，這是我目前覺得這次活動最棒的地方，因為捷運、公車、輕軌、渡輪、YouBike 我都成功用這個優惠去體驗過了。

## 相關連結

::: tip
如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [2022 高雄燈會 LINE Beacon 介紹](https://tw-light.tw/line-beacon.html)
* [文章: LINE Simple Beacon for ESP32 工作坊](https://taichunmin.idv.tw/blog/2020-07-13-line-simple-beacon-workshop.html)
