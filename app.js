// DOM references
const taskInput = document.querySelector(".add-item__task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.querySelector(".todo__items");
const completedTasksHolder = document.querySelector(".complete__items");

// Create new task list item
function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");
  listItem.classList.add("todo__item");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("todo__checkbox");

  const label = document.createElement("label");
  label.innerText = taskString;
  label.classList.add("task", "todo__task");

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("task", "todo__input");

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("edit", "todo__edit", "button");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete", "todo__delete", "button");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.classList.add("todo__img");
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Add task
function addTask() {
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

// Edit task
function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type="text"]');
  const label = listItem.querySelector(".todo__task");
  const editBtn = listItem.querySelector(".todo__edit");

  const isEditing = listItem.classList.contains("todo__item_edit");

  if (isEditing) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("todo__item_edit");
}

// Delete task
function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// Mark task completed
function taskCompleted() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark task incomplete
function taskIncomplete() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

// Optional AJAX stub
function ajaxRequest() {
  console.log("AJAX Request");
}

// Bind events to task item
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const editButton = taskListItem.querySelector(".todo__edit");
  const deleteButton = taskListItem.querySelector(".todo__delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

// Initial bindings
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
