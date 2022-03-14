---
date: '2022-03-11T00:00:00+08'
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

LINE 在 2022/03/11 發佈了[「Flex Message Update 3 released」](https://developers.line.biz/en/news/2022/03/11/flex-message-update-3-released/)，這次的改版大概有這些內容：

1. 支援在 hero 區塊放影片
2. box 支援 `maxWidth` 及 `maxHeight` 參數
3. 文字現在可以設定行距 `lineSpacing`

這次最大的改版是支援在 Flex 訊息的 hero 區塊放影片，所以本文也會著重在討論這個功能。

## 加入官方帳號「Flex 開發人員工具」

本文會使用均民自己所開發的官方帳號「Flex 開發人員工具」進行測試，如果你也想要跟著嘗試看看的話，請掃描以下 QR Code 加入好友吧！

[![](https://i.imgur.com/cP5purz.png)](https://line.me/R/ti/p/%40736cebrk)

加入好友: <https://line.me/R/ti/p/@736cebrk>

## 準備影片

這個功能所需的影片網址，需要的是可以直接連結到影片檔案的網址，YouTube 或是 Google Drive 之類的連結是沒有辦法直接使用的，你可以選擇放到自己的網站伺服器上，或是 Google Cloud Storage、AWS S3 之類的靜態檔案服務上，這方面的教學可以直接去 Google 搜尋。

本文均民選擇使用 `youtube-dl` 這個開源工具去下載 `https://www.youtube.com/watch?v=1qawxYdIsik` 這個影片，然後透過 git 上傳到 GitHub Gist 上，但因為這不是這篇文章的重點，所以在此不會細談，以下是大概的指令：

```bash
$ youtube-dl -F 'https://www.youtube.com/watch?v=1qawxYdIsik'
[youtube] 1qawxYdIsik: Downloading webpage
[info] Available formats for 1qawxYdIsik:
format code  extension  resolution note
249          webm       audio only tiny   53k , webm_dash container, opus @ 53k (48000Hz), 389.12KiB
250          webm       audio only tiny   65k , webm_dash container, opus @ 65k (48000Hz), 484.02KiB
251          webm       audio only tiny  114k , webm_dash container, opus @114k (48000Hz), 841.88KiB
140          m4a        audio only tiny  129k , m4a_dash container, mp4a.40.2@129k (44100Hz), 950.87KiB
278          webm       256x144    144p   74k , webm_dash container, vp9@  74k, 30fps, video only, 548.95KiB
160          mp4        256x144    144p   79k , mp4_dash container, avc1.4d400c@  79k, 30fps, video only, 580.11KiB
242          webm       426x240    240p  129k , webm_dash container, vp9@ 129k, 30fps, video only, 948.04KiB
133          mp4        426x240    240p  161k , mp4_dash container, avc1.4d4015@ 161k, 30fps, video only, 1.16MiB
243          webm       640x360    360p  221k , webm_dash container, vp9@ 221k, 30fps, video only, 1.59MiB
134          mp4        640x360    360p  290k , mp4_dash container, avc1.4d401e@ 290k, 30fps, video only, 2.08MiB
244          webm       854x480    480p  359k , webm_dash container, vp9@ 359k, 30fps, video only, 2.58MiB
135          mp4        854x480    480p  513k , mp4_dash container, avc1.4d401f@ 513k, 30fps, video only, 3.68MiB
247          webm       1280x720   720p  695k , webm_dash container, vp9@ 695k, 30fps, video only, 4.98MiB
136          mp4        1280x720   720p  952k , mp4_dash container, avc1.64001f@ 952k, 30fps, video only, 6.82MiB
248          webm       1920x1080  1080p 1182k , webm_dash container, vp9@1182k, 30fps, video only, 8.47MiB
137          mp4        1920x1080  1080p 1879k , mp4_dash container, avc1.640028@1879k, 30fps, video only, 13.46MiB
18           mp4        640x360    360p  386k , avc1.42001E, 30fps, mp4a.40.2 (44100Hz), 2.77MiB
22           mp4        1280x720   720p 1080k , avc1.64001F, 30fps, mp4a.40.2 (44100Hz) (best)

$ youtube-dl -f 22 'https://www.youtube.com/watch?v=1qawxYdIsik'
[youtube] 1qawxYdIsik: Downloading webpage
[download] Destination: 防疫大作戰－日常防疫 5 Tips (田知學醫師，國語)-1qawxYdIsik.mp4
[download] 100% of 7.73MiB in 01:56

$ git clone git@gist.github.com:3a41f553ac230587512bd20d19fa906f.git gist220311
正複製到 'gist220311'...

$ cd gist220311
$ git add .
$ git commit -m 'upload video'
$ git push -u origin master
```

上傳完成後，你也需要幫影片準備一個預覽圖片，在此均民把預覽圖片上傳到 Imgur，以下是上傳完成後的網址：

```
影片: https://gist.githubusercontent.com/taichunmin/3a41f553ac230587512bd20d19fa906f/raw/video.mp4
預覽圖: https://i.imgur.com/nKkaGB2.jpeg
```

### 2020/03/14 補充：LINE VOOM 網路影片空間

耿順一學弟在看過我寫的這篇文章以後，跟我分享了一個小技巧，就是上傳到 LINE VOOM 的影片可以直接拿到 `.mp4` 的網址，就不需要使用均民在上面提供的上傳到 GitHub Gist 的方法喔！

首先，先前往 [LINE 官方帳號管理頁面](https://manager.line.biz/)，選擇一個不重要的頻道，然後到 LINE VOOM 點選建立：

![](https://i.imgur.com/My8Wovh.png)

然後點選「上傳圖片或影片」來上傳：

![](https://i.imgur.com/bGrSlEz.png)

目前影片的相關限制如下：

![](https://i.imgur.com/OgykEJb.png)

影片上傳完成以後，就可以去按最下面的「貼文」按鈕。回到貼文頁面以後，再點進貼文的詳細內容：

![](https://i.imgur.com/sfwGHvh.png)

進入貼文詳細內容以後，再次點選影片：

![](https://i.imgur.com/nqCDhxE.png)

然後影片打開以後，對影片按下右鍵並從選單中選擇「複製影片位址」：

![](https://i.imgur.com/MxgdzIt.png)

這樣就成功拿到網址囉！經過實測這個影片網址是真的可以在 Flex 訊息的 video 功能中正常使用，再次感謝耿順一學弟分享的小技巧。

## 撰寫 Flex 訊息

有了影片跟預覽圖以後，我們就可以來編寫 Flex 訊息所需要的 JSON 了，~~因為目前[「Flex 訊息模擬器」](https://developers.line.biz/flex-simulator/)還不支援這個功能~~（3/18 更新：[「Flex 訊息模擬器」](https://developers.line.biz/flex-simulator/)已經有支援編輯了，雖然只能顯示替代內容），所以目前只能自己手動撰寫這個 JSON：

```json
{
  "type": "bubble",
  "size": "giga",
  "hero": {
    "type": "video",
    "url": "https://gist.githubusercontent.com/taichunmin/3a41f553ac230587512bd20d19fa906f/raw/video.mp4",
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
    "url": "https://gist.githubusercontent.com/taichunmin/3a41f553ac230587512bd20d19fa906f/raw/video.mp4",
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
