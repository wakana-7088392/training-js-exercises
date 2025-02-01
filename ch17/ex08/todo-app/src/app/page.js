'use client';
import { useState } from 'react';
import { client } from 'websocket';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = e => {
    // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
    // サーバーにリクエストを送信するとページがリロードしてしまうため。 e=フォーム送信イベント
    e.preventDefault();
    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (newTodo.trim() === '') {
      return;
    }
    setTodos([...todos, { id: Date.now(), todo: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <form id="new-todo-form" onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <label
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.todo}
            </label>
            <button onClick={() => deleteTodo(todo.id)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
