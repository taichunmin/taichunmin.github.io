---
date: '2022-03-11T00:00:00+0800'
title: LINE 專屬的 Flex 訊息第三版更新
description: 這次最大的改版是支援在 Flex 訊息的 hero 區塊放影片，所以本文也會著重在討論這個功能。
image: https://i.imgur.com/ido2QxU.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# LINE 專屬的 Flex 訊息第三版更新

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

LINE 在 2022/03/11 發佈了[「Flex Message Update 3 released」](https://developers.line.biz/en/news/2022/03/11/flex-message-update-3-released/)，這次的改版大概有這些內容：

1. 支援在 hero 區塊放影片
2. box 支援 `maxWidth` 及 `maxHeight` 參數
3. 文字現在可以設定行距 `lineSpacing`

這次最大的改版是支援在 Flex 訊息的 hero 區塊放影片，所以本文也會著重在討論這個功能。

## 加入官方帳號「Flex 開發人員工具」

本文會使用均民自己所開發的官方帳號「Flex 開發人員工具」進行測試，如果你也想要跟著嘗試看看的話，請掃描以下 QR Code 加入好友吧！

[![](https://i.imgur.com/cP5purz.png)](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)

加入好友: <https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk>

## 準備影片

這個功能所需的影片網址，需要的是可以直接連結到影片檔案的網址，上傳到 YouTube 或是 Google Drive 之類的連結是沒有辦法直接使用的，你可以選擇放到自己的網站伺服器上，或是 Google Cloud Storage、AWS S3 之類的靜態檔案託管服務上，這方面的教學可以直接去 Google 搜尋。

本文均民選擇使用 `youtube-dl` 這個開源工具去下載 `https://www.youtube.com/watch?v=1qawxYdIsik` 這個影片，以便下一步可以上傳到 LINE VOOM 的免費空間：

```bash
$ yt-dlp -F 'https://www.youtube.com/watch?v=1qawxYdIsik'

[youtube] Extracting URL: https://www.youtube.com/watch?v=1qawxYdIsik
[youtube] 1qawxYdIsik: Downloading webpage
[youtube] 1qawxYdIsik: Downloading ios player API JSON
[youtube] 1qawxYdIsik: Downloading android player API JSON
[youtube] 1qawxYdIsik: Downloading m3u8 information
[info] Available formats for 1qawxYdIsik:
ID  EXT   RESOLUTION FPS CH │   FILESIZE   TBR PROTO │ VCODEC          VBR ACODEC      ABR ASR MORE INFO
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
sb2 mhtml 48x27        2    │                  mhtml │ images                                  storyboard
sb1 mhtml 80x45        1    │                  mhtml │ images                                  storyboard
sb0 mhtml 160x90       1    │                  mhtml │ images                                  storyboard
233 mp4   audio only        │                  m3u8  │ audio only          unknown             Default
234 mp4   audio only        │                  m3u8  │ audio only          unknown             Default
599 m4a   audio only      2 │  227.47KiB   31k https │ audio only          mp4a.40.5   31k 22k ultralow, m4a_dash
600 webm  audio only      2 │  269.24KiB   37k https │ audio only          opus        37k 48k ultralow, webm_dash
139 m4a   audio only      2 │  359.56KiB   49k https │ audio only          mp4a.40.5   49k 22k low, m4a_dash
249 webm  audio only      2 │  389.12KiB   53k https │ audio only          opus        53k 48k low, webm_dash
250 webm  audio only      2 │  484.02KiB   66k https │ audio only          opus        66k 48k low, webm_dash
140 m4a   audio only      2 │  950.87KiB  130k https │ audio only          mp4a.40.2  130k 44k medium, m4a_dash
251 webm  audio only      2 │  841.88KiB  115k https │ audio only          opus       115k 48k medium, webm_dash
17  3gp   176x144      7  1 │  575.30KiB   78k https │ mp4v.20.3           mp4a.40.2       22k 144p
597 mp4   256x144     15    │  250.29KiB   34k https │ avc1.4d400b     34k video only          144p, mp4_dash
602 mp4   256x144     15    │ ~761.45KiB  102k m3u8  │ vp09.00.10.08  102k video only
598 webm  256x144     15    │  225.67KiB   31k https │ vp9             31k video only          144p, webm_dash
269 mp4   256x144     30    │ ~  1.36MiB  186k m3u8  │ avc1.4D400C    186k video only
160 mp4   256x144     30    │  580.11KiB   79k https │ avc1.4D400C     79k video only          144p, mp4_dash
603 mp4   256x144     30    │ ~  1.19MiB  162k m3u8  │ vp09.00.11.08  162k video only
278 webm  256x144     30    │  548.95KiB   75k https │ vp09.00.11.08   75k video only          144p, webm_dash
229 mp4   426x240     30    │ ~  2.40MiB  327k m3u8  │ avc1.4D4015    327k video only
133 mp4   426x240     30    │    1.16MiB  162k https │ avc1.4D4015    162k video only          240p, mp4_dash
604 mp4   426x240     30    │ ~  1.98MiB  270k m3u8  │ vp09.00.20.08  270k video only
242 webm  426x240     30    │  948.04KiB  129k https │ vp09.00.20.08  129k video only          240p, webm_dash
230 mp4   640x360     30    │ ~  4.66MiB  637k m3u8  │ avc1.4D401E    637k video only
134 mp4   640x360     30    │    2.08MiB  290k https │ avc1.4D401E    290k video only          360p, mp4_dash
18  mp4   640x360     30  2 │ ≈  3.07MiB  419k https │ avc1.42001E         mp4a.40.2       44k 360p
605 mp4   640x360     30    │ ~  3.80MiB  519k m3u8  │ vp09.00.21.08  519k video only
243 webm  640x360     30    │    1.59MiB  221k https │ vp09.00.21.08  221k video only          360p, webm_dash
231 mp4   854x480     30    │ ~  7.86MiB 1073k m3u8  │ avc1.4D401F   1073k video only
135 mp4   854x480     30    │    3.68MiB  513k https │ avc1.4D401F    513k video only          480p, mp4_dash
606 mp4   854x480     30    │ ~  5.77MiB  788k m3u8  │ vp09.00.30.08  788k video only
244 webm  854x480     30    │    2.58MiB  360k https │ vp09.00.30.08  360k video only          480p, webm_dash
22  mp4   1280x720    30  2 │ ≈  7.91MiB 1080k https │ avc1.64001F         mp4a.40.2       44k 720p
232 mp4   1280x720    30    │ ~ 14.91MiB 2036k m3u8  │ avc1.64001F   2036k video only
136 mp4   1280x720    30    │    6.82MiB  952k https │ avc1.64001F    952k video only          720p, mp4_dash
609 mp4   1280x720    30    │ ~ 10.38MiB 1418k m3u8  │ vp09.00.31.08 1418k video only
247 webm  1280x720    30    │    4.98MiB  696k https │ vp09.00.31.08  696k video only          720p, webm_dash
270 mp4   1920x1080   30    │ ~ 27.23MiB 3718k m3u8  │ avc1.640028   3718k video only
137 mp4   1920x1080   30    │   13.46MiB 1879k https │ avc1.640028   1879k video only          1080p, mp4_dash
614 mp4   1920x1080   30    │ ~ 17.42MiB 2378k m3u8  │ vp09.00.40.08 2378k video only
248 webm  1920x1080   30    │    8.47MiB 1183k https │ vp09.00.40.08 1183k video only          1080p, webm_dash

$ yt-dlp -f 22 'https://www.youtube.com/watch?v=1qawxYdIsik'

[youtube] Extracting URL: https://www.youtube.com/watch?v=1qawxYdIsik
[youtube] 1qawxYdIsik: Downloading webpage
[youtube] 1qawxYdIsik: Downloading ios player API JSON
[youtube] 1qawxYdIsik: Downloading android player API JSON
[youtube] 1qawxYdIsik: Downloading m3u8 information
[info] 1qawxYdIsik: Downloading 1 format(s): 22
[download] Destination: 防疫大作戰－日常防疫 5 Tips (田知學醫師，國語) [1qawxYdIsik].mp4
[download] 100% of    7.73MiB in 00:00:02 at 3.65MiB/s
```

## LINE VOOM 免費影片空間

在開始之前，先感謝耿順一學弟跟我分享的這個小技巧，透過這個方法把影片上傳到 LINE VOOM 後，可以直接拿到 Flex 訊息能使用的 MP4 檔案網址！

首先，先前往 [LINE 官方帳號管理頁面](https://manager.line.biz/)，選擇一個不重要的頻道，然後開啟 LINE VOOM 頁面：

![](https://hackmd.io/_uploads/ByIDXKYU6.png)

打開 LINE VOOM 頁面後，點擊「建立新貼文」按鈕：

![](https://hackmd.io/_uploads/HJ0EVtKI6.png)

由於預設的「影片」模式限制最多只能上傳 1 分鐘的影片，所以要點擊「貼文」來切換模式：

![](https://hackmd.io/_uploads/BydxrKY86.png)

點擊圖片中的按鈕來上傳影片：

![](https://hackmd.io/_uploads/HyfdrtFLT.png)

上傳完成後，點擊「公開」按鈕來發佈貼文：

![](https://hackmd.io/_uploads/ByWWtKYU6.png)

然後開啟瀏覽器的「開發人員工具」（在 Windows 的 Google Chrome 瀏覽器中，快捷鍵是 `F12`），並切換到「網路」分頁，打開篩選器，然後選擇「媒體」：

![](https://hackmd.io/_uploads/SkffstKLp.png)

然後開啟貼文詳情頁面：

![](https://hackmd.io/_uploads/SyqPsYF86.png)

如果以上的步驟都正確的話，你應該就會在「開發人員工具」看到影片的網址：

![截圖 2023-12-15 下午4.19.34](https://hackmd.io/_uploads/Sk4cnFtUa.png)

然後請在影片上點擊右鍵，然後選擇「複製」➜「複製連結網址」：

![截圖 2023-12-15 下午4.22.22](https://hackmd.io/_uploads/Sy7MTKFLp.png)

這樣就成功拿到網址囉！複製的影片網址如下：

```
https://obs.line-scdn.net/r/myhome/hex/cj01ZmZnaGl1bGNrYTY5JnM9anA3JnQ9ZCZ1PTFidGJzanNkYzNoMDAmaT0w/mp4
```

再次感謝耿順一學弟分享的小技巧。


## 準備封面圖

除了影片檔之外，你也需要幫影片準備一個封面圖，在此均民把預覽圖片上傳到 Imgur，以下是上傳完成後的網址：

```
預覽圖: https://i.imgur.com/nKkaGB2.jpeg
```
## 撰寫 Flex 訊息

有了影片跟預覽圖以後，我們就可以來編寫 Flex 訊息所需要的 JSON 了，~~因為目前[「Flex 訊息模擬器」](https://developers.line.biz/flex-simulator/)還不支援這個功能~~（3/18 更新：[「Flex 訊息模擬器」](https://developers.line.biz/flex-simulator/)已經有支援編輯了，雖然只能顯示替代內容），所以目前只能自己手動撰寫這個 JSON：

```json
{
  "type": "bubble",
  "size": "giga",
  "hero": {
    "type": "video",
    "url": "https://obs.line-scdn.net/r/myhome/hex/cj01ZmZnaGl1bGNrYTY5JnM9anA3JnQ9ZCZ1PTFidGJzanNkYzNoMDAmaT0w/mp4",
    "previewUrl": "https://i.imgur.com/nKkaGB2.jpeg",
    "aspectRatio": "1280:720",
    "altContent": {
      "type": "image",
      "size": "full",
      "aspectRatio": "1280:720",
      "aspectMode": "cover",
      "url": "https://i.imgur.com/nKkaGB2.jpeg"
    }
  }
}
```

寫完以後，你就可以直接把 JSON 複製貼上給均民所開發的「Flex 開發人員工具」：

| ![](https://i.imgur.com/thNy51Ih.png) | ![](https://i.imgur.com/8U6YO5Xh.jpeg) |
| :--: | :--: |
| Android | iPhone |

除此之外，你還可以透過指定 `action` 參數，來幫影片多放一個連結（目前僅支援 `uri action`）：

```json
{
  "type": "bubble",
  "size": "giga",
  "hero": {
    "type": "video",
    "url": "https://obs.line-scdn.net/r/myhome/hex/cj01ZmZnaGl1bGNrYTY5JnM9anA3JnQ9ZCZ1PTFidGJzanNkYzNoMDAmaT0w/mp4",
    "previewUrl": "https://i.imgur.com/nKkaGB2.jpeg",
    "aspectRatio": "1280:720",
    "action": {
      "type": "uri",
      "label": "在 YouTube 觀看",
      "uri": "https://www.youtube.com/watch?v=1qawxYdIsik"
    },
    "altContent": {
      "type": "image",
      "size": "full",
      "aspectRatio": "1280:720",
      "aspectMode": "cover",
      "url": "https://i.imgur.com/nKkaGB2.jpeg"
    }
  }
}
```

這個連結會出現在三個地方：

1. 聊天視窗 Flex 訊息的影片播放按鈕下方
2. 影片播放中的右上角
3. 影片播放結束的重播按鈕下方

![](https://i.imgur.com/UYmQSE8.png)

![](https://i.imgur.com/gk5WzLX.png)

這個訊息是可以透過 `liff.shareTargetPicker` 分享給好友或群組的，你可以直接點選上方的「分享」按鈕透過均民開發的另一個程式「LINE 數位版名片」分享出去測試：

![](https://i.imgur.com/fE9wl9X.png)

## 不支援裝置的替代內容

當手機不支援這個最新的 `video` 功能時，你需要透過 `altContent` 屬性指定替代的內容，目前均民開發用的 `iPhone 6+` (iOS 12.5.5, LINE 11.17.0) 就不支援這個功能：

![](https://i.imgur.com/8bVC4vvh.png)

## 自動播放影片

在 PC 版的 LINE 不支援自動播放，在手機上影片能不能自動播放，就要看使用者的設定，設定的位置在「設定」➜「照片．影片」➜「自動播放影片」：

![](https://i.imgur.com/qaA0OLd.png)

![](https://i.imgur.com/nvqEprZ.png)

如果影片沒辦法自動播放，使用者還是可以手動在聊天室點選影片來播放。

## Flex 訊息的四個區塊

一則 Flex 訊息是由四個區塊所組成，分別為 `header`、`hero`、`body`、`footer`，區塊之間的順序是不可更改的：

![](https://i.imgur.com/b1vf0MW.png)

也就是說，如果你想要在影片上方自訂內容，你需要寫在 `header` 區塊中，如果你想要在影片下方自訂內容則是 `body` 或是 `footer` 區塊都可。

## 其他注意事項以及限制

1. 只能直接在 Flex 訊息的 hero 區塊使用 video 功能（子元素也不支援）
2. bubble 的大小必須為 `kilo`、`mega`、`giga` 其中之一
3. 無法在 Flex 的 Carousel 中使用 video
4. 影片與預覽圖片的比例必須相同，不然會有不可預期的顯示結果
5. 目前只支援 mp4 格式，影片檔案最大 200 MB
6. 目前影片的 `action` 僅支援 `uri` 連結

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License。
:::

* [新聞: LINE 2022/03/11 發佈的新聞](https://developers.line.biz/en/news/2022/03/11/flex-message-update-3-released/) by LINE
* [原始碼: Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)
* [文章: 圖文選單遊樂場中文版：超快速認識圖文選單的功能！](https://taichunmin.idv.tw/blog/2022-02-10-richmenu-playground.html)
* [文章: 快速測試 LINE Flex 訊息在手機上顯示的寬度](https://taichunmin.idv.tw/blog/2021-09-10-line-flex-width.html)
* [文章: LINE 官方帳號全都能用的多層選單功能](https://taichunmin.idv.tw/blog/2021-06-22-linebot-richmenu-alias.html)
* [文章: 快速測試 LINE 官方帳號及 Notify 能傳送的貼圖](https://taichunmin.idv.tw/blog/2021-04-16-linebot-test-sticker.html)
* [文章: Quick Reply 支援 URI Action](https://taichunmin.idv.tw/blog/2021-03-11-line-quickreply-uri.html)
* [文章:「Flex 開發人員工具」支援 mention 新功能](https://taichunmin.idv.tw/blog/2021-01-20-line-devbot-mention.html)
* [文章: LINE Simple Beacon for ESP32 工作坊](https://taichunmin.idv.tw/blog/2020-07-13-line-simple-beacon-workshop.html)
* [文章: 如何在 LIFF 傳送隱藏資料給機器人](https://taichunmin.idv.tw/blog/2020-04-07-line-liff-send-hidden-data.html)
* [文章: 輔助開發 LINE Flex 訊息的工具](https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html)
