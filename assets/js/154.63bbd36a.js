(window.webpackJsonp=window.webpackJsonp||[]).push([[154],{531:function(e,t,n){"use strict";n.r(t);var r=n(8),o=Object(r.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"jin-qi-line-zhen-dui-kai-fa-zhe-de-geng-xin-yan-zheng-tu-wen-xuan-dan-liff-cha-jian-webhook-chong-song-ji-zhi"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#jin-qi-line-zhen-dui-kai-fa-zhe-de-geng-xin-yan-zheng-tu-wen-xuan-dan-liff-cha-jian-webhook-chong-song-ji-zhi"}},[e._v("#")]),e._v(" 近期 LINE 針對開發者的更新：驗證圖文選單、LIFF 插件、Webhook 重送機制")]),e._v(" "),n("p",[e._v("大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。")]),e._v(" "),n("p",[e._v("近期 LINE 針對開發者發布了幾個更新，分別是驗證圖文選單"),n("a",{attrs:{href:"https://developers.line.biz/en/news/2022/04/05/release-validate-rich-menu-object/",target:"_blank",rel:"noopener noreferrer"}},[e._v("（查看英文公告）"),n("OutboundLink")],1),e._v("、LIFF 插件"),n("a",{attrs:{href:"https://developers.line.biz/en/news/2022/04/18/release-liff-2-19-1/",target:"_blank",rel:"noopener noreferrer"}},[e._v("（查看英文公告）"),n("OutboundLink")],1),e._v("、Webhook 重送機制"),n("a",{attrs:{href:"https://developers.line.biz/en/news/2022/04/19/webhook-redelivery/",target:"_blank",rel:"noopener noreferrer"}},[e._v("（查看英文公告）"),n("OutboundLink")],1),e._v("，這篇文章就是來帶大家快速瞭解這幾個更新的內容！")]),e._v(" "),n("h2",{attrs:{id:"yan-zheng-tu-wen-xuan-dan-api"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#yan-zheng-tu-wen-xuan-dan-api"}},[e._v("#")]),e._v(" 驗證圖文選單 API")]),e._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://developers.line.biz/en/reference/messaging-api/#validate-rich-menu-object",target:"_blank",rel:"noopener noreferrer"}},[e._v("驗證圖文選單 API 的英文文件"),n("OutboundLink")],1)])])]),e._v(" "),n("p",[e._v("這個 API 可以讓開發者在新增圖文選單之前，先驗證圖文選單的 JSON 是否正確。可惜這個 API 目前需要 "),n("code",[e._v("channel access token")]),e._v("，也沒有提供 CORS 的 Header，所以目前比較適合的使用方式是透過 Postman 使用這個 API。")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/0YGRGrr.png",alt:""}})]),e._v(" "),n("h2",{attrs:{id:"liff-cha-jian"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#liff-cha-jian"}},[e._v("#")]),e._v(" LIFF 插件")]),e._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://developers.line.biz/en/docs/liff/liff-plugin/",target:"_blank",rel:"noopener noreferrer"}},[e._v("LIFF 插件的英文文件"),n("OutboundLink")],1)])])]),e._v(" "),n("p",[e._v("這個功能是讓開發者可以自己寫程式幫 LIFF SDK 增加新的功能。")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/kzi1jub.png",alt:""}})]),e._v(" "),n("p",[e._v("一個 LIFF 的 Plugin 必須要有 "),n("code",[e._v("name")]),e._v(" 以及一個 "),n("code",[e._v("install()")]),e._v("，剩下的部分就可以自由定義。在 "),n("code",[e._v("install()")]),e._v(" 中有兩個參數可以使用，分別是 "),n("code",[e._v("context")]),e._v(" 跟 "),n("code",[e._v("option")]),e._v("：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/QV4dfpV.png",alt:""}})]),e._v(" "),n("p",[e._v("LIFF 插件還能夠使用 LIFF SDK 的 hook 功能，目前有兩個內建的 hook：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/RevdlBZ.png",alt:""}})]),e._v(" "),n("p",[e._v("除了使用內建的 hook 之外，你也可以新增自定義的 hook。")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/rn6P9JE.png",alt:""}})]),e._v(" "),n("h2",{attrs:{id:"webhook-chong-song-ji-zhi"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#webhook-chong-song-ji-zhi"}},[e._v("#")]),e._v(" Webhook 重送機制")]),e._v(" "),n("p",[e._v("這個 Webhook 重送機制是當你的 Webhook 沒有在時間內正確回傳 "),n("code",[e._v("2xx")]),e._v(" 的狀態碼時，LINE 就會重新傳送這個事件給你的 Webhook。這個功能預設是被關閉的，在啟用這個功能之前，你需要"),n("a",{attrs:{href:"https://developers.line.biz/en/news/2022/#notes-2022-04-19",target:"_blank",rel:"noopener noreferrer"}},[e._v("先看過這些注意事項"),n("OutboundLink")],1),e._v("，然後你可以在 "),n("a",{attrs:{href:"https://developers.line.biz/console/",target:"_blank",rel:"noopener noreferrer"}},[e._v("LINE Developers Console"),n("OutboundLink")],1),e._v(" 的 Messaging API Channel 中啟用。")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/MOhDrVA.png",alt:""}})]),e._v(" "),n("p",[e._v("為了避免 Webhook 重複處理同一個事件，有兩個新的資料被加到 Event 的共通屬性中：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/ztiaihs.png",alt:""}})]),e._v(" "),n("p",[e._v("另外，針對傳送錯誤的次數，也有一個開關可以產生錯誤次數的報表，你一樣可以在 "),n("a",{attrs:{href:"https://developers.line.biz/console/",target:"_blank",rel:"noopener noreferrer"}},[e._v("LINE Developers Console"),n("OutboundLink")],1),e._v(" 的 Messaging API Channel 中啟用這個功能：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/wUobFDs.png",alt:""}})]),e._v(" "),n("h3",{attrs:{id:"webhook-chong-song-ji-zhi-shi-ce"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#webhook-chong-song-ji-zhi-shi-ce"}},[e._v("#")]),e._v(" Webhook 重送機制實測")]),e._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://gist.github.com/taichunmin/2fee2f839d6b84859576f2851167a3c2",target:"_blank",rel:"noopener noreferrer"}},[e._v("Webhook 重送機制實測原始碼在此"),n("OutboundLink")],1),e._v("，歡迎自行建立一個自己的 Google Cloud Functions 進行測試")])])]),e._v(" "),n("p",[e._v("為了實測 Webhook 的重送機制，我用 Google Cloud Functions 寫了一個 linebot，當目前的秒數介於 "),n("code",[e._v("0-29")]),e._v(" 之間就會回傳 "),n("code",[e._v("418")]),e._v(" 狀態碼，介於 "),n("code",[e._v("30-59")]),e._v(" 之間就會回傳 "),n("code",[e._v("200")]),e._v(" 狀態碼：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/EFDUye7.jpeg",alt:""}})]),e._v(" "),n("p",[e._v("把程式碼部署好以後，我們就可以對 LINE 官方帳號傳送訊息：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/GsBeIrF.jpeg",alt:""}})]),e._v(" "),n("p",[e._v("在使用這個程式初步測試以後，我們可以發現 LINE 大約每 60 秒重新傳送一次訊息，然後在傳送 16 次都失敗後就會停止傳送：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/3Ld7o4h.png",alt:""}})]),e._v(" "),n("p",[e._v("另外一個值得注意的地方是，重新傳送的訊息會拿到相同的 "),n("code",[e._v("replyToken")]),e._v("，但 "),n("code",[e._v("replyToken")]),e._v(" 還是只能使用一次，所以後面幾次都會收到 "),n("code",[e._v("Invalid reply token")]),e._v(" 的錯誤訊息：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://i.imgur.com/cu8vGrM.png",alt:""}})]),e._v(" "),n("h2",{attrs:{id:"yuan-shi-ma-ji-can-kao-lian-jie"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#yuan-shi-ma-ji-can-kao-lian-jie"}},[e._v("#")]),e._v(" 原始碼及參考連結")]),e._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),n("p",[e._v("本文範例程式的原始碼授權為 MIT License，如果有疑問可以透過 "),n("a",{attrs:{href:"https://www.facebook.com/taichunmin",target:"_blank",rel:"noopener noreferrer"}},[e._v("Facebook"),n("OutboundLink")],1),e._v(" 跟我交流。")])]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://gist.github.com/taichunmin/2fee2f839d6b84859576f2851167a3c2",target:"_blank",rel:"noopener noreferrer"}},[e._v("Webhook 重送機制實測原始碼"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://developers.line.biz/en/news/2022/04/05/release-validate-rich-menu-object/",target:"_blank",rel:"noopener noreferrer"}},[e._v("新聞: LINE 2022/04/05 發佈的新聞"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://developers.line.biz/en/news/2022/04/18/release-liff-2-19-1/",target:"_blank",rel:"noopener noreferrer"}},[e._v("新聞: LINE 2022/04/18 發佈的新聞"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://developers.line.biz/en/news/2022/04/19/webhook-redelivery/",target:"_blank",rel:"noopener noreferrer"}},[e._v("新聞: LINE 2022/04/19 發佈的新聞"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=o.exports}}]);