# ch17/ex06

## 問題 17.5 について、webpack の設定でバンドル時にソースマップを生成するようにしなさい。バンドルしたコードを利用するページをローカルサーバで配信してブラウザから閲覧し、開発者コンソールを利用して以下を確認して結果を記載しなさい。

### 開発者ツールで ソース タブ(Chrome, Edge, Safari) または デバッガー タブ(Firefox) を開き、ソースコードファイルがどのように表示されるかを確認しなさい。

- 表示結果
    - ![alt text]({3E5DF4B7-0F89-46E0-829B-DD1E4300AD40}.png)
    - Chromeで検証
    - webpack://というフォルダが追加されており、その中にバンドル前のソースコードが表示されるようになる。
    - webpack://内にwebpackというフォルダも生成されている

### バンドルしたコードの実行中に、バンドル前のソースコードファイルに基づいたブレークポイントの設定や変数の値の確認等のデバッグが可能か確認しなさい。

- 結論
    - index.jsも、index.jsから呼び出されるrenderGrid.jsやupdateGrid.jsもブレークポイントを設定して変数の値の確認等のデバッグが可能である。
- 実施方法
    1. バンドル前の各ファイルにブレークポイントを設置
        - index.js: canvasがクリックされた時の処理内
            - ![alt text]({3A54974E-DCA7-4B71-A2C2-BCE1AAC5D96D}.png)
        - renderGrid.js:  処理の最後
            - ![alt text]({3759ECA8-2C2D-4212-92C6-2033D761E8F5}.png)
        - updateGrid.js: countをreturnする時
            - ![alt text]({D37B3D0F-6FFA-43AE-9B66-B5C2F73E5C46}.png)
    1. 各ブレークポイントを通る処理を実施
        - index.js: セルをクリック
            - ![alt text]({125B298F-2089-4FF4-A938-6A5DD1550D6B}.png)
        - renderGrid.js: リロード
            - ![alt text]({9967F45C-D122-4549-A2C7-AB48B9D7A8FF}.png)
        - updateGrid.js: ライフゲームをスタートする
            - ![alt text]({823EAE1F-7D7D-47D8-B37C-BC01C3D6755F}.png)