// document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

let todos = [];
// todoリストをlocalStorageに保存する
// try catchをいれておくのが無難らしい(GETが許容されず動かないことがあるらしい)
// データの型チェックをしておくと良さそう
function saveTodos() {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("TODO seved:", todos);
  } catch (e) {
    console.warn("localStrageが利用できません")
  }
}

// todoリストをlocalStorageから取得してDOMに反映させる
function loadTodos() {
  try {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
      todos.forEach(todo => addTodoToDOM(todo));
    }
  } catch (e) {
    console.warn("localStrageが利用できません")
  }
}

function addTodoToDOM(todo) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.text;
  label.style.textDecorationLine = todo.completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.completed;
  toggle.addEventListener("change", () => {
    todo.completed = toggle.checked;
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    saveTodos();
  });
  const destroy = document.createElement("button");
  const emoji = "\u274C";
  destroy.textContent = emoji;
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
    todos = todos.filter(t => t !== todo);
    saveTodos();
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim() === "") {
    return;
  }
  const todo = {
    text: input.value.trim(),
    completed: false,
  };
  input.value = "";

  todos.push(todo);
  addTodoToDOM(todo);
  saveTodos();
});

window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    console.log("Updated todos from storage:", localStorage.getItem("todos"));
    console.log("storage event", e);
    list.innerHTML = "";
    loadTodos();
  }
})

loadTodos();
// });
