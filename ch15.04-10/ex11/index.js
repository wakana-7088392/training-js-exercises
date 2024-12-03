const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todosAll = [];

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      refreshTodos();
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todosAll.splice(
        todosAll.findIndex((x) => x.id === todo.id),
        1
      );
      refreshTodos();
    });

    list.appendChild(li);
  });
}

function refreshTodos() {
  switch (location.hash) {
    case "#/active":
      renderTodos(todosAll.filter((x) => x.completed === false));
      break;
    case "#/completed":
      renderTodos(todosAll.filter((x) => x.completed === true));
      break;
    default:
      renderTodos(todosAll);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todosAll.push({ id: crypto.randomUUID(), content: todo, completed: false });
  refreshTodos();
});

window.addEventListener("hashchange", () => {
  refreshTodos();
});
