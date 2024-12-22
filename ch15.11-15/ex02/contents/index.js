const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
    // 操作できないようにする
    disableAction();
    // fetchWithTimeoutで3秒待機してもレスポンスがない場合はタイムアウトした旨をアラートで表示する
    let response = null;
    try {
        response = await fetchWithTimeout("/api/tasks", { method: "GET" }, 3000);
    } catch (e) {
        alert(e);
        enableAction();
        return;
    }

    if (await handleError(response)) {
        // 操作できるようにする
        enableAction();
        return;
    }
    const body = await response.json();
    for (const task of body.items) {
        appendToDoItem(task);
    }
    // 操作できるようにする
    enableAction();
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const todo = input.value.trim();
    if (todo === "") {
        return;
    }

    input.value = "";
    // 操作できないようにする
    disableAction();
    // fetchWithTimeoutで3秒待機してもレスポンスがない場合はタイムアウトした旨をアラートで表示する
    let response = null;
    try {
        response = await fetchWithTimeout("/api/tasks", {
            method: "POST",
            body: JSON.stringify({
                name: todo,
            })
        }, 3000);
    } catch (e) {
        alert(e);
        enableAction();
        return;
    }
    if (await handleError(response)) {
        // 操作できるようにする
        enableAction();
        return;
    }
    const newTask = await response.json();
    appendToDoItem(newTask);
    // 操作できるようにする
    enableAction();
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = task.name;
    label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none";

    const toggle = document.createElement("input");
    toggle.checked = task.status === "completed";
    toggle.type = "checkbox";
    toggle.addEventListener("change", async () => {
        // 操作できないようにする
        disableAction()
        // fetchWithTimeoutで3秒待機してもレスポンスがない場合はタイムアウトした旨をアラートで表示する
        let response = null;
        try {
            response = await fetchWithTimeout(`/api/tasks/${task.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    id: task.id,
                    status: toggle.checked ? "completed" : "active",
                })
            }, 3000);
        } catch (e) {
            alert(e);
            // 操作できるようにする
            enableAction();
            return;
        }
        if (await handleError(response)) {
            // 操作できるようにする
            enableAction();
            return;
        }
        label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
        // 操作できるようにする
        enableAction();
    });
    const destroy = document.createElement("button");
    const emoji = "\u274C";
    destroy.textContent = emoji;
    destroy.addEventListener("click", async () => {
        let response = null;
        try {
            response = await fetchWithTimeout(`/api/tasks/${task.id}`, {
                method: "DELETE"
            }, 3000);
        } catch (e) {
            alert(e);
            enableAction();
            return;
        }
        if (await handleError(response)) {
            // 操作できるようにする
            enableAction();
            return;
        }
        list.removeChild(elem);
        // 操作できるようにする
        enableAction();
    });
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.prepend(elem);
}

// API からステータスコード 500 番台のエラーレスポンスが返ってきた場合は
// 問題 11.16 で作成した retryWithExponentialBackoff を流用 (必要に応じて変更) して fetch のリトライを行う
async function handleError(response) {
    if (!response.ok) {
        // 500番台の場合はリトライを行う
        if (response.status >= 500) {
            const success = await new Promise((resolve) => {
                retryWithExponentialBackoff(() => fetch(response.url, response), 3, resolve);
            });
            if (!success) {
                alert("リトライに失敗しました。");
            }
        } else {
            // 500番台以外のエラーはアラートを出す
            alert((await response.json()).message);
        }
        return true;
    }
    return false;
}

// リクエスト送出から 3 秒以上経過してもレスポンスを受信できない場合は
// リクエストをキャンセルし、リクエストがタイムアウトしたことを alert に表示する
function fetchWithTimeout(url, options = {}, timeout = 3000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("リクエストがタイムアウトしました"));
        }, timeout);

        fetch(url, options).then(
            (response) => {
                clearTimeout(timer);
                resolve(response);
            },
            (err) => {
                clearTimeout(timer);
                reject(err);
            }
        );
    });
}

// 通信やリトライが完了するまで ユーザが ToDo リストの追加/削除/変更、及びテキストの編集をできないようにする
function disableAction() {
    form.querySelector("button").disabled = true;
    input.disabled = true;
    list.querySelectorAll("button, input").forEach(elem => elem.disabled = true);
}
function enableAction() {
    form.querySelector("button").disabled = false;
    input.disabled = false;
    list.querySelectorAll("button, input").forEach(elem => elem.disabled = false);
}

//  問題 11.16 で作成した retryWithExponentialBackoff を流用
async function retryWithExponentialBackoff(
    func,
    maxRetry,
    callback
) {
    const internal = async (retryCount) => {
        try {
            // 変更箇所
            const result = await func();
            if (result.ok) {
                callback(true);
            } else {
                throw new Error("Request failed");
            }
        } catch (error) {
            if (retryCount < maxRetry) {
                const interval = 2 ** retryCount * 1000;
                setTimeout(() => internal(retryCount + 1), interval);
            } else {
                callback(false);
            }
        }
    };
    setTimeout(() => internal(0));
}
