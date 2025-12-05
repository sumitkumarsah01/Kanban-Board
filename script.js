const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");

let dragElement = null;

const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("dragstart", (e) => {
        dragElement = task;
    });

    
    const delBtn = task.querySelector("button");
    if (delBtn) {
        delBtn.addEventListener("click", () => {
            task.remove();
            updateCount();
        });
    }
});

function addDragEvent(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over")
    })

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over")
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
        updateCount();
    })
}

addDragEvent(progress)
addDragEvent(todo)
addDragEvent(done)

const addTaskButton = document.querySelector(".addtask");
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".bg");

addTaskButton.addEventListener("click", () => {
    modal.classList.toggle("active");
})
modal2.addEventListener("click", () => {
    modal.classList.remove("active");
})

const taskAdded = document.querySelector("#taskAdded");

taskAdded.addEventListener('click', () => {
    const inputTask = document.querySelector(".center input").value;
    const textDescription = document.querySelector(".center textarea").value;

    const div = document.createElement("div")
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
       <h1>${inputTask}</h1>
       <p>${textDescription}</p>
       <button class="delBtn">Delete</button>
    `

    todo.appendChild(div);

    
    div.addEventListener("dragstart", () => {
        dragElement = div;
    })

    
    const delButton = div.querySelector(".delBtn");
    delButton.addEventListener("click", () => {
        div.remove();
        updateCount();
    });

    modal.classList.remove("active");
    updateCount();
});


function updateCount() {
    [todo, progress, done].forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".count");
        if (count) count.innerText = tasks.length;
    });
}
