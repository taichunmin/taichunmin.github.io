---
date: "2019-10-16T00:02:00+0800"
tags: [ithelp-ironman, vscode]
---
# iT 邦幫忙鐵人賽 DAY 2~4 快速上手

要寫一個軟體的教學文章，不免俗的總要來個安裝教學，但是我只想要提我覺的值得注意的部份，另外，由於我平常的使用環境是 Windows 和 macOS，所以往後 Linux 相關的內容基本上會比較少。

## 安裝 VS Code

要安裝 VS Code，你必須要前往 <https://code.visualstudio.com/> 下載，理論上，網頁會自動根據你的 User Agent 來自動選擇版本，當然你也可以按右邊的下拉選單來選擇其他平台或是 Insiders 版本。

![](https://i.imgur.com/mvcGrbQ.png)

> 備註：Insiders 版本，又可稱為「搶先體驗版」或「不穩定版」，這個版本會每天更新，裡面會包含最新被合併的功能，當然也可能會有比較多的程式臭蟲 (bugs)，這個版本和穩定版本是分開的，不會互相影響。如果你是真的要開發軟體的話，建議你還是使用穩定版來開發。

如果你是 Windows 的使用者，在安裝過程中你會看到這個畫面：

![](https://i.imgur.com/Wt7XrnE.png)

我非常建議你要把下面那四個都勾選，前兩個是讓你可以對檔案或是資料夾按右鍵直接在 VS Code 中打開，第三個是自動將 VS Code 註冊為所有支援檔案類型的預設程式，最後一個則是讓你可以在命令提示字元 (cmd.exe) 或是 PowerShell 中可以用 `code` 指令來開啟 VS Code。

## VS Code 介面簡介

VS Code 的定位是在程式碼編輯器，所以不像 IDE 會給你很複雜的介面，第一次開啟 VS Code 的時候，你會看到歡迎頁面如下：

![](https://i.imgur.com/pBfKGPy.png)

你可以點選「介面概觀」來看到 VS Code 的介面介紹：

![](https://i.imgur.com/69mmcxn.png)

> 備註：由於我是選用 **Sublime** 的鍵盤快速鍵，所以可能會和你顯示的快捷鍵有所差異，所以你可能需要自己點選這個「介面簡介」來參考快捷鍵。

從畫面左邊開始（也就是側邊欄）由上到下依序你可以看到：

1. 檔案總管 ![](https://i.imgur.com/Ld3Ingq.png)
2. 跨檔案搜尋 ![](https://i.imgur.com/DsnlsTN.png)
3. 原始程式碼管理 ![](https://i.imgur.com/22WXDEg.png)
4. 啟動並偵錯 ![](https://i.imgur.com/yB2GVoj.png)
5. 管理擴充功能 ![](https://i.imgur.com/kxAUO1J.png)

> 備註：底下的第 6 個和第 7 個圖案是因為我裝其他擴充功能跑出來的，在此先忽略不提。另外，你還可以用 ![](https://i.imgur.com/RNEVSF1.png) 來切換側邊欄。

在畫面下方的部份由左到右依序是：

1. 底下的藍色狀態列是「檢視錯誤和警告」![](https://i.imgur.com/Jyes2v8.png)
2. 整合式終端機 ![](https://i.imgur.com/izURn5b.png) (這個要用快捷鍵打開，按鍵就是 `TAB` 上面的那個按鍵)
3. 顯示通知

在畫面中間的部份只有「尋找及執行所有命令」。![](https://i.imgur.com/EXvNZfc.png)

> 備註：在以上介紹的東西中，我最常用的就是「整合式終端機」![](https://i.imgur.com/izURn5b.png) 和「尋找及執行所有命令」![](https://i.imgur.com/EXvNZfc.png)，這兩個快捷鍵特別值得背下來。

## 工具和語言

![](https://i.imgur.com/sapuRLw.png)

VS Code 本身就有內建 JavaScript 的支援，你可以按這邊來安裝更多你想用的程式語言支援。

![](https://i.imgur.com/jL1dPSL.png)

## 設定及按鍵對應

你可以透過打開「尋找及執行所有命令」![](https://i.imgur.com/EXvNZfc.png) 然後輸入 `keyboard`，然後找到「鍵盤快速鍵參考」來下載 VS Code 預設快捷鍵的參考 PDF。 

![](https://i.imgur.com/wOPa3ER.png)

在此附上所有平台的網址：

* [Windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
* [Linux](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf)
* [macOS](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)

> 備註：由於我之前最熟悉的編輯器是 Sublime，所以我會選擇套用 Sublime 的快捷鍵，日後的教學文章我也都會使用 Sublime 的快捷鍵設定，基本上這個 PDF 裡面的快捷鍵很多都不會跟我日後的文章一樣。

如果你之前用過或是熟悉其他的編輯器，你可以讓 VS Code 使用你熟悉的設定以及快捷鍵。當你點選你想要用的快捷鍵設定後，將會自動安裝特定的擴充功能。

![](https://i.imgur.com/FrdGW4V.png)

或者你也可以點選「其他」來找更多其他人做的快捷鍵擴充功能。

![](https://i.imgur.com/GctD0TB.png)

假設我在此前往 Sublime 的擴充功能說明頁，我就可以看到作者所給予的更多有關這個擴充功能的說明如下：

![](https://i.imgur.com/V2Pped2.png)

另外，我可以點到「貢獻」分頁來看到完整提供的快捷鍵清單如下：

![](https://i.imgur.com/OX9ctlX.png)

> 備註：
> 1. 不用強求在這個時候記住所有快捷鍵（我想應該也不會有人想這麼幹），日後的文章如果有提到相關功能的時候，我會盡量提供相對應的 Sublime 快捷鍵。
> 2. 如果你還沒有自己熟悉的快捷鍵設定，那麼我也強烈推薦你選擇使用 Sublime 快捷鍵設定，因為很多地方都支援這種快捷鍵設定，例如 Atom 和線上 Markdown 編輯器 [hackmd](https://hackmd.io)。
> 3. 往後的文章中，我都不會再特別強調我是使用 Sublime 的快捷鍵設定，挑自己習慣的即可。
