import WebSocket, { WebSocketServer } from "ws";

const port = 3003;
const wss = new WebSocketServer({ port });

// 他のクライアントにメッセージを転送する
wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        const message = data.toString();
        const waitTIme = Math.floor(Math.random() * 1000 * 5);
        console.log(message, `wait ${waitTIme}ms`);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && client != ws) {
                setTimeout(() => {
                    client.send(message);
                }, waitTIme);
            }
        });
    });
});



// import WebSocket, { WebSocketServer } from "ws";

// const port = 3003;
// const wss = new WebSocketServer({ port });

// // 他のクライアントにメッセージを転送する
// wss.on("connection", (ws) => {
//     ws.on("message", (data) => {
//         const message = data.toString();
//         const waitTIme = Math.floor(Math.random() * 1000 * 5);
//         console.log(message, `wait ${waitTIme}ms`);

//         try {
//             const request = JSON.parse(data.toString());
//             const { requestId, body } = request;
//             const responseBody = `Hello, ${body}`;
//             const response = JSON.stringify({ requestId, body: responseBody });

//             wss.clients.forEach((client) => {
//                 if (client.readyState === WebSocket.OPEN && client != ws) {
//                     setTimeout(() => {
//                         client.send(message);
//                     }, waitTIme);
//                 }
//             });

//             // リクエストしたクライアントにレスポンスを送信
//             ws.send(response);
//         } catch (error) {
//             console.error("Failed to process message:", error);
//         }

//     });
// });

// wss.on("connection", (ws) => {
//     ws.on("message", (data) => {
//         const request = JSON.parse(data.toString());
//         const { requestId, body } = request;
//         const responseBody = `Hello, ${body}`;
//         const response = JSON.stringify({ requestId, body: responseBody });

//         ws.send(response);
//     });
// });