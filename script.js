const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");



let dragElement = null;

const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("dragstart", (e) => {
        dragElement = task;
    });
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
            [todo,progress,done].forEach((col)=>{
            const tasks=col.querySelectorAll(".task");
            const count=col.querySelector(".count")
            count.innerText=tasks.length;

        })

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
       <button>Delet</button>
    `
    todo.appendChild(div);

    [todo, progress, done].forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".count")
        count.innerText = tasks.length;

    })
    
    div.addEventListener("dragstart", () => {
        dragElement = div;

    })
    


    modal.classList.remove("active");

})

