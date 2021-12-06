const appContainer = document.getElementById("app-container");
const todosList = document.getElementById("todos-list");
const todoInput = document.getElementById("todo-input");
const todosFooterContainer = document.getElementById("todos-footer-container");
const pendingTasksMsg = document.getElementById("pending-tasks-msg");
const addTodoBtn = document.getElementById("add-todo-btn");
todoInput.focus();

let todosCounter = 0;

todoInput.addEventListener("input", function () {
    if (todoInput.value.length === 0) {
        addTodoBtn.disabled = true;
    } else {
        addTodoBtn.disabled = false;
    }
});

todoInput.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        document.getElementById("add-todo-btn").click();
    }
})
  

function addTodo() {
    todosCounter++;
    displayFooterContainer();

    const liElement = document.createElement("li");
    liElement.innerHTML = todoInput.value;

    const removeLiBtn = document.createElement("button");
    removeLiBtn.classList.add('removeItemBtn');
    removeLiBtn.id = `rmv-btn-${todosCounter}`;
    removeLiBtn.innerHTML = '-';

    removeLiBtn.onclick = () => {
        todosList.removeChild(liElement);
        todosCounter--;
        displayFooterContainer();
    }

    todosList.appendChild(liElement);
    liElement.appendChild(removeLiBtn);
    clearInput();
    todoInput.focus();
    addTodoBtn.disabled = true;
}

function clearInput() {
    todoInput.value = "";
}

function displayFooterContainer() {
    if (todosCounter === 0) {
        todosFooterContainer.style.visibility = "hidden";
        return;
    }
    todosFooterContainer.style.visibility = "visible";
    const message = todosCounter > 1 ? `You have ${todosCounter} pending tasks` : `You have ${todosCounter} pending task`;
    pendingTasksMsg.innerHTML = message;
}

function clearAllTodos() {
    todosFooterContainer.style.visibility = "hidden";
    todosCounter = 0;

    while (todosList.hasChildNodes()) {
        todosList.removeChild(todosList.lastChild);
    }

    todoInput.focus();
}