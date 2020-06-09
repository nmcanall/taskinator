// Global variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Create new task helper method
var createTaskHandler = function(event) {

    event.preventDefault();

    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "This is your new task.";
    tasksToDoEl.appendChild(taskItemEl);
}

// Add a new item to the To-Do List by clicking the button
formEl.addEventListener("submit", createTaskHandler);