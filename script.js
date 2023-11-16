/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
//

// Constants
const appID = "app";

// DOM Elements
let appContainer = document.getElementById("app");

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

let uniqueId = 0;
let todoItems = [];

function addToDoItem(text) {
  todoItems.push({
    id: uniqueId++,
    text: text,
    completed: false,
  });
}

let todoInputForm = document.getElementById("todo-form");

let todoTextBox = document.getElementById("todo-input");

let todoList = document.getElementById("todo-results");

todoInputForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event){
  event.preventDefault();
  const inputValue = todoTextBox.value;

  addToDoItem(inputValue); 

  renderList(); 
}


function renderList() {
  console.log("Todo List:", todoItems);

  todoList.innerHTML = "";

  for (let i = 0; i < todoItems.length; i++) {
    let tempName = document.createElement("li");
    tempName.textContent = todoItems[i].text;
    tempName.dataset.id = todoItems[i].id;
    todoList.prepend(tempName);
  }
}



let todoResults = document.getElementById("todo-results");

todoResults.addEventListener("click", handleListClick);
function handleListClick(event) {
  if (event.target.matches("li")) {
    const todoId = parseInt(event.target.dataset.id);
    markToDoItemAsCompleted(todoId);
    event.target.classList.toggle("completed");
    console.log("Array updated:", todoItems);
  }
}

function markToDoItemAsCompleted(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems[i].completed = !todoItems[i].completed;
    }
  }
}
console.log(todoItems);

todoResults.addEventListener("dblclick", handleListDoubleClick);

function handleListDoubleClick(event) {
  removeToDoItem(parseInt(event.target.dataset.id));
  if (event.target.matches("li")) {
    event.target.remove();
  }
}

function removeToDoItem(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems.splice(i, 1);
    }
  }
}

// Add a button to clear all completed tasks
function clearCompletedTasks() {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].completed === true) {
      todoItems.splice(i, 1);
    }
  }
}

// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app contianer");
    return;
  }

  // Create an h1 and add it to our app
 
  // Init complete
  console.log("App successfully initialised");
}
//
// Inits & Event Listeners
//
inititialise();