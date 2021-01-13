const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// load all event listeners
function loadEventListeners() {
// add task
  form.addEventListener('submit', addTask);
// remove task
  taskList.addEventListener('click', removeTask);
// clear task event
  clearBtn.addEventListener('click', clearTask);
// filter task event
  filter.addEventListener('click', filterTasks);
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

  console.log();
  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  } 
}

// Clear Task
function clearTask() {
  while(taskList) {
    taskList.removeChild(taskList.firstChild);
  }
}

// filter tasks
function filterTasks(e) {
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
}