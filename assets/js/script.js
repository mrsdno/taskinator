var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var taskIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');

var taskFormHandler = function(event) {
    // prevent default action
    event.preventDefault();
    // define local variables to accept user inputs
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input value is an empty string
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

}

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add list to item
    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add buttons and dropdown list
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //increment the counter by 1
    taskIdCounter++;

}

var createTaskActions = function(taskId) {
    // create container for buttons
    var actionContatinerEl = document.createElement("div");
    actionContatinerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContatinerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContatinerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i=0; i < statusChoices.length; i ++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContatinerEl.appendChild(statusSelectEl);

    return actionContatinerEl;
}

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    var targetEl = event.target; 

    // edit button clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    // delete button clicked
    else if (targetEl.matches(".delete-btn")) {
        // get the elements task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    //update the form
    document.querySelector("input[name='task-name'").value = taskName;
    document.querySelector("select[name='task-type'").value = taskType;

    //update the submit button
    document.querySelector("#save-task").textContent = "Save Task";

    //keep taskId with the task
    formEl.setAttribute("data-task-id", taskId);
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId +"']");
    taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);