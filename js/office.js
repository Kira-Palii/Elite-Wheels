const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksContainer = document.getElementById("tasksContainer");
const filterSelect = document.getElementById("filterSelect");
const userData = localStorage.getItem("loggedInUser");
const user = userData ? JSON.parse(userData) : null;
const storageKey = user ? `tasks_${user.email}` : null;
let tasks = user ? JSON.parse(localStorage.getItem(storageKey)) || [] : [];
function saveTasks() {
    if (user) {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    }
}
function renderTasks() {
    tasksContainer.innerHTML = "";
    const filter = filterSelect.value;
    let filtered = tasks;
    if (filter !== "all") {
        filtered = tasks.filter((task) => task.status === filter);
    }
    filtered.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "p-5 pl-7 rounded-xl bg-[#EAF2FF] flex flex-col gap-2";
    const title = document.createElement("p");
    title.className = "text-4xl";
    title.innerText = task.text;
    if (task.status === "done" || task.status === "deleted") {
        title.classList.add("line-through");
    }
    const info = document.createElement("p");
    info.className = "text-xl text-gray-600";
    info.innerText = `Дата оновлення: ${task.updatedAt} \n Статус: ${
        task.status === "active"
        ? "В роботі"
        : task.status === "done"
        ? "Виконано"
        : "Видалено"
    }`;
    const btnGroup = document.createElement("div");
    btnGroup.className = "flex flex-row-reverse text-xl gap-4 mt-2 mr-1";
    if (task.status === "active") {
        const doneBtn = document.createElement("button");
        doneBtn.innerText = "Виконано";
        doneBtn.className = "bg-[#4D60F2] text-white px-10 py-3 rounded-xl hover:bg-[#7787FF]";
        doneBtn.onclick = () => updateTaskStatus(task.id, "done");
        const delBtn = document.createElement("button");
        delBtn.innerText = "Видалити";
        delBtn.className = "bg-[#4D60F2] text-white px-10 py-3 rounded-xl hover:bg-[#7787FF]";
        delBtn.onclick = () => updateTaskStatus(task.id, "deleted");
        btnGroup.append(doneBtn, delBtn);
    }
    taskDiv.append(title, info, btnGroup);
    tasksContainer.append(taskDiv);
    });
}
function updateTaskStatus(id, status) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.status = status;
        task.updatedAt = new Date().toLocaleDateString();
        tasks = [
            task,
            ...tasks.filter((t) => t.id !== id)
        ]; 
        saveTasks();
        renderTasks();
    }
}
addTaskBtn.onclick = function () {
    const text = taskInput.value.trim();
    if (!text) return;
    const task = {
        id: Date.now(),
        text,
        status: "active",
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString()
    };
    tasks.unshift(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
};
filterSelect.onchange = renderTasks;
renderTasks(); 