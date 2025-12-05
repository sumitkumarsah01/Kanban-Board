const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");

let dragElement = null;



window.onload = () => {
    loadTasks();
    updateCount();
};


function saveTasks() {
    const data = {
        todo: todo.innerHTML,
        progress: progress.innerHTML,
        done: done.innerHTML
    };
    localStorage.setItem("kanbanData", JSON.stringify(data));
}


function loadTasks() {
    const saved = localStorage.getItem("kanbanData");
    if (!saved) return;

    const data = JSON.parse(saved);

    todo.innerHTML = data.todo;
    progress.innerHTML = data.progress;
    done.innerHTML = data.done;

    rebindEvents(todo);
    rebindEvents(progress);
    rebindEvents(done);
}


function rebindEvents(column) {
    const tasks = column.querySelectorAll(".task");

    tasks.forEach((task) => {
        task.addEventListener("dragstart", () => {
            dragElement = task;
        });

        const delBtn = task.querySelector("button");
        delBtn.addEventListener("click", () => {
            task.remove();
            updateCount();
            saveTasks();
        });
    });
}


function addDragEvent(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateCount();
        saveTasks();
    });
}

addDragEvent(progress);
addDragEvent(todo);
addDragEvent(done);


const addTaskButton = document.querySelector(".addtask");
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".bg");

addTaskButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});
modal2.addEventListener("click", () => {
    modal.classList.remove("active");
});

const taskAdded = document.querySelector("#taskAdded");

taskAdded.addEventListener("click", () => {
    const inputField = document.querySelector(".center input");
    const textArea = document.querySelector(".center textarea");

    const inputTask = inputField.value;
    const textDescription = textArea.value;

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h1>${inputTask}</h1>
        <p>${textDescription}</p>
        <button class="delBtn">Delete</button>
    `;

    todo.appendChild(div);

    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    div.querySelector(".delBtn").addEventListener("click", () => {
        div.remove();
        updateCount();
        saveTasks();
    });


    modal.classList.remove("active");

 
    inputField.value = "";
    textArea.value = "";

    updateCount();
    saveTasks();
});


function updateCount() {
    [todo, progress, done].forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".count");
        if (count) count.innerText = tasks.length;
    });
}
