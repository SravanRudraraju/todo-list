// Setup each todo list box independently
document.querySelectorAll('.todo-box').forEach(box => {
    const key = box.dataset.key;                   // unique localStorage key
    const input = box.querySelector('.todo-input');
    const addBtn = box.querySelector('.add-btn');
    const list = box.querySelector('.todo-list');

    let todos = JSON.parse(localStorage.getItem(key)) || [];

    function save() {
        localStorage.setItem(key, JSON.stringify(todos));
    }

    function createNode(todo, index) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onchange = () => {
            todo.completed = checkbox.checked;
            text.style.textDecoration = todo.completed ? 'line-through' : '';
            save();
        };

        const text = document.createElement('span');
        text.textContent = todo.text;
        if (todo.completed) text.style.textDecoration = 'line-through';

        text.ondblclick = () => {
            const newText = prompt("Edit task", todo.text);
            if (newText !== null && newText.trim()) {
                todo.text = newText.trim();
                text.textContent = todo.text;
                save();
            }
        };

        const del = document.createElement('button');
        del.textContent = "Delete";
        del.onclick = () => {
            todos.splice(index, 1);
            render();
            save();
        };

        li.append(checkbox, text, del);
        return li;
    }

    function render() {
        list.innerHTML = "";
        todos.forEach((todo, i) => list.appendChild(createNode(todo, i)));
    }

    function addTodo() {
        const text = input.value.trim();
        if (!text) return;

        todos.push({ text, completed: false });
        input.value = "";
        render();
        save();
    }

    addBtn.onclick = addTodo;
    render();
});
