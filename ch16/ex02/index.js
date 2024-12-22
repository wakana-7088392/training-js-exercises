import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
    const childPath = path.join(__dirname, "child.js");
    child = spawn("node", [childPath]);

    child.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });

    return new Promise((res) => {
        child.on("close", (code, signal) => {
            res([code, signal]);
        });
    });
}
// TODO: ここに処理を書く
// 子プロセスを監視する
async function monitor() {
    while (true) {
        const [code, signal] = await startChild();
        // codeが0以外(基本1?)の場合は監視を継続
        if (code !== 0) {
            console.log(`code:${code} ループ継続`);
        } else {
            // 0(正常終了)の場合は抜ける
            break;
        }
    }
}

// シグナルを受け取った時の処理
function handle(signal) {
    if (child) {
        // 子プロセスを引数のシグナルで終了
        child.kill(signal);
        // 子プロセスの終了を確認して実行
        child.on("close", (code, childSignal) => {
            // シグナルが同じであることを確認
            if (childSignal === signal) {
                console.log(`signal:${signal} exitする`)
                process.exit(0);
            }
        })
    }
}

// SIGINTとSIGTERMシグナルが来た時に動くようにする
process.on("SIGINT", () => handle("SIGINT"));
process.on("SIGTERM", () => handle("SIGTERM"));

monitor();

