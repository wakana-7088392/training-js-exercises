# 個人用メモ
## BroadcastChannel API
- 同じオリジン間の異なるブラウザコンテキスト(ウィンドウ、タブ、フレーム)の間でメッセージを送受信するためのweb API。これにより複数タブやウィンドウ間でリアルタイムにデータを共有することが可能。

- 今回の処理
    - todo登録などの処理を実行した際にチャンネルにメッセージを送信
    - channel.addEventListenerでメッセージを受信し、受信した際はaddTodoToDOM処理を呼ぶ

## 参考リンク
- (MDN ブロードキャストチャンネルAPI)[https://developer.mozilla.org/ja/docs/Web/API/Broadcast_Channel_API]