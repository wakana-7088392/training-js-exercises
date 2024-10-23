const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.list = this.shadowRoot.querySelector("#todo-list");
    this.form.addEventListener("submit", this.addTodo.bind(this));
  }
  // 新しいTODOタスクの追加処理(ex01を活用)
  addTodo(e) {
    e.preventDefault();
    const input = this.shadowRoot.querySelector("#new-todo");

    if (input.value.trim() === "") {
      return;
    }
    const todo = input.value.trim();
    // new-todo の中身は空にする
    input.value = "";

    // ここから #todo-list に追加する要素を構築する
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    // toggle が変化した時の処理
    toggle.type = "checkbox";
    toggle.addEventListener("change", () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    });

    const destroy = document.createElement("button");
    // destroy がクリックされた場合の処理
    const emoji = "\u274C";
    destroy.textContent = emoji;
    destroy.addEventListener("click", () => {
      this.list.removeChild(elem);
    });

    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    this.list.appendChild(elem);
  }
}
// todo-appのカスタム要素を定義する
customElements.define("todo-app", TodoApp);
