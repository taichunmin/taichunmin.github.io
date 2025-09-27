---
title: "PHP preg_match 分析網址"
date: 2011-10-14T00:25:00+08
tags:
  - php
  - preg
  - url
---
# PHP preg_match 分析網址

資料來源：<http://php.net/manual/en/function.preg-match.php>

```php
<?php
$pattern = '`^((?P<protocol>[^:/?#]+):)?(//(?P<host>[^/?#]*))?(?P<path>[^?#]*)(\?(?P<query>[^#]*))?(#(?P<label>.*))?`i';
$subject = 'http://example.com/defg/abcd/index.php?m=1&b=2#taichunmin';
preg_match($pattern,$subject,$match);
//可取用的資料如下
echo 'protocol = '  .$match['protocol']. '<br />';
echo 'host = '      .$match['host'    ]. '<br />';
echo 'path = '      .$match['path'    ]. '<br />';
echo 'query = '     .$match['query'   ]. '<br />';
echo 'label = '     .$match['label'   ]. '<br />';
?>
```
