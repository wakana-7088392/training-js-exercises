const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3001/api/tasks", {
        mode: "cors", // CORSモード
        credentials: "include" // クロスオリジンでのCookie送信を許可
    });
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

    const response = await fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        mode: "cors", // CORSモード
        credentials: "include", // クロスオリジンでのCookie送信を許可
        headers: {
            "Content-Type": "application/json" // 必要なヘッダーを追加
        },
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
    toggle.type = "checkbox";
    toggle.addEventListener("change", async () => {
        const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
            method: "PATCH",
            mode: "cors", // CORSモード
            credentials: "include", // クロスオリジンでのCookie送信を許可
            headers: {
                "Content-Type": "application/json" // 必要なヘッダーを追加
            },
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
    const emoji = "\u274C";
    destroy.textContent = emoji;
    destroy.addEventListener("click", async () => {
        const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
            method: "DELETE",
            mode: "cors", // CORSモード
            credentials: "include", // クロスオリジンでのCookie送信を許可
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

async function handleError(response) {
    if (!response.ok) {
        alert((await response.json()).message);
        return true;
    }
    return false;
}
