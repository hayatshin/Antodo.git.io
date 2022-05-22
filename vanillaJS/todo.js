const pencil = document.querySelector("#pencil");
const toDoWrtie = document.querySelector("#toDoWrite");
const todoList = document.querySelector("#todolist");

let toDos = [];
const TODO_KEY = "todos";
toDoWrtie.style.visibility = "hidden";

function saveToDos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

function handleDelete(event) {
  const deleteDiv = event.target.parentElement;
  deleteDiv.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(deleteDiv.id));
  saveToDos();
}

function paintTodo(newTodo) {
  const todoBox = document.querySelector("#todoBox");
  const eachTodo = document.createElement("div");
  eachTodo.id = newTodo.id;
  const eachTodoSpan = document.createElement("span");
  const icon = document.createElement("i");
  icon.className = "fa fa-square-o";
  eachTodoSpan.innerText = newTodo.text;
  eachTodo.appendChild(icon);
  eachTodo.appendChild(eachTodoSpan);
  eachTodo.className = "eachTodo";
  todoBox.appendChild(eachTodo);
  eachTodo.addEventListener("click", handleDelete);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const todoInput = toDoWrtie.querySelector("input");
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  toDoWrtie.style.visibility = "hidden";
  paintTodo(newTodoObj);
  saveToDos();
}

function handleWriting(event) {
  event.preventDefault();
  toDoWrtie.style.visibility = "visible";
  toDoWrtie.addEventListener("submit", handleTodoSubmit);
}

pencil.addEventListener("click", handleWriting);

const getTodos = localStorage.getItem(TODO_KEY);

if (getTodos !== null) {
  const parsedTodos = JSON.parse(getTodos);
  toDos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}
