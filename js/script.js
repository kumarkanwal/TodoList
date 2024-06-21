const todo_form = document.querySelector('form')
const todo_input = document.getElementById('todo-input');
const todos_container = document.getElementById('todos-container')

todo_form.addEventListener('submit', e => {
    e.preventDefault();
    let todo_input_data = todo_input.value
    todo_input.value = "";
})





