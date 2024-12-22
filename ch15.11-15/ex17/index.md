# ch15.11-15/ex17

## 実際のサービスの通信をデベロッパーツールなどで眺めて CORS の設定を確認しなさい。(金融系の認証ページなどで CORS の設定がされていることが多い)

- 確認対象サイト
    - [SBI証券のログインページ](https://www.sbisec.co.jp/contents/)

- 設定内容
    - Access-Control-Arrow-Credentials: true
    - Access-Control-Arrow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
    - Access-Control-Arrow-Origin: https://www.sbisec.co.jp

- 確認手順
    1. ログインページ開く
    2. 開発者ツール起動
    3. ネットワーク開く
    4. リロード
    5. 適当に選択してヘッダーを確認
