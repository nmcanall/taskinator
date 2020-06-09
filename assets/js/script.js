// Global variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Create new task helper method
var taskFormHandler = function(event) {

    event.preventDefault();

    // Get the form input
    var taskNameInput = document.querySelector("input[name='task-name'").value;
    var taskTypeInput = document.querySelector("select[name='task-type'").value;

    // Check to ensure form has content, if not, go back
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form.");
        return false;
    }

    // Reset the form after data input is captured
    formEl.reset();

    // Create object for data input
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {

    // Add new list item
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    

    // Add new list item to the list
    taskItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(taskItemEl);
}

// Add a new item to the To-Do List by clicking the button
formEl.addEventListener("submit", taskFormHandler);