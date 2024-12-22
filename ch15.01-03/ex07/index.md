# ch15.01-03/ex07

## 自分が運営する販売サイトにYouTubeのトップページをiframeで組込み、更に自作のscript.jsによりiframe内のデータを分析しようとしています。しかし、トップページを読み込むとエラーになります。用語「クリックジャッキング」を調べて理由を説明しなさい。

- 理由

  - クリックジャッキングの対策としてYouTubeでは、iframeで読み込む際は同一オリジンポリシーとCORSが適用されているから。
    - YouTubeでは、iframe内でのクロスオリジンリクエストを制限している。これにより、iframe内のコンテンツに直接アクセスすることはできない。

- メモ
  - クリックジャッキング
    - 細工されたwebサイトを閲覧操作することで、利用者が意図しない機能を実行させられる事象のこと。
  - iframe
    - HTMLページに他のページを埋め込むことができる。
  - クロスオリジンリクエスト
    - あるwebページが自分のオリジン(プロトコル、ドメイン、ポートが一致するURL)とは異なるオリジンに対してHTTPリクエストを送信することを指す。

## また、script.jsも動作しません。ここで、同一オリジンポリシーがなく、iframe内の他サイトのDOM変更が可能な仕様を想定し、どのような重大な問題が発生しうるか記載しなさい。

- クロスサイトスクリプティングが発生しうる。
  - 攻撃者によって任意の、それも悪質なコードを埋め込むことが可能になり、個人情報流出等の問題が起こりうる。

## 参考サイト

- [MDN <iframe>](https://developer.mozilla.org/ja/docs/Web/HTML/Element/iframe)

- [IPA クリックジャッキング](https://www.ipa.go.jp/security/vuln/websecurity/clickjacking.html)

- [【CORSエラー】iframeタグでのYouTube動画埋め込み](https://qiita.com/g0zarre/items/14b3c8d01f8b63914b4e)
