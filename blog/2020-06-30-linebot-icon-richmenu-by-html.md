---
date: "2020-06-30T00:00:00+0800"
title: 用 HTML 為機器人製作簡易圖示與主選單
description: 這篇文章是寫給和我一樣不會畫圖的工程師
image: https://i.imgur.com/izqPy3H.png
tags:
  - LINE
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---

# 用 HTML 為機器人製作簡易圖示與主選單

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

這篇文章是寫給和我一樣不會用 illustrator 之類的工具畫圖的工程師 XD

我平常會利用自己的空間時間做幾個 LINE chatbot 的 Side Project，但卻苦於自己不會用 illustrator 之類的工具畫圖，所以沒辦法幫它製作漂亮的 icon 和主選單，後來，我想到了一個方法，就是在網路上找一些免費資源，然後用 HTML 製作成自己想要的樣子，然後再用 Chrome 瀏覽器產生截圖，這樣就能順利產生簡易圖示與主選單了！

## 圖示：Flex 開發人員工具

<https://github.com/taichunmin/gcf-line-devbot>

在 Evan Lin 問我要不要投稿一些非商用的作品到 [LINE 開發者社群的作品集](https://github.com/taichunmin/gcf-line-devbot) 時，我第一個想到的就是這個之前文章中介紹過的 [Flex 開發人員工具](https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html)，但是這個工具一直都沒有圖示，為了要投稿，所以我就用這個方法製作了一個！

首先，我在 codepen.io 建立了一個新的 pen：

![](https://i.imgur.com/fTHEuLB.jpg)

然後我去 Google Fonts 找了一個看起來順眼的英文字型，引用到 pen 裡面：

![](https://i.imgur.com/zSebJ9Y.jpg)

然後運用自己會的 HTML 和 CSS 等技術，想辦法讓這個網頁變成我要的樣子：

![](https://i.imgur.com/H4yu1NO.png)

由於只是做出來為了截圖，所以 HTML 和 CSS 用的很隨便，[可以點此來看我做的這個網頁](https://codepen.io/taichunmin/full/abdLXXP)。

網頁做完以後，就可以切換成 Full Page View 方便截圖：

![](https://i.imgur.com/tV7BQRf.jpg)

由於我習慣使用 Chrome，所以我接下來的步驟也都是 Chrome 的操作方法。

切換到 Full Page View 以後，codepen 上方還是會顯示一個討厭的選單，所以我們需要按下 F12 開啟開發人員工具，然後使用左上角的元素選取工具來選取那個選單：

![](https://i.imgur.com/vHHofE0.jpg)

然後在左邊確認選取到要刪除的 DOM，按下 backspace 來刪除：

![](https://i.imgur.com/5DrxQ9q.jpg)

刪除之後，我們要來調整網頁的大小，點選左上的第二顆按鈕：

![](https://i.imgur.com/jtPaR3U.jpg)

然後把上方調整成 `Responsive` 以及 `512x512`:

![](https://i.imgur.com/aAEt7ek.jpg)

然後按下組合鍵 `Ctrl+Shift+P` 來打開開發人員工具的指令輸入框：

![](https://i.imgur.com/5GfXvKb.jpg)

然後輸入 `capture` 後執行 `Capture screenshot` 指令：

![](https://i.imgur.com/uI4lee4.jpg)

然後你應該就會看到 Chrome 出現一個下載的圖片了：

![](https://i.imgur.com/OF1bzfV.jpg)

最後做出來的圖示如下：

<img src="https://i.imgur.com/F2rR6tL.png" style="width: 256px">

## 主選單：某個 Side Project

這個是之前試玩 LINE Things 的 Side Project，我也用了同樣的方法製作了主選單，我是去 Flaticon 找了兩個圖示，然後用 HTML 做成我想要的樣子如下：

![](https://i.imgur.com/yu5KxUG.png)

[可以點此查看我做的這個 codepen](https://codepen.io/taichunmin/full/jJRqRy)。

![](https://i.imgur.com/RAEsIs2.png)

> Icon made by [**Vectors Market**](https://www.flaticon.com/authors/vectors-market) and [**Smashicons**](https://www.flaticon.com/authors/smashicons) from [**www.flaticon.com**](https://www.flaticon.com)

## 原始碼及參考連結

::: tip
本文範例程式的原始碼授權為 MIT License。
:::

* [Flaticon](https://www.flaticon.com/)
* [使用 Chrome 內建工具製作網頁長截圖，擷取網站畫面免安裝下載外掛](https://free.com.tw/chrome-capture-full-size-screenshot/)
* [New screenshot workflows](https://developers.google.com/web/updates/2017/08/devtools-release-notes#screenshots)
