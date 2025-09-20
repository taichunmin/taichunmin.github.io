# taichunmin.github.io v4

這個專案是戴均民的個人網站，包含自我介紹、作品集、技術文章以及生活隨筆。

## 專案結構

* `blog/`: 這個資料夾包含以 Markdown 格式所撰寫的技術文章以及生活隨筆。
* `build/`: 這個資料夾包含用於編譯網站的程式碼（例如：編譯 Pug 模板、生成 sitemap），主要使用 TypeScript 來撰寫。
* `layout/`: 這個資料夾包含編譯 `page/` 所需的 Pug 佈局/模板檔案。
* `page/`: 這個資料夾內的 Pug 檔案會被一對一編譯成 HTML 並放到 `dist/` 資料夾中。
* `dist/`: 這個資料夾是編譯靜態網站的輸出目錄，這個資料夾下的所有檔案在編譯前都會被刪除，編譯成功之後就會將這個資料夾部署到 GitHub Pages 上。

## 環境安裝及開發

### 前置需求

* Node.js
* Yarn
* Git

### 安裝

```bash
git clone https://github.com/taichunmin/blog-v4.git
cd blog-v4
cp .env.example .env
yarn
yarn mkcert
```

### 編譯

```bash
yarn build
```

- 把 `page/` 中的 Pug 檔案編譯成 HTML，並輸出到 `dist/` 資料夾中。
- 把 `blog/` 中的 Markdown 檔案編譯成 HTML，並輸出到 `dist/blog/` 資料夾中。
- 產生 sitemap

### 本地開發

```bash
yarn dev
```

這個指令會同時監聽相關檔案的變動並自動重新編譯以及啟動一個本地的 HTTPS 伺服器。

## 小圖示 icones

- [搜尋圖示並取得 SVG 網址 - icones](https://icones.js.org/)
- [搜尋圖示 - iconify](https://icon-sets.iconify.design/)
