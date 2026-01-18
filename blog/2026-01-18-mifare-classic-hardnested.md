---
date: '2026-01-17T00:00:00+0800'
title: MIFARE Classic 的 hardnested 攻擊論文
description: 只要幾分鐘就能破解強化版的 MIFARE Classic 卡片！？想知道這個攻擊手法的原理嗎？快來看看這篇論文吧！
image: https://i.imgur.com/lfDZBzK.png
tags:
  - NFC
  - RFID
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 630
---

# 對強化版 MIFARE Classic 智慧卡的唯密文密碼分析

::: warning
本文章的內容僅限學術及研究用途，本文讀者請勿進行任何違法行為，否則後果自負。
:::

::: info
本文節錄自論文 [Ciphertext-only Cryptanalysis on Hardened Mifare Classic Cards](https://dl.acm.org/doi/10.1145/2810103.2813641)，透過 [microsoft/markitdown](https://github.com/microsoft/markitdown) 轉換成 Markdown 格式，然後使用 Gemini 2.5 翻譯成繁體中文，若有任何錯誤或缺漏，請以原始論文為準。
:::

![](https://i.imgur.com/lfDZBzK.png)

Carlo Meijer
荷蘭拉德堡德大學
克斯柯霍夫研究所
carlo@youcontent.nl

Roel Verdult
荷蘭拉德堡德大學
計算與資訊科學研究所
rverdult@cs.ru.nl

## 摘要

儘管遭受一系列攻擊，MIFARE Classic 仍然是全球市場上部署最廣泛的非接觸式智慧卡。Classic 使用專有的串流加密演算法 crypto1 來提供卡片與讀卡機之間的機密性和相互驗證。然而，一旦該加密演算法被逆向工程，許多嚴重的漏洞便浮出水面。學界提出了許多利用這些漏洞的被動和主動攻擊。最嚴重的金鑰恢復攻擊僅需與卡片進行無線互動。系統整合商認為這種純卡攻擊是對其基於 MIFARE Classic 的系統最嚴重的威脅之一，因為它允許攻擊者避開通常安裝在門禁入口或大眾運輸閘門的攝影機偵測。然而，文獻中提出的所有純卡攻擊都依賴於實作上的錯誤，這些錯誤可以輕易地被修補，而不會破壞與現有讀卡機基礎設施的向下相容性。

因此，許多製造商和系統整合商開始部署「已修復」的 MIFARE Classic 卡，這些卡對此類漏洞具有彈性。然而，對於像 crypto1 這樣密碼學上不安全的加密演算法來說，這些對策只是治標不治本。為了支持這一論點，我們提出了一種新穎的唯密文純卡攻擊，它利用了驗證協定中一個關鍵且強制性的步驟，並且完全依賴於 crypto1 加密演算法的密碼學弱點。因此，為了避免這種攻擊，所有卡片和讀卡機都應升級以支援替代的驗證協定，這將不可避免地破壞其向下相容性。我們的攻擊僅需與卡片進行幾分鐘的無線互動，在不受控制的環境中，並且可以使用消費級硬體執行。所獲得的資訊使攻擊者能夠將計算複雜度從 2^48 降低到大約 2^30，這使我們能夠在單核心的消費級筆記型電腦上，約 5 分鐘內從強化的 MIFARE Classic 卡中實際恢復秘密金鑰。

允許出於個人或課堂使用目的，免費製作本作品全部或部分內容的數位或紙本副本，前提是副本不得為營利或商業利益而製作或散發，並且副本必須帶有此聲明和首頁上的完整引文。對於非作者擁有的本作品元件的版權必須予以尊重。允許在註明出處的情況下進行摘要。若要以其他方式複製、重新發行、張貼在伺服器上或轉發到列表，則需要事先獲得特定許可和/或支付費用。請向 Permissions@acm.org 索取許可。
CCS’15, October 12–16, 2015, Denver, Colorado, USA.

版權由所有者/作者持有。出版權許可給 ACM。
ACM 978-1-4503-3832-5/15/10 ...$15.00.
DOI: http://dx.doi.org/10.1145/2810103.2813641

分類與主題描述符：E.3 [資料加密]：密碼破解

通用術語：安全

關鍵字：串流加密；密碼分析；安全；RFID。

## 1. 簡介

MIFARE Classic 卡在非接觸式智慧卡市場中佔有相當大的份額。除了簡單的身份識別外，此類卡還提供適量的記憶體和加密功能，使其適用於門禁控制和收費系統等應用。

MIFARE Classic 卡仍在許多大眾運輸支付系統中廣泛部署。此類系統的例子包括倫敦的 [Oyster Card](http://oyster.tfl.gov.uk)、波士頓的 [Charlie Card](http://www.mbta.com/fares_and_passes/charlie)、台灣的 [EasyCard](http://www.easycard.com.tw) 以及荷蘭的 [OV-chipkaart](http://wwww.ov-chipkaart.nl)。除了大眾運輸，它也仍用於非接觸式門禁控制系統，並整合到許多辦公大樓中，甚至包括部會、銀行、監獄和核電廠等高安全性設施。

MIFARE Classic 卡符合 ISO/IEC 14443-A 標準 [ISO01] 的第 1 至 3 部分，該標準規定了物理特性、射頻介面和防碰撞協定。然而，標準的第 4 部分（描述傳輸協定）並未實施。取而代之的是，它使用自己的安全通訊層。在這一層中，MIFARE Classic 卡使用名為 crypto1 的專有串流加密演算法進行加密通訊，以提供資料機密性以及卡片與讀卡機之間的相互驗證。製造商恩智浦半導體（NXP Semiconductors）從未公開過該加密演算法的細節，也未公開 MIFARE Classic 中使用的通訊層。然而，兩者都已成功被逆向工程，其工作原理已在文獻 [NESP08, GKGM+08] 中發表。

在逆向工程後不久，就發現了嚴重的漏洞，並出現了幾種被證明在實務上可行的攻擊。例如，[GKGM+08] 和 [KGHG08] 中描述的攻擊使攻擊者能夠恢復通訊期間使用的加密金鑰，並操縱卡片上的相關資料區段。這使得攻擊者能夠（部分）複製卡片。然而，上述所有攻擊都要求攻擊者能夠存取合法的讀卡機，或竊聽真實的通訊。不久之後，學界提出了幾種攻擊 [GRVS09, Cou09, CHC+14]，展示了如何僅透過與卡片進行無線互動來恢復所有加密金鑰，從而完整複製一張卡片。這些純卡攻擊是攻擊者破壞基於 MIFARE Classic 的系統安全性的最有效方法。由於犯罪者可以在一個孤立、不受控制的環境中執行此類攻擊，因此它們在最低的被偵測可能性下造成了最大的損害。有趣的是，文獻中提出的所有純卡攻擊都依賴於非密碼學相關的實作缺陷。此外，這些實作問題可以透過發行替換卡來緩解，其中此類缺陷已被移除，甚至不會破壞與原始 MIFARE Classic 卡的向下相容性。然而，這些替換卡並未解決實際問題，即底層密碼演算法和驗證協定的不安全性。

表 1.1 提供了 MIFARE Classic 相容卡的不完全概覽，以及對原始 MIFARE Classic 卡在安全性方面所做的修訂。

> 表 1.1：MIFARE Classic 相容卡
> a：具有正常的偽隨機數生成器
> b：驗證失敗後不發送加密的錯誤代碼

| a | b | 卡片 |
| - | - | ---- |
| × | × | MIFARE Classic |
| ✓ | ✓ | MIFARE Classic EV1 |
| ✓ | ✓ | MIFARE Plus in security level 1 |
| ✓ | ✓ | MIFARE SmartMX in Classic mode |
| ✓ | ✓ | NFC controllers with MIFARE Classic card emulation |
| ✓ | ✓ | 第三方授權產品，如 Infineon SLE-66 |
| × | × | MIFARE Classic 複製卡，如 Fudan FM11RF08 |
| ✓ | × | 較新的複製卡，用於台灣 EasyCard 2.0 |

### 貢獻

在本文中，我們提出了一種針對 MIFARE Classic 卡的唯密文攻擊，僅需使用消費級硬體與卡片進行幾分鐘的無線互動。我們已經在實務中完整實作並測試了我們的攻擊，並在幾分鐘內從各種強化版 MIFARE Classic 卡中恢復了秘密金鑰。為了更準確地估計平均執行時間，本文提供了基於模擬的理論邊界和效能分析。

本文提出的攻擊要求攻擊者預先知道至少一個金鑰。然而，在實務中，情況通常如此。第一個金鑰可以透過竊聽一次成功的驗證或兩次失敗的驗證嘗試來獲取，詳情請參閱 [VKGG12, GKGV12, GKGM+08]。然而，在許多情況下，這並非必要，因為大多數已部署的系統會為未使用的磁區保留預設金鑰。此外，幾乎所有使用金鑰分散的已部署系統，都至少會留下一個磁區金鑰未分散，即用於儲存分散資訊。而且，製造商給系統整合商的指南 [MAD07] 特別推薦這樣做。

### 概覽

本文的組織結構如下。第 2 節廣泛回顧了與攻擊串流加密演算法相關的文獻，以及更密切相關的攻擊 MIFARE Classic 密碼系統的論文。第 3 節介紹了 MIFARE Classic 卡使用的記憶體佈局、加密演算法描述和驗證協定。第 4 節探討了 MIFARE Classic 密碼系統的漏洞。接著，第 5 節提出了一種攻擊該加密演算法的新方法，隨後在第 6 節分析了該攻擊的效能。最後，第 7 節總結了該攻擊及其對實務的影響。

## 2. 相關研究

在本節中，我們首先探討類似的一般攻擊技術，然後重點介紹文獻中提出的攻擊 MIFARE Classic 卡的不同方法。對於每種先前提出的攻擊，我們都分析了其重要性和相應的實際影響。

### 2.1 通用串流加密攻擊

在過去幾十年中，主要有三種技術被用來攻擊基於 LFSR 的串流加密，例如 MIFARE Classic 卡中所使用的那種。首先，如果加密演算法沒有使用其完整的內部狀態來計算金鑰流位元，那麼就可以發動「猜測與確定攻擊」（guess-and-determine attack），儘管文獻中有幾個眾所周知的歷史建議 [Kuh88, And91, Gol96]。除了 MIFARE Classic 密碼系統外，許多專有的基於 LFSR 的串流加密 [Gol97, DHW+12, VGB12] 都缺乏此特性，因此容易受到部分和增量的內部狀態猜測攻擊。其次是「關聯攻擊」（correlation attack），最初由 Siegenthaler [Sie84, Sie85] 提出，後來被其他人改進 [MS88, And95, CS91, CCCS92, JJ00, CJM02]。它利用了內部狀態位元與金鑰流之間的關係弱點。MIFARE Classic 密碼系統的篩選函數使用的一些輸入位元比其他位元更具影響力。這使得可以發動類似的關聯攻擊。最後，最近，學界提出了針對一般串流加密的各種「代數攻擊」（algebraic attacks） [CP02, AK03, FJ03, CM03]。線性布林函數的一個特性是可以推遲評估。在密碼攻擊期間形式化的計算問題可以寫成布林方程組 [TT80]。與直接計算結果不同，這些方程的組合可以透過高斯消去法等眾所周知的技術來求解 [Hil29, Mul56, Mar57, Str69]。由於篩選函數輸入索引的選擇具有規律性，MIFARE Classic 密碼系統特別容易受到這些攻擊。

### 2.2 對 MIFARE Classic 的攻擊

**金鑰流恢復攻擊** 第一次對 MIFARE Classic 的實際攻擊是在 [KGHG08] 中進行的。它恢復了讀卡機和卡片之間交易中使用的金鑰流。由於偽隨機數生成器（PRNG）較弱，所產生的金鑰流可以保持不變，並透過可塑性攻擊（malleability attack）重複使用。此類攻擊不需要了解秘密金鑰和加密演算法。

**合法讀卡機攻擊** 在第一次攻擊後不久，crypto1 的內部運作原理被逆向工程。線性回饋移位暫存器（LFSR）的資訊可在 [NESP08] 中找到，而非線性篩選函數和驗證協定則顯示在 [GKGM+08] 中。後者提出了一種嚴重的攻擊，利用了篩選函數中的弱點，使攻擊者能夠極其有效地反轉篩選函數。這使得攻擊者能夠在普通硬體上，於幾分之一秒內從單一捕獲的驗證過程中恢復秘密金鑰。

**純卡攻擊** Garcia、van Rossum、Verdult 和 Wichers Schreur 在 [GRVS09] 中介紹了幾種僅需與卡片互動的攻擊。第一種攻擊針對單一驗證，需要預先計算表格。知道一個磁區金鑰則可以進行他們的第二種攻擊，該攻擊針對巢狀驗證，速度極快，且無需預先計算表格。針對單一驗證的攻擊由 Courtois [Cou09] 改進。此攻擊不需要任何預先計算，並且比 Garcia 等人提出的攻擊更快。

最近，Chiu、Hong、Chou、Ding、Yang 和 Cheng [CHC+14] 提出了一種純卡攻擊，它不依賴於弱隨機數生成器，而是利用了另一個實作錯誤——加密的錯誤碼回應。不幸的是，這種攻擊需要大量線上生成的軌跡，這大大增加了攻擊的總執行時間。事實上，文獻中提出的所有純卡攻擊都依賴於弱隨機數生成器，或透過已知的錯誤訊息洩漏金鑰流，或兩者兼具。對抗這些攻擊的一個直接解決方案是，用不包含任何已知實作錯誤的修改版卡片替換易受攻擊的卡片，但這些卡片仍與 MIFARE Classic 協定完全相容。在本文中，我們將已修復的修改版卡片稱為「強化版 MIFARE Classic 卡」，表 1.1 中給出了此類卡片的範例。

## 3. 背景知識

MIFARE Classic 卡是 90 年代設計的第一代 RFID 標籤之一。從那時起，設計專有的 RFID 產品已成為業界的傳統。此類專有設計通常包含自訂的調變/編碼方案、封包、校驗和、指令集，在某些情況下甚至還包含自訂的密碼演算法和驗證協定。

設計自訂的 RFID 通訊方式並沒有太大問題。它使業界能夠優化產品並提升特定應用的效能。然而，這個論點對於專有和秘密的密碼系統來說肯定不成立。在沒有科學界的回饋下，設計安全的演算法被證明是一項艱鉅的任務 [Ker83, JS97, SN97, Ver15]。

### 3.1 MIFARE Classic 卡

MIFARE Classic 卡是一個有趣的例子，它除了實作了自訂的通訊協定外，還實作了專有的加密演算法和驗證協定。MIFARE Classic 卡的資料手冊 [PHI98] 表明其安全特性符合標準化的驗證協定 [ISO99]。然而，在實務中，其安全特性明顯弱於所宣稱的。

### 3.2 記憶體結構

![](https://i.imgur.com/vnrEfCa.jpeg)

MIFARE Classic 卡本質上是一個具有加密無線功能的記憶體晶片。記憶體被劃分為多個磁區，每個磁區又被劃分為多個區塊，每個區塊為 16 位元組。每個磁區的最後一個區塊是磁區尾塊，儲存著兩個秘密金鑰和該磁區的存取條件。

為了對特定區塊執行操作，讀卡機必須首先對包含該區塊的磁區進行驗證。存取條件分別為兩個金鑰決定了讀卡機允許執行的操作。

### 3.3 符號表示

數學符號定義如下：

令 F2 = {0, 1} 為二元體（或布林集合）。向量空間 Fn2 表示長度為 n 的位元字串。給定兩個位元字串 x 和 y，xy 表示它們的串接。

給定位元字串 x ∈ Fn2，xi 表示 x 的第 i 個位元，其中 0 ≤ i < n。此外，x[i,j] 表示 x 從索引 i 開始到索引 j 結束的子字串（包含兩端）。因此，表示子字串 xixi+1 . . . xj。例如，給定位元字串 x = 0x010203 ∈ F24_2，則位元組 x[16,23] = 0x03，且位元 x22 = x23 = 1。

符號 ǫ 表示空位元字串，⊕ 表示位元互斥或（XOR），而 x 表示 x 的位元補數。大的 XOR 符號表示多個位元的內部 XOR，即重複的邏輯互斥或。例如 ⊕3_i=0 xi = x0 ⊕ x1 ⊕ x2 ⊕ x3。

### 3.4 加密演算法與標籤隨機數

加密演算法的核心是一個 LFSR，它在每一步都會將其內容向左移動一個位置。最高有效位隨後被丟棄，一個新的位元由回饋函數產生，並在驗證階段由輸入產生。除了被移位外，所有其他位元保持不變。

為了增加可讀性，我們採用與 [GRVS09] 中相同的符號表示法，並遵循其形式化。具體來說，crypto1 的加密回饋、篩選和標籤隨機數相關函數在定義 3.1-3.4 中指定。

![](https://i.imgur.com/6wZ0aUm.jpeg)

![](https://i.imgur.com/SS92LgQ.jpeg)

因為 f (x0x1 . . . x47) 僅取決於 x9, x11, . . . , x47，2 → F2，我們將重載符號，將 f 視為函數 F20，將 f (x0x1 . . . x47) 寫為 f (x9, x11, . . . , x47)。

![](https://i.imgur.com/oXnHPod.jpeg)

![](https://i.imgur.com/x2efda9.jpeg)

![](https://i.imgur.com/eOESHpA.jpeg)

> 圖 3.1：crypto1 串流加密演算法的結構

### 3.5 驗證協定與初始化

驗證協定在 [GKGM+08] 中被逆向工程。在防碰撞階段，標籤被選中並將其 UID u 發送給讀卡機。然後，讀卡機要求對特定記憶體區塊 b 進行驗證。因此，標籤發送一個挑戰 nT。從此時起，通訊被加密，即與金鑰流進行 XOR 運算。讀卡機以其自己的挑戰 nR 回應，後面跟著對標籤挑戰的答案 aR = suc64(nT)。驗證以標籤答案 aT = suc96(nR) 結束。此時，讀卡機和標籤都已通過驗證。

![](https://i.imgur.com/QgGSC4g.jpeg)

在驗證協定期間，串流加密的內部狀態被初始化。最初，狀態設定為磁區金鑰。然後，輸入 nT ⊕ u 並相應地應用回饋。隨後，輸入 nR 並應用回饋。由於通訊從 nR 開始加密，nR 的後續位元會受到 nR 的前續位元的影響。有關初始化過程的更正式描述，請參閱定義 3.5。

我們定義了 LFSR-stream，它讓我們可以方便地將內部狀態作為一個整體來處理，並在任何時間點處理單獨的位元。下面我們定義了 LFSR-stream a0a1... 和金鑰流 ks0ks1...。我們廣泛採用與 [GRVS09] 中相同的符號表示法，定義也源自該文獻。在本文中，我們將大量使用這些定義。

![](https://i.imgur.com/ghdevqI.jpeg)

此外，我們將時間 i 的金鑰流位元 ksi ∈ F2 定義為

![](https://i.imgur.com/PGh0fn5.jpeg)

我們用 {·} 表示加密，並將 {nRi }, {aRi } ∈ F2 定義為

![](https://i.imgur.com/meGMbl4.jpeg)

請注意，ai、αi、ksi、{nRi} 和 {aRi} 形式上都是 k、nT、u 和 nR 的函數。為了避免顯式寫出例如 ai(k, nT, u, nR)，我們只寫 ai，其中 k、nT、u 和 nR 在上下文中是明確的。

**巢狀驗證** 當讀卡機已針對某個磁區進行驗證並因此以加密方式通訊時，後續對另一個磁區的驗證請求也會被加密發送。此時，加密演算法的內部狀態會被設定為新磁區對應的金鑰。此外，驗證協定略有不同，因為標籤挑戰 nT 也會被加密發送，即 {nT}。具體來說，初始化過程與定義 3.5 類似，只是在將 {nT} 的位元載入內部狀態之前會先解密，如定義 3.6 所示。我們將此程序稱為巢狀驗證。本文提出的攻擊僅涉及巢狀驗證。

定義 3.6。

在定義 3.5 的情況下，我們將 {nTi } ∈ F2 定義為 {nTi } := nTi ⊕ ksi，對所有 i ∈ [0, 31]。

## 4. 已知漏洞

在本節中，我們重點介紹科學文獻中描述的各種 MIFARE Classic 漏洞。

### 4.1 金鑰長度過短

48 位元的金鑰長度太短，無法在合理時間內成功抵禦暴力攻擊。最初，這由通訊和驗證程序引入的延遲所彌補。每次嘗試大約需要 6 毫秒。因此，對單張卡片的單一磁區進行線上攻擊，搜尋所有 2^48 個可能的金鑰，將需要超過 4.4 萬年。然而，當 crypto1 演算法被揭露後，可以發動離線暴力攻擊，消除了與卡片通訊造成的延遲。早在 1996 年，就強烈建議不要使用 56 位元金鑰的對稱密碼系統 [BDR+96]。Nohl 和 Plötz 在 2007 年 12 月 [NP07] 指出，一台 100 美元的金鑰破解器大約需要 1 週時間才能找到一個金鑰。如果用空間換取時間，甚至可以更快完成。

### 4.2 可預測的隨機數

眾所周知，適當的偽隨機數生成器對於密碼協定提供足夠的安全性至關重要。MIFARE Classic 使用的 32 位元隨機數是由一個 16 位元的 LFSR 生成的，這意味著隨機數的熵只有 16 位元，這顯然是不夠的。鑑於其結構，隨機數序列每 2^16 - 1 個週期重複一次。最重要的是，每當卡片上電時，LFSR 都會重置為一個已知的狀態。因此，如果攻擊者仔細地保持卡片上電和請求隨機數之間的時間恆定，隨機數將會是固定的。這基本上消除了卡片在驗證過程中引入的所有隨機性。

這個弱點在許多已知的攻擊中被利用。此外，除了 Chiu 等人 [CHC+14] 描述的攻擊外，文獻中提出的所有純卡攻擊都利用了這個特定的實作錯誤。

本文提出的攻擊不利用此漏洞，並且適用於使用正常 PRNG 的強化版 MIFARE Classic 卡。

### 4.3 巢狀驗證

一旦知道單一磁區的單一金鑰，攻擊者就可以對該磁區進行驗證，並在與標籤進行（加密）通訊時，發送另一個針對不同磁區和/或金鑰的驗證請求。當此驗證命令被處理後，內部加密狀態會設定為新磁區的金鑰，並且第 3.5 節中描述的驗證協定會再次開始。不過，這一次，由標籤生成的挑戰也會被加密發送。

如果卡片存在上述的弱偽隨機數生成器漏洞，從而允許攻擊者預測隨機數，那麼巢狀驗證可用於僅透過與卡片進行無線互動來恢復 32 位元的金鑰流。這種現象在 [GRVS09] 的其中一個攻擊中被利用，該攻擊被稱為巢狀攻擊。

本文提出的攻擊依賴於巢狀驗證，因為，如果我們假設我們面對的是一張強化卡並且無法存取合法的讀卡機，那麼這是唯一洩漏秘密金鑰資訊的管道。

### 4.4 同位位元

MIFARE Classic 對其傳輸的每個位元組都發送一個同位位元。與 ISO/IEC 14443-A 標準 [ISO01] 相反，其資料連結層和通訊層是混合的。它不是對透過無線電傳輸的位元（即密文）計算同位位元，而是對明文計算同位位元。最重要的是，同位位元會使用與加密下一個明文位元相同的金鑰流位元進行加密。圖 4.1 說明了此特性。

![](https://i.imgur.com/MJlEycF.jpeg)

> 圖 4.1：同位位元的加密

鑑於此特性，攻擊者可以僅透過觀察密文來獲取有關明文的資訊。因此，這已經破壞了加密方案的機密性。例如：假設我們觀察到加密的同位位元 {p0}，它是根據第一個隨機數位元組 nT[0,7] 計算的，以及 {nT8}，即第二個加密隨機數位元組的第一個位元。由於兩者都使用相同的金鑰流位元 ks8 進行加密（XOR 運算），我們可以推斷出明文同位位元 p0 是否等於 nT8。

在本研究中，我們只關注 {nT} 的同位位元。ISO 標準規定了奇同位，因此在下面的定義中有「⊕1」。

![](https://i.imgur.com/APoe3CC.jpeg)

在強化卡中，若不與合法讀卡機通訊，唯一洩漏秘密金鑰資訊的方式就是透過同位位元。因此，本文提出的攻擊建立在此漏洞之上。

### 4.5 透過錯誤訊息洩漏金鑰流

在驗證協定執行期間，卡片在執行任何其他操作之前，總是先檢查同位位元。因此，在驗證協定期間，當卡片收到 {nR} 和 {aR} 時，如果八個同位位元中至少有一個是錯誤的，卡片將不回應。如果所有八個同位位元都正確，但答案 aR 是錯誤的，卡片會回覆 4 位元的錯誤碼 0x5，表示驗證失敗。即使讀卡機尚未成功驗證自己，因此不能假定能夠正確解密，該錯誤碼仍以加密方式發送。

從這個加密的錯誤碼中，洩漏了 4 位元的金鑰流，可以透過將加密的錯誤碼與其明文值進行 XOR 運算來獲得。洩漏 4 位元的金鑰流看似不是一個嚴重問題。然而，對於幾種純卡金鑰恢復攻擊 [GRVS09, Cou09, CHC+14] 來說，這種洩漏是至關重要的成分。

這個弱點可以透過發行不發送驗證錯誤碼的卡片來緩解。這不會破壞與 MIFARE Classic 協定的相容性，因為如前所述，讀卡機反正也無法解密它。

### 4.6 LFSR 回溯

最初，加密演算法的內部狀態設定為秘密金鑰。在驗證和加密過程中，狀態會被操縱。然而，給定任何時間點的內部狀態，以及輸入到 LFSR 的資料 u、nT 和 {nR}，可以確定性地計算出先前的狀態。因此，攻擊者只需獲取任何時間點的內部狀態即可。然後可以將 LFSR 狀態回溯到時間 0，此時它持有秘密金鑰。許多攻擊（如果不是全部的話）都依賴於這個弱點，包括本文提出的攻擊。Garcia 等人 [GKGM+08] 首次指出了 MIFARE Classic 中存在此漏洞。

### 4.7 篩選函數的奇數輸入

產生金鑰流位元的非線性篩選函數 f，其從 LFSR 獲取的輸入專門使用奇數位置的位元，即 a9、a11、a13、...、a47（參見圖 3.1）。它們如此均勻地分佈這一事實可以被利用。給定一部分金鑰流，可以用來產生金鑰流偶數和奇數位元的 LFSR 位元可以分開產生。透過將回饋也分成兩部分，這些偶數和奇數狀態可以有效地組合起來，以準確地恢復那些產生給定金鑰流的 LFSR 狀態。這將窮舉搜尋所需的計算能力從 2^39 降低到大約 2^20 + 2^19 ≈ 2^20.58。這可以理解為「反轉」篩選函數 f。本文提出的攻擊大量利用了這個漏洞。下一節將詳細描述完整的攻擊。

## 5. 攻擊 MIFARE Classic

在本節中，我們描述了在不利用兩個主要實作錯誤的情況下發動攻擊的過程：弱偽隨機數生成器（第 4.2 節）和加密的錯誤訊息（第 4.5 節）。我們提出了一種新穎的攻擊，它完全依賴於 crypto1 加密演算法中的設計問題。因此，為了避免這種攻擊，與 MIFARE Classic 協定的向下相容性將不可避免地被破壞。

**階段 1** 我們開始使用巢狀驗證來檢索加密的隨機數 {nT}，即透過對已知金鑰的磁區進行驗證，然後對目標磁區發出驗證請求。此過程在背景中重複進行，直到金鑰被恢復。

**階段 2** 給定我們目前獲得的加密隨機數集合，我們確定 Sǫ，即加密演算法初始狀態的總和特性。此特性在 5.2 節中有詳細解釋。我們還確定 S{b}，即輸入位元組 {b} 後（即在時間 8）加密演算法狀態的總和特性，適用於所有 256 個可能的第一個輸入位元組 {b}。根據我們正確猜測 S{b} 的機率，我們選擇將位元組 {b} 納入 5.5 節中描述的差分分析。這是透過使用機率閾值來完成的。如何計算正確猜測輸入位元組 {b} 的總和特性的機率在 5.4 節中有詳細解釋。此外，我們納入所有觀察到 f (α8) != f (α8 ⊕ 1) 的輸入位元組 {b}，即所有具有篩選器翻轉特性的第一個隨機數位元組。這在 5.6 節中解釋。

接下來，給定從加密隨機數集合中確定的資訊，我們確定剩餘搜尋空間的大小。隨著收集到的加密隨機數數量增加，剩餘搜尋空間會縮小，因為更多的隨機數使我們能夠更準確地猜測總和特性並觀察篩選器翻轉特性。我們重複此資訊收集步驟，直到搜尋空間足夠小，由攻擊者主觀評估。一旦如此，我們就進入階段 3。

**階段 3** 給定目前從加密隨機數集合中確定的資訊，我們為 a[9,55] 構建一個候選列表（第 5.5 節）。我們透過在前面加上 0 和 1 將其擴展為 a[8,55]。然後，我們執行第 4.6 節中描述的 LFSR 回溯，將它們轉換為 a[0,47] 的候選者，即秘密金鑰。隨後，我們執行第 5.1 節中提出的離線暴力攻擊。金鑰並不總是能找到，因為總和特性是以高機率正確猜測的，而不是確定的。如果沒有找到金鑰，我們返回階段 2，可選擇增加機率閾值，這會導致搜尋空間增加。然而，收集更多的隨機數會增加確定性並減少候選金鑰的數量。

### 5.1 離線暴力攻擊

回顧定義 4.1，同位位元 pi 是根據明文位元組 nT[8i,8i+7] 計算的，然後與下一個金鑰流位元 ks8i+8 進行加密（XOR 運算）。這個特性可以被利用來驗證候選金鑰是否是正確的金鑰。給定透過巢狀驗證嘗試獲得的加密隨機數，攻擊者可以嘗試使用候選金鑰來「解密」該隨機數。如果候選金鑰是正確的，同位位元將會是正確的。然而，如果使用了錯誤的金鑰，同位位元正確的機率為 1/2。

一個加密的隨機數包含 4 個位元組，因此有 4 個加密的同位位元。因此，平均而言，48/4 = 12 個加密的隨機數足以唯一確定金鑰。

我們實作了這種暴力攻擊，並在一塊 NVIDIA GTX 460 GPU 上執行。從我們的實驗中，我們推斷出執行完整的 48 位元窮舉搜尋大約需要 1 個月。然而，我們的實作還有優化空間，例如位元切片（bitslicing）[Bih97]。我們假設這樣的優化至少能將攻擊效能提升四倍。

以現今的標準來看，GTX 460 被認為是低階 GPU。它有 336 個核心，運行頻率為 675 MHz。顯然，攻擊的規模與可用的平行計算能力成線性關係。截至今日，一塊 GTX 460 的價格約為 50 美元。因此，它的性價比是現有產品中最好的之一。我們為每塊 GPU 預留另外 20 美元用於驅動 GPU 的硬體（CPU、主機板、電源供應器）。因此，透過暴力攻擊在一小時內恢復單一金鑰，將需要大約 12,600 美元的硬體預算。

在 [NP07] 中發動的攻擊似乎要快得多。然而，這主要是因為它直接對金鑰流進行操作，而這裡描述的暴力攻擊則是對連續重新初始化狀態與加密的隨機數進行操作。

雖然我們沒有廣泛研究發動「時間換取空間」權衡攻擊的可能性，但表面上看來，這樣做似乎非常困難，而且效能影響可以忽略不計。這是因為科學文獻中發現的「時間換取空間」權衡策略 [Hel80, BS00] 是對金鑰流進行操作，而我們的攻擊者模型規定我們只能推斷出金鑰流的間接屬性。最重要的是，加密演算法的內部狀態是由一個攻擊者無法影響的隨機數初始化的。

在接下來的章節中，我們將描述幾個僅透過分析密文就能觀察到的特性。一旦確定了這些特性，所有不具備這些特性的候選金鑰都可以被捨棄，從而顯著縮小搜尋空間。

請注意，窮舉搜尋並隨後測試每個候選者是否具有發現的特性是一項計算成本高昂的任務，因為離線暴力攻擊相當緩慢。因此，我們介紹了一種有效的方法來構建金鑰候選列表。

### 5.2 總和特性

透過分析密文可以觀察到的第一個特性是總和特性。為了定義它，我們首先需要建立一些引理。

給定一個加密的隨機數位元組 {nT[8i,8i+7]} 及其對應的同位位元 {pi}，我們可以透過將兩者進行 XOR 運算來抵銷明文，從而得到對應金鑰流位元 ks8i ... ks8i+8 的內部 XOR。

![](https://i.imgur.com/RkNqK9q.jpeg)

> 證明。發表於 [Mei15]。

上述引理適用於任何密文，例如它也可以應用於 {nR} 或 {aR}。然而，在本文中，我們只關注對 {nT} 的分析。以下引理指出，對於具有共同 j 位元前綴的兩個加密隨機數，LFSR-stream a48a49 ... a48+j 是相等的。

![](https://i.imgur.com/VfPx0Bw.jpeg)

> 證明。發表於 [Mei15]。

最後，我們描述另一個特性，當與引理 5.1 結合時，可以讓我們定義所需的總和特性。讓我們專注於任何一個加密的隨機數位元組 {nT[8i,8i+7]}，其中 i ∈ [0, 3]。該位元組的值對應到 LFSR-stream 位元組 a[8i+48,8i+55]。該值並非直接取用，而是先經過金鑰流和回饋迴圈的處理。如果我們只取用具有共同 {nT[0,8i-1]} 的隨機數，則 {nT[8i,8i+7]} 和 a[8i+48,8i+55] 之間存在一對一的對應關係。

![](https://i.imgur.com/3Hn8Blz.jpeg)

> 證明。發表於 [Mei15]。

假設我們收集了足夠多的加密隨機數，以至於我們觀察到了加密隨機數位元組 {nT[8i,8i+7]} 的所有 256 個可能值，而前面的位元組 {nT[0,8i-1]} 保持不變。這些資訊讓我們能夠計算出總和特性。

定義 5.4。總和特性 S 是在時間 8i（其中 i ∈ [0, 3]）時內部狀態的一個特性，可以透過檢索 {nT[8i,8i+7]}（即第 i 個加密隨機數位元組）的所有可能值來觀察，而 {nT[0,8i-1]}（即所有先前的加密隨機數位元組）保持不變。對於每個加密隨機數位元組，我們取其內部 XOR，並將其與對應的同位位元進行 XOR 運算。接下來，我們對所有結果值求和，忽略有限體的模運算。結果是一個從 0 到 256（含）的數字。

![](https://i.imgur.com/1xJMFZO.jpeg)

總和特性等同於一個僅取決於加密演算法在時間 8i 的內部狀態的特性。以下引理將其形式化。

![](https://i.imgur.com/5S0geLR.jpeg)

> 證明。發表於 [Mei15]。

因為 S(a[8i,8i+47]) 僅取決於 a[8i+9,8i+47]，我們將重載符號，將 S 視為函數 F39_2 → [0, 256]，將 S(a[8i,8i+47]) 寫為 S(a[8i+9,8i+47])。

請注意，此時，我們已經可以透過收集第一個加密隨機數位元組的所有可能值，來顯著縮小窮舉搜尋空間，這決定了加密演算法初始狀態的總和特性（即時間 0），並捨棄所有與觀察到的總和特性值不同的狀態，這是透過預先計算的查找表來實現的。在下一節中，我們將展示如何在沒有查找表的情況下高效地完成此操作。

### 5.3 拆分總和特性

在 4.7 節中，我們描述了篩選函數 f 的一個漏洞，即其所有輸入均勻地分佈在奇數位置。在本節中，我們將展示如何利用此特性來構建候選金鑰列表，使得每個候選者都具有特定的總和特性值，而無需遍歷整個 39 位元的搜尋空間並測試此特性。

為此，我們首先介紹部分總和特性，它是僅對加密演算法內部狀態的奇數位元或偶數位元進行求和。

**定義 5.6。** 奇數和 SO 表示對加密演算法內部狀態的奇數位元計算的總和特性。同樣，SE 表示偶數和。兩個值的範圍都是從 0 到 16（含）。請注意，這兩個值沒有共享任何輸入，因此它們彼此完全獨立。它們的定義如下。

![](https://i.imgur.com/Yg5H5Kr.jpeg)

接下來，我們定義由部分總和特性 p、q 分別為奇數和偶數總和特性所決定的所有可能內部狀態位元的集合 TOp、TEq。

![](https://i.imgur.com/F5vQGkE.jpeg)

現在假設我們已經確定了加密演算法內部狀態的奇數和偶數總和特性。正如我們將在下面看到的，這唯一地確定了總和特性。

![](https://i.imgur.com/Bz8AorD.jpeg)

> 證明。發表於 [Mei15]。

請注意，根據其定義，人們可能期望總和特性值呈常態分佈。然而，由於剛剛描述的特性等現象，情況並非如此。有關描繪總和特性的可能值及其對應隨機選擇的加密狀態的機率的長條圖，請參見圖 5.1。

![](https://i.imgur.com/iWG2QgP.jpeg)

> 圖 5.1：總和值與機率。機率是透過對 8192 個隨機加密狀態取平均值獲得的。

至此，我們已經擁有了構建候選金鑰列表所需的所有構建模塊，而無需遍歷整個 39 位元搜尋空間並隨後測試總和特性，也無需使用（大型）預計算表。為此：

(i) 我們生成所有表格 TOp 和 TEq，其中 p, q ∈ [0, 16]，包含其對應的部分總和函數所使用的所有可能的奇數和偶數 LFSR 位元。無需預計算，因為在普通筆記型電腦上計算可在 1 秒內完成。

(ii) 我們確定 s = S(a[9,47])，即初始 LFSR 狀態的總和特性，方法是檢索第一個加密隨機數位元組 nT[0,7] 的所有 256 個可能值，然後應用引理 5.5。

(iii) 一旦 s 已確定，我們取 (p, q) ∈ [0, 16] × [0, 16] 的所有可能組合，使得 s = p(16 − q) + (16 − p)q 成立。

(iv) 對於每個這樣的組合，我們取 x ∈ TOp 的所有值，並將它們與 y ∈ TEq 的所有值組合。我們定義 z ∈ F39_2，z := x0y0x1y1 ... x18y18x19。根據構造，S(z) = S(a[9,47])。因此，每個 z 都是加密演算法內部狀態 39 位元的候選者。引理 5.7 指出，總和特性由其部分總和特性定義。因此，必須存在一個值 z 使得 z = a[9,47]。

在最終的候選列表中，每個條目包含 39 位元的 LFSR 狀態，而此列表的長度由觀察到的總和特性的機率乘以 2^39 給出。平均而言，該列表包含 2^36.72 個條目，即複雜度下降了 2.28 位元。在下一節中，我們將描述如何有效地確定時間 8 的總和特性。

### 5.4 確定時間 8 的總和特性

正如我們在上一節中所看到的，透過確定加密演算法初始內部狀態的總和特性，可以顯著縮小窮舉搜尋空間。我們可以再次應用相同的技術，只是這次我們確定加密演算法在時間 8 的內部狀態的總和特性，即在輸入第一個隨機數位元組之後。正如引理 5.5 中所述的要求，為了確定時間 8 的總和特性，我們需要收集第二個隨機數位元組 nT[8,15] 的所有可能值，而第一個位元組 nT[0,7] 保持不變。我們假設標籤產生的加密隨機數 {nT} 是隨機且不受我們控制的。因此，我們平均需要 401365.07 個隨機數。此分析與眾所周知的「優惠券收集問題」（coupon collector problem）[FGT92] 有關。

![](https://i.imgur.com/3Nl8MSc.jpeg)

獲取這個數量的隨機數通常需要數小時的時間。然而，透過採用機率性的方法，我們可以在更少的隨機數下以非常高的機率確定時間 8 的總和特性。

位元組 {nT[8,15]} 與 a[56,63] 之間的關係對我們來說是未知的，因為它取決於金鑰。然而，根據引理 5.3，它是一對一的，因此沒有衝突。此外，{nT}，因此 {nT[8,15]} 是由卡片隨機選擇的。因此，我們將收到的每個唯一的 {nT[8,15]} 視為 a[56,63] 的一個隨機（雖然未知）樣本。

令 U 為一個元組集合 ({b}, {p}) ∈ F8_2 × F2，儲存加密的隨機數位元組及其對應的加密同位位元。我們定義 U，使其包含我們收到的所有唯一的 {nT[8,15]} 樣本，即第二個隨機數位元組，且 {nT[0,7]} 保持不變。

我們給出一個簡短的例子，以闡明機率方法背後的直覺：假設 U 有 20 個條目。從這些樣本中，我們計算 k = P({b},{p})∈U 7 i=0{b} ⊕ {p}，即樣本空間的總和特性。現在假設我們發現 k = 0。從這個觀察中，我們可以得出結論，在所選前綴下，時間 8 的總和特性非常可能是 0。事實上，這種情況的實際機率約為 0.9775。儘管我們只有 20 個 {nT[8,15]} 的樣本。因此，在這個例子中，我們平均只需要收集 5320.24 個隨機數。我們現在將這個直覺形式化。我們在這裡使用的一個關鍵概念是超幾何分佈。

![](https://i.imgur.com/XGXO52Y.jpeg)

**定義 5.8。** 超幾何分佈是一種離散機率分佈，它描述了在 n 次不放回的抽樣中，從一個包含 K 個成功狀態的大小為 N 的有限群體中，抽出 k 次成功的機率，其中每次抽樣要麼是成功要麼是失敗。

如果隨機變數 X 的機率質量函數（pmf）由以下公式給出，則該變數遵循超幾何分佈：

![](https://i.imgur.com/Nj9j6Gy.jpeg)

> N 是群體大小
> K 是群體中成功狀態的數量
> n 是抽樣次數
> k 是成功次數

![](https://i.imgur.com/18hiQ9e.jpeg)

我們的目標是計算在給定樣本總和特性 T = k 的情況下，總和特性具有特定值的機率，即 P(S = K|T = k)。我們使用貝氏定理 [BP63] 來獲得它。

![](https://i.imgur.com/NnbWUEk.jpeg)

我們的策略是取 K 的每個可能的總和特性值，並計算 P(S = K|T = k)。我們對 S(α8) 的猜測將是產生最高機率的 K。

從結果中我們看到，為了計算給定樣本的總和特性值的機率，我們需要知道對於從 0 到 256（含）的每個可能值 i，P(S = i)。這些機率如圖 5.1 所示。

### 5.5 差分分析

從 5.4 節中我們看到，我們可以透過僅收集少量加密的隨機數來確定 S(α0) 並猜測給定 {nT[0,7]} 的 S(α8)。此外，一旦 S(α8) 的值已知，5.3 節已經表明我們可以構建包含 39 位元 LFSR 狀態的候選列表，而無需遍歷所有 2^39 種可能的狀態，計算總和特性，並測試其是否產生正確的值。在本節中，我們將展示如何組合兩個或多個總和特性，並在構建最終候選列表之前消除大量不可能的金鑰候選者。

給定我們以近乎確定的機率猜測了給定 {nT[0,7]} 的 S(α8)，那麼我們很可能也可以為其他輸入位元組猜測此值，而無需收集額外的隨機數，因為我們假設卡片產生的加密隨機數是隨機的且不受我們控制。輸入位元組 {nT[0,7]} 對應到 a[48,55]，因此會影響 S(α8)。因此，對於每個 {nT[0,7]} 的選擇，S(α8) 通常會不同。下面我們為第一個輸入位元組被輸入時的總和特性定義一個符號。

![](https://i.imgur.com/Pnj9gw4.jpeg)

**結合兩個總和特性** 假設我們已經確定了 Sǫ，並且對於某個輸入位元組 {b}，以高機率確定了 S{b}。由於 Sǫ 中的每個條目 u 都是 α9α10 ... α47 的候選者，而 Sǫ 中的每個 v 都是 α17α18 ... α55 的候選者，因此每個 u 必須有一個對應的 v，使得 u8u9 ... u38 = v0v1 ... v30，反之亦然。

此特性可以分別對奇數和偶數 LFSR 狀態位元進行評估。這使我們能夠在構建整個候選列表之前消除候選金鑰。

從 Sǫ 和 S{b} 建立候選列表的過程如下：

(i) 我們取所有配對 (p, q) ∈ [0, 16] × [0, 16]，其中 Sǫ = p(16 − q) + (16 − p)q。

(ii) 我們對時間 8 執行相同的操作：對於某個加密的輸入位元組 {b}，我們以高機率知道其 S{b}，我們確定所有配對 (r, s) ∈ [0, 16] × [0, 16]，其中 S{b} = r(16 − s) + (16 − r)s。

(iii) 對於每對 (p, q)，我們遍歷所有對 (r, s)。對於每個 x ∈ TOp，我們查找所有 y ∈ TOr 的條目，使得 x4x5 ... x19 = y0y1 ... y15。如果不存在，則 x 是 α9α11 ... α47 的不可能候選者。令 zO ∈ F24_2 為 α9α11 ... α55 的候選者。它的構造方法是取 zO := x0x1x2x3y。偶數情況類似：對於每個 x ∈ TEq，我們查找所有 y ∈ TEs 的條目，使得 x3x4 ... x18 = y0y1 ... y15。zE ∈ F23_2 是 α10α12 ... α54 的候-選者，其構造方法是取 zE := x0x1x2y。

(iv) 我們現在定義 z ∈ F47_2，它是 α[9,55] 的一個候選者。它是透過將每個 zO 與每個 zE 組合並取 z := zO0 zE0 zO1zE1 ... zO22 zE22 zO23 來構造的。第 5 節的階段 3 描述了如何使用產生的候選列表來執行金鑰恢復。

可選地，可以透過不實際構建候選列表，而是將每個配對 (p, q) 和 (r, s) 的候選者 zO 的數量乘以候選者 zE 的數量，然後將它們相加來確定搜尋空間的大小。

我們有些天真地假設 Sǫ 和 S{b} 在統計上是獨立的。如果我們關注的是一個隨機的 {b}，平均而言，我們將獲得 2.28 位元的複雜度下降，這是在 5.3 節中描述的相同下降之外的。然而，在實務中，下降幅度甚至更大，因為確定 S{b} 為極值（即 0 或 256，產生約 5.15 位元的下降）的位元組 {b} 所需的隨機數相對較少。對於值 32 和 224（約 6.81 位元），情況也類似，但程度較輕。此外，除了 128 之外的所有總和特性值都產生比 2.28 更大的複雜度下降，因為它們對應的機率低於平均值（圖 5.1），因此對應的可能加密狀態的數量也較少。

第 5 節的其餘部分只關注擴展步驟 (iii)，以便我們消除額外的 zO 和 zE 候選者。這裡提出的構建候選列表的方法是最終的。

**結合額外的總和特性** 本段落的所有內容都旨在消除上述方法中步驟 (iii) 的奇數候選者 zO，從而進一步降低計算複雜度。它也適用於偶數候選者。然而，為避免重複，我們將不討論這一點。

假設，除了 Sǫ 和 S{b} 之外，我們還以高機率確定了 S{b'}，對於加密的輸入位元組 {b'}，其中 {b} != {b'}。我們將由輸入 {b} 和 {b'} 產生的 LFSR-stream 分別稱為 a0a1 ... 和 a'0a'1 ...。

假設 {b} 和 {b'} 有一個共同的 i 位元前綴，即對於所有 j < i，{bj} = {b'j}。在前一段落的方法的步驟 (iii) 中，我們對於每對 (p, q)，遍歷所有對 (r, s)。在此迭代中，我們現在也將遍歷所有 r' ∈ [0, 16] 的值，其中存在一個值 S{b'} = r'(16 - k) + (16 - r')k，其中 k ∈ [0, 16]。回想一下，每個 y ∈ TOr 都是 a17a19 ... a55 的候選者。

接下來，我們關注 {b} 的剩餘部分，即超出 i 位元常數前綴的位元，以進一步消除候選者。如果我們可以證明候選者無效，無論 LFSR 的偶數位元中儲存什麼值，我們都將消除條目 y ∈ TOr。

我們遵循定義 3.5 和 3.6，對於 0 ≤ k < 8，我們得到

![](https://i.imgur.com/S30mcDt.jpeg)

我們取 j := i（請注意，稍後我們希望增加 j）並取 {a48+j } 和 {a'48+j } 之間的差。我們得到

![](https://i.imgur.com/inBw6bI.jpeg)

顯然，uj 被 XOR 了兩次，所以它被抵消了。回想一下，我們關注的是奇數位元，因此 j 是奇數。因此，f(a9+ja11+j ... a47+j) 僅取決於偶數 LFSR 串流位元。我們引入一個不變量，指出偶數位元是相等的：

![](https://i.imgur.com/7d8O21H.jpeg)

給定 j = i，我們知道不變量成立。因此，f(a9+ja11+j ... a47+j) = f(a'47+j)，無論 a9+ja11+j ... a47+j 的實際值是多少。此外，由於饋送到回饋函數 L 的所有偶數位置的位元都相等，它們被抵消了。因此，以上等價於

![](https://i.imgur.com/if6o8Do.jpeg)

因此，為了使候選 y 有效，必須存在一個 y' 使得

![](https://i.imgur.com/Ayokzmq.jpeg)

假設確實存在這樣一個 y'，使得上述為真。此時，我們不必立即接受 y 作為有效候選者。相反，我們可以測試上述是否也對 j ← j + 2 成立。然而，為此，我們必須首先檢查不變量 (1) 是否仍然成立。鑑於它對 j 成立，我們需要做的就是驗證 a49+j = a'49+j。遵循 a49+j 的定義，我們得到

![](https://i.imgur.com/31up9AX.jpeg)

與之前類似，uj+1 被 XOR 了兩次，因此被抵消了。同樣，饋送到回饋函數的偶數位置位元以及 0 和 47 + i 之間的所有奇數位置位元都相等，因此被抵消了。因此，以上變為

![](https://i.imgur.com/ShxZasF.jpeg)

再次將其轉換為 y 和 y' 的術語，我們得到（回想一下上一段落中描述的方法中的步驟 (iii) 中的 x）

![](https://i.imgur.com/602mhG6.jpeg)

如果上述評估為 0，我們已經證明，如果 y 是有效的，則 a49+j = a'49+j，因此我們已經證明不變量 (1) 仍然成立。我們繼續嘗試再次用 j ← j + 2 來反證 y 的有效性。否則，我們停止並接受 y 作為候選者。如果我們達到 j = 7，我們總是停止並接受 y 作為候選者。

如果不存在 y' 使得 y 被接受，我們就證明了 y 的無效性並將其消除。

顯然，這裡提出的差分分析可以重複使用其他輸入位元組 {b'}，這將導致消除額外的金鑰候選者。

由於分析差分分析產生的剩餘複雜度的平均大小極其複雜，我們將不討論這個問題。實際實驗表明，假設每個參與分析的位元組 {b'} 大約下降 1 位元是合理的。然而，重要的是要注意，對 S{b'} 的單一不正確猜測很可能導致正確的金鑰不存在於產生的剩餘搜尋空間中。

在下一節中，我們將介紹另一個我們可以透過觀察密文推斷出的加密演算法內部狀態的獨立特性。我們可以使用此特性來消除額外的金鑰候選者，從而進一步降低計算複雜度。

### 5.6 篩選器翻轉特性

透過分析密文可以觀察到的第二個特性，我們稱之為「篩選器翻轉特性」（filter flip property）。它最早由 Garcia 等人在 2009 年的文獻中記載 [GRVS09]。

![](https://i.imgur.com/TwCjpsF.jpeg)

> 證明。發表於 [Mei15]。

假設我們發現一個 {nT[8i,8i+7]} 的情況，其中上述情況不成立。那麼我們可以觀察到偶數位元上的篩選器翻轉特性。以下引理說明了這一點。

![](https://i.imgur.com/pRr46Z8.jpeg)

> 證明。發表於 [Mei15]。

我們繼續用引理表明，只有大約 9.4% 的可能輸入到篩選函數 f 的具有此特性。

![](https://i.imgur.com/jILsHYX.jpeg)

> 證明。透過檢驗。

由於只有輸入到 f 的 20 個位元是相關的，因此所有使得 f(x) != f(x ⊕ 1) 的狀態 x ∈ F20_2 都可以輕易地生成。下面定義了這些狀態的集合 F：

```
F := {x | x ∈ F20_2 and f(x) != f(x ⊕ 1)}
```

我們可以使用上一節中描述的差分分析來進一步縮小搜尋空間。如果我們觀察到對於某個輸入位元組 {b'}，f(α8) != f(α8 ⊕ 1)，我們可以將其應用於 F，而不是 TOr。

實際實驗表明，對於觀察到的每個篩選器翻轉特性，我們可以假設在上一節描述的差分分析期間，複雜度大約下降 1/2 位元。

在下一節中，我們將透過模擬更具體地分析攻擊的效能。

## 6. 效能分析

在本節中，我們分析攻擊的效能。我們實作了攻擊並進行了模擬，其中我們改變了收集的隨機數數量和機率閾值。攻擊的效能由產生的剩餘搜尋空間的大小表示，該大小如 5.5 節中步驟 (iv) 所述確定。總和特性值和篩選器翻轉特性的存在都取決於加密演算法的內部狀態。因此，產生的複雜度在很大程度上取決於金鑰。由於這個事實，為了評估攻擊的整體效率，我們使用 100 個隨機選擇的金鑰模擬了攻擊。

![](https://i.imgur.com/yW4l8Uf.jpeg)

> 圖 6.1：剩餘複雜度中位數

圖 6.1 包含一個描繪剩餘複雜度中位數的圖表。半透明平面描繪了第二和第三四分位數。從這個圖中我們可以觀察到，剩餘複雜度很快就達到了在普通硬體上幾分鐘內可以解決的範圍。通常，在收集了大約 10,000 - 20,000 個隨機數後，剩餘複雜度甚至可以在幾秒鐘內解決。收集額外隨機數或在剩餘搜尋空間內開始暴力攻擊之間的權衡，取決於哪一方佔上風：隨機數檢索硬體還是我們可用的計算能力。

與預期相反，當隨機數數量增加時，剩餘複雜度可能會略微增加。我們懷疑這是由於在我們的實作中，我們選擇單一位元組 {b} 並對所有其他位元組 {b'} 執行 5.5 節中提出的差分分析。{b} 的選擇是基於我們不在此詳細解釋的啟發式方法。其結果是分析運行速度明顯快於我們對每個可能的 {b} 對所有其他位元組 {b'} 執行分析然後選擇最小的結果集，但代價是產生的搜尋空間變得有些次優。然而，恢復金鑰所需的總時間減少了。

每當我們選擇將另一個輸入位元組/總和特性對納入差分分析時（即，總和特性值的已知機率超過所選閾值），剩餘搜尋空間的大小就會減小。由於時間 8 的總和特性值是機率性確定的，因此正確金鑰存在於剩餘搜尋空間中的機率也會降低。因此，效能分析的另一個方面是確定在給定所選機率閾值的情況下，正確金鑰位於剩餘搜尋空間中的實際機率。

![](https://i.imgur.com/2lhweoX.jpeg)

> 圖 6.2：帶有正確金鑰的剩餘搜尋空間。

圖 6.2 描繪了正確金鑰位於剩餘搜尋空間中的機率。人們可能期望在我們將大量輸入位元組納入分析的情況下，它會迅速下降。幸運的是，對於攻擊者來說，情況並非如此。這是因為每個輸入位元組的總和特性值在統計上並非相互獨立。

最後，我們應該強調，我們的攻擊實作僅在至少有一個輸入位元組參與分析時才返回剩餘搜尋空間，即猜測總和特性正確的機率超過所選閾值至少一個時間 8 的輸入位元組）。雖然這並非嚴格必要，因為可以簡單地取時間 8 內部狀態的所有可能值集合。然而，以這種方式實作攻擊產生了更簡潔的程式碼。因此，在上面的統計數據中，我們沒有將任何樣本中的總和特性值分配給任何輸入位元組的樣本考慮在內。

![](https://i.imgur.com/JYhCIzf.jpeg)

> 圖 6.3：統計中涉及的樣本數

圖 6.3 描繪了至少有一個總和特性猜測超過機率閾值的樣本數。因此，描繪了本節中其他統計數據所考慮的樣本數。

## 7. 結論

在過去幾年中，在 MIFARE Classic 卡的密碼學和實作中發現了許多漏洞和攻擊。其中最嚴重的是純卡攻擊，它可以僅透過在不受控制的環境中與卡片進行無線互動來恢復秘密金鑰。系統整合商認為這些攻擊是其基於 MIFARE Classic 的系統最嚴重的威脅之一，因為它允許攻擊者避開攝影機偵測。

我們是第一個發現僅依賴於加密演算法和驗證協定設計問題的純卡攻擊。據我們所知，目前流通的每張 MIFARE Classic 相容卡都容易受到我們的攻擊。表 7.1 顯示了我們的攻擊與文獻中發現的先前純卡攻擊之間的比較。

> 表 7.1：純卡攻擊比較

| 攻擊 | 軌跡 | 收集時間 | 計算時間 | a | b |
|--------|--------|--------|---------|---|---|
| [GRVS09] | 2 | < 1s | < 1s | × | ✓ |
| [Cou09] | 300 | 3m | < 1s | × | × |
| [CHC+14] | ∼ 1,000,000 | 10-20h | 2-15m | ✓ | × |
| 我們的 | ∼ 10,000 | 6-12m | 5-10m | ✓ | ✓ |

> a: 不需要弱 PRNG
> b: 驗證失敗後不需要錯誤碼

強化的 MIFARE Classic 卡（例如 SmartMX 和 MIFARE Plus）不易受到先前發布的純卡攻擊。然而，它們容易受到本文描述的我們的攻擊。此外，為了緩解我們的攻擊，與 MIFARE Classic 協定的向下相容性將不可避免地被破壞。因此，我們得出結論，所有 MIFARE Classic 相容卡都應被視為普通記憶卡，系統整合商不能再信任其資料的真實性和機密性。

我們已經在各種強化的 MIFARE Classic 卡上完整實作並測試了我們的攻擊，並在幾分鐘內恢復了秘密金鑰。此外，我們提供了廣泛的複雜度分析和理論邊界，以更準確地估計平均執行時間。

我們攻擊的唯一先決條件是必須預先知道一個金鑰。然而，在實務中，由於大量部署的卡片至少為一個或多個記憶體磁區使用預設金鑰，這個要求幾乎總是能滿足。

我們已在發表前七個月通知製造商恩智浦（NXP），並在他們的強化版 MIFARE Classic 卡上實際演示了我們的攻擊。通知後，我們參加了幾次會議，討論攻擊及其影響。此外，他們還請我們審閱了他們客戶通知函的草稿，其中他們承認了我們的工作，並不鼓勵未來使用 MIFARE Classic 相容技術。

### 7.1 建議

我們強烈建議系統整合商從 MIFARE Classic 相容系統遷移，並開始使用強大且密碼學安全的系統。有許多替代的非接觸式智慧卡支援經過充分研究的密碼演算法和經過形式驗證的驗證協定。然而，對於絕對無法升級其基礎設施的系統整合商，可以暫時考慮以下緩解對策：

(i) 部署強化卡並將所有金鑰分散化。——這要求攻擊者在我們的攻擊之前執行不同的攻擊，涉及竊聽或與讀卡機通訊。這必須在受控環境中進行，有被攝影機偵測的風險。

(ii) 定期在後台辦公室執行真實性和完整性檢查，以偵測欺詐性交易。

## 8. 參考文獻

[AK03] Frederik Armknecht and Matthias Krause. Algebraic attacks on combiners with memory. In 23rd International Cryptology Conference, Advances in Cryptology (CRYPTO 2003), pages 162–175. Springer-Verlag, 2003.

[And91] Ross J Anderson. Tree functions and cipher systems. Cryptologia, 15(3):194–202, 1991.

[And95] Ross Anderson. Searching for the optimum correlation attack. In 2nd International Workshop on Fast Software Encryption (FSE 1994), volume 1008 of Lecture Notes in Computer Science, pages 137–143. Springer-Verlag, 1995.

[BDR+96] Matt Blaze, Whitfield Diffie, Ronald L Rivest, Bruce Schneier, and Tsutomu Shimomura. Minimal key lengths for symmetric ciphers to provide adequate commercial security. a report by an ad hoc group of cryptographers and computer scientists. Technical report, DTIC Document, 1996.


[Bih97] Eli Biham. A fast new DES implementation in software. In 4th International Workshop on Fast Software Encryption (FSE 1997), volume 1267 of Lecture Notes in Computer Science, pages 260–272. Springer-Verlag, 1997.

[BP63] Mr. Bayes and Mr Price. An essay towards solving a problem in the doctrine of chances. by the late rev. mr. bayes, frs communicated by mr. price, in a letter to john canton, amfrs. Philosophical Transactions (1683-1775), pages 370–418, 1763.

[BS00] Alex Biryukov and Adi Shamir. Cryptanalytic time/memory/data tradeoffs for stream ciphers. In Advances in Cryptology–ASIACRYPT 2000, pages 1–13. Springer, 2000.

[CCCS92] Paul Camion, Claude Carlet, Pascale Charpin, and Nicolas Sendrier. On correlation-immune functions. In 11th International Cryptology Conference, Advances in Cryptology (CRYPTO 1991), volume 576 of Lecture Notes in Computer Science, pages 86–100. Springer-Verlag, 1992.

[CHC+14] Yi-Hao Chiu, Wei-Chih Hong, Li-Ping Chou, Jintai Ding, Bo-Yin Yang, and Chen-Mou Cheng. A Practical Attack on Patched MIFARE Classic. In Information Security and Cryptology, pages 150–164. Springer, 2014.

[CJM02] Philippe Chose, Antoine Joux, and Michel Mitton. Fast correlation attacks: An algorithmic point of view. In 21st International Conference on the Theory and Application of Cryptographic Techniques, Advances in Cryptology (EUROCRYPT 2002), volume 2332 of Lecture Notes in Computer Science, pages 209–221. Springer-Verlag, 2002.

[CM03] Nicolas T Courtois and Willi Meier. Algebraic attacks on stream ciphers with linear feedback. In 22nd International Conference on the Theory and Application of Cryptographic Techniques, Advances in Cryptology (EUROCRYPT 2003), pages 345–359. Springer-Verlag, 2003.

[Cou09] Nicolas T Courtois. The dark side of security by obscurity and cloning Mifare Classic rail and building passes, anywhere, anytime. SECRYPT: International Conference on Security and Cryptography, 2009.

[CP02] Nicolas T Courtois and Josef Pieprzyk. Cryptanalysis of block ciphers with overdefined systems of equations. In 8th International Conference on the Theory and Application of Cryptology and Information Security, Advances in Cryptology (ASIACRYPT 2002), pages 267–287. Springer-Verlag, 2002.

[CS91] Vladimir Chepyzhov and Ben Smeets. On a fast correlation attack on certain stream ciphers. In 10th International Conference on the Theory and Application of Cryptographic Techniques, Advances in Cryptology (EUROCRYPT 1991), volume 547 of Lecture Notes in Computer Science, pages 176–185. Springer-Verlag, 1991.

[DHW+12] Benedikt Driessen, Ralf Hund, Carsten Willems, Carsten Paar, and Thorsten Holz. Don’t trust satellite phones: A security analysis of two satphone standards. In 33rd IEEE Symposium on Security and Privacy (S&P 2012), pages 128–142. IEEE, 2012.

[FGT92] Philippe Flajolet, Daniele Gardy, and Lo¨ys Thimonier. Birthday paradox, coupon collectors, caching algorithms and self-organizing search. Discrete Applied Mathematics, 39(3):207–229, 1992.

[FJ03] Jean-Charles Faugere and Antoine Joux. Algebraic cryptanalysis of hidden field equation (hfe) cryptosystems using gr¨obner bases. In 23rd International Cryptology Conference, Advances in Cryptology (CRYPTO 2003), pages 44–60. Springer-Verlag, 2003.

[GKGM+08] Flavio D Garcia, Gerhard de Koning Gans, Ruben Muijrers, Peter Van Rossum, Roel Verdult, Ronny Wichers Schreur, and Bart Jacobs. Dismantling MIFARE classic. In Computer Security-ESORICS 2008, pages 97–114. Springer, 2008.

[GKGV12] Flavio D. Garcia, Gerhard de Koning Gans, and Roel Verdult. Tutorial: Proxmark, the swiss army knife for RFID security research. Technical report, Radboud University Nijmegen, 2012.

[Gol96] Jovan Dj Goli´c. On the security of nonlinear filter generators. In 3rd International Workshop on Fast Software Encryption (FSE 1996), volume 1039 of Lecture Notes in Computer Science, pages 173–188. Springer-Verlag, 1996.

[Gol97] Jovan Dj. Goli´c. Cryptanalysis of alleged A5 stream cipher. In 16th International Conference on the Theory and Application of Cryptographic Techniques, Advances in Cryptology (EUROCRYPT 1997), volume 1233 of Lecture Notes in Computer Science, pages 239–255. Springer-Verlag, 1997.

[GRVS09] Flavio D Garcia, Peter van Rossum, Roel Verdult, and Ronny Wichers Schreur. Wirelessly pickpocketing a Mifare Classic card. In Security and Privacy, 2009 30th IEEE Symposium on, pages 3–15. IEEE, 2009.

[Hel80] Martin E Hellman. A cryptanalytic time-memory trade-off. Information Theory, IEEE Transactions on, 26(4):401–406, 1980.

[Hil29] Lester S. Hill. Cryptography in an algebraic alphabet. American Mathematical Monthly, 36(6):306–312, 1929.

[ISO99] Mechanisms using symmetric encipherment algorithms (ISO/IEC 9798 part 2), 1999. International Organization for Standardization (ISO).

[ISO01] Identification cards — contactless integrated circuit cards — proximity cards (ISO/IEC 14443), 2001.

[JJ00] Thomas Johansson and Fredrik J¨onsson. Fast correlation attacks through reconstruction of linear polynomials. In 20th International Cryptology Conference, Advances in Cryptology (CRYPTO 2000), volume 1880 of Lecture Notes in Computer Science, pages 300–315. Springer-Verlag, 2000.

[JS97] Norman D. Jorstad and Landgrave T. Smith. Cryptographic algorithm metrics. In 20th National Information Systems Security Conference. National Institute of Standards and Technology (NIST), 1997.

[Ker83] Auguste Kerckhoffs. La cryptographie militaire. Journal des Sciences Militaires, 9(1):5–38, 1883.

[KGHG08] Gerhard de Koning Gans, Jaap-Henk Hoepman, and Flavio D Garcia. A practical attack on the MIFARE Classic. In Smart Card Research and Advanced Applications, pages 267–282. Springer, 2008.

[Kuh88] GJ Kuhn. Algorithms for self-synchronizing ciphers. In 1st Southern African Conference on Communications and Signal Processing (COMSIG 1988), pages 159–164. IEEE, 1988.

[MAD07] Mifare application directory. http://www.nxp.com/acrobat_download/other/identification/M001830.pdf, May 2007.

[Mar57] Harry M Markowitz. The elimination form of the inverse and its application to linear programming. Management Science, 3(3):255–269, 1997.

[Mei15] Carlo Meijer. Ciphertext-only cryptanalysis on hardened mifare classic cards extended. Master’s thesis, Radboud University Nijmegen, 2015.

[MS88] Willi Meier and Othmar Staffelbach. Fast correlation attacks on stream ciphers. In 7th Conference on the Theory and Application of Cryptographic Techniques, Advances in Cryptology (EUROCRYPT 1988), volume 330 of Lecture Notes in Computer Science, pages 301–314. Springer-Verlag, 1988.

[Mul56] David E Muller. A method for solving algebraic equations using an automatic computer. Mathematical Tables and Other Aids to Computation, 10(56):208–215, 1956.

[NESP08] Karsten Nohl, David Evans, Starbug Starbug, and Henryk Pl¨otz. Reverse-Engineering a Cryptographic RFID Tag. In USENIX Security Symposium, volume 28, 2008.

[NP07] Karsten Nohl and Henryk Pl¨otz. Mifare, little security, despite obscurity. In 24th congress of the Chaos Computer Club in Berlin, 2007.

[PHI98] MIFARE Classic 1k, MF1ICS50. Public product data sheet, July 1998. Philips Semiconductors.

[Sie84] Thomas Siegenthaler. Correlation-immunity of nonlinear combining functions for cryptographic applications. IEEE Transactions on Information Theory, 30(5):776–780, 1984.

[Sie85] Thomas Siegenthaler. Decrypting a class of stream ciphers using ciphertext only. IEEE Transactions on Computers, 100(1):81–85, 1985.

[SN97] National Institute for Standards and Technology (NIST). Announcing request for candidate algorithm nominations for the advanced encryption standard (AES). Federal Register, 62(177):48051–48058, 1997.

[Str69] Volker Strassen. Gaussian elimination is not optimal. Numerische Mathematik, 13(4):354–356, 1969.

[TT80] Moiez A. Tapia and Jerry H. Tucker. Complete solution of boolean equations. IEEE Transactions on Computers, 100(7):662–665, 1980.

[Ver15] Roel Verdult. The (in)security of proprietary cryptography. PhD thesis, Radboud University, The Netherlands and KU Leuven, Belgium, April 2015.

[VGB12] Roel Verdult, Flavio D. Garcia, and Josep Balasch. Gone in 360 seconds: Hijacking with Hitag2. In 21st USENIX Security Symposium (USENIX Security 2012), pages 237–252. USENIX Association, 2012.

[VKGG12] Roel Verdult, Gerhard de Koning Gans, and Flavio D. Garcia. A toolbox for RFID protocol analysis. In 4th International EURASIP Workshop on RFID Technology (EURASIP RFID 2012), pages 27–34. IEEE Computer Society, 2012.
