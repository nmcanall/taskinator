// Global variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Create new task helper method
var createTaskHandler = function(event) {

    event.preventDefault();

    // Get the form input
    var taskNameInput = document.querySelector("input[name='task-name'").value;
    var taskTypeInput = document.querySelector("select[name='task-type'").value;

    // Add new list item
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    

    // Add new list item to the list
    taskItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(taskItemEl);
}

// Add a new item to the To-Do List by clicking the button
formEl.addEventListener("submit", createTaskHandler);