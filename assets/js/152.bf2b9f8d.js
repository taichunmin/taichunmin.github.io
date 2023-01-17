(window.webpackJsonp=window.webpackJsonp||[]).push([[152],{529:function(t,a,s){"use strict";s.r(a);var n=s(8),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"line-zhuan-shu-de-flex-xun-xi-di-san-ban-geng-xin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#line-zhuan-shu-de-flex-xun-xi-di-san-ban-geng-xin"}},[t._v("#")]),t._v(" LINE 專屬的 Flex 訊息第三版更新")]),t._v(" "),s("p",[t._v("大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。")]),t._v(" "),s("p",[t._v("LINE 在 2022/03/11 發佈了"),s("a",{attrs:{href:"https://developers.line.biz/en/news/2022/03/11/flex-message-update-3-released/",target:"_blank",rel:"noopener noreferrer"}},[t._v("「Flex Message Update 3 released」"),s("OutboundLink")],1),t._v("，這次的改版大概有這些內容：")]),t._v(" "),s("ol",[s("li",[t._v("支援在 hero 區塊放影片")]),t._v(" "),s("li",[t._v("box 支援 "),s("code",[t._v("maxWidth")]),t._v(" 及 "),s("code",[t._v("maxHeight")]),t._v(" 參數")]),t._v(" "),s("li",[t._v("文字現在可以設定行距 "),s("code",[t._v("lineSpacing")])])]),t._v(" "),s("p",[t._v("這次最大的改版是支援在 Flex 訊息的 hero 區塊放影片，所以本文也會著重在討論這個功能。")]),t._v(" "),s("h2",{attrs:{id:"jia-ru-guan-fang-zhang-hao-flex-kai-fa-ren-yuan-gong-ju"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jia-ru-guan-fang-zhang-hao-flex-kai-fa-ren-yuan-gong-ju"}},[t._v("#")]),t._v(" 加入官方帳號「Flex 開發人員工具」")]),t._v(" "),s("p",[t._v("本文會使用均民自己所開發的官方帳號「Flex 開發人員工具」進行測試，如果你也想要跟著嘗試看看的話，請掃描以下 QR Code 加入好友吧！")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://i.imgur.com/cP5purz.png",alt:""}}),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("加入好友: "),s("a",{attrs:{href:"https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"zhun-bei-ying-pian"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#zhun-bei-ying-pian"}},[t._v("#")]),t._v(" 準備影片")]),t._v(" "),s("p",[t._v("這個功能所需的影片網址，需要的是可以直接連結到影片檔案的網址，YouTube 或是 Google Drive 之類的連結是沒有辦法直接使用的，你可以選擇放到自己的網站伺服器上，或是 Google Cloud Storage、AWS S3 之類的靜態檔案服務上，這方面的教學可以直接去 Google 搜尋。")]),t._v(" "),s("p",[t._v("本文均民選擇使用 "),s("code",[t._v("youtube-dl")]),t._v(" 這個開源工具去下載 "),s("code",[t._v("https://www.youtube.com/watch?v=1qawxYdIsik")]),t._v(" 這個影片，然後透過 git 上傳到 GitHub Gist 上，但因為這不是這篇文章的重點，所以在此不會細談，以下是大概的指令：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ youtube-dl -F "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://www.youtube.com/watch?v=1qawxYdIsik'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("youtube"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" 1qawxYdIsik: Downloading webpage\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("info"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Available formats "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" 1qawxYdIsik:\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("format")]),t._v(" code  extension  resolution note\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("249")]),t._v("          webm       audio only tiny   53k , webm_dash container, opus @ 53k "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("48000Hz"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("389")]),t._v(".12KiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("250")]),t._v("          webm       audio only tiny   65k , webm_dash container, opus @ 65k "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("48000Hz"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("484")]),t._v(".02KiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("251")]),t._v("          webm       audio only tiny  114k , webm_dash container, opus @114k "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("48000Hz"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("841")]),t._v(".88KiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("140")]),t._v("          m4a        audio only tiny  129k , m4a_dash container, mp4a.40.2@129k "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("44100Hz"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("950")]),t._v(".87KiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("278")]),t._v("          webm       256x144    144p   74k , webm_dash container, vp9@  74k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("548")]),t._v(".95KiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("160")]),t._v("          mp4        256x144    144p   79k , mp4_dash container, avc1.4d400c@  79k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("580")]),t._v(".11KiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("242")]),t._v("          webm       426x240    240p  129k , webm_dash container, vp9@ 129k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("948")]),t._v(".04KiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("133")]),t._v("          mp4        426x240    240p  161k , mp4_dash container, avc1.4d4015@ 161k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".16MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("243")]),t._v("          webm       640x360    360p  221k , webm_dash container, vp9@ 221k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".59MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("134")]),t._v("          mp4        640x360    360p  290k , mp4_dash container, avc1.4d401e@ 290k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(".08MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("244")]),t._v("          webm       854x480    480p  359k , webm_dash container, vp9@ 359k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(".58MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("135")]),t._v("          mp4        854x480    480p  513k , mp4_dash container, avc1.4d401f@ 513k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(".68MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("247")]),t._v("          webm       1280x720   720p  695k , webm_dash container, vp9@ 695k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v(".98MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("136")]),t._v("          mp4        1280x720   720p  952k , mp4_dash container, avc1.64001f@ 952k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),t._v(".82MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("248")]),t._v("          webm       1920x1080  1080p 1182k , webm_dash container, vp9@1182k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v(".47MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("137")]),t._v("          mp4        1920x1080  1080p 1879k , mp4_dash container, avc1.640028@1879k, 30fps, video only, "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("13")]),t._v(".46MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),t._v("           mp4        640x360    360p  386k , avc1.42001E, 30fps, mp4a.40.2 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("44100Hz"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(".77MiB\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),t._v("           mp4        1280x720   720p 1080k , avc1.64001F, 30fps, mp4a.40.2 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("44100Hz"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("best"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n$ youtube-dl -f "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://www.youtube.com/watch?v=1qawxYdIsik'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("youtube"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" 1qawxYdIsik: Downloading webpage\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("download"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Destination: 防疫大作戰－日常防疫 "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" Tips "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("田知學醫師，國語"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-1qawxYdIsik.mp4\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("download"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),t._v("% of "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),t._v(".73MiB "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" 01:56\n\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone git@gist.github.com:3a41f553ac230587512bd20d19fa906f.git gist220311\n正複製到 "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'gist220311'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" gist220311\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'upload video'")]),t._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin master\n")])])]),s("p",[t._v("上傳完成後，你也需要幫影片準備一個預覽圖片，在此均民把預覽圖片上傳到 Imgur，以下是上傳完成後的網址：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("影片: https://gist.githubusercontent.com/taichunmin/3a41f553ac230587512bd20d19fa906f/raw/video.mp4\n預覽圖: https://i.imgur.com/nKkaGB2.jpeg\n")])])]),s("h3",{attrs:{id:"2020-03-14-bu-chong-line-voom-wang-lu-ying-pian-kong-jian"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#2020-03-14-bu-chong-line-voom-wang-lu-ying-pian-kong-jian"}},[t._v("#")]),t._v(" 2020/03/14 補充：LINE VOOM 網路影片空間")]),t._v(" "),s("p",[t._v("耿順一學弟在看過我寫的這篇文章以後，跟我分享了一個小技巧，就是上傳到 LINE VOOM 的影片可以直接拿到 "),s("code",[t._v(".mp4")]),t._v(" 的網址，就不需要使用均民在上面提供的上傳到 GitHub Gist 的方法喔！")]),t._v(" "),s("p",[t._v("首先，先前往 "),s("a",{attrs:{href:"https://manager.line.biz/",target:"_blank",rel:"noopener noreferrer"}},[t._v("LINE 官方帳號管理頁面"),s("OutboundLink")],1),t._v("，選擇一個不重要的頻道，然後到 LINE VOOM 點選建立：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/My8Wovh.png",alt:""}})]),t._v(" "),s("p",[t._v("然後點選「上傳圖片或影片」來上傳：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/bGrSlEz.png",alt:""}})]),t._v(" "),s("p",[t._v("目前影片的相關限制如下：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/OgykEJb.png",alt:""}})]),t._v(" "),s("p",[t._v("影片上傳完成以後，就可以去按最下面的「貼文」按鈕。回到貼文頁面以後，再點進貼文的詳細內容：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/sfwGHvh.png",alt:""}})]),t._v(" "),s("p",[t._v("進入貼文詳細內容以後，再次點選影片：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/nqCDhxE.png",alt:""}})]),t._v(" "),s("p",[t._v("然後影片打開以後，對影片按下右鍵並從選單中選擇「複製影片位址」：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/MxgdzIt.png",alt:""}})]),t._v(" "),s("p",[t._v("這樣就成功拿到網址囉！經過實測這個影片網址是真的可以在 Flex 訊息的 video 功能中正常使用，再次感謝耿順一學弟分享的小技巧。")]),t._v(" "),s("h2",{attrs:{id:"zhuan-xie-flex-xun-xi"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#zhuan-xie-flex-xun-xi"}},[t._v("#")]),t._v(" 撰寫 Flex 訊息")]),t._v(" "),s("p",[t._v("有了影片跟預覽圖以後，我們就可以來編寫 Flex 訊息所需要的 JSON 了，"),s("s",[t._v("因為目前"),s("a",{attrs:{href:"https://developers.line.biz/flex-simulator/",target:"_blank",rel:"noopener noreferrer"}},[t._v("「Flex 訊息模擬器」"),s("OutboundLink")],1),t._v("還不支援這個功能")]),t._v("（3/18 更新："),s("a",{attrs:{href:"https://developers.line.biz/flex-simulator/",target:"_blank",rel:"noopener noreferrer"}},[t._v("「Flex 訊息模擬器」"),s("OutboundLink")],1),t._v("已經有支援編輯了，雖然只能顯示替代內容），所以目前只能自己手動撰寫這個 JSON：")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bubble"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"size"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"giga"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hero"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"video"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://gist.githubusercontent.com/taichunmin/3a41f553ac230587512bd20d19fa906f/raw/video.mp4"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"previewUrl"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://i.imgur.com/nKkaGB2.jpeg"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"aspectRatio"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1280:720"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"altContent"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"image"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"size"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"full"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"aspectRatio"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1280:720"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"aspectMode"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cover"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://i.imgur.com/nKkaGB2.jpeg"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("寫完以後，你就可以直接把 JSON 複製貼上給均民所開發的「Flex 開發人員工具」：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"center"}},[s("img",{attrs:{src:"https://i.imgur.com/thNy51Ih.png",alt:""}})]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[s("img",{attrs:{src:"https://i.imgur.com/8U6YO5Xh.jpeg",alt:""}})])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Android")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("iPhone")])])])]),t._v(" "),s("p",[t._v("除此之外，你還可以透過指定 "),s("code",[t._v("action")]),t._v(" 參數，來幫影片多放一個連結（目前僅支援 "),s("code",[t._v("uri action")]),t._v("）：")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bubble"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"size"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"giga"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"hero"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"video"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://gist.githubusercontent.com/taichunmin/3a41f553ac230587512bd20d19fa906f/raw/video.mp4"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"previewUrl"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://i.imgur.com/nKkaGB2.jpeg"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"aspectRatio"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1280:720"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"action"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uri"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"label"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"在 YouTube 觀看"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"uri"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://www.youtube.com/watch?v=1qawxYdIsik"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"altContent"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"image"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"size"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"full"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"aspectRatio"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1280:720"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"aspectMode"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cover"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"url"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://i.imgur.com/nKkaGB2.jpeg"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("這個連結會出現在三個地方：")]),t._v(" "),s("ol",[s("li",[t._v("聊天視窗 Flex 訊息的影片播放按鈕下方")]),t._v(" "),s("li",[t._v("影片播放中的右上角")]),t._v(" "),s("li",[t._v("影片播放結束的重播按鈕下方")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/UYmQSE8.png",alt:""}})]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/gk5WzLX.png",alt:""}})]),t._v(" "),s("p",[t._v("這個訊息是可以透過 "),s("code",[t._v("liff.shareTargetPicker")]),t._v(" 分享給好友或群組的，你可以直接點選上方的「分享」按鈕透過均民開發的另一個程式「LINE 數位版名片」分享出去測試：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/fE9wl9X.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"bu-zhi-yuan-zhuang-zhi-de-ti-dai-nei-rong"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bu-zhi-yuan-zhuang-zhi-de-ti-dai-nei-rong"}},[t._v("#")]),t._v(" 不支援裝置的替代內容")]),t._v(" "),s("p",[t._v("當手機不支援這個最新的 "),s("code",[t._v("video")]),t._v(" 功能時，你需要透過 "),s("code",[t._v("altContent")]),t._v(" 屬性指定替代的內容，目前均民開發用的 "),s("code",[t._v("iPhone 6+")]),t._v(" (iOS 12.5.5, LINE 11.17.0) 就不支援這個功能：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/8bVC4vvh.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"zi-dong-bo-fang-ying-pian"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#zi-dong-bo-fang-ying-pian"}},[t._v("#")]),t._v(" 自動播放影片")]),t._v(" "),s("p",[t._v("在 PC 版的 LINE 不支援自動播放，在手機上影片能不能自動播放，就要看使用者的設定，設定的位置在「設定」➜「照片．影片」➜「自動播放影片」：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/qaA0OLd.png",alt:""}})]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/nvqEprZ.png",alt:""}})]),t._v(" "),s("p",[t._v("如果影片沒辦法自動播放，使用者還是可以手動在聊天室點選影片來播放。")]),t._v(" "),s("h2",{attrs:{id:"flex-xun-xi-de-si-ge-qu-kuai"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flex-xun-xi-de-si-ge-qu-kuai"}},[t._v("#")]),t._v(" Flex 訊息的四個區塊")]),t._v(" "),s("p",[t._v("一則 Flex 訊息是由四個區塊所組成，分別為 "),s("code",[t._v("header")]),t._v("、"),s("code",[t._v("hero")]),t._v("、"),s("code",[t._v("body")]),t._v("、"),s("code",[t._v("footer")]),t._v("，區塊之間的順序是不可更改的：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/b1vf0MW.png",alt:""}})]),t._v(" "),s("p",[t._v("也就是說，如果你想要在影片上方自訂內容，你需要寫在 "),s("code",[t._v("header")]),t._v(" 區塊中，如果你想要在影片下方自訂內容則是 "),s("code",[t._v("body")]),t._v(" 或是 "),s("code",[t._v("footer")]),t._v(" 區塊都可。")]),t._v(" "),s("h2",{attrs:{id:"qi-ta-zhu-yi-shi-xiang-yi-ji-xian-zhi"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#qi-ta-zhu-yi-shi-xiang-yi-ji-xian-zhi"}},[t._v("#")]),t._v(" 其他注意事項以及限制")]),t._v(" "),s("ol",[s("li",[t._v("只能直接在 Flex 訊息的 hero 區塊使用 video 功能（子元素也不支援）")]),t._v(" "),s("li",[t._v("bubble 的大小必須為 "),s("code",[t._v("kilo")]),t._v("、"),s("code",[t._v("mega")]),t._v("、"),s("code",[t._v("giga")]),t._v(" 其中之一")]),t._v(" "),s("li",[t._v("無法在 Flex 的 Carousel 中使用 video")]),t._v(" "),s("li",[t._v("影片與預覽圖片的比例必須相同，不然會有不可預期的顯示結果")]),t._v(" "),s("li",[t._v("目前只支援 mp4 格式，影片檔案最大 200 MB")]),t._v(" "),s("li",[t._v("目前影片的 "),s("code",[t._v("action")]),t._v(" 僅支援 "),s("code",[t._v("uri")]),t._v(" 連結")])]),t._v(" "),s("h2",{attrs:{id:"yuan-shi-ma-ji-can-kao-lian-jie"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yuan-shi-ma-ji-can-kao-lian-jie"}},[t._v("#")]),t._v(" 原始碼及參考連結")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("本文範例程式的原始碼授權為 MIT License。")])]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://developers.line.biz/en/news/2022/03/11/flex-message-update-3-released/",target:"_blank",rel:"noopener noreferrer"}},[t._v("新聞: LINE 2022/03/11 發佈的新聞"),s("OutboundLink")],1),t._v(" by LINE")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/taichunmin/gcf-line-devbot",target:"_blank",rel:"noopener noreferrer"}},[t._v("原始碼: Flex 開發人員工具"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2022-02-10-richmenu-playground.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: 圖文選單遊樂場中文版：超快速認識圖文選單的功能！"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2021-09-10-line-flex-width.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: 快速測試 LINE Flex 訊息在手機上顯示的寬度"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2021-06-22-linebot-richmenu-alias.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: LINE 官方帳號全都能用的多層選單功能"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2021-04-16-linebot-test-sticker.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: 快速測試 LINE 官方帳號及 Notify 能傳送的貼圖"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2021-03-11-line-quickreply-uri.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: Quick Reply 支援 URI Action"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2021-01-20-line-devbot-mention.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章:「Flex 開發人員工具」支援 mention 新功能"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2020-07-13-line-simple-beacon-workshop.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: LINE Simple Beacon for ESP32 工作坊"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2020-04-07-line-liff-send-hidden-data.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: 如何在 LIFF 傳送隱藏資料給機器人"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章: 輔助開發 LINE Flex 訊息的工具"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);