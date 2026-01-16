---
date: '2026-01-02T00:00:00+0800'
title: 針對 Mifare Classic 的攻擊手法介紹
description: 
image: https://i.imgur.com/pJt0MXN.png
tags:
  - ithelp-ironman
  - NFC
  - RFID
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
draft: true
---

# 針對 Mifare Classic 的攻擊手法介紹

> 本文章的內容僅限學術及研究用途，請勿進行任何違法行為，否則後果自負。

通常卡片在製造的時候，會被設定一組預設的卡片金鑰。如果門禁系統有修改卡片的部分金鑰，就稱為半加密卡；如果有修改全部的金鑰，就稱為全加密卡。前面均民示範的幾個 M1 卡的範例程式碼，都是假設卡片是在未加密的狀態，但如果想要讀取半加密卡或全加密卡的內容，就要先想辦法取得卡片金鑰。

M1 卡使用了一個名為 CRYPTO-1 的加密演算法，會把讀卡機與卡片之間的通訊資料進行加密。但在過去的幾年中，已經發現了多種針對 M1 卡的攻擊方法。這些攻擊利用了 CRYPTO-1 的設計缺陷，可以在短時間內恢復金鑰，並破解取得卡片中儲存的資料。

## 字典檔攻擊

這個攻擊手法主要就是蒐集一些常見的卡片金鑰，然後逐一嘗試。以下是 M1 卡常見的字典檔：

- [ikarus23/MifareClassicTool](https://github.com/ikarus23/MifareClassicTool/tree/master/Mifare%20Classic%20Tool/app/src/main/assets/key-files)
- [RfidResearchGroup/proxmark3](https://github.com/RfidResearchGroup/proxmark3/blob/master/client/dictionaries/mfc_default_keys.dic)

## Darkside Attack

這個攻擊手法是利用了兩個漏洞：NACK 洩漏、以及能簡單獲取重複的卡片初始隨機數的漏洞。它允許在沒有已知金鑰的情況下破解第一個金鑰。但因為速度較慢，一旦找到第一個金鑰，最好使用其他的攻擊手法（例如：Nested）來破解其他的金鑰。

## MFKey32

這種攻擊手法是透過模擬卡片，並讓讀卡機使用金鑰進行認證至少 2 次。認證過程中模擬卡會傳送卡片挑戰，並記錄讀卡機所傳送的回應。由於卡片挑戰是已知的，所以可以計算 keystream 並還原金鑰。

> 名詞解釋：
> - keystream：Crypto-1 協定在資料加解密時，並不是直接使用卡片的金鑰，而是透過特定的公式將卡片金鑰衍生計算出 keystream，然後再與資料進行 XOR 運算，並且在每處理一個位元後就會透過該公式計算下一個 keystream。

## MFKey64

這種攻擊手法是透過攔截讀卡機與卡片之間的通訊資料，然後從中計算出 keystream，然後再透過 keystream 還原金鑰。

## [Relay Attack](https://en.wikipedia.org/wiki/Relay_attack)

這種攻擊手法其實就是[中間人攻擊 (MITM)](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)與[重放攻擊](https://en.wikipedia.org/wiki/Replay_attack)，主要是將兩個裝置連接起來，並讓一個裝置 A 模擬成卡片與真正的讀卡機溝通，然後讓另一個裝置 B 模擬成讀卡機與真正的卡片溝通。這樣除了可以攔截中間通訊的內容之外，還可以重播、篡改通訊資料。這個手法通常都會需要自行修改程式碼，均民對此沒有深入研究。

## Nested Attack

這個攻擊手法需有任意已知金鑰。有了已知金鑰才能使用 Crypto-1 的 nested AUTH 並取得卡片所回傳的加密隨機數。它利用了兩個漏洞：可預測的卡片隨機數、以及在加密校驗位元 (parity bits) 時重複使用部分 keystream 的漏洞。通過重複攻擊 2 或 3 次，可以恢復足夠的 keystream 來還原金鑰。

## Hardnested Attack (需有任意已知金鑰)

這個攻擊手法只利用了在傳輸加密數據的校驗位元時重複使用部分 keystream 的漏洞。除了需要一個已知的金鑰之外，由於卡片挑戰的隨機數不容易發生重複，所以大約需要累計 1600~2200 次的資料，才能夠還原加密過的卡片挑戰，非常耗時。其餘部分就跟 Nested 雷同。

## Static Nested Attack (需有任意已知金鑰)

這種攻擊手法是針對部分卡片在驗證的過程中，直接使用一組特定的值來當作卡片挑戰。除了需要一個已知的金鑰之外，通常還會需要先蒐集卡片所使用的卡片挑戰，再使用跟 Nested 類似的手法來還原加密過的卡片挑戰。最近被發現如果先驗證兩次已知的金鑰之後，隨即進行另一個區段的驗證，會更容易還原加密過的卡片挑戰。

- 相關論文 [MIFARE Classic: exposing the static encrypted nonce variant](https://eprint.iacr.org/2024/1275)

## Static Encrypt Nested Attack

這是 2024 年才被發現的攻擊手法，專門針對 Fudan 廠商所出產的卡片。這種卡片在 Nested 攻擊過程中，會使用一個特定的公式產生卡片挑戰，所以除了 Hardnested 手法之外，其他的 Nested 攻擊手法都會因為未知的卡片挑戰而無法使用。但這種卡有許多後門，其中有一個甚至存在幾十年以上，所以可以利用這些後門來加速卡片的破解。

- 相關論文 [MIFARE Classic: exposing the static encrypted nonce variant](https://eprint.iacr.org/2024/1275)

## 相關連結

如果你在看完文章後，對這個主題有興趣或是有任何問題，都歡迎隨時透過 [Facebook](https://www.facebook.com/taichunmin) 找我聊聊！

- [Dismantling MIFARE Classic](http://proxmark.org/files/Documents/13.56%20MHz%20-%20MIFARE%20Classic/Dismantling.MIFARE.Classic-ESORICS.2008.pdf)
