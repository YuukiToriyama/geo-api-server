# geo-api-server

## What is this?

住所正規化ツール[geolonia/normalize-japanese-addresses](https://github.com/geolonia/normalize-japanese-addresses)
および、逆ジオコーディングツールの[geolonia/open-reverse-geocoder](https://github.com/geolonia/open-reverse-geocoder)
をサーバーサイドで動かし、WebAPIとして使用できるようにしたものです。 

## Usage
Herokuにデプロイしてみましたが、無料版なので30分アクセスがないと自動的にスリープモードに入ってしまいます。
寝ているときは何度かリクエストを送って起こしてあげてください。  

- 住所の正規化
  - `https://geo-api-server.herokuapp.com/normalizeAddress?address=北海道札幌市西区24-2-2-3-3`
  - `{"pref":"北海道","city":"札幌市西区","town":"二十四軒二条二丁目","addr":"3-3","level":3}`
- 逆ジオコーディング
  - `https://geo-api-server.herokuapp.com/reverseGeocoding?lng=35.04486&lat=135.73016`
  - `{"code":"26101","prefecture":"京都府","city":"京都市北区"}`
  
## Thanks to...
本プログラムは株式会社Geolonia様の成果を活用したものです。
- GitHub
  - https://github.com/geolonia
- Official Site
  - https://geolonia.com/
