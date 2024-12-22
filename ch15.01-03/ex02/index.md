# ch15.01-03/ex02

## ブラウザで動的なスクリプトのインポート (await import(url)) できる環境を構築して動作確認しなさい (可能ならば cross-site にしなさい)。またその動作確認方法を文書で記述しなさい。

- 環境構築

  - http-serverをインストール

- 動作確認方法

  1. npx http-server --corsで1つサーバーを起動し、ポート番号8080のページを開く。
  2. 別のターミナルを開き、npx http-serverでもう一つ起動、ポート番号8081のページを開く。
  3. 8080ページでアラートが出ることを確認。
  4. 8081でもawait import("http://127.0.0.1:8080/index.js")で8080のindex.jsを参照し、8080と同様にアラートが出ることを確認。

- メモ

  - --corsを使用すると、http-serverの設定にあるCORS項目がtrueになり、サイトがAccess-Control-Allow-Origin \* になる。これにより、cross-site？が可能になる。
  - http-serverのCORSの設定はデフォルトではdisabledのため--corsでの設定変更が必要。
  - 上記の設定は、参照される側のみ設定すれば問題なかった。

- netlifyというツールがある？
  - サーバーにおいておく
  - どれなら許可するかをそのツール側で制御
