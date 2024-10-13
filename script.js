document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("todo-form");
    const taskList = document.getElementById("task-list");

    // Load tasks from localStorage
    loadTasks();

    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addTask();
    });

    function addTask() {
        const taskInput = document.getElementById("task-input").value;
        const taskDate = document.getElementById("task-date").value;
        const taskDesc = document.getElementById("task-desc").value;
        const taskPriority = document.getElementById("task-priority").value;

        if (taskInput) {
            const task = {
                text: taskInput,
                date: taskDate,
                desc: taskDesc,
                priority: taskPriority,
                completed: false
            };

            saveTask(task);
            renderTask(task);
            taskForm.reset();
        }
    }

    function renderTask(task) {
        const li = document.createElement("li");
        li.className = `task priority-${task.priority}`;

        const taskContent = document.createElement("span");
        taskContent.textContent = `${task.text} (Due: ${task.date}) - ${task.desc}`;
        if (task.completed) taskContent.classList.add("completed");

        li.appendChild(taskContent);

        // Complete task on click
        taskContent.addEventListener("click", function () {
            task.completed = !task.completed;
            saveAllTasks();
            this.classList.toggle("completed");
        });

        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(li);
            deleteTask(task.text);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(renderTask);
    }

    function saveAllTasks() {
        let tasks = [];
        taskList.childNodes.forEach(function (li) {
            const taskContent = li.firstChild.textContent;
            const completed = li.firstChild.classList.contains("completed");
            tasks.push({
                text: taskContent,
                completed: completed
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => t.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
