---
date: "2020-06-13T00:00:00+0800"
title: 用 localtunnel 幫 chatbot 上 https
description: 用 localtunnel 幫開發 LINE chatbot 用的後端伺服器變成 https 連線
image: https://i.imgur.com/zg2yDJp.png
tags:
  - LINE
  - 程式設計
  - backend
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---

# 用 localtunnel 幫 chatbot 上 https

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

在開發聊天機器人的時候，各大聊天機器人平台都會要求要使用 https 的 webhook，在開發環境上面要幫伺服器加上 domain 和憑證實在不是一件簡單的事情，大家最常使用 ngrok 來幫助你把開發伺服器加上 https，但是 ngrok 對於免費版的限制很多：

* 隨機產生 Domain

![](https://i.imgur.com/vLPfn4Y.png)

* 一次只能開一個 tunnel

![](https://i.imgur.com/Ybg9Gu0.png)

* 存取頻率限制

![](https://i.imgur.com/UALY6aS.png)

為了破除這個免費版的限制，之前我曾經去研究了 [SERVEO](https://serveo.net/) 這個軟體，並且也去研究了如何架設自己的 SERVEO 伺服器，並且寫成了 docker-compose 版本 [(client)](https://github.com/taichunmin/docker-serveo) [(server)](https://github.com/taichunmin/docker-serveo-server)，然後用這個主題[在 COSCUP 上面分享過](https://hackmd.io/@taichunmin/slide-coscup-2019)。但是 SERVEO 雖然暫時解決了開發上的問題，但是也還有一些不完美的地方：

* 免費伺服器 server.net 很常壞掉
* 非 Open Source
* 自己架設的 server 有連線數量限制 (上限 3)

![](https://i.imgur.com/usO2g8v.png)

後來我在偶然之下接觸到了 [localtunnel](https://github.com/localtunnel/localtunnel)，這個專案有開放原始碼，然後如果自己架設伺服器時，也沒有數量限制，另外還支援 websocket。所以我也把它寫成 docker-compose 的版本囉！

## 架設伺服器

由於 localtunnel 所提供的免費伺服器也很常壞掉，所以建議大家直接架設自己的伺服器。

我在比較過各大雲端主機的價位後，選擇使用 DigitalOcean 來架設，每月費用是 USD $5，所以這篇文章也會用這個示範，如果你用底下的優惠連結可以有免費 USD $100 試用。當然如果你有自己熟悉的雲端主機平台也可以用自己熟悉的。

> 如果覺得我寫的文章很不錯，你可以透過 [這個邀請連結來申請 DigitalOcean](https://m.do.co/c/81327b020798) 取得 USD $100 的免費額度，並且還能給我一點回饋喔！

首先，先在雲端平台上面開好一個 Ubuntu 18.04 的伺服器：

![](https://i.imgur.com/m1Yy5fE.png)

建立完成以後，就去 DNS 設定固定 IP 對應，注意這裡需要先建立一個 A Record 然後再設定一個 Wildcard 的 CNAME Record：

```
localtunnel     IN      A       xxx.xxx.xxx.xxx
*.localtunnel   IN      CNAME   localtunnel.example.com.
```

![](https://i.imgur.com/rdEqcpo.png)

> 如果沒有自己的 Domain，非常推薦可以去買一個，然後交給 CloudFlare 代管，拿來架設自己的部落格，或是開發時都可以拿來用。

接下來就透過 SSH 連線到主機中：

![](https://i.imgur.com/aqeOnGs.jpg)

接下來安裝 docker 和 docker-compose，如果已經安裝過就可以跳過：

```bash
sudo apt update && sudo apt upgrade -y
curl -sSL get.docker.com | sudo sh
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -sL https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d'"' -f 4)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

接下來把我建立好的 docker-compose 環境抓下來，並且複製設定檔：

```bash
git clone https://github.com/taichunmin/docker-localtunnel-server.git
cd docker-localtunnel-server
```

接下來就是要去申請 letsencrypt 憑證：

```bash
cd dns-cloudflare
cp docker-compose.yml.example docker-compose.yml
cp cloudflare.ini.example cloudflare.ini
chown root:root cloudflare.ini
chmod 600 cloudflare.ini
```

修改 `docker-compose.yml`，改成自己的 E-mail 和自己的 domain：

![](https://i.imgur.com/Tg3xBeT.jpg)

修改 `cloudflare.ini` 設定 cloudflare 的帳號及金鑰：

![](https://i.imgur.com/9iqGC0c.jpg)

![](https://i.imgur.com/HXYnpsp.png)

> 如果 dns 不是設定在 cloudflare 可以採用手動驗證 [(文件請點此)](https://certbot.eff.org/docs/using.html#manual)。

設定檔都設定好以後，就可以繼續取得憑證的步驟：

```bash
sudo docker-compose run --rm certbot
# 成功取得後，回到上層目錄
cd ..
```

接下來就是要設定 localtunnel 的伺服器了，先複製一下設定檔：

```bash
cp docker-compose.yml.example docker-compose.yml
```

然後修改 `docker-compose.yml`

![](https://i.imgur.com/23TWbEw.png)

修改完成以後，就可以開啟伺服器了：

```bash
sudo docker-compose up -d && sudo docker-compose logs -f
# 可以透過 Ctrl+C 離開查看 log 模式
```

## 將本地端的伺服器加上 https

接下來要來安裝本地端的 localtunnel 指令 [(安裝文件在此)](https://github.com/localtunnel/localtunnel)。

安裝好後，就可以在本地端透過這個指令建立連線：

```bash
lt --port 3000 --print-requests --subdomain taichunmin --host https://example.com
```

如果你在執行這個指令後看到這個就代表你連線成功啦：

```
your url is: http://taichunmin.example.com
```

由於這個指令不會結束，所以你可以搭配 tmux：

```bash
tmux
lt --port 3000 --print-requests --subdomain taichunmin --host https://example.com
# 輸入 Ctrl+b, d 離開 tmux
```

如果覺得指令太長，我還會在 node 的 package.json 中加入指令快捷鍵：

```json
{
  "scripts": {
    "localtunnel": "lt --port 3000 --print-requests --subdomain taichunmin --host https://example.com"
  }
}
```

設定完以後，就可以用 `yarn run localtunnel` 來執行囉，這個指令會跟著專案，所以在 LINE Developers 中的 webhook 就不用一直修改囉！

如果需要更多 localtunnel 的參數說明[請點此](https://github.com/localtunnel/server)。

## 更新 letsencrypt 憑證

letsencrypt 的憑證有效期限只有三個月，如果你收到 letsencrypt 的通知信，記得去更新一下憑證：

![](https://i.imgur.com/lgFD6Vt.jpg)

```bash
cd docker-localtunnel-server
sudo docker-compose down
cd dns-cloudflare
sudo docker-compose run --rm certbot
cd ..
sudo docker-compose up -d && sudo docker-compose logs -f
# 可以透過 Ctrl+C 離開查看 log 模式
```

## 使用心得分享

自從我開始換用 localtunnel 到現在，已經超過兩個禮拜了，目前用起來的心得是，雖然有一些小 bug 存在，例如說斷線後有時候沒辦法用上次的 subdomain，但是優點是，開源專案能看得到裡面的程式碼，可以找時間好好看裡面是怎麼實做的，說不定有機會可以研究怎麼把 bug 修正，並且加上一些新的功能。

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License。
:::
