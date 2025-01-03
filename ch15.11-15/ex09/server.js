import WebSocket, { WebSocketServer } from "ws";

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1秒当たりの更新頻度
const FRAME_RATE = 10;

// WebSocketのポート
const port = 3003;
const wss = new WebSocketServer({ port });

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
    .fill(null)
    .map(() =>
        new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
    );
// 停止状態
let paused = true;

wss.on("connection", (ws) => {
    console.log('client connected');

    // 接続されたクライアントに初期のグリッドを送信
    ws.send(JSON.stringify({ type: "update", grid }));

    ws.on("message", (message) => {
        const data = JSON.parse(message.toString());
        switch (data.type) {
            case "toggle": // セルの反転
                grid[data.row][data.col] = !grid[data.row][data.col];
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "update", grid }));
                    }
                });
                break;
            case "pause": // 停止
                paused = true;
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "pause" }));
                    }
                });
                break;
            case "start": // 開始・再開
                paused = false;
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "start" }));
                    }
                });
                break;
            case "reset": // (追加)初期化
                paused = true;
                grid = new Array(ROWS)
                    .fill(null)
                    .map(() =>
                        new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
                    );
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "update", grid }));
                    }
                });
                break;
        }
    });
});

// 15.04-10 ex10よりコピペ
function countAliveNeighbors(grid, x, y) {
    let count = 0;
    // 対象に隣接する箇所をループで確認する
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue; // 自分自身はカウントしない
            }
            const row = x + i;
            const col = y + j;
            // グリッドの範囲内かどうかをチェック
            if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
                count += grid[row][col] ? 1 : 0;
            }
        }
    }
    return count;
}


// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する
            // 15.04-10 ex10よりコピペ
            const aliveNeighbors = countAliveNeighbors(grid, row, col);

            if (grid[row][col]) {
                // 現在のセルが生存している場合
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    nextGrid[row][col] = false; // 過疎または過密で死滅
                }
            } else {
                // 現在のセルが死んでいる場合
                if (aliveNeighbors === 3) {
                    nextGrid[row][col] = true; // ちょうど3つの生存セルに囲まれて誕生
                }
            }
        }
    }
    return nextGrid;
}

// 全クライアントにグリッドの状態をブロードキャストする
function broadcast(grid) {
    const message = JSON.stringify({ type: "update", grid });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// 1秒に10回グリッドを更新し、クライアントに送信する
setInterval(() => {
    if (paused) {
        return;
    }
    grid = updateGrid(grid);
    broadcast(grid);
}, 1000 / FRAME_RATE);
