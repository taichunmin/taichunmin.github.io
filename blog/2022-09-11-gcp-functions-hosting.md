---
date: '2022-09-11T00:00:00+0800'
title: Heroku 取消免費方案？教你用 Cloud Functions 架設 LINEBOT！
description: Heroku 要逐步取消免費方案，網路上的其他替代方案怕也會跟上 Heroku 的腳步，這篇文章主要是想分享均民是怎麼把 LINEBOT 服務架設在 Cloud Functions 上面。
image: https://i.imgur.com/GYuyZV6.png
tags:
  - Google Cloud Functions
meta:
  - property: og:image:width
    content: 1200
  - property: og:image:height
    content: 600
---

# Heroku 取消免費方案？教你用 Cloud Functions 架設 LINEBOT！

大家好，我是做出「LINE 數位版名片」的 LINE API 專家均民。

2022/08/25 時，Heroku 宣佈要逐步取消免費方案[公告網址](https://blog.heroku.com/next-chapter)，雖然網路上還有一些免費的替代方案，但怕也會跟上 Heroku 的腳步，所以一些預算沒那麼高或使用量不高的 LINEBOT 個人專案（如：Flex 開發人員工具），均民目前是選擇把服務架設在 Google Cloud Functions 上面，這個 Google 所提供的 Cloud Functions 服務，是一個不用自己維護後端伺服器的執行環境 (Serverless)，在使用 128MB 這個規格時，費用微乎其微，今天這篇文章就是特地來分享我是如何把我的 LINEBOT 架在上面。

## Cloud Functions (第 1 代) 的定價

每次想把程式放到 Google 的 Cloud Functions 上之前，都很怕不小心被收錢，所以每次使用之前，都會去定價網頁重新估算一次費用，但都偷懶沒有紀錄下來，下次就又忘記了，所以這次打算直接把估算的結果寫在文章內，這個估算價格是根據均民在寫這篇文章時的定價計算的，記得還是要去原本的英文網站確認一下定價喔！

以下表格是目前這個服務的簡易估價方式：

|   項目   | 費用 (USD)                                   | 免費額度 (USD) |
| ------- | ------------------------------------------- | -------- |
| 執行次數 | $0.4 / 100 萬次                         | 每月前 200 萬次 |
| 執行時間 | 級別 1 價格簡易算法：<br>(記憶體規格/128MB) × <br>$2.31e-7 / 每 0.1 秒 | 每月 RAM 部份 $1 +<br>CPU 部份 $2 |
| 網路輸出 | $0.12 / GB                              | 每月前 5 GB |

::: info
上面的表格是以 2022/9/7 的[官方價格文件](https://cloud.google.com/functions/pricing)所歸納的簡易估價方式，金額僅供參考，實際收費請參考[原始文件](https://cloud.google.com/functions/pricing)：

<https://cloud.google.com/functions/pricing>
:::

### 額外費用

除了 Cloud Functions 本身的使用費用之外，Cloud Functions (第 1 代) 還會產生這些額外費用：

|        項目        | 級別 1 費用 (USD) | 免費額度 (USD) |
| ----------------- | ---------- | -------------- |
| Container Registry 的 Container 儲存費 | 約 $0.026 / GB | 無 |
| Container Registry 程式碼儲存費 | 約 $0.026 / GB | 2 MB |
| Cloud Build 運算時間 | $0.003 / 分鐘 | 每天前 120 分鐘 |

在這個額外費用中，最容易不小心產生費用的就是 Container Registry 的 Container 儲存費用，因為 Container 動不動就是幾百 MB，目前沒有提供免費額度，而且好像也不會自動刪除，為了避免費用過高，目前網路上搜尋到的解決辦法，都是用程式刪除舊的資料，這部份均民稍候會進行說明。

## Cloud Functions (第 2 代) 的定價

Cloud Functions (第 2 代) 是直接串接 Cloud Run，所以收費方式也是直接採用 Cloud Run 的定價，以下表格是目前的簡易估價方式：

|   項目   | 級別 1 費用 (USD)                                   | 免費額度 (USD) |
| -------- | ------------------------------------------- | -------- |
| 執行次數 | $0.4 / 100 萬次                         | 每月前 200 萬次 |
| CPU 使用時間 | 級別 1 價格簡易算法：<br>(記憶體規格/128MB) × <br>$4.008e-7 / 每 0.1 秒 | 每月前 $4.32 免費 |
| RAM 使用時間 | 級別 1 價格簡易算法：<br>(記憶體規格/128MB) × <br>$3.125e-8 / 每 0.1 秒 | 每月前 $0.9 免費 |
| 網路輸出 | 約 $0.12 / GB                              | 每月前 1 GB (限北美地區) |

::: info
上面的表格是以 2022/9/7 的[官方價格文件](https://cloud.google.com/functions/pricing)所歸納的簡易估價方式，金額僅供參考，實際收費請參考[原始文件](https://cloud.google.com/functions/pricing)：

<https://cloud.google.com/functions/pricing>
:::

### 額外費用

|        項目        | 級別 1 費用 (USD) | 免費額度 (USD) |
| ------------------ | ---------- | -------------- |
| Artifact Registry 儲存空間費 | $0.1 / GB | 每月前 0.5 GB 免費 |
| Artifact Registry 網路輸出費 | 各區域費用不同<br>美國和加拿大跨區 $0.01 / GB | 同區域內免費 |
| Cloud Build 運算時間 | $0.003 / 分鐘 | 每天前 120 分鐘 |

這邊的額外費用也有機會可以靠程式降低，這部份均民稍候會進行說明。

## 架設服務 (以 Node.js 為例)

### 建立專案

::: info GCP 官方的 Node.js 教學文件
* <https://cloud.google.com/functions/docs/quickstart-nodejs>
:::

自從體驗過自動佈署的方便後，最近在開發專案，都會盡量幫專案加上自動佈署，我會先去 GitHub 建立一個新的專案 Repo：

![](https://i.imgur.com/QJ1AabP.png)

通常我會在 GitHub 建立專案時，同時選正確的 `.gitignore` 設定檔：

![](https://i.imgur.com/0Y8btzr.png)

建立完成以後，我們就要複製專案的 GIT SSH 網址：

![](https://i.imgur.com/PGwqJbT.png)

然後用 git 把程式碼抓到電腦上：

```bash
git clone git@github.com:taichunmin/demo20220907.git
cd demo20220907
```

::: info
關於 Git 的安裝及 SSH 非對稱式金鑰的設定不是本文的重點，所以在本文內不會多談，你可自行到網路上找相關教學。
:::

然後我們透過 yarn 這個 node.js 的函式庫管理工具來建立 `package.json`：

```bash
yarn init -y
```

專案建立完成以後，我們可以加入一些我們可能會需要的函式庫（如下）：

```bash
# 這些函式庫只是範例，你可能會需要根據你實際的需求來修改
yarn add axios lodash dotenv @line/bot-sdk debug
```

除了一些服務所需的必要函式庫之外，均民通常還會額外裝一些輔助開發用的函式庫：

```bash
# 這些函式庫只是範例，你可能會需要根據你實際的需求來修改
yarn add -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-n eslint-plugin-node eslint-plugin-promise jest
```

安裝完成後的 `package.json` 可以參考「Flex 開發人員工具」的原始碼： <https://github.com/taichunmin/gcf-line-devbot>

### 開發及建立 Cloud Functions

安裝完成以後，我們就可以先來建立一個由 HTTP 觸發的 Cloud Functions：

::: info
關於 Google Cloud 的註冊不是本文的重點，所以在本文內不會多談，你可自行到網路上找相關教學。
:::

在建立 Cloud Functions 以後，它會預設建立兩個檔案 `index.js` 及 `package.json`。

程式碼最主要的進入點是 `index.js` 的 `helloWorld` 函式，你也可以自己指定執行的函式名稱。

因為 Cloud Functions 的 Node.js 是模擬 Express.js 這個後端框架，所以這個函式被呼叫時，會帶入 `req` 跟 `res` 這兩個參數，其中 `req` 裡面會有用戶端傳送過來的資料，`res` 則是你要回傳給用戶端的資料，如果想要學習 Express.js 框架如何使用，以及 req 跟 res 裡面有什麼東西可以使用，可以直接去看 Express.js 的 Reference。

::: info
關於 Express.js 框架如何使用的部份不是本文的重點，所以在本文內不會多談，你可自行到網路上找相關教學。
:::

當使用者傳訊息給 LINE 的伺服器後，LINE 的伺服器就會呼叫 webhook 所指定的網址，你可以從 `req.body.events` 取得 Webhook 所給予的事件資料，在此以[「Flex 開發人員工具」](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)的原始碼為例：

![](https://i.imgur.com/CuGJx1J.png)

完整 LINEBOT 的程式碼可以參考「Flex 開發人員工具」的原始碼： <https://github.com/taichunmin/gcf-line-devbot>

### 開發程式碼須特別注意的地方

在開發 Cloud Functions 程式碼時，有一些地方要特別注意。

1. 因為 Cloud Functions 在傳送回應 `res.status(200).send('OK')` 以後，會在很短的時間內停止執行程式，為了避免程式沒有執行完就意外中止，務必確保程式都執行完以後才傳送回應：

![](https://i.imgur.com/PbstJ3x.png)

2. 程式碼一定要記得傳送回應，包括發生錯誤時也需要，不然程式就不會停止然後導致超時，可能會導致服務中斷或大量費用的產生。

![](https://i.imgur.com/sRKvrOw.png)

3. Cloud Functions 有特殊 log 格式，在使用 `console.log` 印出訊息的時候，如果遵守這個格式，就可以用到有關 log 的內建好用功能。

```js
console.log(JSON.stringify({
  // 訊息的嚴重程度, 可能為其中之一 ['DEFAULT', 'DEBUG', 'INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY']
  severity: 'DEFAULT',
  
  // 在紀錄檔的分頁預設會顯示的文字
  message: '主要訊息內容',
  
  // 除了以上兩個屬性之外，可自由加上想要的屬性，但預設不會顯示，可以從 stack driver 查到完整的 JSON 內容
}))
```

下圖就是內建的訊息嚴重性篩選功能：

![](https://i.imgur.com/xKlCvnu.png)

並且可以從 stack driver 查到的更多錯誤細節（如下圖）：

![](https://i.imgur.com/Ge4VGyL.png)

### 自動佈署 (以第 2 代為例)

在使用 Cloud Functions 上，除了不用自己架設伺服器管理之外，另一個我最喜歡的東西就是用少少的設定就可以達成自動佈署的功能，目前我的[「Flex 開發人員工具」](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)就是透過 GitHub Actions 執行 Cloud Functions 提供的部署指令達成自動佈署，GitHub Actions 目前對於 Public 的專案是完全免費的，只要程式碼使用 Git 推送到 GitHub 上面的主要分支以後，機器人就會自動更新程式碼，真的是非常的省事方便！以下就是稍微介紹一下我是如何進行設定的。

英文教學文章網址: <https://cloud.google.com/functions/docs/create-deploy-gcloud>

#### 啟用所需服務

為了要使用 Cloud Functions 以及自動佈署功能，會需要啟用以下的服務：

* Cloud Functions
* Cloud Build API

以下是在英文教學文章所提供的一鍵啟用連結: <https://console.cloud.google.com/flows/enableapi?apiid=cloudfunctions,cloudbuild.googleapis.com&redirect=https://cloud.google.com/functions/quickstart>

#### 設定 Workload Identity Federation

在 GitHub Actions 上面使用 GCP 相關功能時，現在都建議使用這個新的登入機制，使用這個登入機制所需要設定的東西比較多，在此特地把設定步驟大略記錄下來。

首先，前往 GCP 後台，選擇正確專案後，開啟 Cloud Shell：

![](https://i.imgur.com/3HJsVoE.png)

稍微等候一些時間，等候 Cloud Shell 啟動完成：

![](https://i.imgur.com/VlcZjF4.png)

然後我們就要先建立 Service Account，Service Account 就是一個虛擬的使用者帳號，只不過是給程式專用的。請修改下方範例中的一些變數，然後在 Cloud Shell 內執行指令：

```bash
export PROJECT_ID="[請把這個變數換成專案ID]"
gcloud config set project "${PROJECT_ID}"

# Service Account 建立指令，如果已經建立過就可以跳過
export SERVICE_ACCOUNT="gcf-deploy" # 這個變數可以改成自己想要的帳號
gcloud iam service-accounts create "${SERVICE_ACCOUNT}" --project "${PROJECT_ID}"
```

服務帳號建立完成之後，我們就需要給這個服務帳號所需的權限。前往「IAM 與管理」，給予如下圖的三個權限：

![](https://i.imgur.com/POgx4Ta.png)

接下來我們要來建立 workload-identity-pools，請在 Cloud Shell 內執行指令：

```bash
gcloud services enable iamcredentials.googleapis.com --project "${PROJECT_ID}"

export MY_POOL="${SERVICE_ACCOUNT}-pools"
gcloud iam workload-identity-pools create "${MY_POOL}" --project="${PROJECT_ID}" --location="global" --display-name="${MY_POOL}"

export WORKLOAD_IDENTITY_POOL_ID=`gcloud iam workload-identity-pools describe "${MY_POOL}" --project="${PROJECT_ID}" --location="global" --format="value(name)"`

export MY_PROVIDER="${SERVICE_ACCOUNT}-provider"
gcloud iam workload-identity-pools providers create-oidc "${MY_PROVIDER}" --project="${PROJECT_ID}" --location="global" --workload-identity-pool="${MY_POOL}" --display-name="${MY_PROVIDER}" --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" --issuer-uri="https://token.actions.githubusercontent.com"
```

再來，我們需要給予 GitHub 專案權限，請修改下方範例中的一些變數，然後在 Cloud Shell 內執行指令：

```bash
export REPO="[GitHub使用者名稱]/[專案名稱]"
gcloud iam service-accounts add-iam-policy-binding "${SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com" --project="${PROJECT_ID}" --role="roles/iam.workloadIdentityUser" --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"
```

最後，我們會需要執行下面的指令後，複製 Cloud Shell 所顯示的 `workload_identity_provider` 備用：

```bash
gcloud iam workload-identity-pools providers describe "${MY_PROVIDER}" --project="${PROJECT_ID}" --location="global" --workload-identity-pool="${MY_POOL}" --format="value(name)"
# 執行指令後，取得的字串看起來像是這樣
# projects/000000000000/locations/global/workloadIdentityPools/gcf-deploy-pools/providers/gcf-deploy-provider
# 這個字串等等要填到 GitHub Actions 中的 workload_identity_provider 參數
```

#### dotenv 環境變數

如果你的程式碼中有「帳號」、「密碼」、「AccessToken」等資料，或是其他會因為開發環境而改變的資料如「檔案路徑」等，你不應該把這些資料寫死在程式碼內，而是應該改用讀取環境變數的方式開發：

```js
// 如果想要在 js 內讀取 NODE_ENV 的環境變數可以這樣讀取
console.log(process.env?.NODE_ENV)
```

我在開發 Node.js 的時候都會使用 dotenv 這個套件來幫我把這些敏感性資料讀取到環境變數內，這個套件會先在專案路徑內尋找 `.env` 的檔案，如果有找到就會把 `.env` 裡面的設定值讀取到環境變數內。

在正式環境中，我會先把這類的資料存在自動佈署工具的 secrets 內，如果像 Cloud Functions 一樣可以指定環境變數，我就會直接使用服務內建的功能，如果沒支援的話，就使用腳本建立一個 `.env` 檔案，然後一樣透過 dotenv 讀取到程式內。

前往 GitHub 專案內，切換到設定分頁：

![](https://i.imgur.com/HBmIwla.png)

然後在左側選單找到 Secrets > Actions：

![](https://i.imgur.com/YMRMHMD.png)

目前 Cloud Functions 可以用來設定環境變數的檔案是 yaml 格式，在此以[「Flex 開發人員工具」](https://liff.line.me/1645278921-kWRPP32q/?accountId=736cebrk)為例：

```yaml
GA_DEBUG: '0'
GCP_PROJECT: taichunmin
LINE_NOTIFY_TOKEN: ''
NODE_ENV: production
```

然後把這個檔案的內容新增到 Secrets 內，在此以 `ENV_PROD` 為例：

![](https://i.imgur.com/px8GCs7.png)

#### 撰寫 GitHub Actions 腳本

接下來在專案建立一個新檔案 `.github\workflows\deploy.yml`，範例內容如下：

```yaml
name: Cloud Functions Deploy

on:
  workflow_dispatch:
  push:
    branches: [ master ]

jobs:
  deploy:
    if: github.ref == 'refs/heads/master'
    runs-on: ubuntu-latest

    permissions:
      id-token: write

    steps:
    - uses: actions/checkout@v3
    - id: 'auth'
      uses: google-github-actions/auth@v0
      with:
        workload_identity_provider: '[這裡請填寫前幾個步驟所建立的workload_identity_provider]'
        service_account: 'gcf-deploy@[這裡填寫GCP專案ID].iam.gserviceaccount.com'
    # https://github.com/google-github-actions/setup-gcloud
    # https://github.com/google-github-actions/auth#setting-up-workload-identity-federation
    - name: 設定 Google Cloud SDK
      uses: google-github-actions/setup-gcloud@v0
    - name: 建立 GCF 環境變數檔案
      shell: bash
      run: |
        [[ -z "$ENV_PROD" ]] || echo "$ENV_PROD" > .env.yaml
        echo "GITHUB_SHA: ${GITHUB_SHA}" >> .env.yaml
      env:
        ENV_PROD: ${{ secrets.ENV_PROD }}
    # https://cloud.google.com/functions/docs/deploy
    # 請在這個網頁查看自動佈署的參數說明
    - name: 部署到 Google Cloud Functions
      run: >-
        gcloud functions deploy "[這裡請改成你想要的函數名稱]"
        --allow-unauthenticated
        --entry-point=helloGET
        --env-vars-file=.env.yaml
        --gen2
        --max-instances=1
        --memory=128Mi
        --no-user-output-enabled
        --region=us-central1
        --runtime=nodejs16
        --timeout=60s
        --trigger-http
```

請記得修改這個範例檔案中需要修改的地方，如：

* workload_identity_provider
* GCP專案ID
* 你想要的函數名稱

修改完成後，就可以透過 git 把自動佈署腳本上傳到 GitHub 上，測試看看你的自動佈署程式，前往專案的 Actions 分頁，然後找到剛剛建立的工作「Deploy」：

![](https://i.imgur.com/pU3D4kx.png)

由於我們在自動佈署有設定 `workflow_dispatch` 這個啟動條件，這條件允許我們手動執行這個 workflow，請點選「Run Workflow」就可以進行測試囉！

![](https://i.imgur.com/ha97fum.png)

### 複製 Webhook 網址

當你成功建立 Cloud Functions 以後，你就可以去 GCP 後臺，找到指定的 Cloud Functions，然後切換到觸發條件分頁，你就會看到一個網址，複製該網址並設定到 LINE 後台中即可：

![](https://i.imgur.com/lOx6MIT.png)

## 自動刪除舊版本的 Container/Artifact Registry

在建置 Cloud Functions (第 2 代) 的過程中，會使用到 Cloud Build 跟 Artifact Registry，但建置成功後，舊版本的 Artifact Registry 卻不會自動刪除，所以網友提供的解決方法是一個刪除舊版本的開源腳本：<https://github.com/GoogleCloudPlatform/gcr-cleaner>

這個腳本可以一次刪除你 GCP 專案內所有想要自動刪除的過時 Container，如果設定成在 GitHub Actions 上面執行，目前是完全免費，只不過需要進行一些設定，均民也同樣將設定步驟紀錄如下。

### 在 GitHub 上建立專案

建立一個新的 GitHub 專案，名為 `gcr-cleaner`，然後一樣使用 git 抓回本地端：

```bash
git clone git@github.com:taichunmin/gcr-cleaner.git
cd gcr-cleaner
```

然後新建一個檔案 `.github\workflows\gcr-cleaner.yml`，範例內容如下：

```yaml
# .github/workflows/gcr-cleaner.yml
name: 'gcr-cleaner'

on:
  schedule:
    - cron: '0 0 */1 * *' # runs daily
  workflow_dispatch: # allows for manual invocation

jobs:
  gcr-cleaner:
    runs-on: 'ubuntu-latest'
    permissions:
      id-token: write
    steps:
      - uses: actions/checkout@v3

      # https://github.com/docker/login-action#google-artifact-registry-gar
      - id: 'auth'
        name: 'Authenticate to Google Cloud'
        uses: 'google-github-actions/auth@v0'
        with:
          token_format: 'access_token'
          workload_identity_provider: '[這裡先留空，等等會建立新的workload_identity_provider]'
          service_account: 'gcr-cleaner@[這裡填寫GCP專案ID].iam.gserviceaccount.com'

      # configure based on your registry
      - uses: 'docker/login-action@v2'
        with:
          registry: us-central1-docker.pkg.dev
          username: oauth2accesstoken
          password: ${{ steps.auth.outputs.access_token }}

      # customize based on the gcr-cleaner flags
      - uses: 'docker://us-docker.pkg.dev/gcr-cleaner/gcr-cleaner/gcr-cleaner-cli'
        with:
          args: >-
            -repo=us-docker.pkg.dev/my-repo/my-thing
            -repo=ghcr.io/myuser/my-image
            -grace=48h
```

### 設定 Workload Identity Federation

這個腳本一樣需要有對應的權限才能夠幫你刪除過時的 Container 檔案，設定流程跟上面的步驟很像，只差在給予的權限不同。請到專案內開啟 Cloud Shell，等候 Cloud Shell 啟動完成，然後請修改下方範例中的一些變數，然後在 Cloud Shell 內執行指令：

```bash
export PROJECT_ID="[請把這個變數換成專案ID]"
gcloud config set project "${PROJECT_ID}"

# Service Account 建立指令，如果已經建立過就可以跳過
export SERVICE_ACCOUNT="gcr-cleaner" # 這個變數可以改成自己想要的帳號
gcloud iam service-accounts create "${SERVICE_ACCOUNT}" --project "${PROJECT_ID}"
```

接下來要給予這個服務帳戶 Artifact Registry 的權限，請在 Cloud Shell 內執行指令：

```bash
gcloud artifacts repositories add-iam-policy-binding "gcf-artifacts" --project "${PROJECT_ID}" --location "us-central1" --member "serviceAccount:${SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com" --role "roles/artifactregistry.repoAdmin"
```

接下來我們要來建立 workload-identity-pools，請在 Cloud Shell 內執行指令：

```bash
gcloud services enable iamcredentials.googleapis.com --project "${PROJECT_ID}"

export MY_POOL="${SERVICE_ACCOUNT}-pool"
gcloud iam workload-identity-pools create "${MY_POOL}" --project="${PROJECT_ID}" --location="global" --display-name="${MY_POOL}"

export WORKLOAD_IDENTITY_POOL_ID=`gcloud iam workload-identity-pools describe "${MY_POOL}" --project="${PROJECT_ID}" --location="global" --format="value(name)"`

export MY_PROVIDER="${SERVICE_ACCOUNT}-provider"
gcloud iam workload-identity-pools providers create-oidc "${MY_PROVIDER}" --project="${PROJECT_ID}" --location="global" --workload-identity-pool="${MY_POOL}" --display-name="${MY_PROVIDER}" --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" --issuer-uri="https://token.actions.githubusercontent.com"
```

再來，我們需要給予 GitHub 專案權限，請修改下方範例中的一些變數，然後在 Cloud Shell 內執行指令：

```bash
export REPO="[GitHub使用者名稱]/gcr-cleaner"
gcloud iam service-accounts add-iam-policy-binding "${SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com" --project="${PROJECT_ID}" --role="roles/iam.workloadIdentityUser" --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"
```

最後，我們會需要執行下面的指令後，複製 Cloud Shell 所顯示的 `workload_identity_provider`，然後一樣貼到 GitHub Actions 設定檔內：

```bash
gcloud iam workload-identity-pools providers describe "${MY_PROVIDER}" --project="${PROJECT_ID}" --location="global" --workload-identity-pool="${MY_POOL}" --format="value(name)"
# 執行指令後，取得的字串看起來像是這樣
# projects/000000000000/locations/global/workloadIdentityPools/gcr-cleaner-pools/providers/gcr-cleaner-provider
# 這個字串等等要填到 GitHub Actions 中的 workload_identity_provider 參數
```

### 列出所有需要清理的 REPO

開啟 Artifact Registry 的頁面：

![](https://i.imgur.com/Btudabi.png)

然後點選進入想要自動清理的 REPO，複製其完整的 REPO 路徑：

![](https://i.imgur.com/hdFylqk.png)

然後修改到 GitHub Actions 設定檔內（以 `taichunmin/gcr-cleaner` 為例）：

```yaml
# customize based on the gcr-cleaner flags
- uses: 'docker://us-docker.pkg.dev/gcr-cleaner/gcr-cleaner/gcr-cleaner-cli'
  with:
    args: >-
      -repo=us-central1-docker.pkg.dev/taichunmin/gcf-artifacts/chatbot--imgur
      -repo=us-central1-docker.pkg.dev/taichunmin/gcf-artifacts/cors--anywhere
      -repo=us-central1-docker.pkg.dev/taichunmin/gcf-artifacts/gcf--line--devbot
      -repo=us-central1-docker.pkg.dev/taichunmin/gcf-artifacts/linebot--redelivery
      -grace=48h
```

修改完成後，就可以透過 git 把自動佈署腳本上傳到 GitHub 上，測試看看你的自動佈署程式，前往專案的 Actions 分頁，然後找到剛剛建立的工作「gcr-cleaner」，由於我們在自動佈署有設定 `workflow_dispatch` 這個啟動條件，這條件允許我們手動執行這個 workflow，請點選「Run Workflow」就可以進行測試囉！

![](https://i.imgur.com/35yzNEH.png)

## 原始碼及參考連結

::: info
本文範例程式的原始碼授權為 MIT License，如果有疑問歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。
:::

* [Heroku 逐步取消免費方案公告 (英文)](https://blog.heroku.com/next-chapter)
* [GitHub: Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)
* [GitHub: gcr-cleaner](https://github.com/GoogleCloudPlatform/gcr-cleaner)
