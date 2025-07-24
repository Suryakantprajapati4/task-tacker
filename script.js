document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        // Add task when Enter key is pressed in the input field
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input value and remove whitespace

        if (taskText === '') {
            alert('Please enter a task!'); // Prevent adding empty tasks
            return;
        }

        // Create a new list item (li) for the task
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${taskText}</span>
            <div class="actions">
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        `;

        // Append the new task to the task list
        taskList.appendChild(listItem);

        // Add event listeners for the new buttons
        listItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
        listItem.querySelector('.delete-btn').addEventListener('click', deleteTask);

        // Clear the input field
        taskInput.value = '';

        // Save tasks to Local Storage
        saveTasks();
    }

    // Function to toggle task completion
    function toggleComplete(event) {
        const listItem = event.target.closest('li'); // Get the parent <li> element
        listItem.classList.toggle('completed'); // Toggle the 'completed' class

        // Save tasks to Local Storage after modification
        saveTasks();
    }

    // Function to delete a task
    function deleteTask(event) {
        const listItem = event.target.closest('li'); // Get the parent <li> element
        listItem.remove(); // Remove the <li> from the DOM

        // Save tasks to Local Storage after modification
        saveTasks();
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            tasks.push({
                text: item.querySelector('span').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${task.text}</span>
                    <div class="actions">
                        <button class="complete-btn">✔</button>
                        <button class="delete-btn">✖</button>
                    </div>
                `;
                if (task.completed) {
                    listItem.classList.add('completed');
                }
                taskList.appendChild(listItem);

                // Add event listeners for loaded tasks
                listItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
                listItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
            });
        }
    }
});