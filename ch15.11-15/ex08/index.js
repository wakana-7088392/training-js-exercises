// 1の対応
function sendRequest(ws, requestBody, timeout = 10000) {
    return new Promise((resolve, reject) => {
        // ランダムな値を生成　これでどのリクエストなのかを識別
        const requestId = Math.random().toString(36).substring(2, 15);
        const message = JSON.stringify({ requestId, body: requestBody });

        const handleMessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.requestId === requestId) {
                ws.removeEventListener('message', handleMessage);
                clearTimeout(timeoutId);
                resolve(response.body);
            }
        }

        // ソケットが切断された時の処理
        const handleClose = () => {
            ws.removeEventListener('message', handleMessage);
            clearTimeout(timeoutId);
            reject(new Error('WebSocket connection closed'));
        };

        // タイムアウトした場合の処理
        const timeoutId = setTimeout(() => {
            ws.removeEventListener('message', handleMessage);
            ws.removeEventListener('close', handleClose);
            reject(new Error('Request timed out'));
        }, timeout);

        ws.addEventListener('message', handleMessage);
        ws.addEventListener('close', handleClose);

        // サーバにメッセージを送信
        ws.send(message);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const ws1 = new WebSocket('ws://localhost:3003');
    const sendRequestsButton = document.getElementById('send-requests');

    sendRequestsButton.addEventListener('click', () => {
        const requestBodies = document.querySelectorAll('.request-body');
        // 3の対応　入力ボックスの数だけ処理をまわす
        requestBodies.forEach((input) => {
            const requestBody = input.value;
            // 次の兄弟要素(response要素)を取得
            const responseContainer = input.nextElementSibling;
            sendRequest(ws1, requestBody)
                .then(response => {
                    responseContainer.textContent = `Response: ${response}`;
                    responseContainer.className = 'response';
                })
                .catch(error => {
                    responseContainer.textContent = `Error: ${error.message}`;
                    responseContainer.className = 'error';
                });
        });
    });

    // 2の対応
    const ws2 = new WebSocket('ws://localhost:3003');
    ws2.addEventListener("message", (event) => {
        const response = JSON.parse(event.data);
        const newResponseBody = "Hello," + response.body;
        ws2.send(JSON.stringify({ ...response, body: newResponseBody }));
    })
});