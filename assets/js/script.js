// Global variables
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var tasks = []; // Array to hold all task objects

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

    // Edit a task rather than creating a new one
    var isEdit = formEl.hasAttribute("data-task-id"); // true if the task has already been created (taskId is present)

    // If the task already exist, edit the task
    if(isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    // If it's a new task, create the new one
    else {
        // Create object for data input
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput, 
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }
};

// Builds the new task item and adds it to the list
var createTaskEl = function(taskDataObj) {

    // Add new list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Add new list item to the list
    listItemEl.appendChild(taskInfoEl);

    // Add buttons to the task item
    var taskActionsEl = createTaskActions(taskIdCounter); 
    listItemEl.appendChild(taskActionsEl);

    // Add data object into the list array
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks();

    // Put list into Tasks To Do
    tasksToDoEl.appendChild(listItemEl);

    // Increment task ID counter
    taskIdCounter++;
};

// Edits a pre-existing task
var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Update the item
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    // Update the array with the new value
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    saveTasks();

    // Reset the form
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
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
    var targetEl = event.target;
    var taskId = targetEl.getAttribute("data-task-id");

    // Actions if delete button is clicked
    if(targetEl.matches(".delete-btn")) {
        deleteTask(taskId);
    }

    // Actions if edit button is clicked
    if(targetEl.matches(".edit-btn")) {
        editTask(taskId);
    }
};

// Functionality to process a change in the status selection
var taskStatusChangeHandler = function(event) {
    var targetEl = event.target;
    var taskId = targetEl.getAttribute("data-task-id");
    var statusValue = targetEl.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Move the task into the appropriate column
    if(statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if(statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if(statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // Update the array with the new value
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

// Method to delete a task
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // Delete the appropriate value from the array
    var updatedTasks = [];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTasks.push(tasks[i]);
        }
    }
    tasks = updatedTasks;
    saveTasks();
};

// Method to edit a task
var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Get the name and type of the task
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // Load name and type into the form
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // Change form submit button to edit task
    document.querySelector("#save-task").textContent = "Save Task";

    // Put edits into the correct task item
    formEl.setAttribute("data-task-id", taskId);
};

// Method to create drag effect
var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
};

// Method to create drag-over effect
var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if(taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
};

// Method to create a drop effect
var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");

    // Determine which list the item was dropped to 
    if(statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if(statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if(statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }

    // Remove styling to the potential items to drop into
    dropZoneEl.removeAttribute("style");

    // Add element to the new list
    dropZoneEl.appendChild(draggableElement);

    // Update the array with the new value
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    saveTasks();
};

// Helper method to remove styling from the list when you drag-leave that list
var dragLeaveHandler = function(event) {
    var hoverZoneEl = event.target.closest(".task-list");
    if(hoverZoneEl) {
        hoverZoneEl.removeAttribute("style");  
    }
};

// Function to save the state of the tasks array
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Event listener to add a new item by submitting the form
formEl.addEventListener("submit", taskFormHandler);

// Event listener for delete and edit elements on a task item
pageContentEl.addEventListener("click", taskButtonHandler);

// Event listener for text status change
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// DragStart listner applied to the entire "main" tag
pageContentEl.addEventListener("dragstart", dragTaskHandler);

// DragOver listner applied to the entire "main" tag
pageContentEl.addEventListener("dragover", dropZoneDragHandler);

// Drop listner applied to the entire "main" tag
pageContentEl.addEventListener("drop", dropTaskHandler);

// Leave event listener to apply to "main" tag
pageContentEl.addEventListener("dragleave", dragLeaveHandler);