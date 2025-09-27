---
title: "PHP curl 使用 https 遇到 SSL certificate problem"
date: 2011-09-25T01:28:00+08
tags:
  - php
---
# PHP curl 使用 https 遇到 SSL certificate problem

問題：

在 PHP 的 curl 中抓取 https 的時候，遇到底下的錯誤訊息：

SSL certificate problem, verify that the CA cert is OK. 

解法：

```php
<?php
curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,0);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,0);
```

這可用來跳過驗證網站。

最近在寫 gCalMsg，一直遇到 curl 抓取不到 https 網頁的問題，

使用了 `curl_error` 之後 就輸出了上面的訊息

Google 一下就有答案了XD

資料來源：

<http://www.bsdlover.cn/html/43/n-5943.html>

<http://www.php.net/manual/en/function.curl-setopt.php>
