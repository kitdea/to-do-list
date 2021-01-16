const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// load all event listeners
function loadEventListeners() {
// DOM Load Event 
  document.addEventListener('DOMContentLoaded', getTasks);
// add task
  form.addEventListener('submit', addTask);
// remove task
  taskList.addEventListener('click', removeTask);
// clear task event
  clearBtn.addEventListener('click', clearTask);
// filter task event
  filter.addEventListener('keyup', filterTask);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}
// add task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add task');
  }

  const li = document.createElement('li');
  li.className = 'collection-item';

  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);

  taskInput.value = '';

  // Store in LS
  storeTaskInLocalStorage();

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // remove from LS
      removeTaskFromLocalStorage();
      (e.target.parentElement.parentElement);
    }
  } 
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTask() {
  while(taskList) {
    taskList.removeChild(taskList.firstChild);
  }
}

// filter tasks
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
    (function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
  });
  console.log(text);
}