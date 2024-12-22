- 提供されたコードを実行した結果、問いにあるような事象に遭遇したか。
  - 遭遇した。
- なぜこのような結果になるのか。

  - 今回のようなコードは無意味なループや無意味なコードとみなされる可能性があり、その場合はV8(Javascriptエンジン？)で最適化(取り除かれる)が発生してしまうから…？

- 参考サイト  
  [V8の最適化とIRHydraでの可視化とベンチマークについてのメモ](https://efcl.info/2014/09/13/v8-optimization-memo/)

- 解説
  - タイマー自体の性能は差が出ない
  - performance.nowが丸められることもあるが、今回の問いにおいては関係がないっぽい
  - LICM　コンパイルが最適化してくれちゃう