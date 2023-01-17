(window.webpackJsonp=window.webpackJsonp||[]).push([[132],{509:function(t,a,e){"use strict";e.r(a);var r=e(8),s=Object(r.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"line-shu-wei-ban-ming-pian-gong-zuo-fang"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#line-shu-wei-ban-ming-pian-gong-zuo-fang"}},[t._v("#")]),t._v(" LINE 數位版名片工作坊")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("相關連結")]),t._v(" "),e("ul",[e("li",[t._v("開場投影片："),e("a",{attrs:{href:"https://hackmd.io/@taichunmin/chatbot-tw-202010",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hackmd.io/@taichunmin/chatbot-tw-202010"),e("OutboundLink")],1)]),t._v(" "),e("li",[t._v("共筆："),e("a",{attrs:{href:"https://hackmd.io/@chatbot-tw/chatbots-meetup-in-central-taiwan-010",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hackmd.io/@chatbot-tw/chatbots-meetup-in-central-taiwan-010"),e("OutboundLink")],1)]),t._v(" "),e("li",[t._v("作者：戴均民 "),e("a",{attrs:{href:"https://taichunmin.idv.tw/",target:"_blank",rel:"noopener noreferrer"}},[t._v("(taichunmin)"),e("OutboundLink")],1)])])]),t._v(" "),e("p",[t._v("大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。")]),t._v(" "),e("p",[t._v("在你認識一個新朋友，並且加入對方的 LINE 帳號以後，應該要打招呼還是傳貼圖呢？都不對！要傳數位版名片才夠潮，讓對方點一下就能直接「打開網站」、「開地圖導航」、「撥電話」還有「傳電子郵件」！")]),t._v(" "),e("p",[t._v("在這工作坊內你將學會：")]),t._v(" "),e("ol",[e("li",[t._v("透過講者的免費樣板網站製作數位版名片")]),t._v(" "),e("li",[t._v("透過 Flex 訊息模擬器製作 LINE 數位版名片")])]),t._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#tou-guo-jiang-zhe-de-mian-fei-yang-ban-wang-zhan-zhi-zuo-ming-pian"}},[t._v("透過講者的免費樣板網站製作名片")])]),e("li",[e("a",{attrs:{href:"#zhi-zuo-fan-li-ming-pian-bing-dai-ru-zi-ji-de-csv-zi-liao"}},[t._v("製作範例名片並帶入自己的 CSV 資料")]),e("ul",[e("li",[e("a",{attrs:{href:"#zhun-bei-csv-zi-liao"}},[t._v("準備 CSV 資料")])]),e("li",[e("a",{attrs:{href:"#ba-csv-shang-chuan-dao-github-gist-shang"}},[t._v("把 CSV 上傳到 GitHub Gist 上")])]),e("li",[e("a",{attrs:{href:"#tian-xie-csv-wang-zhi-bing-zhi-zuo-fan-li-ming-pian"}},[t._v("填寫 CSV 網址並製作範例名片")])])])]),e("li",[e("a",{attrs:{href:"#zhi-zuo-ke-zhi-hua-ming-pian-yang-ban"}},[t._v("製作客製化名片樣版")]),e("ul",[e("li",[e("a",{attrs:{href:"#ke-zhi-hua-flex-xun-xi"}},[t._v("客製化 Flex 訊息")])]),e("li",[e("a",{attrs:{href:"#gai-shan-shi-yong-zhe-ti-yan"}},[t._v("改善使用者體驗")])]),e("li",[e("a",{attrs:{href:"#jiang-zi-liao-tian-dao-csv-zhong"}},[t._v("將資料填到 CSV 中")])]),e("li",[e("a",{attrs:{href:"#jiang-zi-liao-shi-yong-bian-shu-ti-huan"}},[t._v("將資料使用變數替換")])]),e("li",[e("a",{attrs:{href:"#tou-guo-js-de-han-shi-rang-yang-ban-geng-dan-xing"}},[t._v("透過 JS 的函式讓樣板更彈性")])])])]),e("li",[e("a",{attrs:{href:"#shu-wei-ban-ming-pian-ji-shu-tao-lun-she-qun"}},[t._v("「數位版名片技術討論」社群")])]),e("li",[e("a",{attrs:{href:"#yuan-shi-ma-yu-xiang-guan-lian-jie"}},[t._v("原始碼與相關連結")])])])]),e("p"),t._v(" "),e("h2",{attrs:{id:"tou-guo-jiang-zhe-de-mian-fei-yang-ban-wang-zhan-zhi-zuo-ming-pian"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tou-guo-jiang-zhe-de-mian-fei-yang-ban-wang-zhan-zhi-zuo-ming-pian"}},[t._v("#")]),t._v(" 透過講者的免費樣板網站製作名片")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("數位版名片 免費樣版網站")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://taichunmin.idv.tw/liff-businesscard/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://taichunmin.idv.tw/liff-businesscard/"),e("OutboundLink")],1)])]),t._v(" "),e("p",[t._v("在這個章節中，將會教你如何使用數位版名片。請先開啟上方連結，就能看到講者所提供的免費樣板清單，在此我們以「Chatbot 台灣開發者」這個名片樣板為例。")]),t._v(" "),e("p",[t._v("請按一下這個樣板下方的「點此建立名片」按鈕：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/2arwiAS.png",alt:""}})]),t._v(" "),e("p",[t._v("接下來就會開啟填寫資料的畫面（如圖 1-1），請填寫你想要顯示的「頭銜」和「暱稱」，填完以後請點一下「建立名片」按鈕，打開分享頁面（如圖 1-2）：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-1")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-2")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/sRcKcCQ.png",alt:""}})]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/KAhQtXB.png",alt:""}})])])])]),t._v(" "),e("p",[t._v("在成功建立名片以後，接下來要教你如何分享名片給好友。")]),t._v(" "),e("p",[t._v("請點一下圖 1-2 的「分享好友」按鈕，你就能看到圖 1-3 的畫面。你也可以在圖 1-4 上方的輸入框中輸入好友的帳號搜尋：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-3")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-4")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/2VLo9T7.png",alt:""}})]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/pcox3VS.png",alt:""}})])])])]),t._v(" "),e("p",[t._v("如果在這畫面中找不到好友的帳號，很有可能是好友沒有打開「外部應用程式存取」的權限（如圖 1-4 中間灰色文字），這時你也可以考慮點一下圖 1-2 中的「複製網址」按鈕，然後把網址貼到聊天視窗內（如圖 1-5），就可以按一下圖 1-2 的「直接傳送」按鈕來把名片傳送到聊天視窗內。傳送完成後，就可以在網址上長按來收回名片網址（如圖 1-6）。")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-5")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-6")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/Af8BnFM.png",alt:""}})]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/dZLl980.png",alt:""}})])])])]),t._v(" "),e("p",[t._v("為了讓你可以快速的分享名片，接下來會教你把名片網址儲存在 LINE Keep 中。")]),t._v(" "),e("p",[t._v("請前往 LINE 應用程式的「主頁」，然後點一下圖 1-7 右上方的 Keep 按鈕。在開啟 LINE Keep 畫面後，點一下圖 1-8 右上角的「+」按鈕：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-7")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-8")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/n044iq2.png",alt:""}})]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/3WYS4mP.png",alt:""}})])])])]),t._v(" "),e("p",[t._v("因為名片分享網址上沒有辦法辨識名片，為了要能夠新增自己能看得懂的說明，我們可以新增文字到 LINE Keep 中。")]),t._v(" "),e("p",[t._v("接下來點一下圖 1-9 中的「文字」選項，然後輸入名片說明、貼上名片網址、並且選擇一個底色（如圖 1-10）：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-9")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-10")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/y1CKloR.png",alt:""}})]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/TQIcGiE.png",alt:""}})])])])]),t._v(" "),e("p",[t._v("在儲存文字到 LINE Keep 後，就能夠很方便的辨識名片（如圖 1-11）以及分享給好友囉！如果你和我一樣有很多數位版名片，你也可以選擇把名片全部新增到特輯中（如圖 1-12）。")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-11")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("圖 1-12")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/qp7RfX2.png",alt:""}})]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[e("img",{attrs:{src:"https://i.imgur.com/ygty7QH.png",alt:""}})])])])]),t._v(" "),e("h2",{attrs:{id:"zhi-zuo-fan-li-ming-pian-bing-dai-ru-zi-ji-de-csv-zi-liao"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#zhi-zuo-fan-li-ming-pian-bing-dai-ru-zi-ji-de-csv-zi-liao"}},[t._v("#")]),t._v(" 製作範例名片並帶入自己的 CSV 資料")]),t._v(" "),e("h3",{attrs:{id:"zhun-bei-csv-zi-liao"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#zhun-bei-csv-zi-liao"}},[t._v("#")]),t._v(" 準備 CSV 資料")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("相關連結")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://taichunmin.idv.tw/liff-businesscard/csv/chatbot-tw-coscup-2020.csv",target:"_blank",rel:"noopener noreferrer"}},[t._v("議程資料 CSV"),e("OutboundLink")],1),t._v(": "),e("code",[t._v("https://taichunmin.idv.tw/liff-businesscard/csv/chatbot-tw-coscup-2020.csv")])])])]),t._v(" "),e("p",[t._v("在上一個章節中，資料都是放在網址內，如果你幫公司同事製作名片後，需要更新名片裡面的資料（例如修改職稱），你就需要請你的同事更新名片的分享連結，如果改成準備一個 csv 檔案當作資料來源，你就能直接在 CSV 內更新資料，不用幫同事更新網址喔！")]),t._v(" "),e("p",[t._v("首先，請先把「議程資料 CSV」下載到電腦中，再來開啟一個新的 "),e("a",{attrs:{href:"https://docs.google.com/spreadsheets/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Google 試算表"),e("OutboundLink")],1),t._v("，點一下「檔案」→「匯入」→「上傳」：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/y0qrBrL.png",alt:""}})]),t._v(" "),e("p",[t._v("選取剛剛下載的 CSV 檔案後，會出現匯入選項的視窗，請選擇「取代目前工作表」、「逗號」、「否」，然後點一下「匯入資料」按鈕：")]),t._v(" "),e("img",{staticStyle:{width:"480px"},attrs:{src:"https://i.imgur.com/gxtlhNy.png"}}),t._v(" "),e("p",[t._v("匯入完成以後，你應該會看到以下的資料內容，在 CSV 的第一行會被當成是變數名稱，所以需要遵守 JavaScript 的變數名稱規則 (中文字也能用)：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/I5BRFeS.png",alt:""}})]),t._v(" "),e("p",[t._v("接下來你可以嘗試修改 CSV 裡面的資料，修改完成後，點一下「檔案」→「下載」→「逗號分隔值檔案 (.csv，目前工作表)」來把資料匯出成 UTF-8 字元編碼的 CSV 檔案：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/Q6vaH0C.png",alt:""}})]),t._v(" "),e("h3",{attrs:{id:"ba-csv-shang-chuan-dao-github-gist-shang"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ba-csv-shang-chuan-dao-github-gist-shang"}},[t._v("#")]),t._v(" 把 CSV 上傳到 GitHub Gist 上")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("相關連結")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://gist.github.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("新增 GitHub Gist"),e("OutboundLink")],1)])])]),t._v(" "),e("p",[t._v("CSV 檔案匯出以後，我們需要把這個 CSV 檔案放到網路上可以公開存取的地方，在此我們以 GitHub Gist 為例。請先前往 "),e("a",{attrs:{href:"https://github.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub"),e("OutboundLink")],1),t._v(" 註冊一個帳號：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/E11zsED.png",alt:""}})]),t._v(" "),e("p",[t._v("註冊完成以後，請點一下"),e("a",{attrs:{href:"https://gist.github.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("新增 GitHub Gist"),e("OutboundLink")],1),t._v(" 連結如下：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/uQRbjl3.png",alt:""}})]),t._v(" "),e("p",[t._v("然後把 CSV 檔案直接拖曳到 GitHub Gist 的網頁上面如下：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/WdlJQ6s.png",alt:""}})]),t._v(" "),e("p",[t._v("然後你就能看到 csv 的內容已經被填到網頁中了，接下來按一下下圖中的「Create secret gist」按鈕，來建立一個 GitHub Gist。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/WXCRUaW.png",alt:""}})]),t._v(" "),e("p",[t._v("接下來我們要取得這個 CSV 檔案的公開連結，請點一下 CSV 檔案右上方的「Raw」的按鈕：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/n4gGPWW.png",alt:""}})]),t._v(" "),e("p",[t._v("然後你應該就會看到如下圖的畫面，然後去複製網址列的網址即可。（不要直接對 Raw 按鈕按右鍵複製連結網址喔，那個連結不能用）")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/rHSNykM.png",alt:""}})]),t._v(" "),e("p",[t._v("你複製下來的網址會長的像是下面的「修改前網址」，為了要讓 CSV 資料能夠自動抓到最新的內容，你需要把 "),e("code",[t._v("/raw/")]),t._v(" 後面的那段 "),e("code",[t._v("{version-id}")]),t._v(" 刪除：")]),t._v(" "),e("ul",[e("li",[t._v("修改前: "),e("code",[t._v("https://gist.githubusercontent.com/{username}/{gist-id}/raw/{version-id}/chatbot-tw-coscup-2020.csv")])]),t._v(" "),e("li",[t._v("修改後: "),e("code",[t._v("https://gist.githubusercontent.com/{username}/{gist-id}/raw/chatbot-tw-coscup-2020.csv")])])]),t._v(" "),e("p",[t._v("恭喜你已經成功拿到一個公開的 CSV 網址啦！把這個網址先存下來，我們等等就會用到喔！")]),t._v(" "),e("h3",{attrs:{id:"tian-xie-csv-wang-zhi-bing-zhi-zuo-fan-li-ming-pian"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tian-xie-csv-wang-zhi-bing-zhi-zuo-fan-li-ming-pian"}},[t._v("#")]),t._v(" 填寫 CSV 網址並製作範例名片")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("相關連結")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://taichunmin.idv.tw/liff-businesscard/forms/csv.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("製作 CSV 名片"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://taichunmin.idv.tw/liff-businesscard/cards/chatbot-tw-coscup-2020.txt",target:"_blank",rel:"noopener noreferrer"}},[t._v("COSCUP 議程名片樣板"),e("OutboundLink")],1),t._v(": "),e("code",[t._v("https://taichunmin.idv.tw/liff-businesscard/cards/chatbot-tw-coscup-2020.txt")])])])]),t._v(" "),e("p",[t._v("請打開上方的「製作名片網頁」連結，打開以後你應該會看到這個畫面：")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/rBKalmp.png",alt:""}})]),t._v(" "),e("p",[t._v("在此來介紹一下這幾個欄位要填什麼資料。")]),t._v(" "),e("ul",[e("li",[t._v("名片樣板：這欄要填一個純文字檔案的網址，裡面是可以傳送到 LINE Message API 的訊息 JSON，這個下一個段落會詳細教學，在此我們使用預設值即可。")]),t._v(" "),e("li",[t._v("CSV：這個欄位要填一個 CSV 檔案的網址，程式會讀取這個 CSV 檔案然後選出符合條件的那一筆資料，然後帶入名片樣板作為變數使用。")]),t._v(" "),e("li",[t._v("「比對欄位」和「比對資料」：這兩個欄位需要一起看，代表程式會從 CSV 第一筆開始往下尋找「指定的欄位」之中等於「指定資料」的那筆資料，在此就是找到 "),e("code",[t._v("id=1")]),t._v(" 的那筆資料。你可以自由修改這兩欄的內容來找到 CSV 中你想要的那筆資料。")])]),t._v(" "),e("p",[t._v("資料填寫完畢後，點一下「建立名片」按鈕，就可以成功建立名片啦！")]),t._v(" "),e("h2",{attrs:{id:"zhi-zuo-ke-zhi-hua-ming-pian-yang-ban"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#zhi-zuo-ke-zhi-hua-ming-pian-yang-ban"}},[t._v("#")]),t._v(" 製作客製化名片樣版")]),t._v(" "),e("p",[t._v("這一個部份的練習會需要比較多的程式基礎，如果不是程式背景出身的可以快速看過就好。")]),t._v(" "),e("h3",{attrs:{id:"ke-zhi-hua-flex-xun-xi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ke-zhi-hua-flex-xun-xi"}},[t._v("#")]),t._v(" 客製化 Flex 訊息")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("相關連結")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://developers.line.biz/en/docs/messaging-api/using-flex-messages/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flex 訊息官方文件"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://developers.line.biz/flex-simulator/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flex 訊息模擬器"),e("OutboundLink")],1)])])]),t._v(" "),e("p",[t._v("LINE 所支援的 Flex 訊息可以做出千變萬化的版面，但由於每個人的設計都不盡相同，而且 LINE 也很常會改版更新，所以如果你想要製作更客製化的名片樣板，建議你可以直接去參考"),e("a",{attrs:{href:"https://developers.line.biz/en/docs/messaging-api/using-flex-messages/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文件"),e("OutboundLink")],1),t._v("或直接使用 LINE 提供的 "),e("a",{attrs:{href:"https://developers.line.biz/flex-simulator/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flex 訊息模擬器"),e("OutboundLink")],1),t._v(" 來製作，在這篇教學中不會涉略到這個部分。")]),t._v(" "),e("img",{staticStyle:{width:"480px"},attrs:{src:"https://i.imgur.com/eZSX3yP.png"}}),t._v(" "),e("h3",{attrs:{id:"gai-shan-shi-yong-zhe-ti-yan"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gai-shan-shi-yong-zhe-ti-yan"}},[t._v("#")]),t._v(" 改善使用者體驗")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("相關連結")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://developers.google.com/maps/documentation/urls/guide",target:"_blank",rel:"noopener noreferrer"}},[t._v("Google Maps 網址文件"),e("OutboundLink")],1)])])]),t._v(" "),e("p",[t._v("數位版名片跟紙本最不一樣的地方就是，可以放超連結！我們可以在合適的地方放上相對應的超連結，以增加使用者體驗：")]),t._v(" "),e("ol",[e("li",[t._v("公司名稱放上官網連結，如果要強制外部瀏覽器開啟可以多加上 "),e("code",[t._v("?openExternalBrowser=1")]),t._v(" 參數。")]),t._v(" "),e("li",[t._v("手機放上可以直接撥打手機的超連結："),e("code",[t._v("tel:0900000000")])]),t._v(" "),e("li",[t._v("公司電話如果有分機，可以在超連結上用逗號代表分機號碼："),e("code",[t._v("tel:04-23692699,000")])]),t._v(" "),e("li",[t._v("電子郵件加上可以直接寄信的超連結："),e("code",[t._v("mailto:admin@example.com")])]),t._v(" "),e("li",[t._v("公司地址加上 Google Maps 的超連結，"),e("a",{attrs:{href:"https://developers.google.com/maps/documentation/urls/guide",target:"_blank",rel:"noopener noreferrer"}},[t._v("請點此查看詳細文件"),e("OutboundLink")],1),t._v("，並加上 "),e("code",[t._v("?openExternalBrowser=1")]),t._v(" 強制使用外部瀏覽器開啟。")])]),t._v(" "),e("h3",{attrs:{id:"jiang-zi-liao-tian-dao-csv-zhong"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jiang-zi-liao-tian-dao-csv-zhong"}},[t._v("#")]),t._v(" 將資料填到 CSV 中")]),t._v(" "),e("p",[t._v("假設我們今天要做的名片樣板，就是這個預設開啟 "),e("a",{attrs:{href:"https://developers.line.biz/flex-simulator/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flex 訊息模擬器"),e("OutboundLink")],1),t._v("時會顯示的「Restaurant」範例，接下來我們需要把卡片中的欄位建立到一個 CSV 中。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/uLqsZ6z.png",alt:""}})]),t._v(" "),e("p",[t._v("這張卡片有的欄位有「圖片 "),e("code",[t._v("image")]),t._v("」、「圖片比例 "),e("code",[t._v("image_ratio")]),t._v("」、「名稱 "),e("code",[t._v("name")]),t._v("」、「評等 "),e("code",[t._v("rating")]),t._v("」、「位置 "),e("code",[t._v("place")]),t._v("」、「營業時間 "),e("code",[t._v("time")]),t._v("」、「電話 "),e("code",[t._v("tel")]),t._v("」、「網站 "),e("code",[t._v("website")]),t._v("」。另外，建議多加一個額外的「資料編號 "),e("code",[t._v("id")]),t._v("」以便用來指定是哪一筆資料。")]),t._v(" "),e("p",[t._v("照前一個章節的步驟，建立一個新的 Google Sheets 來填上這些資料：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('id,name,image,image_ratio,rating,place,time,tel,website\n1,Brown Cafe,https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png,20:13,4.0,"Miraina Tower, 4-1-6 Shinjuku, Tokyo",10:00 - 23:00,https://linecorp.com,https://linecorp.com\n')])])]),e("h3",{attrs:{id:"jiang-zi-liao-shi-yong-bian-shu-ti-huan"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jiang-zi-liao-shi-yong-bian-shu-ti-huan"}},[t._v("#")]),t._v(" 將資料使用變數替換")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("相關連結")]),t._v(" "),e("ul",[e("li",[t._v("完整範例："),e("a",{attrs:{href:"https://gist.github.com/taichunmin/ce55953ba0199052cd6e871b61b60cdb",target:"_blank",rel:"noopener noreferrer"}},[t._v("card1"),e("OutboundLink")],1),t._v("、"),e("a",{attrs:{href:"https://gist.github.com/taichunmin/6b8138bca07224dc560ca7711dbe3797",target:"_blank",rel:"noopener noreferrer"}},[t._v("card2"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://lodash.com/docs/4.17.15#template",target:"_blank",rel:"noopener noreferrer"}},[t._v("Lodash 的 "),e("code",[t._v("_.template")]),t._v(" 函式"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://json5.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("JSON5 的語法"),e("OutboundLink")],1)])])]),t._v(" "),e("p",[t._v("CSV 製作完成後，我們就要把樣板中的資料使用變數替換掉。")]),t._v(" "),e("img",{staticStyle:{width:"480px"},attrs:{src:"https://i.imgur.com/sSHSEUa.png"}}),t._v(" "),e("p",[t._v("在把資料更換成變數的時候，有幾個需要注意的地方：")]),t._v(" "),e("ol",[e("li",[t._v("程式第一步會使用 "),e("a",{attrs:{href:"https://lodash.com/docs/4.17.15#template",target:"_blank",rel:"noopener noreferrer"}},[t._v("Lodash 的 "),e("code",[t._v("_.template")]),t._v(" 函式"),e("OutboundLink")],1),t._v("來處理樣板中的變數，語法很類似 "),e("a",{attrs:{href:"https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals",target:"_blank",rel:"noopener noreferrer"}},[t._v("ES6 的 Template Literals 語法"),e("OutboundLink")],1),t._v("，所以你必須使用這個函式所支援的語法。")]),t._v(" "),e("li",[t._v("程式會額外將 "),e("a",{attrs:{href:"https://lodash.com/docs/",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("_")]),t._v(" (Lodash)"),e("OutboundLink")],1),t._v("、"),e("a",{attrs:{href:"https://github.com/ljharb/qs",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("Qs")]),e("OutboundLink")],1),t._v("、"),e("a",{attrs:{href:"https://cryptojs.gitbook.io/docs/",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("CryptoJS")]),e("OutboundLink")],1),t._v("、"),e("a",{attrs:{href:"https://github.com/iamkun/dayjs",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("dayjs")]),e("OutboundLink")],1),t._v(" 函式庫放到名片樣板的環境變數中，所以你也能在名片樣板中使用這幾個函式庫。")]),t._v(" "),e("li",[t._v("名片樣板在經過 "),e("code",[t._v("_.template")]),t._v(" 函式處理過後，會使用 "),e("code",[t._v("JSON5.parse")]),t._v(" 解析，所以你可以放心使用 "),e("a",{attrs:{href:"https://json5.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("JSON5 的語法"),e("OutboundLink")],1),t._v("！")]),t._v(" "),e("li",[t._v("程式會將 CSV 檔案中的第一行視為變數名稱，然後將資料放到 "),e("code",[t._v("vcard")]),t._v(" 變數中，所以如果你需要把 "),e("code",[t._v("name")]),t._v(" 欄位寫到變數中，你就要寫 "),e("code",[t._v("${vcard.name}")]),t._v(" 在 Flex 訊息的文字內容中，其他欄位依此類推：")])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"text"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"text"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${vcard.name}"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h3",{attrs:{id:"tou-guo-js-de-han-shi-rang-yang-ban-geng-dan-xing"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tou-guo-js-de-han-shi-rang-yang-ban-geng-dan-xing"}},[t._v("#")]),t._v(" 透過 JS 的函式讓樣板更彈性")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("相關連結")]),t._v(" "),e("ul",[e("li",[t._v("完整範例："),e("a",{attrs:{href:"https://gist.github.com/taichunmin/fd6c330f77c611d31558ccba1c9c6f21",target:"_blank",rel:"noopener noreferrer"}},[t._v("card3"),e("OutboundLink")],1)])])]),t._v(" "),e("p",[t._v("這個 "),e("code",[t._v("_.template")]),t._v(" 函式也支援 JS 函式與運算式，為了要處理這個樣板中的星星，我們可以在樣板中透過 JS 函式來實現這功能：")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("imgStar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("isGold")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token template-string"}},[e("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_")]),e("span",{pre:!0,attrs:{class:"token interpolation"}},[e("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("isGold "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'gold'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'gray'")]),e("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("_star_28.png")]),e("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"size"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sm"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"type"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"icon"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"url"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${imgStar(vcard.rating > 0)}"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"shu-wei-ban-ming-pian-ji-shu-tao-lun-she-qun"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#shu-wei-ban-ming-pian-ji-shu-tao-lun-she-qun"}},[t._v("#")]),t._v(" 「數位版名片技術討論」社群")]),t._v(" "),e("p",[t._v("最近均民創立了一個社群，讓有使用數位版名片的網友可以在上面一起討論，群組內有一些常見問題的回答、名片健檢、以及跟這專案有關的最新消息，入群連結在此："),e("a",{attrs:{href:"https://lihi1.com/CVjIx/blog",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://lihi1.com/CVjIx/blog"),e("OutboundLink")],1),t._v("！")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://i.imgur.com/ylxMnwZ.png",alt:""}})]),t._v(" "),e("h2",{attrs:{id:"yuan-shi-ma-yu-xiang-guan-lian-jie"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#yuan-shi-ma-yu-xiang-guan-lian-jie"}},[t._v("#")]),t._v(" 原始碼與相關連結")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("本文範例程式的原始碼授權為 MIT License，若您有任何疑惑，你可以直接舉手發問或是透過 "),e("a",{attrs:{href:"https://www.facebook.com/taichunmin",target:"_blank",rel:"noopener noreferrer"}},[t._v("Facebook"),e("OutboundLink")],1),t._v(" 與我聯繫。")])]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://taichunmin.idv.tw/liff-businesscard/",target:"_blank",rel:"noopener noreferrer"}},[t._v("免費樣版網站 - LINE 數位版名片"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/taichunmin/liff-businesscard",target:"_blank",rel:"noopener noreferrer"}},[t._v("原始碼 - LINE 數位版名片"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2020-07-12-liff-businesscard.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("看起來很專業的 LINE 數位版名片"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2020-07-21-liff-businesscard.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("不用寫程式也能做 LINE 數位版名片"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2021-07-09-line-card-create-carousel-1.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("免費製作電子傳單 (多頁訊息) - LINE 數位版名片"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2021-09-10-line-flex-width.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("快速測試 LINE Flex 訊息在手機上顯示的寬度"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://lihi1.com/CVjIx/blog",target:"_blank",rel:"noopener noreferrer"}},[t._v("點此加入「數位版名片技術討論群」"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=s.exports}}]);