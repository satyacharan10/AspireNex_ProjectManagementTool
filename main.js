document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('project-form');
    const taskForm = document.getElementById('task-form');
    const projectsDiv = document.getElementById('projects');
    let currentProject = null;

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = document.getElementById('project-name').value;
        createProject(projectName);
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = document.getElementById('task-name').value;
        const taskDeadline = document.getElementById('task-deadline').value;
        addTaskToProject(currentProject, taskName, taskDeadline);
    });

    function createProject(name) {
        const project = {
            name: name,
            tasks: []
        };
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <button onclick="addTask('${project.name}')">Add Task</button>
            <div class="tasks"></div>
        `;
        projectsDiv.appendChild(projectDiv);
        projectForm.reset();
    }

    function addTaskToProject(projectName, taskName, taskDeadline) {
        const projects = document.querySelectorAll('.project');
        projects.forEach(projectDiv => {
            const projectNameEl = projectDiv.querySelector('h3').innerText;
            if (projectNameEl === projectName) {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerHTML = `
                    <p>Task: ${taskName}</p>
                    <p>Deadline: ${taskDeadline}</p>
                `;
                projectDiv.querySelector('.tasks').appendChild(taskDiv);
                taskForm.reset();
                taskForm.classList.add('hidden');
            }
        });
    }
    
    window.addTask = function(projectName) {
        currentProject = projectName;
        taskForm.classList.remove('hidden');
    }
});
