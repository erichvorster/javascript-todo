//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos)// We are calling the getTodos function to get our todos back from local storage
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//FUNCTIONS

function addTodo(event) {

    //Prevent default browser behaviour
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Save Local Todos
    saveLocalTodos(todoInput.value);
    
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton)

    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append To List
    todoList.appendChild(todoDiv);

    //Clear Todo Input Value
    todoInput.value="";

}

function deleteCheck(e){
   const item = e.target;
   //Delete todo
   if(item.classList[0] === "trash-btn") {
       const todo = item.parentElement;
       //Animation
       todo.classList.add("fall");
       removeLocalTodos(todo); // Calling our function that deletes todos from local storage
       todo.addEventListener('transitionend', function(){
         todo.remove()
       });
   }

   //Check Mark
   if(item.classList[0] === "complete-btn"){
       const todo = item.parentElement;
       todo.classList.toggle('completed');
   }
}


//Filter Todos
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
            todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            break;    
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

//Saving todos to local storage - This function is called at the top of the page

function saveLocalTodos(todo) {

    //Check - Do we already have a todo?
    let todos;
    if  (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Getting the todos back from local storage
function getTodos(){
    let todos;
    if  (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
         //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo //From local storage
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton)

    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append To List
    todoList.appendChild(todoDiv);
    })
}

//Deleting todos from local storage
function removeLocalTodos(todo){
     //Check - Do we already have a todo?
     let todos;
     if  (localStorage.getItem("todos") === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem("todos"));
     }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}