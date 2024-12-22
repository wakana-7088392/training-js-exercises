const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
    // (fetchで実装)ここで API を呼び出してタスク一覧を取得し、
    // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加する
    const response = await fetch("/api/tasks");
    if (await handleError(response)) {
        return;
    }
    const body = await response.json();
    for (const task of body.items) {
        appendToDoItem(task);
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const todo = input.value.trim();
    if (todo === "") {
        return;
    }

    input.value = "";

    // (fetchで実装)ここで API を呼び出して新しいタスクを作成し
    // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加する
    const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
            name: todo,
        })
    });
    if (await handleError(response)) {
        return;
    }
    const newTask = await response.json();
    appendToDoItem(newTask);
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
    console.log(document.cookie);
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = task.name;
    label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none";

    const toggle = document.createElement("input");
    toggle.checked = task.status === "completed";
    // (fetchで実装)toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
    // 成功したら label.style.textDecorationLine を変更する
    toggle.type = "checkbox";
    toggle.addEventListener("change", async () => {
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                id: task.id,
                status: toggle.checked ? "completed" : "active",
            })
        });
        if (await handleError(response)) {
            return;
        }
        label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    });
    const destroy = document.createElement("button");
    // (fetchで実装)destroy がクリック (click) された場合に API を呼び出してタスク を削除し
    // 成功したら elem を削除する
    const emoji = "\u274C";
    destroy.textContent = emoji;
    destroy.addEventListener("click", async () => {
        const response = await fetch(`/api/tasks/${task.id}`, {
            method: "DELETE"
        });
        if (await handleError(response)) {
            return;
        }
        list.removeChild(elem);
    });
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.prepend(elem);
}

// (追加)エラー発生時の処理
async function handleError(response) {
    if (!response.ok) {
        alert((await response.json()).message);
        return true;
    }
    return false;
}
