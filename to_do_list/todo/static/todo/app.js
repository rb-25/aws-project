const apiBaseUrl = 'http://127.0.0.1:8000/api/todos/';

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and render the To-Do list on page load
    fetchTodos();

    // Add a new To-Do
    document.getElementById('add-todo-btn').addEventListener('click', function() {
        const title = document.getElementById('todo-title').value;
        const description = document.getElementById('todo-description').value;

        if (title === '') {
            alert('Please enter a task title.');
            return;
        }

        addTodo({ title, description });
    });
});

// Fetch all To-Dos
function fetchTodos() {
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(data => renderTodos(data))
        .catch(error => console.error('Error:', error));
}

// Add a new To-Do
function addTodo(todo) {
    fetch(apiBaseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })
    .then(response => response.json())
    .then(data => {
        // Clear form
        document.getElementById('todo-title').value = '';
        document.getElementById('todo-description').value = '';
        // Fetch and re-render the updated list
        fetchTodos();
    })
    .catch(error => console.error('Error:', error));
}

// Delete a To-Do
function deleteTodo(id) {
    fetch(`${apiBaseUrl}${id}/`, {
        method: 'DELETE',
    })
    .then(() => {
        fetchTodos();
    })
    .catch(error => console.error('Error:', error));
}

// Render the To-Do list
function renderTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';

        todoItem.innerHTML = `
            <span>${todo.title}</span>
            <div>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;

        todoList.appendChild(todoItem);
    });
}
