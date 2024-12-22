# 問題点

- evalと同様の問題がある

  - 具体的には
    - 効率が悪い
    - 悪意のあるコードが実行される可能性がある(無限ループさせる、ローカル変数が読み取られたり変更される など)  
      などが挙げられる。
  - ただ、「グローバルスコープで実行される関数のみを生成」[^1]するという点はevalとは異なるとのこと。

- 参考文献
  - [^1] :
    [ MDN「Function() コンストラクター」 ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)
  - [ MDN「直接eval()を使用しないでください」 ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_direct_eval!)
