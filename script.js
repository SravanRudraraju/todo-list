// select dom elements
const input = document.getElementById('todo-input')
const button = document.getElementById('add-btn')
const list = document.getElementById('todo-list') 

//try to load todos from localstorage 
const saved = localStorage.getItem('todos')
const todos = saved ? JSON.parse(saved): [];

function savetodos(){
    //save current todos array to localstorage
}