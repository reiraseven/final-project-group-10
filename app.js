const form = document.getElementById("todoform");

const date = document.querySelector("form input[type=date]")

date.min = new Date().toISOString().slice(0, 10)

let todos = loadState() || []
render()
form.addEventListener("submit", event => {
    event.preventDefault()
    const data = {
        title: event.target.elements.title.value.trim(),
        duedate: event.target.elements.duedate.value,
        id: new Date().toISOString(),
    }
    todos.push(data);
    console.log(JSON.stringify(todos,null,2));
    render();
    event.target.reset()
})

function render () {
    const html = todos.map(todo => {
        return `
        <li data-item="${todo.id}">
                <label>
                    <span class="a">
                        ${todo.title}
                        <input type="checkbox" name="irrelevant">
                    </span>
                    <span class="b">
                        ${todo.duedate}
                    </span>
                </label>
                <span class="c">
                    <button type="button">Do it</button>
                </span>
            </li>
        `
    }) .join("") 

    document.getElementById("todolist").innerHTML = html;
    saveState()
}

document.getElementById("todolist").addEventListener("click", event => {
    if (!event.target.matches("button")) {
        return
    }

    const todoId = event.target.closest("[data-item]").getAttribute("data-item");
    todos = todos.filter(todo => todo.id !== todoId);
    console.log("I clicked button", todoId);
    render();
})

function saveState () {
    localStorage.setItem("ss", JSON.stringify(todos))  
}

function loadState(){
   return JSON.parse(localStorage.getItem("ss"))
    render()
}