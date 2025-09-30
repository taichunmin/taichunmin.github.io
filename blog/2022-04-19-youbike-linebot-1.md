---
date: '2022-04-19T00:00:00+0800'
title: LINE 案例分享：站點查詢
description: 這次分享的案例是針對「YouBike 微笑單車」官方帳號中，最多使用者使用的「站點查詢」功能。
image: https://i.imgur.com/vteP11N.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# LINE 案例分享：站點查詢

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

最近想要把自己做過或是看過的功能整理成案例分享，這次分享的案例是針對[「YouBike 微笑單車」](https://liff.line.me/1645278921-kWRPP32q/?accountId=youbike)官方帳號中，最多使用者使用的「站點查詢」功能。

目前[「YouBike 微笑單車」](https://liff.line.me/1645278921-kWRPP32q/?accountId=youbike)官方帳號的好友數約 363159，「站點查詢」功能在過去八個月的使用量大約是 52575 人次，平均每人使用 0.14 次。

## 功能簡介

這個「站點查詢」是這個官方帳號的主打功能，所以這功能直接跟功能選單做在一起，然後把按鈕放在圖文選單最顯眼的位置。當使用者點選圖文選單的按鈕後，聊天機器人就會回傳功能選單給使用者，這個功能選單底下會有 QuickReply 按鈕可以查附近站點。

當使用者按下「查附近站點」的按鈕後，就會跳出 LINE APP 內建的位置選擇畫面，畫面的上半部是地圖，預設會使用手機目前的定位，使用者可以拖曳地圖來調整位置；畫面的下半部是地標搜尋，使用者可以輸入地標名稱來查詢想要的地點。當找到想搜尋的地點後，就可以按下右上角的「分享」按鈕，位置資訊就會被傳送給聊天機器人。

![](https://i.imgur.com/a4XaNBq.png)

![](https://i.imgur.com/pR53Zva.png)

> 站點查詢的流程，上方是 Android，下方是 iPhone。

因為怕使用者沒有注意到下方的 QuickReply 按鈕，或是在 LINE 的 PC 版上面不會顯示 QuickReply 按鈕，所以我們特地在「功能選單」上面多放了一個「站點查詢」的按鈕，按下去之後就是這個功能的使用教學，並且提醒這個功能只能在手機上面使用。

![](https://i.imgur.com/LD2FdDA.png)

> 避免使用者沒看到 QuickReply 的防呆機制，左邊是 Android，右邊是 iPhone。

當使用者上傳的位置附近有 YouBike 站點時，聊天機器人就會回傳最近的五個營運中站點，以及查詢當下站點可借可還的數量。

![](https://i.imgur.com/1bKxSuU.png)

![](https://i.imgur.com/cMbOYnz.png)

> 使用 Flex Carousel 由近到遠來呈現站點查詢的結果。

如果使用者上傳的位置附近沒有 YouBike 站點，聊天機器人就會單純給一個按鈕，可以開啟以 [Leaflet.js](https://leafletjs.com/) 製作的站點地圖。

![](https://i.imgur.com/nIsIXth.png)

> 使用者查詢的位置附近沒有站點，左邊是 Android，右邊是 iPhone。

在每站的查詢結果下方有一個「地圖導覽」按鈕，當使用者點選後，會透過外部瀏覽器開啟站點地圖。正中央會標記使用者所查詢的位置，並且在 300 公尺及 1 公里的距離畫出藍色圈圈，方便使用者判斷與站點的大概距離。在站點資訊的跳窗上會顯示該站的最新可借可還數量，並提供一個「Google 導航」按鈕方便使用者可以快速開啟導航。地圖右上角可以切換是否要顯示「YouBike 1.0」跟「YouBike 2.0」的站點。

![](https://i.imgur.com/o4ixQbo.png)

![](https://i.imgur.com/dLbFF2n.png)

> 開啟站點 Google 導航的流程，上方是 Android，下方是 iPhone。

## 深入探討

### 搜尋地標以及地標轉換成經緯度

截至目前為止，全台灣的 YouBike 站點數量早已超過 5000 站，如果使用者今天想查詢的站點不是在目前的定位附近，他也不可能說出他想查詢的站點名稱，更何況連站點名稱都有可能會重複…目前在 YouBike 的官網跟 APP 中都只能夠透過目前定位或是站點名稱來搜尋，所幸在 LINE APP 中上傳位置的功能有整合地標搜尋的功能，使用者透過搜尋找到他想找的地標後，聊天機器人就會收到使用者上傳的經緯度座標，就不用擔心地標轉換成經緯度的問題！

![](https://i.imgur.com/guuJezb.png)

> 聊天機器人實際收到的經緯度資料格式（透過均民自己所開發的官方帳號[「Flex 開發人員工具」](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)中實測）。左邊是 Android，右邊是 iPhone，值得注意的地方是 iPhone 在開啟精準定位後，拿到的經緯度在小數點部分的位數會比 Android 多。

### 小型圖文選單及多層次選單

在手機上使用官方帳號時，如果圖文選單太高，其實還蠻影響使用者體驗的，而且[「YouBike 微笑單車」](https://liff.line.me/1645278921-kWRPP32q/?accountId=youbike)官方帳號所提供的功能其實很多，所以後來決定參考別人的官方帳號，也做成多層次選單，並且把圖文選單盡可能的縮小。另外在 LINE APP 中透過 QuickReply 上傳位置的使用者體驗比較好，所以就決定把「站點查詢」做在功能選單的 QuickReply 按鈕上。

![](https://i.imgur.com/DQa1OOs.png)

> 小型圖文選單及多層次選單，左邊是 Android，右邊是 iPhone。

### 以 [Leaflet.js](https://leafletjs.com/) 來實作的站點地圖

對於想要尋找 YouBike 站點的使用者來說，難免會想要知道如何前往站點，但目前在 LINE APP 中還沒辦法顯示地圖，所以只好使用網頁技術來實作。目前 Google 地圖在網頁版的收費非常貴，所以後來我們決定使用 [Leaflet.js](https://leafletjs.com/) 搭配 CARTO 地圖圖磚來實作站點地圖。

![](https://i.imgur.com/vt4IKw3.png)

> 以 [Leaflet.js](https://leafletjs.com/) 來實作的站點地圖，左邊是 Android，右邊是 iPhone。

### 上傳經緯度後找出附近站點

計算兩個經緯度的大約距離，主要是透過 [haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) 計算出來的，如果想知道我怎麼寫的，可以[點此查看原始碼](https://github.com/taichunmin/gactions-gogoro-battery/blob/master/index.js#L43)。但 haversine formula 使用了大量的三角函數來計算，為了減低伺服器的負擔，我曾用過兩種作法來加快伺服器計算的速度：

我早期的作法是把站點的經緯度資料存到 MySQL 中，當聊天機器人取得使用者上傳的經緯度位置之後，先用 MySQL 過濾出指定經緯度範圍內的站點，然後才透過 haversine formula 計算。

![](https://i.imgur.com/rgoXnDT.png)

> 先透過 MySQL 取出指定經緯度範圍內的站點，來減少 haversine formula 的計算量

後來我改成使用 Redis 內建的 GEO 功能，主要是用到 `geoadd`、`georadius`、`georadiusbymember` 這幾個指令，Redis 底層實作的方法大概是先把經緯度轉換成 Geohash，然後儲存在 sorted set 裡面以便搜尋，如果想要看文件可以[前往這個連結](https://redis.io/commands/?group=geo)。

![](https://i.imgur.com/BLyxIWD.png)

> Redis 所提供的 GEO 系列指令

### 站點資料的暫存機制

聊天機器人的站點資料主要是來自 YouBike 的官網，為了避免流量過大影響到官網的運作，所以我在程式碼裡面多做了一層站點資料的暫存。

為了降低檔案大小，我先寫了一個小程式放在 Google 的 Cloud Functions 上面，負責把站點資料從 JSON 轉成經過 gzip 壓縮的 CSV，並存放到 Cloud Storage 上面。

在這個小程式處理完以後，同時也會丟事件給 Pub/Sub，伺服器的程式收到這個事件後，就會去把 CSV 的資料抓回來更新到 Redis 內，透過這樣的處理流程，大約可以把延遲時間控制在兩分鐘左右。

當使用者開啟站點地圖網頁時，如果直接從 Cloud Storage 讀取站點資料 CSV，可能會產生大量的 Cloud Storage 的網路費用，所以我選擇使用 CloudFlare 提供的 CDN 服務來做檔案快取，如果在 CloudFlare CDN 上面沒有快取，才會真的從 Cloud Storage 讀取資料。

![](https://i.imgur.com/E73oqaA.png)

> 站點可借可還資料的處理流程

## 相關連結

::: info
如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [「YouBike 微笑單車」](https://liff.line.me/1645278921-kWRPP32q/?accountId=youbike)官方帳號
* [「Flex 開發人員工具」](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)官方帳號
* [haversine formula](https://en.wikipedia.org/wiki/Haversine_formula)
* [Leaflet.js](https://leafletjs.com/)
* [Redis GEO Commands](https://redis.io/commands/?group=geo)
