## jQuery Deferred について調べ Promise との関係性について説明しなさい。

# 回答

- jQuery DeferredとJavaScript Promiseはどちらも非同期処理を扱う手段である。jQuery Deferredが先に登場した後にJavaScript Promiseが出てきている。扱うメソッド名が異なるほか、どちらにも存在するthenというメソッドの挙動が異なる。現在はJavaScriptのPromiseの方が他の処理(async awaitなど)と互換性が良いのではないかと思う。

# jQuery Deferred とは

- jQuery1.5で導入されたオブジェクトで、jQuery.Deferred()メソッドを呼び出すことによって作成される連鎖的なユーティリティオブジェクト。
- Defferredオブジェクトを生成することで自動的にPromiseオブジェクトが生成されており、DeferredにPromiseが内包していると言える。

# jQuery DeferredとJavaScript Primiseについて

- 時系列
  - jQuery Deferredが出たバージョン1.5が2011年、JavaScriptのPromiseが出たのが2015年。
  - Deferredが先でJavaScriptのPromiseが後。JavaScriptのPromiseが作られる前はよく使われていたのかもしれない。
  - JavaScriptのPromiseが出た後、jQueryでは、JavaScriptのPromiseと互換性をもつためにthenの仕様等を変更しているらしい。
- 共通点
  - 非同期処理に関わる。
  - Promiseが持つ状態として、処理中(待機)、完了、拒否といった3つの状態がある。
- 相違点
  - 使用するメソッドが若干異なる。
    - jQuery Deferred
      - then
        - doneと類似しているが、thenの場合は新しいjQueryPromiseを返すらしい。
      - done
        - thenと類似しているが、doneの場合は自分自身を返すらしい。
      - fail など…
    - JavaScript Promise
      - then
      - catch など…
- thenの挙動が異なる。
  - jQuery Deferred(Promise)の場合
    - thenに登録されたコールバックはsetTimeoutに渡して実行する。
  - JavaScript Promiseの場合
    - thenに登録されたコールバックはマイクロタスクキューに追加され、現在タスクが完了した直後に実行される。
    - setTimeoutに登録したコールバックよりも優先される。

# 参考サイト

- [公式サイト](https://api.jquery.com/category/deferred-object/)
- [Qiitaの記事](https://qiita.com/atti/items/17fd8b11305a5375a1de)
- [爆速でわかるjQuery.Deferred超入門](https://techblog.yahoo.co.jp/programming/jquery-deferred/)
