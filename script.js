//Variables for task to loop at the home page

var typed = new Typed (".input",{
    strings:['Create task','Track task progress', 'Prioritize tasks','Collaborate effectively'],
    typSpeed:200,
    backSpeed:200,
    loop:true
})
    
// Fetching data
function fetchTasks() {
    fetch('http://localhost:3000/tasks') 
      .then(response => response.json())
      .then(data => {
        const tasks = data;
        const taskList = document.getElementById('task-list');
  
        taskList.innerHTML = '';
  
        tasks.forEach(task => {
          const row = document.createElement('tr');
  
          const titleCell = document.createElement('td');
          titleCell.textContent = task.title;
          row.appendChild(titleCell);
  
          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = task.description;
          row.appendChild(descriptionCell);
  
          const dueDateCell = document.createElement('td');
          dueDateCell.textContent = task.dueDate;
          row.appendChild(dueDateCell);
  
          const priorityCell = document.createElement('td');
          priorityCell.textContent = task.priority;
          row.appendChild(priorityCell);
  
          const statusCell = document.createElement('td');
          statusCell.textContent = task.status;
          row.appendChild(statusCell);
  
          const assigneeCell = document.createElement('td');
          assigneeCell.textContent = getUserById(data.users, task.assignee).name;
          row.appendChild(assigneeCell);
  
          const commentsCell = document.createElement('td');
          commentsCell.textContent = task.comments.length;
          row.appendChild(commentsCell);
  
          const attachmentsCell = document.createElement('td');
          attachmentsCell.textContent = task.attachments.length;
          row.appendChild(attachmentsCell);
  
          taskList.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }
  
  //fetching a user by ID
  function getUserById(users, userId) {
    return users.find(user => user.id === userId);
  }
  
  //creating a new task
  function createTask(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const assignee = parseInt(document.getElementById('assignee').value);
  
    const newTask = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      status: 'incomplete',
      assignee: assignee,
      comments: [],
      attachments: []
    };
  
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(() => {
        fetchTasks();
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  }
  
  // Function to update task status
  function updateTaskStatus(event) {
    event.preventDefault();
  
    const taskSelect = document.getElementById('task-select');
    const statusSelect = document.getElementById('status-select');
    const taskId = parseInt(taskSelect.value);
    const newStatus = statusSelect.value;
  
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(() => {
        fetchTasks();
      })
      .catch(error => {
        console.error('Error updating task status:', error);
      });
  }
  
  // Fetch tasks and populate the task list
  fetchTasks();
  
  // Add event listener to the create task form submit event
  const createTaskForm = document.getElementById('create-task-form');
  createTaskForm.addEventListener('submit', createTask);
  
  // Add event listener to the update status button click event
  const updateStatusButton = document.querySelector('button[type="submit"]');
  updateStatusButton.addEventListener('click', updateTaskStatus);
  

  