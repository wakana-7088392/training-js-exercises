// DBの作成
async function openDatabase() {
  const request = indexedDB.open("todoDB", 1);  // todoDBはDB名、1はVersionのこと
  // オブジェクトストア(テーブル)の作成
  return new Promise((resolve, reject) => {
    request.onupgradeneeded = (event) => {  // DBが新規作成あるいはバージョン変更時に呼び出される
      const db = event.target.result;
      db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
    };
    request.onsuccess = (event) => { // 成功時に呼び出される
      resolve(event.target.result);
    };
    request.onerror = (event) => { // 失敗時に呼び出される
      reject(event.target.error);
    };
  });
}

// TODOリストを保存する関数
async function saveTodos(todos) {
  const db = await openDatabase();
  // 読み書き可能なトランザクション作成
  const transaction = db.transaction("todos", "readwrite");
  const store = transaction.objectStore("todos");
  // 既存のTODOを更新または追加
  todos.forEach((todo) => {
    store.put(todo);
  });
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(); // トランザクションが完了した時に呼び出される
    transaction.onerror = (event) => reject(event.target.error); // トランザクションが失敗した時に呼び出される
  });
}

// TODOリストの読み込みをする関数
async function loadTodos() {
  const db = await openDatabase();
  const transaction = db.transaction("todos", "readonly");
  const store = transaction.objectStore("todos");
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

// TODOの削除を行う関数
async function deleteTodoById(id) {
  const db = await openDatabase();
  const transaction = db.transaction("todos", "readwrite");
  const store = transaction.objectStore("todos");
  store.delete(id);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("#new-todo-form");
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  let todos = [];
  const channel = new BroadcastChannel("todo_channel");

  function addTodoToDOM(todo) {
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo.text;
    label.style.textDecorationLine = todo.completed ? "line-through" : "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = todo.completed;
    toggle.addEventListener("change", async () => {
      todo.completed = toggle.checked;
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      await saveTodos(todos);
      channel.postMessage({ type: "update", todos })
    });

    const destroy = document.createElement("button");
    const emoji = "\u274C";
    destroy.textContent = emoji;
    destroy.addEventListener("click", async () => {
      list.removeChild(elem);
      todos = todos.filter(t => t.id !== todo.id);
      await deleteTodoById(todo.id);
      channel.postMessage({ type: 'update', todos });
    });

    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.prepend(elem);
  }


  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (input.value.trim() === "") {
      return;
    }
    const todo = {
      id: Date.now(), // 一意のIDを生成
      text: input.value.trim(),
      completed: false,
    };
    input.value = "";

    todos.push(todo);
    addTodoToDOM(todo);
    await saveTodos(todos);
    channel.postMessage({ type: 'update', todos });
  });

  // いずれかのタブで処理が発生したことをメッセージとして受信し、
  // 受診した際はaddTodoToDOMを呼び出す
  channel.addEventListener('message', async (event) => {
    if (event.data.type === 'update') {
      todos = event.data.todos;
      list.innerHTML = "";
      todos.forEach(todo => addTodoToDOM(todo));
    }
  });

  // ページ読み込み時の対応
  todos = await loadTodos();
  todos.forEach(todo => addTodoToDOM(todo));
});