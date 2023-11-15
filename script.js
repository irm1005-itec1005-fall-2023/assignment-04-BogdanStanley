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
const headingText = "To do. To done. ✅";

// DOM Elements
let appContainer = document.getElementById("app");

//
// Functions
//
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
  console.log("Render List:", todoItems);

  todoList.innerHTML = "";

  for(let i = 0; i < todoItems.length; i++) {


    let tempName = document.createElement("li");

    tempName.textContent = todoItems[i].text;

  todoList.prepend(tempName);

  }
}


function removeToDoItem(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems.splice(i, 1);
    }
  }
}

function markToDoItemAsCompleted(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems[i].completed = true;
    }
  }
}

function clearCompletedTasks() {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].completed === true) {
      todoItems.splice(i, 1);
    }
  }
}

addToDoItem("Buy milk");
console.log(todoItems);
// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app contianer");
    return;
  }

  // Create an h1 and add it to our app
  const h1 = document.createElement("h1");
  h1.innerText = headingText;
  appContainer.appendChild(h1);

  // Init complete
  console.log("App successfully initialised");
}
//
// Inits & Event Listeners
//
inititialise();