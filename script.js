/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
//

// Constants
const app = "app";
const headingText = "To do. To done. ✅";
//
// Functions
//

//Settings Menu

let collapse = document.getElementsByClassName("collapse");

for (i = 0; i < collapse.length; i++) {
  collapse[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
} 

let clearAllButton = document.getElementById("clear-all-btn");
clearAllButton.addEventListener("click", clearAllTasks);

function clearAllTasks() {
  todoItems = [];
  console.log("Array Cleared", todoItems);
  renderList();
}

//Todo App

let uniqueId = 0;
let todoItems = [];

let todoInputForm = document.getElementById("todo-form");
let todoTextBox = document.getElementById("todo-input");
let todoList = document.getElementById("todo-results");

let todoResults = document.getElementById("todo-results");

let clearCompletedButton = document.getElementById("clear-btn");
clearCompletedButton.addEventListener("click", clearCompletedTasks);

let deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteTask);

function deleteTask(event) {
  const todoId = parseInt(event.target.dataset.id);
  removeToDoItem(todoId);
  if (event.target.matches("img")) {
    event.target.parentElement.remove();
  }
}

function clearCompletedTasks() {
  for (let i = todoItems.length - 1; i >= 0; i--) {
    if (todoItems[i].completed === true) {
      todoItems.splice(i, 1);
    }
  }
  renderList();
}

function addToDoItem(text) {
  todoItems.push({
    id: uniqueId++,
    text: text,
    completed: false,
  });
}

todoInputForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event){
  event.preventDefault();
  const inputValue = todoTextBox.value;

  addToDoItem(inputValue);
  renderList(); 
  console.log("Task added", todoItems);

  todoInputForm.reset();
}

function renderList() {
  todoList.innerHTML = "";

  if (todoItems.length === 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Uh oh! Your list is empty!";
    todoList.appendChild(emptyMessage);
  } else {
    for (let i = 0; i < todoItems.length; i++) {
      let tempName = document.createElement("li");
      tempName.textContent = todoItems[i].text;
      tempName.dataset.id = todoItems[i].id;

      let deleteButton = document.createElement("img");       
      deleteButton.src = "./images/icons/cross-small.svg";       
      deleteButton.alt = "Delete Task";       
      deleteButton.dataset.id = todoItems[i].id;       
      deleteButton.classList.add("delete-btn");       
      deleteButton.addEventListener("click", deleteTask);        
      tempName.appendChild(deleteButton);

      if (todoItems[i].completed) {
        tempName.classList.add("completed");
      }

      todoList.prepend(tempName);
    }
  }
}

todoResults.addEventListener("click", handleListClick);
function handleListClick(event) {
  if (event.target.matches("li")) {
    const todoId = parseInt(event.target.dataset.id);
    markToDoItemAsCompleted(todoId);
    event.target.classList.toggle("completed");
    console.log("Array updated:", todoItems);
  }
}

todoResults.addEventListener("dblclick", handleListDoubleClick);

function handleListDoubleClick(event) {
  removeToDoItem(parseInt(event.target.dataset.id));
  if (event.target.matches("li")) {
    event.target.remove();
  }
}

function markToDoItemAsCompleted(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems[i].completed = !todoItems[i].completed;
    }
  }
}

function removeToDoItem(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems.splice(i, 1);
    }
  }
  console.log("Task removed", todoItems); 
}

let appContainer = document.getElementById(app);

// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app container");
    return;
  }

  // Create an h1 and add it to our app
  const h1 = document.createElement("h1");
  h1.innerText = headingText;
  h1.classList.add("sr-only"); 

  appContainer.appendChild(h1);

  // Init complete
  console.log("App successfully initialised");
  clearAllTasks();
}

inititialise();