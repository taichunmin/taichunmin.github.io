---
title: "Windows7 找不到 localhost 的問題"
date: 2011-08-06T18:08:00+08
tags:
  - windows
---
# Windows7 找不到 localhost 的問題

會發現這個問題

是我在換了新筆電(Windows7)了以後

想安裝Appserv時卻發生了連線不到本機資料庫的問題

連phpMyAdmin也都沒有辦法使用

後來去查詢了Google大神之後

才發現了原來是 Windows 7 內部設定的問題...

要把 `C:\WINDOWS\system32\drivers\etc\hosts` 內的

```
# 127.0.0.1       localhost 
```

前面的#字號刪除之後再存檔

這樣的話就能夠正常的連線到 localhost 了~
