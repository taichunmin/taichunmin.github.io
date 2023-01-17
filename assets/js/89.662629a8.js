(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{469:function(s,a,e){"use strict";e.r(a);var n=e(8),i=Object(n.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"sheng-chan-ssh-fu-zhi-gong-yao-keychain-guan-li"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sheng-chan-ssh-fu-zhi-gong-yao-keychain-guan-li"}},[s._v("#")]),s._v(" 生產 ssh, 複製公鑰, keychain 管理")]),s._v(" "),e("h2",{attrs:{id:"sheng-chan-ssh-gong-si-yao"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sheng-chan-ssh-gong-si-yao"}},[s._v("#")]),s._v(" 生產 ssh 公私鑰")]),s._v(" "),e("p",[e("code",[s._v("ssh-keygen -t dsa")]),s._v(", "),e("code",[s._v("ssh-keygen -t rsa")])]),s._v(" "),e("p",[s._v("在 "),e("a",{attrs:{href:"http://portable.easylife.tw/1912",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://portable.easylife.tw/1912"),e("OutboundLink")],1),s._v(" 這篇文章中有特別說明, dsa 支援 ssh 2, rsa 支援 ssh 1,2 , 若需要支援度較高，可選用 rsa, 若想要安全性較高，應選用 dsa。")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("Generating public/private rsa key pair.\nEnter file in which to save the key (/home/taichunmin/.ssh/id_dsa):\nEnter passphrase (empty for no passphrase):\nEnter same passphrase again:\nYour identification has been saved in /home/taichunmin/.ssh/id_dsa.\nYour public key has been saved in /home/taichunmin/.ssh/id_dsa.pub.\n")])])]),e("h2",{attrs:{id:"bu-shu-ssh-gong-yao-yi-bian-kuai-su-deng-ru-qi-ta-si-fu-qi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bu-shu-ssh-gong-yao-yi-bian-kuai-su-deng-ru-qi-ta-si-fu-qi"}},[s._v("#")]),s._v(" 部屬 ssh 公鑰以便快速登入其他伺服器")]),s._v(" "),e("p",[e("code",[s._v("ssh-copy-id -i ~/.ssh/id_dsa.pub taichunmin@example.com")])]),s._v(" "),e("p",[s._v("使用這行指令，代表以後可以依靠 ssh key 登入 "),e("code",[s._v("taichunmin@example.com")]),s._v("。")]),s._v(" "),e("h2",{attrs:{id:"shi-yong-keychain-chu-cun-ssh-key-de-passphrase"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#shi-yong-keychain-chu-cun-ssh-key-de-passphrase"}},[s._v("#")]),s._v(" 使用 keychain 儲存 ssh key 的 passphrase")]),s._v(" "),e("p",[e("code",[s._v("apt-get install keychain")]),s._v(": 安裝 keychain\n"),e("code",[s._v("/usr/bin/keychain ~/.ssh/id_rsa")]),s._v(": 新增 ssh key 進行管理\n"),e("code",[s._v("source ~/.keychain/${HOSTNAME}-sh > /dev/null")]),s._v(": 執行 keychain")]),s._v(" "),e("h2",{attrs:{id:"bian-xie-jiao-ben-zi-dong-zhi-xing-keychain"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#bian-xie-jiao-ben-zi-dong-zhi-xing-keychain"}},[s._v("#")]),s._v(" 編寫腳本自動執行 keychain")]),s._v(" "),e("p",[e("code",[s._v("nano ~/.bashrc")])]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("# Start keychain\n/usr/bin/keychain\nsource ~/.keychain/${HOSTNAME}-sh > /dev/null\n")])])])])}),[],!1,null,null,null);a.default=i.exports}}]);