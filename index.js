let todos = [];
let todolist = document.getElementById('todolist');
let newTodoForm = document.getElementById('new-todo-form');
let addButton = document.getElementById('add');
let todosCounter = document.getElementById('counter');

// function to append the todo list item to DOM tree i.e. to the unordered list inside todolist-container
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

// function to display all the todo list items inside todolist-container & update total count
function renderList() {
    todolist.innerHTML = '';

    for (let todo of todos) {
        addTodoToDOM(todo);
    }

    todosCounter.innerHTML = todos.length;
}

// function to add todo
function addTodo(todo) {
    if (todo) {
        todos.push(todo);
        renderList();
        showNotification('Todo added successfully!');
        return;
    }

    showNotification('Todo cannot be added!');
}

// function to delete todo
function deleteTodo(todoId) {
    const newTodos = todos.filter(todo => todo.id != todoId);
    todos = newTodos;
    renderList();
    showNotification('Todo deleted successfully!');
    return;
}

// function to toggle todo
function toggleTodo(todoId, checkbox) {
    // find the todo using id
    const todo = todos.filter(todo => todo.id == todoId);

    // if any todo is found
    if(todo.length > 0) {
        const toggledTodo = todo[0];

        // toggle the todo
        toggledTodo.completed = !toggledTodo.completed;

        // access parent div of checkbox
        const parentDiv = checkbox.closest('div');

        // access p element containing description of todo
        const desc = parentDiv.getElementsByTagName('p');

        // if checkbox is checked, differentiate the todo from other todo list items by striking a line through its description
        if(toggledTodo.completed) {
            desc[0].style.textDecoration = 'line-through';
        }
        // else if checkbox is unchecked, revert the effect
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

// function to show the message through alert
function showNotification(text) {
    alert(text);
}

// function called when add button is clicked
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

// function called when delete button is clicked
function handleDeleteClick(event) {
    if(event && event.target.classList.contains('delete')) {
        const todoId = event.target.id;
        deleteTodo(todoId);
    }
    else {
        showNotification('Task cannot be deleted!');
    }
}

// function called when checkbox is checked or unchecked
function handleToggleClick(event) {
    if(event) {
        const checkbox = event.target;
        const todoId = event.target.id;
        toggleTodo(todoId, checkbox);
    }
}