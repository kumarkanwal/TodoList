const todo_form = document.querySelector('form')
const todo_input = document.getElementById('todo-input');
const todos_container = document.getElementById('todos-container');
const warning_pupup = document.getElementById('warning-popup');

// get data from local storage 
function get_Data_LocalStorage() {
    const initial_localstorage_structure = {
        id: 0,
        todos: []
    }
    return JSON.parse(localStorage.getItem("todosData")) ?? initial_localstorage_structure;
}

let local_Storage_Data = get_Data_LocalStorage();

// adding all todos to todo container 
local_Storage_Data.todos.forEach(todo => Create_Todo_Item(todo));

// get value from input for new todo 
todo_form.addEventListener('submit', e => {
    e.preventDefault();


    let todo_input_data = todo_input.value.trim();
    let duplicate_entry = local_Storage_Data.todos.some(element => element.todo === todo_input_data);

    // show pop up on duplicate enty 
    if (duplicate_entry) {
        warning_pupup.toast()

    } else {

        let new_todo_id = ++local_Storage_Data.id;

        const new_todo_data = { "id": new_todo_id, "todo": todo_input_data, "completed": false };
        local_Storage_Data.todos.push(new_todo_data);
        local_Storage_Data.id = new_todo_id;

        Create_Todo_Item({ "id": new_todo_id, "todo": todo_input_data });
        localStorage.setItem("todosData", JSON.stringify(local_Storage_Data));
        // local_Storage_Data.

    }

    todo_input.value = "";

    // check duplicate data   done
    // Trim white spaces      done 
    // sanitize data   
    // call function to create and add into todolist
})


// create todo

function Create_Todo_Item(todoData) {

    const { "id": todo_id, "todo": todo_name, "completed": todo_completed } = todoData;

    const todo_item = document.createElement('div');
    todo_item.className = "todo-item";

    const todo_data = document.createElement('div');
    todo_data.className = "data";

    const todo_checkbox = document.createElement('input');
    todo_checkbox.type = "checkbox";

    // checking status of todo from local storage, completed or not.




    let todo_input = document.createElement('input');
    todo_input.value = todo_name;
    todo_input.type = "text";
    todo_input.className = "todo_text"
    todo_input.readOnly = true;

    let todo_actions = document.createElement('div');
    todo_actions.className = "actions";

    let todo_delete_btn = document.createElement('button');
    todo_delete_btn.className = "delete";
    todo_delete_btn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    let todo_edit_btn = document.createElement('button');
    todo_edit_btn.className = "edit";
    todo_edit_btn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    // checked status and styling 


    if (todo_completed) {
        (todo_checkbox.checked = true);
        todo_item.classList.add('checked');
        todo_input.classList.add('text_overline');
    }

    todo_data.appendChild(todo_checkbox);
    todo_data.appendChild(todo_input);
    todo_actions.appendChild(todo_edit_btn);
    todo_actions.appendChild(todo_delete_btn);
    todo_item.appendChild(todo_data);
    todo_item.appendChild(todo_actions);
    todos_container.appendChild(todo_item);

    todo_delete_btn.addEventListener('click', () => {

        delete_todo_item(todo_id, todo_item)
    })

    todo_edit_btn.addEventListener('click', (e) => {
        edit_todo_item(e, todoData, todo_item)
    })

    todo_checkbox.addEventListener('change', () => {
        todo_status_update(todo_id, todo_item, todo_checkbox)
    })

}

// delete todo
function delete_todo_item(todo_id, todo_element) {


    let filteredTodos = local_Storage_Data.todos.filter(todo => todo.id != todo_id);
    local_Storage_Data.todos = filteredTodos;

    localStorage.setItem('todosData', JSON.stringify(local_Storage_Data));


    todos_container.removeChild(todo_element);
}

// complete todo status update
function todo_status_update(todo_id, todo_element, todo_checkbox) {


    // find todo from localstorage to update completed status 
    let todo_item = local_Storage_Data.todos.find(todo => todo.id === todo_id);

    if (todo_checkbox.checked) {

        todo_item.completed = todo_checkbox.checked;
        todo_element.classList.add('checked');
        todo_element.querySelector('.todo_text').classList.add('text_overline');

        localStorage.setItem('todosData', JSON.stringify(local_Storage_Data));

    } else {
        todo_item.completed = todo_checkbox.checked;
        localStorage.setItem('todosData', JSON.stringify(local_Storage_Data));
        todo_element.classList.remove('checked');
        todo_element.querySelector('.todo_text').classList.remove('text_overline');
    }

}

function edit_todo_item(e, todoData, todo_element) {

    // local_Storage_Data.find(local_Storage_Data)
    function isAnotherTodoEditing() {
        let todos = todos_container.querySelectorAll('.todo-item');

        // remove save class if already exist 

        todos.forEach(todo => {
            if (todo.querySelector('.save')) {

                todo.querySelector('.save').innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
                todo.querySelector('.save').classList.remove('save');
                todo.querySelector('.todo_text').readOnly = true;
                todo.querySelector('.todo_text').style.backgroundColor = "transparent";
            }
        })

    }

    function saveChanges() {
        edit_btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        edit_btn.classList.remove('save');
        todo_text.readOnly = true;
        todo_text.style.backgroundColor = 'transparent';

        let edited_todo_value = todo_text.value.trim();
        todo_text.value = edited_todo_value;

        todoData.todo = edited_todo_value
        local_Storage_Data.todos.find(todo => todo.id === todoData.id).todo = todoData.todo

        local_Storage_Data.todos.find(todo => todo.id === todoData.id)

        localStorage.setItem('todosData', JSON.stringify(local_Storage_Data));

        console.log(edited_todo_value);
        console.log(todoData.todo);
        console.log(local_Storage_Data);




    }

    let edit_btn = todo_element.querySelector('.edit');
    let todo_text = todo_element.querySelector('.todo_text');

    if (!edit_btn.classList.contains('save')) {

        // checking wheather any other todo under editing 
        isAnotherTodoEditing();

        // Enter edit mode
        edit_btn.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>';
        edit_btn.classList.add('save');
        todo_text.readOnly = false;
        todo_text.style.backgroundColor = 'white';
        todo_text.focus();

        todo_text.addEventListener('keydown', enterKey);

        function enterKey(e) {

            if (e.key === "Enter") {
                saveChanges();
                todo_text.removeEventListener('keydown', enterKey);
            }

        }

    } else {

        // checking wheather any other todo under editing
        isAnotherTodoEditing();

        // Save changes
        saveChanges();

    }


}




