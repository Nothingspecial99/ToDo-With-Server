let task = []

const addTaskBtn = document.querySelector("#addTaskBtn")
const taskNameField = document.querySelector("#taskName")
const taskContainer = document.querySelector("#taskContainer")


async function fetchTasks() {
    task = await fetch("http://localhost:3000/")
    task = await task.json()
    renderTasks(task)
}

fetchTasks()


function addTask(e) {
    e.preventDefault()
    const taskName = taskNameField.value

    if (!(task.includes(taskName))) {
        task.push(taskName)
        addTaskInServer(task)
        renderTask(taskName)
    }

    taskNameField.value = ""
}

function renderTasks(tasks) {
    for (const task of tasks) {
        renderTask(task)
    }

}

function renderTask(taskName) {
    let taskWrapper = document.createElement("div")
    let task = document.createElement("p")
    let taskDeleteBtn = document.createElement('input')

    taskDeleteBtn.setAttribute('type', 'button')
    taskDeleteBtn.setAttribute('value', 'X')
    taskDeleteBtn.setAttribute('class', 'deleteBtn')

    taskDeleteBtn.addEventListener('click', deleteTask)


    taskWrapper.setAttribute('class', 'taskWrapper')

    task.textContent = taskName


    taskWrapper.appendChild(task)
    taskWrapper.appendChild(taskDeleteBtn)
    taskContainer.appendChild(taskWrapper)

}

function deleteTask(e) {
    const taskContainer = e.target.parentNode
    const taskName = taskContainer.querySelector("p").textContent
    task = task.filter((t) => !(t === taskName))
    addTaskInServer(task)
    taskContainer.remove()

}

function addTaskInServer(tasks) {
    fetch('http://localhost:3000/add', { method: 'POST', headers: { "tasks": tasks } })
}


addTaskBtn.addEventListener('click', addTask)

