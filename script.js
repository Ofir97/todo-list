const appContainer = document.getElementById("app-container");
const todosList = document.getElementById("todos-list");
const todoInput = document.getElementById("todo-input");
const todosFooterContainer = document.getElementById("todos-footer-container");
const pendingTasksMsg = document.getElementById("pending-tasks-msg");
const addTodoBtn = document.getElementById("add-todo-btn");
let todosCounter = 0;
let todos = [];

todoInput.focus();
getFromLocalStorage();

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    console.log(todos);
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        todos = JSON.parse(reference);
        todos.forEach(todo => addTodo(todo));
    }
}

todoInput.addEventListener("input", function () {
    if (todoInput.value.length === 0) {
        addTodoBtn.disabled = true;
    } else {
        addTodoBtn.disabled = false;
    }
});

todoInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        document.getElementById("add-todo-btn").click();
    }
})


function addTodo(todo) {
    console.log(todo);

    if (todo !== undefined) {
        todoInput.value = todo.value;
        addToLocalStorage(todos);
    }

    else {
        todo = {
            id: Date.now(),
            value: todoInput.value
        };
        todos.push(todo);
        addToLocalStorage(todos);
    }

    todosCounter++;
    displayFooterContainer();

    const liElement = document.createElement("li");
    liElement.innerHTML = todoInput.value;

    const removeLiBtn = document.createElement("button");
    removeLiBtn.classList.add('removeItemBtn');
    removeLiBtn.id = `rmv-btn-${todosCounter}`;
    removeLiBtn.innerHTML = '-';

    removeLiBtn.onclick = () => { //remove item button is clicked
        todosList.removeChild(liElement);
        todosCounter--;
        displayFooterContainer();
        removeFromLocalStorage(todo.id)
        console.log("!!!", todos);
    }

    todosList.appendChild(liElement);
    liElement.appendChild(removeLiBtn);

    todoInput.focus();
    addTodoBtn.disabled = true;

    clearInput();
    // console.log("!!!", todos);
}

function removeFromLocalStorage(id) {
    console.log('id', id);
    // filters out the <li> with the id and updates the todos array
    todos = todos.filter(function (item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    })

    addToLocalStorage(todos);
    console.log('LOCAL STORAGE: ', localStorage.getItem('todos'));
}


function addToLocalStorage(todos) {
    // conver the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));
    // console.log(localStorage.getItem('todos'));
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

    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));
}