(window.webpackJsonp=window.webpackJsonp||[]).push([[134],{511:function(t,a,s){"use strict";s.r(a);var n=s(8),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"line-liff-v2-de-replace-mo-shi-ji-jiang-bei-yi-chu-ji-jian-yi-cheng-shi-xie-fa"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#line-liff-v2-de-replace-mo-shi-ji-jiang-bei-yi-chu-ji-jian-yi-cheng-shi-xie-fa"}},[t._v("#")]),t._v(" LINE LIFF v2 的 replace 模式即將被移除及建議程式寫法")]),t._v(" "),s("p",[t._v("大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。")]),t._v(" "),s("p",[t._v("在 "),s("a",{attrs:{href:"https://developers.line.biz/zh-hant/news/2021/01/18/remind-discontinue-replace-mode-announcement/",target:"_blank",rel:"noopener noreferrer"}},[t._v("LINE 官方 2021/01/18 的公告"),s("OutboundLink")],1),t._v(" 中，再次提醒 LIFF 的 Replace 模式即將於 "),s("strong",[t._v("2021/03/01")]),t._v(" 被移除：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/YxN1Pv9.png",alt:""}})]),t._v(" "),s("p",[t._v("所以你需要確保你的 LIFF 程式都已經改成 Concatenate 模式並確認程式可以正常運作，不然到時候你的程式就會壞掉。")]),t._v(" "),s("h2",{attrs:{id:"shi-mo-shi-method-for-converting-additional-information-in-the-liff-url"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shi-mo-shi-method-for-converting-additional-information-in-the-liff-url"}},[t._v("#")]),t._v(" 什麼是 Method for converting additional information in the LIFF URL？")]),t._v(" "),s("p",[t._v("如果你想要開發 LINE LIFF 的程式時，你需要去 LINE Login 的開發者後台，輸入你的網站路徑等資料，然後它就會發給你一個隨機的 LIFF ID 如下：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("1234567890-abcdefgh\n")])])]),s("p",[t._v("當你拿到這個 LIFF ID 以後，你可以用這個 ID 組成一個網址，這樣就能夠把這個網址給使用者使用：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("https://liff.line.me/1234567890-abcdefgh/\n")])])]),s("p",[t._v("但是 LIFF ID 的新增數量有上限 (目前最多 50 個)，你沒辦法無限新增 LIFF ID，所以 LIFF SDK 有提供一個功能，它會幫你把網址後面額外的參數傳遞給你的程式。")]),t._v(" "),s("p",[t._v("假設你給了使用者以下的網址：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("https://liff.line.me/1234567890-abcdefgh/share.html?a=1&b=2\n")])])]),s("p",[t._v("LIFF SDK 就會幫你把後面額外的參數接到 Endpoint 後面，然後使用者最後就會跳轉到以下網址（以 "),s("code",[t._v("Concatenate")]),t._v(" 模式為例）：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# 假設你的 Endpoint 是設定成這個\n# https://taichunmin.idv.tw/liff-businesscard/liff-full/\nhttps://taichunmin.idv.tw/liff-businesscard/liff-full/share.html?a=1&b=2\n")])])]),s("h2",{attrs:{id:"xiang-xi-tiao-zhuan-bu-zou-yi-v2.7.0-wei-li"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#xiang-xi-tiao-zhuan-bu-zou-yi-v2.7.0-wei-li"}},[t._v("#")]),t._v(" 詳細跳轉步驟 (以 v2.7.0 為例)")]),t._v(" "),s("p",[t._v("當使用者開啟 "),s("code",[t._v("https://liff.line.me/1234567890-abcdefgh/share.html?a=1&b=2")]),t._v(" 時，LIFF 會讓使用者進行第一次跳轉至以下網址：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# 假設你的 Endpoint 是設定成這個\n# https://taichunmin.idv.tw/liff-businesscard/liff-full/\nhttps://taichunmin.idv.tw/liff-businesscard/liff-full/?liff.state=%2Fshare.html%3Fa%3D1%26b%3D2\n")])])]),s("p",[t._v("如果仔細看這個網址，應該不難發現所有額外的參數都在 "),s("code",[t._v("liff.state")]),t._v(" 裡面，而且資料是經過 js 的 "),s("code",[t._v("encodeURIComponent()")]),t._v(" 處理：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("?liff.state=%2Fshare.html%3Fa%3D1%26b%3D2\n")])])]),s("p",[t._v("當使用者前往這個網頁後，LIFF SDK 發現網址中有 "),s("code",[t._v("liff.state")]),t._v(" 就會進行二次跳轉到以下網址（以 "),s("code",[t._v("Concatenate")]),t._v(" 模式為例）：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("https://taichunmin.idv.tw/liff-businesscard/liff-full/share.html?a=1&b=2\n")])])]),s("p",[t._v("在這裡需要注意的地方是，第一次跳轉固定是跳轉到你所設定的 Endpoint，然後第二次跳轉才會跳轉到你所指定的網頁。")]),t._v(" "),s("blockquote",[s("p",[t._v("如果你開發的 LIFF 程式要求使用者要登入 "),s("code",[t._v("liff.login()")]),t._v("，LIFF 就會跳轉更多次，但是這不在這篇文章的討論範圍之內，如果有疑問歡迎跟我聊聊。")])]),t._v(" "),s("h2",{attrs:{id:"bi-zhe-jian-yi-cheng-shi-xie-fa"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bi-zhe-jian-yi-cheng-shi-xie-fa"}},[t._v("#")]),t._v(" 筆者建議程式寫法")]),t._v(" "),s("p",[t._v("先確保 LINE Login 後台把 LIFF ID 設定為使用 "),s("strong",[t._v("Concatenate")]),t._v("：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/hE2O8X2.png",alt:""}})]),t._v(" "),s("p",[t._v("確認 LIFF SDK 的版本大於 "),s("code",[t._v("2.3.0")]),t._v(":")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("liff"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("為了讓第一次跳轉越快越好，建議在 Endpoint 那個網頁不要寫太多的程式：")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 原始碼來自: https://github.com/taichunmin/liff-businesscard/blob/master/src/liff-full/index.pug --\x3e")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token doctype"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),s("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("doctype")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token name"}},[t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("charset")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("UTF-8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("IE=edge"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("X-UA-Compatible"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,viewport-fit=cover,user-scalable=no"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("viewport"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("分享 LINE 數位版名片"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://static.line-scdn.net/liff/edge/2/sdk.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n    liff"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("liffId")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1234567890-abcdefgh"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  ")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("把實際上所需的程式邏輯寫到第二次跳轉會抵達的網頁中，如果發現網址中有 "),s("code",[t._v("liff.state")]),t._v(" 就要避免你自己所寫的 js 程式碼干擾到 LIFF SDK 的跳轉，程式的建議作法可以參考我所寫的 "),s("a",{attrs:{href:"https://taichunmin.idv.tw/liff-businesscard/",target:"_blank",rel:"noopener noreferrer"}},[t._v("LINE 數位版名片"),s("OutboundLink")],1),t._v(" 的 "),s("a",{attrs:{href:"https://github.com/taichunmin/liff-businesscard/blob/master/src/liff-full/share.pug",target:"_blank",rel:"noopener noreferrer"}},[t._v("原始程式碼"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("p",[t._v("如果你還想知道如何"),s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2020-09-18-line-three-size-liff.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("透過三個 LINE LIFF ID 創造出無限的 LIFF 網頁的技巧，你可以看我之前所寫的文章"),s("OutboundLink")],1),t._v("，如果有疑問也歡迎跟我聊聊。")]),t._v(" "),s("h2",{attrs:{id:"shu-wei-ban-ming-pian-ji-shu-tao-lun-she-qun"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shu-wei-ban-ming-pian-ji-shu-tao-lun-she-qun"}},[t._v("#")]),t._v(" 「數位版名片技術討論」社群")]),t._v(" "),s("p",[t._v("最近均民創立了一個社群，讓有使用數位版名片的網友可以在上面一起討論，群組內有一些常見問題的回答、名片健檢、以及跟這專案有關的最新消息，入群連結在此："),s("a",{attrs:{href:"https://lihi1.com/CVjIx/blog",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://lihi1.com/CVjIx/blog"),s("OutboundLink")],1),t._v("！")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/ylxMnwZ.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"yuan-shi-ma-yu-xiang-guan-lian-jie"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yuan-shi-ma-yu-xiang-guan-lian-jie"}},[t._v("#")]),t._v(" 原始碼與相關連結")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("本文範例程式的原始碼授權為 MIT License，如果有疑問可以透過 "),s("a",{attrs:{href:"https://www.facebook.com/taichunmin",target:"_blank",rel:"noopener noreferrer"}},[t._v("Facebook"),s("OutboundLink")],1),t._v(" 跟我聊聊。")])]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/taichunmin/liff-businesscard/",target:"_blank",rel:"noopener noreferrer"}},[t._v("原始碼: LINE 數位版名片"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://lihi1.com/CVjIx/blog",target:"_blank",rel:"noopener noreferrer"}},[t._v("點此加入「數位版名片技術討論群」"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://engineering.linecorp.com/zh-hant/blog/liff-replace-to-concatenate/",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: 轉移你的 LIFF 從 Replace 到 Concatenate 模式"),s("OutboundLink")],1),t._v(" by LINE")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2020-09-18-line-three-size-liff.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: 透過三個 LINE LIFF ID 創造出無限的 LIFF"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://engineering.linecorp.com/zh-hant/blog/new-liff-url-infomation/",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: 您需要了解有關新 LIFF URL 的所有資訊"),s("OutboundLink")],1),t._v(" by LINE")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://etrexkuo.medium.com/the-best-practice-of-liff-fd89f2e612fc",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: The Best Practice Of LIFF"),s("OutboundLink")],1),t._v(" by 卡米哥")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/liff-businesscard/",target:"_blank",rel:"noopener noreferrer"}},[t._v("程式: LINE 數位版名片"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://developers.line.biz/zh-hant/news/2021/01/18/remind-discontinue-replace-mode-announcement/",target:"_blank",rel:"noopener noreferrer"}},[t._v("公告: LINE 2021/01/18 的英文公告"),s("OutboundLink")],1),t._v(" by LINE")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://developers.line.biz/en/news/2020/11/20/discontinue-replace-mode-announcement/",target:"_blank",rel:"noopener noreferrer"}},[t._v("公告: LINE 2020/11/20 的英文公告"),s("OutboundLink")],1),t._v(" by LINE")])])])}),[],!1,null,null,null);a.default=e.exports}}]);