# ch15.04-10/ex14

## 問題

### ブラウザの開発者ツールの「ネットワーク」タブを確認してみよう。リンクをクリックしたときに通信は発生しているだろうか？

- 通信が発生している。
  - Fooをクリック→foo?\_rsc=j6y5i
  - Barをクリック→bar?\_rsc=14roc
  - ページを丸々とるような通信ではない

### pushState はいつ実行されているだろうか？

- Linkで囲われたBarやFooをクリックした時

### 15.4-10.12 では pushState を使った実装でページのリロード時に正しく動作しなかったが、この問題ではどうだろうか？

- リロードしても404エラーになることなく画面が表示され、barなら「This is Bar!」がfooなら「This is Foo!」が表示されるため、適切に表示されていることがわかる。
- SSRされている。
