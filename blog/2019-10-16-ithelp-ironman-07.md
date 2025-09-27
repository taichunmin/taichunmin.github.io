---
date: "2019-10-16T00:07:00+0800"
tags: [ithelp-ironman]
---
# iT 邦幫忙鐵人賽 DAY 18~21 HTML 神器 - Emmet

在我以前使用 Sublime Text 的時代，有在寫網頁的人必裝的擴充功能就是 Emmet 的前身 Zen Coding (好像不小心洩漏了自己的年齡…)，它能加快並縮短開發者在編寫 HTML 及 CSS 的時間。在換到 VS Code 以後，Emmet 這個擴充功能更是直接內建了！看完這幾天的教學文章，相信你就知道它到底有多神啦！

## 如何啟用 Emmet?

首先你先用 VS Code 隨便開啟一個空的 HTML 檔案，或是直接開一個新檔案，然後在右下角選成 HTML 語言：

![](https://i.imgur.com/VKtc5JU.png)

## 自動打出 HTML 的基礎程式碼

一開始我們可以輸入 ![](https://i.imgur.com/WFYppUx.png) 然後再輸入 ![](https://i.imgur.com/TpADG6g.png) 來自動完成基礎的 HTML 內容：

![](https://i.imgur.com/m8yq2uF.png)

按下 Tab 以後，你就可以看到它已經幫你打好了基礎的 HTML5 的程式碼：

![](https://i.imgur.com/o2QO39P.png)

在自動補完 HTML 程式碼以後，Emmet 會自動幫你選取第一個預先設定欄位（上圖中藍色底色的已選取文字），有灰色底的地方代表你接下來可以繼續按 ![](https://i.imgur.com/TpADG6g.png) 跳過去的預先設定欄位，然後最後一個 Tab 會幫你跳到 body 的標籤內，讓你可以快速開始打 body 的內容。

> 備註：`!` 預設是會幫你自動完成 HTML5 的程式碼，如果這個不是你要的，還有以下的一些其他版本的 HTML 可以使用喔！一樣都是打完關鍵字以後按下 Tab 來自動補全即可。
> * `html:xml`
> * `html:4t`
> * `html:4s`
> * `html:xt`
> * `html:xs`
> * `html:xxs`

## 透過 HTML 標籤來自動補全

首先，先確認我們的游標在 body 內：

![](https://i.imgur.com/AUhW0K1.png)

接著，輸入 `h1` 以後按下 ![](https://i.imgur.com/Wwx51QW.png) 鍵：

![](https://i.imgur.com/8tV2hcI.png)

你可以注意到，如果你打的是 HTML 裡面有的標籤，它會自動幫你打上起始標籤 `<h1>` 與結束標籤 `</h1>` ，並且幫你把游標停留在中間，之後你就可以繼續補完 `h1` 標籤裡面的文字。

接下來我們來新增一張圖片，將游標移動到此處：

![](https://i.imgur.com/25iHRNG.png)

然後輸入 `img` 之後按下 ![](https://i.imgur.com/Wwx51QW.png) 鍵：

![](https://i.imgur.com/ZlKp00L.png)

你可以注意到如果你輸入的是 HTML 內的特殊標籤，它會將這個標籤常用的屬性順便幫你打出來，並且游標會停在 `src=""` 裡面來等你輸入圖片網址。

`link` 標籤也類似 `img`，會自動打上標籤的常用屬性，並且游標會停在 `href=""` 中：

![](https://i.imgur.com/HsGNQtt.png)

![](https://i.imgur.com/nBLT6G0.png)

## 加上 id、class 與屬性

Emmet 支援使用 css selector 來讓快速幫你打上對應的程式碼：

![](https://i.imgur.com/5SpM7aq.png)

![](https://i.imgur.com/ESoxjYg.png)

你可以注意到 `.` 變成 `class=""` 的內容，`#` 變成 `id=""` 裡面的內容，然後 `[]` 內的文字會直接變成對應的額外屬性，然後在這個範例內我省略了 HTML 的標籤，當省略的時候，Emmet 自動會幫你填 `div`。

## 子元素

你可以使用 CSS Selector 中的 `>` 符號來快速產生子元素，如 `ul>li`：

![](https://i.imgur.com/AiL5tlM.png)

![](https://i.imgur.com/7zXMB6L.png)

如果你想要一次產生很多層也沒有問題！

![](https://i.imgur.com/5LrhxPG.png)

## 一次產生多個

你可以使用 `*` 來一次產生多個，如 `ul>li*5`：

![](https://i.imgur.com/qFQjjJc.png)

![](https://i.imgur.com/yAhh01b.png)

實際上，像這樣打也一樣可以使用喔！

![](https://i.imgur.com/sXj3N1o.png)

## 群組

你可以使用 `()` 來對一整個元素做操作，如 `table>(tr>td*3)*3`：

![](https://i.imgur.com/BCibKS4.png)

![](https://i.imgur.com/2szGaw3.png)

## 標籤的特殊變種

Emmet 有專門針對一些標籤設計特殊的變種，例如 `input` 有很多種不一樣的輸入框，這時候可以用 `:` 來指定要哪一種特殊的變種：

* `input:hidden`
* `input:text`
* `input:password`
* `input:tel`
* `input:number`
* `input:checkbox`
* `input:radio`
* `input:file`
* `input:submit`
* `input:button`
* `input:reset`
* 還有很多沒有列出來的就直接去查 [官方小抄][emmet-cheat-sheet] 吧！

## 相鄰元素

你可以使用 `+` 來產生相鄰的元素，如 `label+input:text`：

![](https://i.imgur.com/1Xl9Qij.png)

## 自動編號

你可以使用 `$` 來幫你自動編號，如 `img#icon-$*5`：

![](https://i.imgur.com/wa0wavx.png)

## 填充文字

你可以使用 `lorem` 來產生亂數英文單字來填充你的網頁：

![](https://i.imgur.com/DlHz8lx.png)

你還可以使用 `lorem200` ，後面的數字代表你要多少個英文單字：

![](https://i.imgur.com/vquPTVw.png)

## 更多可用的關鍵字

如果你想要知道更多可用的 Emmet 關鍵字，建議你去看 Emmet 的[官方小抄][emmet-cheat-sheet]。

[emmet-cheat-sheet]: https://docs.emmet.io/cheat-sheet/ "Emmet Cheat Sheet"
