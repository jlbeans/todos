
import { ProjectsDisplay } from "./domController";
import { parseISO, format } from "date-fns";
import { TodoDisplay } from "./todoDisplay";
import Todo from "./todo";


const currentProjectListeners = (project) => {
    document.querySelector('.edit-proj-btn').addEventListener('click', editProject);
    document.querySelector('.new-todo-btn').addEventListener('click', toggleNewTodo);
    document.querySelector('.todo-close').addEventListener('click', toggleNewTodo);
    
    document.querySelector('.del-proj-btn').addEventListener('click', function() {
        const index = ProjectsDisplay.getCurrentProjIndex();
        const projects =  ProjectsDisplay.getAllProjects();
        const projBtn = ProjectsDisplay.getCurrentProjElement();
        const projItem = projBtn.parentNode;
        const projList = projBtn.parentNode.parentNode;
        projList.remove(projItem);
        projects.splice(index, 1);
        ProjectsDisplay.removeProject();
    });

    document.querySelector('.new-todo-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const todo = new Todo(
            e.target.querySelector("[name=title]").value,
            e.target.querySelector("[name=date]").value,
            e.target.querySelector("[name=priority]").value,
        );
        toggleNewTodo(e);
        project.addTodo(todo);
        TodoDisplay.printTodo(todo, project.todos.length - 1);
    });

    
    function editProject() {
        const editProjForm = document.querySelector('.edit-proj-form'), 
            editProjModal = document.querySelector('.edit-proj-modal'),
            editModalClose = document.querySelector('.edit-close');

        editProjForm.querySelector('.edit-proj-title').value = project.title;
        editProjForm.querySelector('.edit-proj-desc').value = project.description;
        editProjModal.classList.toggle('hidden');

        editProjForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projBtn = ProjectsDisplay.getCurrentProjElement();
        project.title = e.target.querySelector('.edit-proj-title').value;
        project.description = e.target.querySelector('.edit-proj-desc').value;
        projBtn.textContent = project.title;
        document.querySelector('.proj-title').textContent = project.title;
        document.querySelector('.proj-desc').textContent = project.description;
        editProjModal.classList.toggle('hidden');
        });

        editModalClose.addEventListener('click', function() {
        editProjModal.classList.toggle('hidden');
        });
    };


    function toggleNewTodo(e) {
        e.preventDefault();
        const todoModal = document.querySelector('.new-todo-modal');
        todoModal.classList.toggle('hidden');
    };

};

const todoListeners = (index) => {
    document.querySelector(`#checkbox${index}`).addEventListener('click', function() {
        const todo = ProjectsDisplay.getCurrentProject().todos[index];
        todo.toggleCompleted();
        todo.lineThroughCompleted(this.parentNode.nextElementSibling);
    });

    document.querySelector(`#del${index}`).addEventListener('click', function() {
        const currentProject = ProjectsDisplay.getCurrentProject();
        currentProject.removeTodo(index);
        document.querySelector('.proj-todos')
        .removeChild(this.parentNode.parentNode);
    });
    
    document.querySelector(`#exp${index}`).addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.display === 'block'){
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });

    document.querySelector(`#form${index}`).addEventListener('submit', (e) => {
        e.preventDefault();
        const todo = ProjectsDisplay.getCurrentProject().todos[index];
        todo.title = e.target.querySelector('.edit-todo-title').value;
        todo.dueDate = e.target.querySelector('.edit-todo-date').value;
        todo.priority = e.target.querySelector('.edit-todo-priority').value;
        const card = e.target.parentNode.parentNode;
        card.className = `todo-card ${todo.priority}`;
        const titleElement = card.firstChild;
        titleElement.className = 'title-element';
        const todoTitle = titleElement.querySelector('.card-title');
        todoTitle.textContent = todo.title;
        const date = card.firstChild.nextSibling;
        date.className = 'date-element';
        date.textContent = `Due: ${format(parseISO(todo.dueDate), 'MM/dd/yy')}`;
        const button = card.firstChild.nextSibling.nextSibling;
        button.className = 'expand-collapse-btn';
        const content = card.firstChild.nextSibling.nextSibling.nextSibling;
        content.className = 'collapsible';
        button.click();
    });
};

export { currentProjectListeners, todoListeners };