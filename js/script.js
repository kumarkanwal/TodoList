const todo_form = document.querySelector('form')
const todo_input = document.getElementById('todo-input');
const todos_container = document.getElementById('todos-container');
const warning_pupup = document.getElementById('warning-popup');

let ele = document.querySelector("sl");


let local_Storage_Data = [
    { "id": 1, "todo": "Complete TodoList project", "completed": false },
    { "id": 2, "todo": "Write unit tests for new features", "completed": false },
    { "id": 3, "todo": "Update project documentation", "completed": true },
    { "id": 4, "todo": "Fix bugs reported by QA team", "completed": false },
    { "id": 10, "todo": "kanwal", "completed": true },
    { "id": 5, "todo": "Review pull requests from team", "completed": true },
    { "id": 6, "todo": "Plan sprint tasks for next week", "completed": false },
    { "id": 7, "todo": "Optimize database queries", "completed": false },
    { "id": 8, "todo": "Refactor legacy code modules", "completed": true },
    { "id": 9, "todo": "Prepare presentation for client meeting", "completed": false },
    { "id": 10, "todo": "Conduct code review session", "completed": true },
]




todo_form.addEventListener('submit', e => {
    e.preventDefault();


    let todo_input_data = todo_input.value.trim();

    let duplicate_entry = local_Storage_Data.some(element => element.todo === todo_input_data);
    duplicate_entry && warning_pupup.toast();





    // check duplicate data 
    // Trim white spaces 
    // sanitize data
    // call function to create and add into todolist

    todo_input.value = "";
})



// get data from local storage

// get data from input

// create todo

// update todo

// delete todo 









