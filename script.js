const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [];


function newTodo() {
  const task = prompt("Введіть нову задачу:");
  if (!task) return;

  const todo = {
    id: Date.now(),
    text: task,
    done: false,
  };
  todos.push(todo);
  saveTodos();
  render();
}


function renderTodo(todo) {
  return `
    <li class="list-group-item" data-id="${todo.id}">
      <input type="checkbox" class="form-check-input me-2" id="todo-${todo.id}" ${todo.done ? "checked" : ""} 
             onChange="checkTodo(${todo.id})" />
      <label for="todo-${todo.id}">
        <span class="${todo.done ? "text-success text-decoration-line-through" : ""}">${todo.text}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}


function render() {
  list.innerHTML = todos.map(renderTodo).join('');
  updateCounter();
}


function updateCounter() {
  const total = todos.length;
  const unchecked = todos.filter(todo => !todo.done).length;
  itemCountSpan.textContent = total;
  uncheckedCountSpan.textContent = unchecked;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) todo.done = !todo.done;
  saveTodos();
  render();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

render();
