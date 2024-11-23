// (コピペ)50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("./decision1.mp3");

// 追加　socketが作られていなかったら作って通信を形成する
const getSocket = (() => {
    let socket = null;
    return () => {
        if (socket) return socket;
        return socket = new WebSocket("ws://localhost:3003");
    }
})()

// 追加　クライアントからメッセージを送信する
function socketSendObject(obj) {
    getSocket().send(JSON.stringify(obj))
}

// 追加　updateが送られてきた際に盤面を更新する処理
function socketMessageHandler(event) {
    try {
        const data = JSON.parse(event.data);
        if (data.type === "update")
            renderGrid(data.grid);
    } catch (e) { return; }
}

// (コピペ)grid を canvas に描画する
function renderGrid(grid) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = grid[row][col];
            ctx.beginPath();
            ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.stroke();
        }
    }
}

// 盤面をクリックした時
canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    sound.cloneNode().play();
    // メッセージを送信
    socketSendObject({ type: "toggle", row, col })
});

startButton.addEventListener("click", () => {
    // メッセージを送信
    socketSendObject({ type: "start" })
});

pauseButton.addEventListener("click", () => {
    // メッセージを送信
    socketSendObject({ type: "pause" })
});

// 個別で追加
resetButton.addEventListener("click", () => {
    // メッセージを送信
    socketSendObject({ type: "reset" })
});

window.addEventListener('DOMContentLoaded', () => {
    getSocket().addEventListener('message', socketMessageHandler);
});