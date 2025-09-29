---
date: '2024-12-21T00:00:00+0800'
title: 在網頁上控制你的硬體設備：使用 Web Serial 及 Web Bluetooth
description: 我一直覺得為了用硬體，還要下載安裝一堆軟體實在太麻煩。沒想到現在竟然可以直接用瀏覽器搞定！想知道怎麼讓你的網頁也能直接控制硬體設備嗎？
image: https://i.imgur.com/4bNgro2.png
tags:
  - JavaScript
meta:
  - property: og:image:width
    content: 1280
  - property: og:image:height
    content: 640
---

# 在網頁上控制你的硬體設備：使用 Web Serial 及 Web Bluetooth

假設你現在是一個消費者，今天購買了一個新的硬體，想要在電腦上使用這個硬體，你應該會需要按照以下步驟進行：

1. 閱讀硬體的說明書
2. 根據電腦系統下載專屬的應用程式
3. 安裝並執行應用程式

在下載專屬應用程式時，因為每個作業系統的應用程式可能會不同，所以使用者需要知道自己應該下載哪個：

![image](https://hackmd.io/_uploads/Sk9IZ-4ryx.png)

如果硬體太舊，或是使用的作業系統太新或太冷門，有可能會找不到應用程式來安裝：

![image](https://hackmd.io/_uploads/rkl6HZVHyl.png)

有時候，硬體開發商不會幫自己的應用程式送審，所以在使用者安裝並執行應用程式的過程中，有可能會看到作業系統跳出的各種安全性警告：

![image](https://hackmd.io/_uploads/SyymBZVS1g.png)

如果硬體的使用頻率很低（例如每年只用一次的報稅系統），當使用者在電腦上使用完硬體後，還需要自己想辦法把應用程式解除安裝，不然這個應用程式就會繼續佔用系統資源：

![image](https://hackmd.io/_uploads/SJ3SDZVB1x.png)

如果想讓使用者直接在網頁上控制硬體設備，需要使用者進行的步驟會有什麼不同？

1. 閱讀硬體的說明書
2. 用手機掃描 QR Code 或打開連結
3. 選擇並連線到裝置

以下是均民用自己開發的 [chameleon-ultra.js](https://taichunmin.idv.tw/chameleon-ultra.js/) 所錄製的 DEMO 影片：

<iframe width="560" height="315" src="https://www.youtube.com/embed/tLmzMJK3D_Y?si=IAiNxQIOdSPlEwgo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

ChameleonUltra 這個硬體裝置，是目前研究 RFID/NFC 這塊領域體積最小的開源硬體，這個硬體主打的功能是讀取/寫入/模擬/破解 Mifare Classic 1K 這種很常見的 NFC 卡片。

在網路上除了有其他網友幫它開發的 APP，均民也有針對這個硬體開發 [JavaScript SDK](https://taichunmin.idv.tw/chameleon-ultra.js/)，同時也支援[在網頁上進行韌體更新](https://taichunmin.idv.tw/chameleon-ultra.js/dfu.html)，SDK 的原始碼以 MIT Licence 釋出。

## 確認硬體的通訊介面

![image](https://hackmd.io/_uploads/H1fPrNErJl.png)

如果你也想要在網頁上控制你的硬體設備，首先，你需要先確認這個硬體使用什麼通訊介面。

### Serial

Serial 在 Windows 系統上又稱為 COM Port，是電腦與硬體之間常用的溝通介面之一，可用來連續傳送與接收資料，資料傳輸的最小單位是 byte。

如果你的硬體有 Serial 這個通訊介面，那麼你只要直接透過傳輸線把硬體連接到電腦上，就可以開始在網頁上與硬體通訊。

### UART / I2C / SPI

這三種通訊介面是硬體與硬體之間常用的溝通介面，如果需要與電腦溝通，你需要使用硬體來轉換成 Serial，以下是均民找到比較常見的硬體型號：

- UART: `CH340`, `CP2102`
- UART/I2C: `CH341`
- UART/I2C/SPI: `FT232H`

以下的圖片是均民使用 CH340 把 PN532 這個讀卡機的 UART 轉換成 Serial 的連接方法：

![image](https://hackmd.io/_uploads/HJx-dEVHke.png)

如果你想透過藍牙與硬體溝通，你也可以使用硬體（如：`JDY-33`）來轉換成藍牙 BLE。

## Web Serial API

在均民寫文章的當下，Web Serial 支援在以 Chrome 為核心的瀏覽器上使用，如 Google Chrome、Microsoft Edge 以及 Opera：

![image](https://hackmd.io/_uploads/rkdocNNByl.png)

可以透過以下的範例程式碼來確認瀏覽器有沒有支援這個 API：

```js
if ("serial" in navigator) {
  console.log('The Web Serial API is supported.')
}
```

你可以用以下的範例程式碼來請使用者選擇裝置：

```js
document.querySelector('button')
  .addEventListener('click', async () => {
    // 提示使用者選擇裝置
    const port = await navigator.serial.requestPort()
  });
```

除了讓使用者選擇新裝置之外，你還可以用以下的範例程式碼來取得之前使用者已經選過的裝置：

```js
// 取得之前已授權過的裝置
const ports = await navigator.serial.getPorts()
```

你可以先篩選硬體，讓使用者只會看到你列出的硬體，以增加使用者體驗，你可以用以下的範例程式碼來篩選：

```js
// 透過 Arduino Uno 的 USB Vendor/Product IDs 來進行篩選
const filters = [
  { usbVendorId: 0x2341, usbProductId: 0x0043 },
  { usbVendorId: 0x2341, usbProductId: 0x0001 }
];

// 提示使用者選擇 Arduino Uno 裝置
const port = await navigator.serial.requestPort({ filters });

const { usbProductId, usbVendorId } = port.getInfo();
```

成功選到裝置以後，你可以使用以下的範例程式碼來開啟 Serial Port：

```js
// 提示使用者選擇任何裝置
const port = await navigator.serial.requestPort();

// 等候 Serial Port 開啟
await port.open({ baudRate: 9600 });
```

開啟 Serial Port 以後，你就可以對 Serial Port 進行讀寫，以下的範例程式碼可以用來讀取資料：

```js
const reader = port.readable.getReader();

while (true) {
  const { value, done } = await reader.read();
  if (done) {
    // 釋放鎖以便之後可以把 port 關閉
    reader.releaseLock();
    break;
  }
  // value 的型別為 Uint8Array
  console.log(value);
}
```

以下的程式碼可以用來寫入資料：

```js
const writer = port.writable.getWriter();

const data = Uint8Array.of(104, 101, 108, 108, 111); // "hello" in ASCII
await writer.write(data);

// 釋放鎖以便之後可以把 port 關閉
writer.releaseLock();
```

硬體使用完畢以後，你可以使用以下的程式碼來關閉 Serial Port：

```js
// 如果未被鎖定，可直接關閉
await port.close();
```

如果想要終止一個還在使用中的 Serial Port，你可以使用以下的範例程式碼：

```js
// 如果被鎖定則需要先解鎖
let keepReading = true;
let reader;

async function readUntilClosed() {
  while (port.readable && keepReading) {
    reader = port.readable.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break; // reader.cancel() 被執行
        console.log(value); // value 的型別為 Uint8Array
      }
    } catch (error) {
      // 錯誤處理...
    } finally {
      // 釋放鎖以便之後可以把 port 關閉
      reader.releaseLock();
    }
  }

  await port.close();
}

const closedPromise = readUntilClosed();

document.querySelector('button').addEventListener('click', async () => {
  // 使用者點擊按鈕關閉 Serial Port
  keepReading = false;
  // 強制 reader.read() 馬上 resolve
  // 然後上面讀取的迴圈會呼叫 reader.releaseLock()
  reader.cancel();
  await closedPromise;
});
```

在這個段落裡面的範例程式碼，有很多都是節錄自以下的教學文章，文章的原始內容絕對比均民寫更詳細，推薦想用這個 API 的讀者一定要去詳讀：

[Read from and write to a serial port](https://developer.chrome.com/docs/capabilities/serial)

![image](https://hackmd.io/_uploads/HJtiWBNrkx.png)

### 開發<span style="color: gray">~~踩雷~~</span>經驗分享

#### HTTPS Only

瀏覽器為了保護使用者的隱私，這個 API 被限制只能在 HTTPS 的網頁中使用，你會需要幫你的網站加上有效的 HTTPS 憑證。

如果你想要在本機進行開發及測試，均民推薦使用 mkcert 來幫自己簽發一個本機的有效憑證，如果是想在開發的過程中用手機測試或是臨時 DEMO 給其他人看，均民推薦使用 ngrok 來臨時把本機的 HTTP 網址轉換成 HTTPS 的網址。

#### 需由使用者的互動事件觸發

使用選擇裝置的 API 時，需由使用者的互動事件觸發，例如觸控的 touch 事件、左鍵點擊的 click 及 pointerup 事件…等，這個是瀏覽器的安全性限制，避免這個 API 在使用者不知道的情況下被濫用。

#### 如何找到裝置的 VendorId 及 ProductId

在透過 API 選擇裝置的時候，我們可以提供 VendorId 及 ProductId 來篩選支援的裝置，增加使用者的體驗。

如果你手邊有硬體時，你可以直接查看 Chrome 的記錄檔，記錄檔的連結為 `chrome://device-log`，當你把硬體連接到電腦或是從電腦上移除時，就可以在這個頁面上看到相關的記錄，上面的 VendorId 及 ProductId 是以 10 進位來表示：

![image](https://hackmd.io/_uploads/HknnGDEHke.png)

如果你手邊沒有硬體，那你可以嘗試從網友整理的清單中找，清單的網址是 <http://www.linux-usb.org/usb.ids>，這份清單上面的 VendorId 及 ProductId 是以 16 進位來表示：

![image](https://hackmd.io/_uploads/HyM2Qw4S1e.png)

#### 網頁失去焦點就會噴錯

在透過 API 選擇裝置的時候，如果瀏覽器失去焦點（如：系統跳出藍牙配對、詢問允許裝置連接、使用者自己切換到別的視窗等），就會導致這個 API 噴錯。這是瀏覽器的安全性限制，所以在開發的時候，需要做好錯誤處理。

![image](https://hackmd.io/_uploads/SyD_XO4H1e.png)

#### 開啟 Serial 時要填什麼 Baud Rate？

如果你有硬體的開發文件，你可以直接看文件來確定要填什麼 Baud Rate，如果沒有的話，你可能就需要實測幾個常見的 Baud Rate 數值，例如：`9600`, `115200`。

## Web Bluetooth API

在均民寫文章的當下，這個 API 在 PC 平台上支援在以 Chrome 為核心的瀏覽器上使用，如 Google Chrome、Microsoft Edge 以及 Opera；在 Android 上的 Chrome、Samsung 瀏覽器也有支援。

![image](https://hackmd.io/_uploads/B148rO4B1l.png)

如果想在 iPhone 或是 iPad 上面使用這個 API，則可以嘗試額外下載 Bluefy 瀏覽器來使用：

![image](https://hackmd.io/_uploads/S1CprONS1e.png)

可以透過以下的範例程式碼來確認瀏覽器有沒有支援這個 API：

```js
const available = await navigator.bluetooth?.getAvailability()
if (available) {
  console.log("This device supports Bluetooth!");
} else {
  console.log("Bluetooth is not supported");
}
```

你可以用以下的範例程式碼來列出全部的藍牙裝置，並讓使用者選擇，但這種方式使用者體驗很差，因為會列出一堆不相關的裝置，非常不推薦：

```js
try {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: ['battery_service'] // 需列出會用到的服務
  })
} catch (error) {
  console.error(error)
}
```

比較好的做法是根據裝置的廣播封包來篩選，你可以用以下的範例程式來透過服務 UUID 篩選：

```js
try {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{
      services: [
        0x1234, // 16-bit UUID
        0x12345678, // 32-bit UUID
        '99999999-0000-1000-8000-00805f9b34fb' // 128-bit UUID
      ]
    }]
  })
} catch (error) {
  console.error(error)
}
```

如果藍牙裝置內有廣播裝置名稱，你可以用以下的範例程式碼來篩選，這種情形下你會需要額外列出你會用到的服務 UUID，沒有列出來的會無法使用：

```js
try {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ name: 'Francois robot' }],
    optionalServices: ['battery_service'] // 需列出會用到的服務
  })
} catch (error) {
  console.error(error)
}
```

有些裝置會用製造商 UUID 來廣播，你可以用以下的範例程式碼來篩選，這種情形下你會需要額外列出你會用到的服務 UUID，沒有列出來的會無法使用：

```js
try {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{
      manufacturerData: [{
        companyIdentifier: 0x00e0,
        dataPrefix: new Uint8Array([0x01, 0x02])
      }]
    }],
    optionalServices: ['battery_service'] // 需列出會用到的服務
  })
} catch (error) {
  console.error(error)
}
```

當使用者選擇藍牙裝置後，你就可以用以下的範例程式碼來連線到藍牙裝置：

```js
try {
  const device = await navigator.bluetooth.requestDevice({ 
    filters: [{ services: ['battery_service'] }]
  })
  console.log(device.name) // 裝置名稱
  // 嘗試連線到 GATT 伺服器
  const server = await device.gatt.connect()
} catch (error) {
  console.error(error)
}
```

你可以用以下的範例程式碼來讀取一個藍牙特徵的資料：

```js
try {
  const device = await navigator.bluetooth.requestDevice({ 
    filters: [{ services: ['battery_service'] }]
  })
  const server = await device.gatt.connect()
  // 取得 Battery 服務
  const service = await server.getPrimaryService('battery_service')
  // 取得 Battery Level 特徵
  const characteristic = await service.getCharacteristic('battery_level')
  // 讀取 Battery Level，value 的型別為 DataView
  const value = await characteristic.readValue()
  console.log(`Battery percentage is ${value.getUint8(0)}`)
} catch (error) {
  console.error(error)
}
```

有些藍牙特徵會支援在資料有變動時主動發送 Notification，此時你可以用以下的範例程式碼來監聽事件：

```js
try {
  // ...省略部分程式碼...
  // 定義 Battery Level 變更事件處理函式
  const onBatteryLevelChanged = eventOrValue => {
    const value = eventOrValue?.target?.value ?? eventOrValue
    console.log(`Battery percentage is ${value.getUint8(0)}`)
  };
  // 取得 Battery Level 特徵
  const characteristic = await service.getCharacteristic('battery_level')
  characteristic.addEventListener('characteristicvaluechanged', onBatteryLevelChanged)
  // 讀取 Battery Level
  onBatteryLevelChanged(await characteristic.readValue())
  // 開始接收 Notification
  await characteristic.startNotifications()
} catch (error) {
  console.error(error)
}
```

你可以使用以下的範例程式碼來寫入資料到藍牙特徵：

```js
try {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: ['heart_rate'] }]
  })
  const server = await device.gatt.connect()
  const service = await server.getPrimaryService('heart_rate')
  const characteristic = await service.getCharacteristic('heart_rate_control_point')
  const resetEnergyExpended = Uint8Array.of(1)
  await characteristic.writeValue(resetEnergyExpended)
  console.log('Energy expended has been reset.')
} catch (error) {
  console.error(error)
}
```

當裝置使用完畢後，你可以用以下的範例程式碼來中斷與藍牙裝置的連線：

```js
try {
  const device = await navigator.bluetooth.requestDevice({ 
    filters: [{ name: 'Francois robot' }] 
  })
  device.addEventListener('gattserverdisconnected', event => {
    const device = event.target;
    console.log(`Device ${device.name} is disconnected.`)
  })
  const server = await device.gatt.connect()
  // ...省略部分程式碼...
  device.gatt.disconnect() // 中斷連線
} catch (error) {
  console.error(error)
}
```

在這個段落裡面的範例程式碼，有很多都是節錄自以下的教學文章，文章的原始內容絕對比均民寫更詳細，推薦想用這個 API 的讀者一定要去詳讀：

[Communicating with Bluetooth devices over JavaScript](https://developer.chrome.com/docs/capabilities/bluetooth)

![image](https://hackmd.io/_uploads/HJIQtONBye.png)

### 開發<span style="color: gray">~~踩雷~~</span>經驗分享

#### HTTPS Only

瀏覽器為了保護使用者的隱私，這個 API 被限制只能在 HTTPS 的網頁中使用，你會需要幫你的網站加上有效的 HTTPS 憑證。

如果你想要在本機進行開發及測試，均民推薦使用 mkcert 來幫自己簽發一個本機的有效憑證，如果是想在開發的過程中用手機測試或是臨時 DEMO 給其他人看，均民推薦使用 ngrok 來臨時把本機的 HTTP 網址轉換成 HTTPS 的網址。

#### 需由使用者的互動事件觸發

使用選擇裝置的 API 時，需由使用者的互動事件觸發，例如觸控的 touch 事件、左鍵點擊的 click 及 pointerup 事件…等，這個是瀏覽器的安全性限制，避免這個 API 在使用者不知道的情況下被濫用。

#### 如何確認藍牙裝置的廣播封包

![image](https://hackmd.io/_uploads/B1ypKdErJg.png)

均民推薦使用 [nRF Connect for Android](https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp) 這個 APP 來看藍牙的廣播封包。

當你使用這個 APP 成功掃描到藍牙裝置後，你可以按下 MORE 按鈕（如圖①）來看實際上收到的藍牙廣播內容與歷史資料（如圖②），然後你可以切換到 FLAGS & SERVICES 分頁（如圖③）來看到藍牙廣播內的服務 UUID。

#### 多台裝置該如何分辨？

如果使用者身邊有多個同型號的藍牙裝置，你會需要想辦法幫使用者正確選擇裝置。

最常見的方式就是讓裝置有不同的裝置名稱，以 Chromecast 為例，裝置名稱都是以 Chromecast 當開頭，然後接上一個隨機的數字來幫助使用者區分：

![image](https://hackmd.io/_uploads/ryCZhd4Hyg.png)

除了裝置名稱之外，你也可以自行定義其他藍牙封包的內容，來幫助使用者區分不同的裝置。

#### 可能會拿不到藍牙位址

在部分作業系統與瀏覽器上，為了保護使用者的隱私，避免被藍牙裝置追蹤，作業系統或瀏覽器會隱藏裝置真正的藍牙位址，如果你的程式需要這個資料，你就需要想辦法繞過這個限制，例如把藍牙位置放在藍牙廣播的資料內，或是在成功與裝置連線後，透過自定義的指令來詢問裝置的藍牙位址。

#### 被隱藏的 BEACONs

在部分作業系統與瀏覽器上，為了保護使用者的隱私，避免被藍牙 BEACON 追蹤（如：iBeacon 及 Eddystone），作業系統或瀏覽器會隱藏這些藍牙 BEACON，如果你想要使用這個 API，你只能讓你的藍牙裝置不要廣播 BEACON 的訊號。

![image](https://hackmd.io/_uploads/HkjqRuEr1e.png)

#### 如何找到藍牙服務 UUID 與藍牙特徵 UUID

![image](https://hackmd.io/_uploads/HkMRAd4Hkx.png)

均民推薦使用 [nRF Connect for Android](https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp) 這個 APP，來看連線到藍牙裝置後，藍牙服務的 UUID 與藍牙特徵 UUID 列表，這個清單通常會比廣播封包的資料多，因為藍牙廣播封包內的資料長度有限。

當你使用這個 APP 成功掃描到藍牙裝置後，你可以按下 CONNECT 按鈕（如圖①）來連線到藍牙裝置，然後你在 CLIENT 分頁（如圖②）就可以看到完整的藍牙服務 UUID 列表。當你找到你想看的服務 UUID 後，你可以按下服務（如圖③，以 Nordic UART Service 為例）來看到該服務底下完整的藍牙特徵 UUID 列表，以及每個藍牙特徵所支援的功能（如：`WRITE`、`WRITE NO RESPONSE`、`NOTIFY`、`INDICATE`）。

#### UART Over BLE

如果你是透過某些硬體把 UART 轉換成 BLE，這些硬體通常把 UART 轉換成一個藍牙服務，然後讀取跟寫入資料會各使用一個藍牙特徵。

![image](https://hackmd.io/_uploads/SJjubtNryl.png)

#### BLE MTU 限制

藍牙特徵在讀寫資料時，會有單次最多可傳輸資料量的限制，扣除一些藍牙底層所需的資料後，預設可傳送的資料量為 20 bytes，這個資料量的長度限制可以在成功與藍牙裝置連線之後，透過 MTU 協商的機制來增加，但協商之後 MTU 可以增加多少會因系統、瀏覽器、以及藍牙裝置而異。

為了要最大程度的相容最小的 MTU，建議在設計硬體 Protocol 的時候，要能夠允許一個指令分成多次藍牙封包來傳送，以便支援透過藍牙進行韌體更新的使用情境。

#### 網頁失去焦點就會噴錯

在透過 API 選擇裝置的時候，如果瀏覽器失去焦點（如：系統跳出藍牙配對、詢問允許裝置連接、使用者自己切換到別的視窗…等），就會導致這個 API 噴錯，這個是瀏覽器的安全性限制，所以在開發的時候，需要做好錯誤處理。

![image](https://hackmd.io/_uploads/SyD_XO4H1e.png)

## 認識常見的硬體 Protocol

### AT Command

![image](https://hackmd.io/_uploads/ByuXmYVrkx.png)

這種 Protocol 都會習慣使用 ASCII 中的可見字元，以便人類閱讀以及輸入指令，並且指令都會以 `AT` 作為開頭，並以 CR 符號 `'\r'` 或是 LF 符號 `'\n'` 來當作指令的結尾。

### [APDU](https://en.wikipedia.org/wiki/Smart_card_application_protocol_data_unit)

![image](https://hackmd.io/_uploads/rkMQEF4H1g.png)

這種 Protocol 通常都會設計成 binary 格式，不易人類閱讀，這種格式常見於智慧卡 Smart Card 相關的裝置上。

### 自定義格式

![image](https://hackmd.io/_uploads/SJskBKNSkg.png)

如果你想要自定義 Protocol 的格式，通常會有一些不約而同的規則。以 ChameleonUltra 這個硬體為例，為了要支援一個指令可以分成多次藍牙封包來傳送，通常會有代表指令開始的資料（如：SOF 及 LRC1），然後再來則是指令代號（如：CMD）、資料長度（如：LEN）等重要資料，然後才會是資料的內容。通常也會設計指令的校驗碼，會根據指令的內容來產生，以便驗證指令的正確性。

### 處理二進位資料

如果硬體的 Protocol 是 binary 格式，你就會需要對二進位的資料進行編碼或是解碼。在原生的 JavaScript 中，你可以透過 `ArrayBuffer`, `UInt8Array`, `DataView` 來處理，但這三個資料形態不算好用；在 Node.js 中，有內建一個名為 Buffer 的資料形態可以很輕鬆的處理二進位的資料，但在瀏覽器上就需要找一些第三方的套件來輔助。均民有自己開發一個 NPM 的套件來模擬 Node.js 內建的 Buffer，網址如下：

<https://taichunmin.idv.tw/js-buffer/>

### Little/Big Endian

在對二進位的資料進行編碼或是解碼時，可能會因為硬體儲存資料的方式不同，需要注意該使用 Little Endian 或是 Big Endian。以下是以 `0x01020304` 這個資料為例，分別示範不同的 Endian 會如何儲存資料：

![image](https://hackmd.io/_uploads/HkoZdF4rkl.png)

## 相關連結

如果在看過文章之後，想跟我進行交流，歡迎透過 [Facebook](https://www.facebook.com/taichunmin) 跟我聯繫。

- [Read from and write to a serial port](https://developer.chrome.com/docs/capabilities/serial)
- [Communicating with Bluetooth devices over JavaScript](https://developer.chrome.com/docs/capabilities/bluetooth)
- [Building a device for WebUSB](https://developer.chrome.com/docs/capabilities/build-for-webusb)
- [List of USB ID's](http://www.linux-usb.org/usb.ids)
- [Chrome 使用序列埠](https://andyyou.github.io/2022/04/11/serial-web-api/)
- [`@taichunmin/buffer`](https://taichunmin.idv.tw/js-buffer/)
