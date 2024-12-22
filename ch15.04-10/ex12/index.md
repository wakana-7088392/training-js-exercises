# ch15.04-10/ex12

## 15.4-10.11 は hashchange を利用した。もし以下のように pushState を利用した実装にした場合どうなるだろうか？ 途中までの実装を ex12 に用意した。

### Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか。hashchange と pushState それぞれの実装について調べなさい(ヒント: 開発者ツールでどのような通信が発生しているか調べてみなさい)。

- やり方

  - タスクを2つ追加して、activeとcompleteに１つずつタスクがある状態にする。
  - activeに遷移する。
  - リロードする。

- hashchange

  - リロード前の#値の変更時はネットワーク通信は発生しない。
  - リロードすると、http://127.0.0.1:8080/ch15.04-10/ex11/　までがリクエストとして送信される。
  - #自体はローカルに残り続けているため、リロードしても残っている。
  - JavaScriptで追加しているだけなので、タスクは消える。

- pushState

  - リロードする前はactive等遷移が可能。ネットワーク通信は発生しない。
  - リロードをするとページが見つからない、404エラーが出る。ネットワーク通信を見ると、http://127.0.0.1:8080/ch15.04-10/ex12/active でリクエストが送信されている。
  - サーバーには上記のようなパスは存在しないため、エラーが発生する。

### ここまでの例は serve コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。

- サーバー側でactiveとかcompleteといったパスに適切にルート設定して、ハンドリングできるようにする。