// select dom elements
const input = document.getElementById('todo-input')
const button = document.getElementById('add-btn')
const list = document.getElementById('todo-list') 

//try to load todos from localstorage 
const saved = localStorage.getItem('todos')
const todos = saved ? JSON.parse(saved): [];

function savetodos(){
    //save current todos array to localstorage
    localStorage.setItem('todos',JSON.stringify(todos))
}

//create a DOM node for a todo object and append it to the list
function createTodoNode(todo,index){

}

//render the whole todo list from todos array
function render(){
    list.innerHTML = '';
    todos.forEach((todos,index) => {
        const node = createTodoNode(todos,index)
        list.appendChild(node)

    });
}