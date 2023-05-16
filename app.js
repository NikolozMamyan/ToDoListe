const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

function addDeleteButtonListener() {
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      button.parentElement.remove();
      const taskText = button.parentElement.querySelector('span').textContent;
      let savedTasks = JSON.parse(localStorage.getItem('task'));
      savedTasks = savedTasks.filter(function(task) {
        return task.task !== taskText;
      });
      localStorage.setItem('task', JSON.stringify(savedTasks));
    });
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (!input.value.trim()) {
    alert('Введите текст задачи');
    return;
  }

  list.innerHTML += `
    <li>
      <span>${input.value}</span>
      <button class="delete-button">Delete</button>
    </li>
  `;
  
  const data = {
    task: input.value
  }

  let oldTasks = JSON.parse(localStorage.getItem('task'));
  if (!oldTasks) {
    oldTasks = [];
  }

  const newTasks = [...oldTasks, data];
  localStorage.setItem('task', JSON.stringify(newTasks));

  input.value = '';

  addDeleteButtonListener();
});

window.addEventListener('load', function() {
  let savedTasks = JSON.parse(localStorage.getItem('task'));
  if (savedTasks) {
    savedTasks.forEach(function(task) {
      list.innerHTML += `
        <li>
          <span>${task.task}</span>
          <button class="delete-button">Delete</button>
        </li>
      `;
    });
  }

  addDeleteButtonListener();
});
