# ch16/ex02

## 主にクラウド上で動作するプログラムは、いわゆる Graceful Shutdown という動作が求められ、上記のような処理が必要な場合がある。Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類は何か書きなさい。

- SIGTERM：終了要求のシグナル。プロセスはこれを受信後も動くことが可能。
- SIGKILL：強制終了。プロセスはこれ以上動作できない。

## メモ
- graceful shutdown
    - Webサーバの安全な停止方法の仕組み

## 参考リンク
- [ECS のアプリケーションを正常にシャットダウンする方法](https://aws.amazon.com/jp/blogs/news/graceful-shutdowns-with-ecs/)
- [DockerやKubernetesの終了: SIGTERMからSIGKILLまでの猶予期間](https://qiita.com/suin/items/122946f7d0cd13b143f9#:~:text=SIGTERM%20%E3%81%A8%20SIGKILL%20%E3%81%AE%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8A%E3%81%97%E3%81%9F%E7%90%86%E8%A7%A3,-SIGTERM%20%E3%81%A8%20SIGKILL&text=SIGTERM%20%3A%20%E7%B5%82%E4%BA%86%E8%A6%81%E6%B1%82%E3%81%AE%E3%82%B7%E3%82%B0%E3%83%8A%E3%83%AB,%E3%81%AF%E3%81%93%E3%82%8C%E4%BB%A5%E4%B8%8A%E5%8B%95%E4%BD%9C%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E3%80%82)