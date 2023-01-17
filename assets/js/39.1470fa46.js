(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{419:function(s,t,a){"use strict";a.r(t);var e=a(8),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"ru-he-tou-guo-netsh-zhi-ling-kuai-su-qie-huan-windows-wang-lu-she-ding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ru-he-tou-guo-netsh-zhi-ling-kuai-su-qie-huan-windows-wang-lu-she-ding"}},[s._v("#")]),s._v(" 如何透過 netsh 指令快速切換 Windows 網路設定")]),s._v(" "),a("p",[s._v("引用自："),a("a",{attrs:{href:"http://blog.miniasp.com/post/2008/11/17/Using-Netsh-Command-Line-Utility-to-switch-TCP-IP-settings.aspx",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://blog.miniasp.com/post/2008/11/17/Using-Netsh-Command-Line-Utility-to-switch-TCP-IP-settings.aspx"),a("OutboundLink")],1)]),s._v(" "),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"custom-block-title"},[s._v("已棄用 (Deprecated)")]),s._v(" "),a("p",[s._v("此文章的內容已過時或已被取代，僅作為本人的文章歷史紀錄，您不應該採信這篇文章中的任何知識。")])]),s._v(" "),a("p",[s._v("有時後帶著筆記型電腦到處跑時，時常都要切換網路卡的 "),a("code",[s._v("TCP/IP")]),s._v(" 設定，每次都透過介面切換也實在很煩。例如說上週人在機房安裝主機時，因為網路切了 "),a("code",[s._v("vLan")]),s._v(" 導致 Notebook 要搬來搬去的，每次都要改 IP 很麻煩，還好我寫了個批次檔幫我快速切換 IP 位址，果然省時、省力、又方便。")]),s._v(" "),a("p",[s._v("首先，我先介紹如何設定網路介面到 "),a("code",[s._v("DHCP")]),s._v(" 模式")]),s._v(" "),a("ol",[a("li",[s._v("先查到你的網路卡介面名稱，如下圖示，你的名稱就是【區域連線】四個字。")]),s._v(" "),a("li",[s._v("再利用記事本(Notepad)開啟一份新文件，並且命名為 SwitchToDHCP.bat")]),s._v(" "),a("li",[s._v("輸入以下指令碼（由於 Windows XP 與 Windows Vista 的指令有些差異，因此分開列表）")])]),s._v(" "),a("div",{staticClass:"language-batch extra-class"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[s._v("; Windows 2000 / XP / 2003\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set address "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"區域連線"')]),s._v(" source=dhcp")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set dns     "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"區域連線"')]),s._v(" source=dhcp")]),s._v("\n")])])]),a("div",{staticClass:"language-batch extra-class"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[s._v("; Windows Vista / 2008\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set address   "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"區域連線"')]),s._v(" source=dhcp")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set dnsserver "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"區域連線"')]),s._v(" source=dhcp")]),s._v("\n")])])]),a("p",[s._v("再來，介紹如何設定網路介面到靜態 IP 模式")]),s._v(" "),a("ol",[a("li",[s._v("先查到你的網路卡介面名稱，如上圖示。")]),s._v(" "),a("li",[s._v("再利用記事本(Notepad)開啟一份新文件，並且命名為 "),a("code",[s._v("SwitchTo 公司內部 IP.bat")])]),s._v(" "),a("li",[s._v("輸入以下指令碼（由於 Windows XP 與 Windows Vista 的指令有些差異，因此分開列表）")])]),s._v(" "),a("div",{staticClass:"language-batch extra-class"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[s._v("; Windows 2000 / XP / 2003\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set address "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"區域連線"')]),s._v(" static "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("168")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("254")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")])]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set dns     "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"區域連線"')]),s._v(" static "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" primary")]),s._v("\n")])])]),a("div",{staticClass:"language-batch extra-class"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[s._v("; Windows Vista / 2008\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set address   "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"區域連線"')]),s._v(" static "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("168")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("255")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("254")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")])]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set dnsserver "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"區域連線"')]),s._v(" static "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("254")]),s._v(" primary")]),s._v("\n")])])]),a("p",[s._v("設定靜態 IP 時，標準的指令公式如下：")]),s._v(" "),a("div",{staticClass:"language-batch extra-class"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[s._v("; Windows 2000 / XP / 2003\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set address "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"<介面名稱>"')]),s._v(" static [IP] [子網路遮罩] [預設閘道] [閘道公制]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set dns     "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"<介面名稱>"')]),s._v(" static [名稱伺服器位址] primary")]),s._v("\n")])])]),a("div",{staticClass:"language-batch extra-class"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[s._v("; Windows Vista / 2008\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set address "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"<介面名稱>"')]),s._v(" static [IP] [子網路遮罩] [預設閘道] [閘道公制]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" interface ip set dnsserver "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"<介面名稱>"')]),s._v(" static [名稱伺服器位址] primary")]),s._v("\n")])])]),a("p",[s._v("當然，這只是針對網路介面卡做基本的設定，如果要將你現有的網路設定「完整紀錄」下來的話，可以利用以下指令達成：")]),s._v(" "),a("div",{staticClass:"language-batch extra-class"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[s._v("-c")]),s._v(" interface dump > netsh_office.cfg")]),s._v("\n")])])]),a("p",[s._v("上面那個指令是將你現在的網路設定全部匯出(dump)到 "),a("code",[s._v("netsh_office.cfg")]),s._v(" 檔案中。若下次要將設定還原，可以直接利用以下指令達成：")]),s._v(" "),a("div",{staticClass:"language-batch extra-class"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("netsh")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[s._v("-f")]),s._v(" netsh_office.cfg")]),s._v("\n")])])]),a("p",[s._v("當然，載入 "),a("code",[s._v("netsh")]),s._v(" 設定檔的指令一樣可以寫成批次檔。")]),s._v(" "),a("p",[s._v("未來只要把常用的幾個網路設定設定好放在你的隨身蝶裡，不管到哪裡只要對批次檔點兩下就可以設定好網路了，是不是很方便的一個小技巧呢！^_^")])])}),[],!1,null,null,null);t.default=n.exports}}]);