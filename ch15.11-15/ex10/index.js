document.getElementById("image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
        img.src = e.target.result;
    });

    img.addEventListener("load", () => {
        const originalCanvas = document.getElementById("original");
        const filteredCanvas = document.getElementById("filtered");
        const originalCtx = originalCanvas.getContext("2d");
        const filteredCtx = filteredCanvas.getContext("2d");

        originalCanvas.width = img.width;
        originalCanvas.height = img.height;
        filteredCanvas.width = img.width;
        filteredCanvas.height = img.height;

        originalCtx.drawImage(img, 0, 0);

        const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

        // ここから追加
        // WebWorkerにデータを送信
        const worker = new Worker("worker.js");
        worker.postMessage({ imageData: imageData, width: img.width, height: img.height });

        worker.addEventListener("message", (e) => {
            const outputImageData = new ImageData(e.data.outputData, img.width, img.height);
            filteredCtx.putImageData(outputImageData, 0, 0);
        });
        // ここまでが追加、以下の処理はworker.jsに移動している。
    });
    reader.readAsDataURL(file);
});

// アニメーションのコード(ページ内に動くオブジェクトを配置し、画像変換中にメインスレッドがブロックされていないことを確認する)
const ball = document.getElementById("ball");
let posX = 0;
let posY = 0;
let directionX = 1;
let directionY = 1;

function animateBall() {
    const maxX = window.innerWidth - ball.offsetWidth;
    const maxY = window.innerHeight - ball.offsetHeight;

    posX += directionX * 2;
    posY += directionY * 2;

    if (posX <= 0 || posX >= maxX) {
        directionX *= -1;
    }
    if (posY <= 0 || posY >= maxY) {
        directionY *= -1;
    }

    ball.style.left = posX + "px";
    ball.style.top = posY + "px";

    requestAnimationFrame(animateBall);
}

animateBall();
