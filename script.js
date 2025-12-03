// select dom elements
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
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
    const li = document.createElement('li')

    //checkbox to toggle completion
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = !!todo.completed
    checkbox.addEventListener("change",()=>{
        todo.completed = checkbox.checked

        //visual feedback : striked
        textSpan.style.textDecoration = todo.completed ?'line-through': ""  
        savetodos();
    })
    //text of the todo 
    const textSpan = document.createElement("span")
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through'
    }
        //Add doubleclick event listener to edit todo
        textSpan.addEventListener("dblclick",()=>{
            const newText = prompt("Edit todo",todo.text);
            if(newText != null){
                todo.text =newText.trim()
                textSpan.textContent = todo.text
                savetodos()
            }
        })
        //delete todo button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click',()=>{
            todos.splice(index,1);
            render();
            savetodos();
        })
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li
    
}

//render the whole todo list from todos array
function render(){
    list.innerHTML = '';
    todos.forEach((todos,index) => {
        const node = createTodoNode(todos,index)
        list.appendChild(node)

    });
}

function addTodo(){
    const text = input.value.trim();
    if(!text){
        return 
    }
    //push new todo object
    todos.push({text,completed:false}) 
    input.value='';
    render()
    savetodos()
}
addBtn.addEventListener('click',addTodo)
render()