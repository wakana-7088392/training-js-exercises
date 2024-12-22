# ch15.11-15/ex18

## 問題：Web アプリケーションがユーザの機密情報をセキュアに扱うためにはどのようなことが必要になるか記述しなさい。ブラウザでの対応に限らず、Web アプリケーション全般を対象として考えること。

### 回答

- アクセス制御
    - ユーザー認証の方式
        - HTTP認証
            - ベーシック認証
            - ダイジェスト認証
    - ログインフォーム
    - 外部のユーザー認証サービス
- セッション対策
    - ページの連続性追跡の方式
    - ログイン維持の方式
- 暴露対策
- 入力対策
- エコーバック対策
- マッシュアップ

- DDoS軽減
- WAFの導入
    - ウェブアプリケーションファイアウォール
- APIゲートウェイ
- 暗号化証明書の管理
- ボット管理
- クライアントサイドセキュリティ
- 攻撃対象領域の管理



## 参考サイト
- [IPA セキュア・プログラミング講座2007年版 webアプリケーション編](https://www.ipa.go.jp/archive/security/vuln/programming/web/chapter1/index.html)
- [Cloudflare Webアプリケーションセキュリティ](https://www.cloudflare.com/ja-jp/learning/security/what-is-web-application-security/)