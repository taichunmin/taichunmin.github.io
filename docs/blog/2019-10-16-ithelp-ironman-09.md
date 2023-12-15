---
date: "2019-10-16T00:09:00+08"
tags: [ithelp-ironman]
---
# iT 邦幫忙鐵人賽 DAY 23~30 整合式終端機

在 VS Code 中，你可以開啟一個很方便的整合式終端機，它的預設目錄就在你目前的專案資料夾，你不需要為了執行一個簡單的命令列工作而另外打開一個終端機視窗，然後還需要自己手動切換資料夾！

開啟整合式終端機的方式有很多種：

* 使用快捷鍵 ![](https://i.imgur.com/izURn5b.png)，這個按鍵在 `TAB` 的上方
* 上方工具列「檢視(V)」➜「終端機」
* 透過「尋找及執行所有命令」![](https://i.imgur.com/EXvNZfc.png) 然後輸入 `terminal` 尋找並執行「檢視：切換整合式終端機」指令

![](https://i.imgur.com/veQmvfu.png)

> 備註：如果你還是想要開啟外部終端機，你可以使用快捷鍵 ![](https://i.imgur.com/J5Mxgc0.png) 來打開一個外部終端機，而且它還會很貼心的幫你切換到專案資料夾喔！

## 管理多個終端機

你可以建立多個整合式終端機，你可以讓它們指向不同資料夾，也可以在幾個終端機中切來切去。要建立一個新的整合式終端機的方法是：按下整合式終端機右上角的 `+` 符號或是使用快捷鍵 ![](https://i.imgur.com/QJ1RHLP.png)。當你新增了一個新的整合式終端機以後，你就可以透過右上角的下拉式選單來切換終端機。

![](https://i.imgur.com/XuaXoIE.png)

在整合式終端機右上的垃圾桶符號則是可以刪除目前的終端機。

> 小技巧：如果你是多個整合式終端機的重度使用者，你可以自己指定喜歡的快捷鍵到 `focusNext`、`focusPrevious`、`kill` 指令，讓你可以只靠快捷鍵就可以管理這些終端機。

## 分割終端機

你可以把終端機一分為二，第一個方法是使用快捷鍵 ![](https://i.imgur.com/7rjYBYY.png)，第二個方法是按下整合式終端機右上方的分割按鈕。

![](https://i.imgur.com/PTLvg9N.png)

當你目前的焦點在整合式終端機的其中一個分割時，你可以透過以下的指令與快捷鍵來移動焦點及調整大小：

| 快捷鍵 | 指令名稱 | 中文說明 |
| ---: | --- | --- |
| ![](https://i.imgur.com/tzrPnE8.png) | Focus Previous Pane | 聚焦上一個窗格 |
| ![](https://i.imgur.com/6ESD9F8.png) | Focus Next Pane | 聚焦下一個窗格 |
| 未定義 | Resize Pane Left | 調整窗格左方 |
| 未定義 | Resize Pane Right | 調整窗格右方 |
| 未定義 | Resize Pane Up | 調整窗格上方 |
| 未定義 | Resize Pane Down | 調整窗格下方 |

## 設定

在 Linux 和 macOS 系統上，終端機預設會使用環境變數 `$SHELL` 所指定的 shell，在 Windows 10 上會預設使用 PowerShell，比較舊版的 Windows 預設使用 cmd.exe。你可以透過在使用者設定中的 `terminal.integrated.shell.*` 來設定。如果你需要傳遞額外參數給終端機的 shell，你可以透過在使用者設定中的 `terminal.integrated.shellArgs.*` 來設定。

> 備註：為了安全性著想，這幾個設定在工作區設定中都是無效的，只能寫在使用者設定中。

### Windows

對於 Windows 的系統，VS Code 提供了一個很方便的指令讓你可以選擇預設的 Shell，這個指令會嘗試找出安裝在預設路徑的 Shell：「Command Prompt」、「PowerShell」、「PowerShell Core」、「Git Bash」、「WSL Bash」，並且提供一個下拉式選單給你選取預設的 Shell。你可以透過「尋找及執行所有命令」![](https://i.imgur.com/EXvNZfc.png) 然後輸入 `terminal` 尋找並執行「Terminal：選取預設殼層」指令。

就跟其他作業系統一樣，你可以在設定檔中詳細的指定到底要用哪個可執行檔如下：

```json
// Command Prompt
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe"
// PowerShell
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
// Git Bash
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"
// Bash on Ubuntu (on Windows)
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\bash.exe"
```

> 備註：為了要在整合式終端機中執行，這個 Shell 的可執行檔必須要是一個終端機的應用程式，它的 `stdin/stdout/stderr` 都需要可以被重新導向。

> 小技巧：整合式終端機會使用和 VS Code 一樣的權限來執行，如果要需要整合式終端機以系統管理員身份或是其他權限執行，你可以在整合式終端機中使用系統內建的工具，如 `runas.exe` 等…。

### Shell 參數

你可以設定在整合式終端機啟動時，帶什麼參數給它。

舉例來說，想讓 bash 以登入 shell 的方式（也就是會先幫你執行 `.bash_profile`）執行的話，你需要帶 `-l` 的參數給它：

```json
// Linux
"terminal.integrated.shellArgs.linux": ["-l"]
```

### 使用變數

在 `shell`、`shellArgs`、`env`、`cwd` 這些終端機的參數中都支援使用變數：

```json
// Open the terminal in the currently opened file's directory
"terminal.integrated.cwd": "${fileDirname}"
```

你可以在[這個連結](https://code.visualstudio.com/docs/editor/variables-reference)看到完整可用的變數清單。

## 終端機顯示設定

你可以自訂整合式終端機的字型、行高…等的設定：

* `terminal.integrated.fontFamily`
* `terminal.integrated.fontSize`
* `terminal.integrated.fontWeight`
* `terminal.integrated.fontWeightBold`
* `terminal.integrated.lineHeight`

## 終端機快捷鍵

「檢視：切換整合式終端機」指令預設綁定到快捷鍵 ![](https://i.imgur.com/izURn5b.png) 讓你可以快速切換顯示整合式終端機。

底下是在整合式終端機中可以幫助你快速瀏覽的快捷鍵清單：

| 快捷鍵 | 指令名稱 | 中文說明 |
| ----: | ------ | -------- |
| ![](https://i.imgur.com/izURn5b.png) | Show integrated terminal | 切換顯示整合式終端機 |
| ![](https://i.imgur.com/UFbMd2N.png) | Create new terminal | 建立一個新的整合式終端機 |
| ![](https://i.imgur.com/sejSjJO.png) | Scroll up | 向上捲動 |
| ![](https://i.imgur.com/cpMvV1H.png) | Scroll down | 向下捲動 |
| ![](https://i.imgur.com/AuRe9sY.png) | Scroll page up | 向上捲動一頁 |
| ![](https://i.imgur.com/zYymUri.png) | Scroll page down | 向下捲動一頁 |
| ![](https://i.imgur.com/TaT3Dft.png) | Scroll to top | 捲動到頂部 |
| ![](https://i.imgur.com/8xPgXbo.png) | Scroll to bottom | 捲動到底部 |
| 未定義 | Clear the terminal |  |

除了以上列出的這些終端機指令以外，以下還有一些指令可以讓你綁定到你喜歡的快捷鍵上面：

* `workbench.action.terminal.focus`: 聚焦在終端機上。如果整合式終端機沒有打開的時候，也會幫你打開。
* `workbench.action.terminal.focusNext`: 聚焦在下一個整合式終端機上。
* `workbench.action.terminal.focusPrevious`: 聚焦在上一個整合式終端機上。
* `workbench.action.terminal.focusAtIndexN`: 聚焦在第 N 個終端機上 (N=1-9)。
* `workbench.action.terminal.kill`: 刪除目前的整合式終端機。
* `workbench.action.terminal.runSelectedText`: 在終端機中執行目前所選擇的文字。
* `workbench.action.terminal.runActiveFile`: 在終端機中執行目前的檔案。

### 複製和貼上

在整合式終端機中，複製貼上的快捷鍵和系統的慣例是一樣的：

* Windows: ![](https://i.imgur.com/mxrKLXi.png) 和 ![](https://i.imgur.com/PRfcqlL.png)
* Linux: ![](https://i.imgur.com/GLNw2Rt.png) 和 ![](https://i.imgur.com/8BWxhQJ.png)
* macOS: ![](https://i.imgur.com/Sj2xHbr.png) 和 ![](https://i.imgur.com/RSR1MMJ.png)

### 滑鼠右鍵的行為

預設的滑鼠右鍵行為會根據作業系統而有所差異：

* Linux: 顯示右鍵選單
* macOS: 選取在滑鼠底下的文字並顯示右鍵選單
* Windows: 如果有選取文字，複製目前所選取的文字並且取消選取，否則貼上文字。

你可以透過 `terminal.integrated.rightClickBehavior` 設定來調整滑鼠右鍵的行為。

### 強制快捷鍵跳過終端機

當你聚焦在整合式終端機的時候，有很多快捷鍵都會直接傳遞給終端機，然後就不會在 vscode 中產生效果，在設定裡面有一個寫死的清單，可以設定某些指令的快捷鍵要跳過終端機並且交給 vscode 處理或是交給終端機處理，這個清單就是 `terminal.integrated.commandsToSkipShell`。你可以把希望在 vscode 中生效的指令寫在這個清單中，如果你要交給終端機處理，你就需要在指令前面加上一個減號 `-`。

```js
{
  "terminal.integrated.commandsToSkipShell": [
    // 確保切換整合式終端機顯示或隱藏的指令是給 vscode 處理
    "workbench.action.toggleSidebarVisibility",
    // 讓快速開啟的快捷鍵交給整合式終端機處理
    "-workbench.action.quickOpen",
  ]
}
```

你可以從設定中看到 vscode 預設指令清單的詳細內容。

![](https://i.imgur.com/TYNEHIx.png)

### 搜尋

整合式終端機有一個基本的搜尋功能，你可以使用 ![](https://i.imgur.com/t4Ot81d.png) 來使用這個功能。

如果你希望 ![](https://i.imgur.com/t4Ot81d.png) 的這個快捷鍵交給終端機處理，你需要自行調整以下的快捷鍵設定：

```js
// Windows/Linux
{ "key": "ctrl+f", "command": "-workbench.action.terminal.focusFindWidget",
                      "when": "terminalFocus" },
// macOS
{ "key": "cmd+f",  "command": "-workbench.action.terminal.focusFindWidget",
                      "when": "terminalFocus" },
```

## 在終端機中執行目前選取的文字

如果你想要使用 `runSelectedText` 這個指令的話，你需要先選取文字，然後透過「尋找及執行所有命令」![](https://i.imgur.com/EXvNZfc.png) 然後輸入 `terminal` 尋找並執行「Terminal：在使用中的終端機執行選取的文字」指令。

![](https://i.imgur.com/uyx6y7U.png)

![](https://i.imgur.com/vkbHok3.png)

## 透過快捷鍵傳送控制字元組合給終端機

有一個叫做 `workbench.action.terminal.sendSequence` 的指令可以用來傳送一個特定的字串給終端機，要傳送跳脫字元也沒問題！你可以用這個功能來傳送像是方向鍵、Enter、游標移動…等的控制字元組合。底下的範例是用來示範你可以用這功能來達成的事情，這個控制字元組合會跳到目前游標左邊的單字 (Ctrl+🡰) 然後刪除一個字元。

```json
{
  "key": "ctrl+u",
  "command": "workbench.action.terminal.sendSequence",
  "args": { "text": "\u001b[1;5D\u007f" }
}
```

這功能也支援使用變數喔！你可以在[這個連結](https://code.visualstudio.com/docs/editor/variables-reference)看到完整可用的變數清單。

請注意這個指令只能夠使用 `\u0000` 格式的跳脫字元，使用 `\x00` 的格式是沒有用的。你可以從以下的連結找到更多可以在終端機中使用的跳脫字元清單：

* [XTerm Control Sequences](http://invisible-island.net/xterm/ctlseqs/ctlseqs.html)
* [List of C0 and C1 control codes](https://github.com/xtermjs/xterm.js/blob/0e45909c7e79c83452493d2cd46d99c0a0bb585f/src/common/data/EscapeSequences.ts)

## 幫整合式終端機重新命名

你可以使用 `workbench.action.terminal.rename` 來幫目前使用中的整合式終端機重新命名，在整合式終端機的下拉選單就能清楚辨識終端機的用途喔！你只須透過「尋找及執行所有命令」![](https://i.imgur.com/EXvNZfc.png) 然後輸入 `rename` 尋找並執行「Terminal：重新命名」指令即可。

## 指定終端機開啟一個特定的資料夾

整合式終端機預設會開啟目前專案的資料夾，但是你可以使用 `terminal.integrated.cwd` 設定來修改終端機的預設資料夾：

```json
{
  "terminal.integrated.cwd": "/home/user"
}
```

如果你使用了分割終端機的功能，如果你是 Windows 的使用者，新的終端機預設目錄會在之前終端機的初始目錄，如果你是 macOs 和 Linux 的使用者，預設目錄則會跟你之前的終端機當前目錄一樣。這個行為可以透過 `terminal.integrated.splitCwd` 設定進行修改：

```json
{
  "terminal.integrated.splitCwd": "workspaceRoot"
}
```

如果這兩個設定不符合你的需求的話，你可以考慮安裝擴充套件（如：[Terminal Here](https://marketplace.visualstudio.com/items?itemName=Tyriar.vscode-terminal-here)）來給你更多可用的選項。

## 為「工作」與「除錯」用途的終端機指定不同的 Shell

你可以使用 `terminal.integrated.automationShell.<platform>` 的設定來為「工作」與「除錯」用途的終端機指定不同的 Shell 和 Shell 的參數：

```js
{
  "terminal.integrated.shell.osx": "/usr/local/bin/fish",
  // 為「工作」與「除錯」用途的終端機指定一個
  // 與 POSIX 完整相容的 Shell 並且避免執行複雜的 ~/.fishrc 設定檔
  "terminal.integrated.automationShell.osx": "/bin/sh"
}
```

## 修改整合式終端機的渲染方式

整合式終端機預設使用多個 `<canvas>` 元素來進行渲染，通常用 `<canvas>` 渲染的方式很適合用在像終端機這樣頻繁更改內容的情況，然而，有時候 Electron/Chromium 在某些環境下用這種方式會變得非常慢，所以 vscode 提供了一個替代方案，就是使用 DOM 的方式來渲染整合式終端機。當 vscode 發現整合式終端機的效能很差的時候，就會詢問你是否要切換成 DOM 的這種替代方案進行渲染。你也可以直接透過修改 `terminal.integrated.rendererType` 設定來啟用這個替代方案：

```json
{
  "terminal.integrated.rendererType": "dom"
}
```

還有一個方法可能可以加快整合式終端機的效能，就是在啟動 vscode 的時候透過增加一個參數來忽略 Chromium 的 GPU 禁止使用黑名單：`code --ignore-gpu-blacklist`。

## 下一步

終端機的基本功能我們在這個系列的文章中都已經介紹過了，如果還需要更進階的內容，你可以查看以下的連結：

* [工作 Task](https://code.visualstudio.com/docs/editor/tasks): 可以讓你把外部工具整合到 vscode 中並且大大的增強終端機！
* [精通 VS Code 的終端機](https://www.growingwiththeweb.com/2017/03/mastering-vscodes-terminal.html): 一篇裡面有很多終端機大師級技巧的外部文章！
* 從 `keybindings.json` 中查看所有為終端機提供的其他快捷鍵

## 常見問題

### 我能夠在整合式終端機使用 Windows Subsystem for Linux 嗎？

當然可以！你可以選擇使用 [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/install-win10) (WSL) 的 Bash Shell 作為你的預設終端機。如果你已經有透過 Windows 功能啟用了 WSL，你就可以從「終端機：選擇預設 Shell」的指令中選擇 WSL Bash。你可以從 [Developing in WSL](https://code.visualstudio.com/docs/remote/wsl) 找到更多有關 WSL 及 [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) 擴充套件的更多說明。

### 為什麼我有些 VS Code 的快捷鍵當聚焦在整合式終端機時不能使用？

目前整合式終端機會把很多快捷鍵截留下來處理，所以 VS Code 就不會對這些快捷鍵產生反應。像是用來打開「尋找及執行所有命令」的快捷鍵 ![](https://i.imgur.com/jQU9fk7.png) 和在 Linux 和 Windows 中用來快速開啟檔案的 ![](https://i.imgur.com/vh7hLqB.png) 都會在這情況下失效。整合式終端機因為是純鍵盤的環境，所以它有必要把很多快捷鍵截留下來處理。你可以透過 `terminal.integrated.commandsToSkipShell` 的設定來避免快捷鍵被終端機截留下來。

### 在 Windows 10 上的整合式終端機為什麼會以異常代碼 1 結束？

這通常是因為 VS Code 被使用相容模式執行，通常你在升級你的 Windows 後，VS Code 就有可能被開啟相容模式。你可以對 VS Code 執行檔按右鍵進到內容中，並在相容性的分頁中取消「以相容模式執行這個程式」。

### 我可以在 Windows 中的整合式終端機使用 Cmder 的 Shell 嗎？

當然可以，要在整合式終端機中使用 [Cmder](http://cmder.net/)，你需要在 `settings.json` 中透過以下的設定來調整：

```json
"terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
"terminal.integrated.shellArgs.windows": ["/K", "C:\\cmder\\vendor\\init.bat"]
```

更多詳細的設定你可以參考 [Cmder 的維基百科](https://github.com/cmderdev/cmder/wiki/Seamless-VS-Code-Integration)。

### 在 macOS 中的 Powershell 一直在抱怨 `-l` 的參數，該如何修正？

當你在 macOS 的整合式終端機中指定使用 Powershell 時，你會遇到[這個錯誤](https://github.com/Microsoft/vscode/issues/33022)，它會一直在抱怨一個 `-l` 的參數，因為在 Unix-like 的 Shell（如：bash, zsh…）中，需要加上這個參數，才會讓 Shell 像一個登入的 Shell 一樣套用使用者的設定檔。要修正這個錯誤，你必須透過 `terminal.integrated.shellArgs.osx` 的設定來把預設的 `-l` 參數覆蓋如下：

```json
"terminal.integrated.shellArgs.osx": []
```

### 在 Windows 中我要如何把預設的整合式終端機改回 Powershell？

如果你在 Windows 中希望把整合式終端機預設的 Shell 改回 Powershell，你可以透過使用者設定移除 `terminal.integrated.shell.windows`。

舉例來說，如果你曾經把預設的 Shell 設定成 bash，你將會看到使用者設定有像是這樣的設定值：

```json
"terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\bash.exe",
```

你只要把這行設定移除，就會回去使用預設的選項，或是你也可以指定成其他的 Shell 的執行檔完整路徑。

### 在 64 位元的 Windows 中 32 位元的 VS Code 為什麼不能執行整合式終端機？

最簡單的修正方法就是改用 64 位元的 VS Code。如果你有非用 32 位元 VS Code 的理由，那你可以考慮把 Shell 的路徑改用 `sysnative` 的路徑（而非使用 `System32`）：

```json
"terminal.integrated.shell.windows": "C:\\WINDOWS\\sysnative\\cmd.exe",
```

### 為什麼 Cmd+K/Ctrl+K 沒有清空終端機？

快捷鍵 ![](https://i.imgur.com/aChJM0D.png) 預設可以把終端機的內容清空，但是很容易會因為安裝了其他擴充套件或是用戶的快捷鍵導致這個功能失效。在 VS Code 中，快捷鍵設定的優先順序為：「使用者」>「擴充套件」>「預設值」。如果要修正這個問題，你可以在你的使用者快捷鍵設定 `keybindings.json` 的後面直接新增以下的設定：

```json
// macOS
{ "key": "cmd+k", "command": "workbench.action.terminal.clear", "when": "terminalFocus" },

// windows
{ "key": "ctrl+k", "command": "workbench.action.terminal.clear", "when": "terminalFocus" },
```

### 為什麼整合式終端機在啟動的時候 nvm 總是會出現 prefix 選項的錯誤？

nvm (Node Version Manager) 的使用者在啟動整合式終端機的時候通常會看到以下錯誤訊息：

```
nvm is not compatible with the npm config "prefix" option: currently set to "/usr/local"
Run `npm config delete prefix` or `nvm use --delete-prefix v8.9.1 --silent` to unset it
```

這個問題通常都只有 macOS 的使用者才會遇到，而且使用外部終端機開啟的時候不會有這個問題，常見的可能原因為：

* `npm` 是使用另一個 `node` 來全域安裝的，這個另外的 `node` 可能位於 `$PATH` 環境變數中的其他資料夾中。（例如：`/usr/local/bin/npm`）
* VS Code 為了取得在環境變數中 `$PATH` 中的開發工具，它會在啟動時同時啟動一個 bash shell，這代表說 `~/.bash_profile` 已經被執行過了，當你開啟整合式終端機時，它又會執行一個 login shell，這可能會造成 `$PATH` 中的路徑出現不正確的順序。

要解決這個問題，你必須找到有問題的 `npm` 的安裝路徑，並且把它連同有問題的 `node_modules` 一起移除，你可以透過尋找 nvm 的啟動指令，並且在指令執行前先執行 `which npm` 來找到有問題的 `npm` 位置所在。

只要你找到了有問題的 npm 路徑，你就可以如下的指令來解析 symlink 並找到有問題的 node_modules：

```bash
ls -la /usr/local/bin | grep "np[mx]"
```

這個指令將會告訴你這個 symlink 實際上會指向何處：

```
... npm -> ../lib/node_modules/npm/bin/npm-cli.js
... npx -> ../lib/node_modules/npm/bin/npx-cli.js
```

然後你就可以透過移除這些檔案並重開 VS Code 來解決這個錯誤：

```bash
rm -R /usr/local/bin/npm /usr/local/lib/node_modules/npm/bin/npm-cli.js
rm -R /usr/local/bin/npx /usr/local/lib/node_modules/npm/bin/npx-cli.js
```

### 我可以在整合式終端機中使用 Powerline 字型嗎？

當然可以！你可以透過 `terminal.integrated.fontFamily` 設定來指定使用 [Powerline](https://powerline.readthedocs.io/) 字型。

```json
"terminal.integrated.fontFamily": "Meslo LG M DZ for Powerline"
```

這裡需要注意的是，你所指定的名字必須是字型家族的名稱，而不是該字型家族中的某個子字型，因為你如果指定成了該字型家族中的某個子字型（如：`Meslo LG M DZ Regular for Powerline`），這個子字型是 `Regular`，所以你的全部文字就都只會是 `Regular` 的粗細！

### 當我在 macOS 上使用 zsh 時，我該怎麼使用 Ctrl+Left/Right 來跳單字？

在 bash 中，你預設可以使用 ![](https://i.imgur.com/BCnoMmb.png) 和 ![](https://i.imgur.com/Z0Heyac.png) 的快捷鍵來讓你的游標跳單字，但是在 zsh 中你需要透過修改以下的設定才能達到一樣的效果：

```json
{
  "key": "ctrl+left",
  "command": "workbench.action.terminal.sendSequence",
  "args": { "text": "\u001bb" }
},
{
  "key": "ctrl+right",
  "command": "workbench.action.terminal.sendSequence",
  "args": { "text": "\u001bf" }
}
```

### 我要如何修正 `ConnectNamedPipe failed: Windows error 232` 的錯誤？

這個問題通常是由防毒軟體所引起的，防毒軟體會禁止 winpty 程式來擷取 pty 的輸入輸出，如果要解決這個錯誤，你需要把以下的程式加到防毒軟體的排除清單內：

```
<install_path>\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty-agent.exe
```

### 為什麼我的終端機會出現一個彩色的三角形或是全黑的長方形？

終端機在某些環境下會出現一些渲染問題，例如你有可能會看到一個巨大的彩色三角形，而看不到文字，這通常是因為驅動程式或是顯示卡所造成的問題，而且在 Chromium 中也會有一樣的問題，你可以在啟動 `code` 的時候加上 `--disable-gpu` 的參數，或是透過修改 `"terminal.integrated.rendererType": "dom"` 設定來避免使用 `<canvas>` 的方式來渲染終端機。
