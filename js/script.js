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
        console.log(new_todo_id);

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

function Create_Todo_Item({ "id": todo_id, "todo": todo_name, "completed": todo_completed }) {

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
        console.log("before id", todo_id);
        delete_todo_item(todo_id, todo_item)
    })

    todo_checkbox.addEventListener('change', () => {
        todo_status_update(todo_id, todo_item, todo_checkbox)
    })

}

// delete todo
function delete_todo_item(todo_id, todo_element) {

    console.log(local_Storage_Data, todo_id);
    let filteredTodos = local_Storage_Data.todos.filter(todo => todo.id != todo_id);
    local_Storage_Data.todos = filteredTodos;

    localStorage.setItem('todosData', JSON.stringify(local_Storage_Data));


    todos_container.removeChild(todo_element);
}

// complete todo status update
function todo_status_update(todo_id, todo_element, todo_checkbox) {

    // bg change 
    // (todo_element.classList.toggle('checked'));

    // find todo from localstorage to update completed status 
    let todo_item = local_Storage_Data.todos.find(todo => todo.id === todo_id);

    if (todo_checkbox.checked) {

        todo_item.completed = todo_checkbox.checked;
        todo_element.classList.add('checked');
        todo_element.querySelector('.todo_text').classList.add('text_overline');

        localStorage.setItem('todosData', JSON.stringify(local_Storage_Data));


        // todo_item = local_Storage_Data.todos.find(todo => todo.id === todo_id);



    } else {
        todo_item.completed = todo_checkbox.checked;
        localStorage.setItem('todosData', JSON.stringify(local_Storage_Data));
        todo_element.classList.remove('checked');
        todo_element.querySelector('.todo_text').classList.remove('text_overline');
    }


    // console.log(todo_checkbox.checked);
    // console.log(loca);
    // console.log(todo_id);
    // console.log(todo_element);





}

// Create_Todo_Item();
// update todo



