import * as net from 'net'

export function createServer() {
    const server = net.createServer((socket) => {
        socket.on('data', (data) => {
            const request = data.toString();
            // \r\n：HTTPプロトコルではヘッダーの行はこれで区切られるらしい
            const [headers, body] = request.split('\r\n\r\n');
            const [requestLine, ...headerLines] = headers.split('\r\n');
            const [method, path] = requestLine.split(' ');

            // "/"が GET されたとき以下の HTML を返却する
            if (method === 'GET' && path === '/') {
                const response = `
    HTTP/1.1 200 OK
    Content-Type: text/html
    
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Greeting Form</title>
      </head>
      <body>
        <form action="/greeting" method="POST">
          <label for="greeting">Name:</label>
          <input type="text" id="name" name="name" />
          <input type="text" id="greeting" name="greeting" />
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
    `;
                socket.write(response);
            } else if (method === 'POST' && path === '/greeting') { // 1.のフォームから/greetingに POST されたとき、nameとgreeting の内容をボディに含む HTML を返却する
                const params = new URLSearchParams(body);
                const name = params.get('name');
                const greeting = params.get('greeting');
                const response = `
    HTTP/1.1 200 OK
    Content-Type: text/html
    
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Greeting</title>
      </head>
      <body>
        <h1>Hello, ${name}!</h1>
        <p>${greeting}</p>
      </body>
    </html>
    `;
                socket.write(response);
            } else {
                const response = `
    HTTP/1.1 ${method === 'GET' || method === 'POST' ? '404 Not Found' : '405 Method Not Allowed'}
    Content-Type: text/plain
    
    ${method === 'GET' || method === 'POST' ? 'Not Found' : 'Method Not Allowed'}
    `;
                socket.write(response);
            }
            socket.end();
        });
    });

    return server;
}

// server.listen(8080, () => {
//     console.log('Server is listening on port 8080');
// });

// 検証用コード
let server;
let clients = [];
server = createServer();
server.listen(8080, () => {
    console.log('listen')
    const connectFunc = () => {
        const client = new net.Socket();
        try {
            client.connect(8080, '127.0.0.1', () => {
                console.log("connect:" + clients.length);
                clients.push(client);
                // if (clients.length == 9000) return;
                connectFunc();
            });
        } catch (e) {
            console.log(clients.length)
            console.error(e);
        }
    };
    connectFunc();
});