//import { toggleCompleted, lineThroughCompleted } from './todo.js';
import { ProjectsDisplay } from "./domController";
//import { removeTodo } from './project.js';
import { parseISO, format } from "date-fns";

const addEventListeners = (index) => {
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
        const primary = card.firstChild;
        primary.className = 'card-primary';
        const cardTitle = primary.querySelector('.card-title');
        cardTitle.textContent = todo.title;
        const date = card.firstChild.nextSibling;
        date.className = 'card-date';
        date.textContent = `Due: ${format(parseISO(todo.dueDate), 'MM/dd/yy')}`;
        const button = card.firstChild.nextSibling.nextSibling;
        button.className = 'expand-collapse-btn';
        const content = card.firstChild.nextSibling.nextSibling.nextSibling;
        content.className = 'collapsible';
        button.click();
    });
};

export default addEventListeners;