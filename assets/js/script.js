// Global variables
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

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
};

// Builds the new task item and adds it to the list
var createTaskEl = function(taskDataObj) {

    // Add new list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Add new list item to the list
    listItemEl.appendChild(taskInfoEl);

    // Add buttons to the task item
    var taskActionsEl = createTaskActions(taskIdCounter); 
    listItemEl.appendChild(taskActionsEl);

    // Put list into Tasks To Do
    tasksToDoEl.appendChild(listItemEl);

    // Increment task ID counter
    taskIdCounter++;
};

// Adds buttons to the task item
var createTaskActions = function(taskId) {

    // Create a div to hold all the buttons; call the div actionContainerEl
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // Create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    // Create dropdown menu
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    // Create option items
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

// Functionality to process button clicks on a list item
var taskButtonHandler = function(event) {

    // Actions if delete button is clicked
    if(event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }

    // Actions if edit button is clicked
    if(event.target.matches(".edit-btn")) {
        console.log("edit button click");
    }
};

// Method to delete a task
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

// Event listener to add a new item by submitting the form
formEl.addEventListener("submit", taskFormHandler);

// Event listener for delete element on a task item
pageContentEl.addEventListener("click", taskButtonHandler);