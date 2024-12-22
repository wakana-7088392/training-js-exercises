# ch16/ex01

## 用語「マルチスレッド」について調べなさい。
- １つのコンピュータプログラムを実行する際に、アプリケーションのプロセス(タスク)を複数のスレッドに分けて並行処理する流れのこと。
- 対義語にあたるシングルスレッドは、ソースコード上から順に一つの処理を行う

## フィボナッチ数を計算するmFib.jsをスレッド数を変更しながら実行し(*1)、コンソール出力とOS機能(*2)で結果とスレッド数を確認しなさい。

- 引数45と1
    - スレッド数：17
    - 結果：14.932s
- 引数45と2
    - スレッド数：18
    - 結果：10.461s
- 引数45と3
    - スレッド数：19
    - 結果：8.357s
- 引数45と4
    - スレッド数：20
    - 結果：7.476s
- 引数45と5
    - スレッド数：21
    - 結果：7.104s
- 引数45と6
    - スレッド数：22
    - 結果：7.046s 
- 引数45と7
    - スレッド数：23
    - 結果：6.870s
- 引数45と8
    - スレッド数：24
    - 結果：6.992s
- 引数45と100
    - スレッド数：116
    - 結果：7.903s

スレッドを作ることによるオーバーヘッドが大きい？
スレッドを作るのが重たいみたい


## あなたのPCのCPUスペックを調査し、適切なスレッド数についての考察を記しなさい。

- スペック
    - 名前：11th Gen Intel(R) Core(TM) i7-1185G7 @ 3.00GHz   1.80 GHz
    - コアの数：4
    - スレッド総数：8
    - ハイパースレッディングというものらしい
    - [詳細](https://www.intel.co.jp/content/www/jp/ja/products/sku/208664/intel-core-i71185g7-processor-12m-cache-up-to-4-80-ghz-with-ipu/specifications.html)

- PCスペックの確認方法
    - タスクマネージャーを開く

- 適切なスレッド数
    - 4
- 適切なスレッド数の理由
    - 4まで増やすと急激に処理速度が上がるが、5以降は速度が安定しなかったから。

## 参考サイト
- [マルチスレッド-ICT用語集-NTT西日本](https://www.ntt-west.co.jp/business/glossary/words-00262.html#:~:text=%E3%83%9E%E3%83%AB%E3%83%81%E3%82%B9%E3%83%AC%E3%83%83%E3%83%89%E3%81%A8%E3%81%AF%E3%80%81%E4%B8%80,%E3%81%A4%E3%81%AE%E5%87%A6%E7%90%86%E3%82%92%E8%A1%8C%E3%81%AA%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)