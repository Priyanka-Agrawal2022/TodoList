let todos = [];
let todolist = document.getElementById('todolist');
let newTodoForm = document.getElementById('new-todo-form');
let addButton = document.getElementById('add');
let todosCounter = document.getElementById('counter');

function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div>
            <input type="checkbox" id="${todo.id}" ${todo.completed ? 'checked' : ''} onClick="handleToggleClick(event)">
            <p>${todo.description}</p>
        </div>

        <div>
            <i class="fa-solid fa-circle-xmark delete" id="${todo.id}" onClick="handleDeleteClick(event)"></i>
        </div>
    `;

    todolist.append(li);
}

function renderList() {
    todolist.innerHTML = '';

    for (let todo of todos) {
        addTodoToDOM(todo);
    }

    todosCounter.innerHTML = todos.length;
}

function addTodo(todo) {
    if (todo) {
        todos.push(todo);
        renderList();
        showNotification('Todo added successfully!');
        return;
    }

    showNotification('Todo cannot be added!');
}

function deleteTodo(todoId) {
    const newTodos = todos.filter(todo => todo.id != todoId);
    todos = newTodos;
    renderList();
    showNotification('Todo deleted successfully!');
    return;
}

function toggleTodo(todoId, checkbox) {
    const todo = todos.filter(todo => todo.id == todoId);

    if(todo.length > 0) {
        const toggledTodo = todo[0];
        toggledTodo.completed = !toggledTodo.completed;

        const parentDiv = checkbox.closest('div');
        const desc = parentDiv.getElementsByTagName('p');

        if(toggledTodo.completed) {
            desc[0].style.textDecoration = 'line-through';
        }
        else {
            desc[0].style.textDecoration = 'none';
        }

        showNotification('Todo toggled successfully!');
        return;
    }
    else {
        showNotification('Task cannot be toggled!');
    }
}

function showNotification(text) {
    alert(text);
}

function handleAddClick() {
    const text = newTodoForm['desc'].value;
    if (!text) {
        showNotification('Todo text can not be empty!');
        return;
    }

    const todo = {
        description: text,
        completed: false,
        id: Date.now()
    };

    newTodoForm.reset();

    addTodo(todo);
}

function handleDeleteClick(event) {
    if(event && event.target.classList.contains('delete')) {
        const todoId = event.target.id;
        deleteTodo(todoId);
    }
    else {
        showNotification('Task cannot be deleted!');
    }
}

function handleToggleClick(event) {
    if(event) {
        const checkbox = event.target;
        const todoId = event.target.id;
        toggleTodo(todoId, checkbox);
    }
}