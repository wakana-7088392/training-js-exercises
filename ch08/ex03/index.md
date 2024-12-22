1. プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。

- 末尾再帰を使用すると、スタックを消費しなくなるから。
  - 末尾再帰は、ざっくりいうと「関数の return 文で **その関数自体だけ** を返す」[^1] こと
    - ソースコード例
      ```javascript:title
      function example(num) {
        ...
        return example(n);
      }
      ```
  - 末尾再帰を使用しない場合、再帰呼び出しをすると呼び出し元は処理途中の状態で呼び出した関数の完了を待つ必要がある。この時にスタックを消費する。
  - 末尾処理を使用する場合、呼び出し側は呼び出した関数の結果そのものを返すだけであり、呼び出し側はスタックを使用しなくて済み、呼び出された関数は呼び出し側が使用していたスタックを再利用できる。
  - そのため、スタックが消費されなくなり最適化ができる。

[^1]:
    [再帰関数に関するZennの記事](https://zenn.dev/kj455/articles/dfa23c8357b274) から引用  
    <br>
    その他参考文献  
    [「末尾再帰による最適化」](https://qiita.com/pebblip/items/cf8d3230969b2f6b3132)  
    [「再帰関数の末尾関数(最適化)について」](https://rn4ru.com/blog/posts/tail-recursion/)

2. JavaScript で末尾再帰最適化を実装している処理系を答えなさい。
   利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。  
   https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA

- JavaScript で末尾再帰最適化を実装している処理系
  - JavaScriptCore
    - SafariのJavascriptエンジン
    - URLのコードをSafariで実行したところInfinityが実行結果で出た。
  - その他参考文献  
     [^2]:
    [「CPS変換による末尾再帰化」](https://qiita.com/7shi/items/2d25f7afe25c3ca11acb)
