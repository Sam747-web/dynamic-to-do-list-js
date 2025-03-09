document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear the list
    
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;
    
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = 'remove-btn';
            removeBtn.addEventListener('click', () => {
                li.remove();
                saveTasks(); // Save updated list
            });
    
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }
    
    function saveTasks() {
        const tasks = [...document.querySelectorAll('#task-list li')].map(li => li.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function addTask() {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();
    
        if (taskText !== '') {
            const li = document.createElement('li');
            li.textContent = taskText;
    
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = 'remove-btn';
            removeBtn.addEventListener('click', () => {
                li.remove();
                saveTasks();
            });
    
            li.appendChild(removeBtn);
            document.getElementById('task-list').appendChild(li);
            taskInput.value = ''; // Clear input
    
            saveTasks(); // Save to Local Storage
        }
    }
    
    // Attach event listeners
    document.getElementById('add-task-btn').addEventListener('click', addTask);
    document.getElementById('task-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Load tasks when page loads
    document.addEventListener('DOMContentLoaded', () => {
        loadTasks();
    });
    
    
    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert("Please enter a valid task!");
            return;
        }

        // Create task element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            removeFromStorage(taskText);
        };

        // Append button to task item and task item to list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Save to Local Storage
        if (save) {
            saveToStorage(taskText);
        }

        // Clear input field
        taskInput.value = '';
    }

    // Function to save tasks to Local Storage
    function saveToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove tasks from Local Storage
    function removeFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event Listeners
    addButton.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
