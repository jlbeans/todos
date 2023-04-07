//import  { getProjects } from "./index";
import { defaultProject} from "./default";
import { TodoDisplay } from "./todoDisplay";
//import Project from "./project";
//import currentProjectListeners from "./projectEventController";

const ProjectsDisplay = (() => {
    const projList = document.querySelector('.proj-list'),
        projEditBtn = document.querySelector('.edit-proj-btn'),
        projDelBtn = document.querySelector('.del-proj-btn'),
        projTitle = document.querySelector('.proj-title'),
        projDesc = document.querySelector('.proj-desc'),
        newTodoBtn = document.querySelector('.new-todo-btn');

    let currentProject;
    let currentProjIndex;
    let currentProjElement;
    let allProjects = [defaultProject()];
    
    const addAllProjects = () => {
       createProjectList(allProjects);
    };

    const createProjectList = (projects) => {
        projList.innerHTML = projects
        .map((projItem, i) => {
            return `<li><button class='proj-btn' data-index='${i}'>${projItem.title}</button></li>`;
        })
        .join('');
        document.querySelector('.proj-btn').addEventListener('click', printProject);
    };

    const printProject = (e) => {
        if (currentProjElement){
            currentProjElement.classList.remove("active-project");
        }
        currentProjIndex = e.target.dataset.index;
        currentProject = allProjects[currentProjIndex];
        currentProjElement = e.target;
        currentProjElement.classList.add("active-project");
        projTitle.textContent = currentProject.title;
        projDesc.textContent = currentProject.description;
        projEditBtn.classList.toggle('hidden');
        projDelBtn.classList.toggle('hidden');
        newTodoBtn.classList.toggle('hidden');
        document.querySelector('.proj-todos').innerHTML = "";
        
        for (let i=0;i < currentProject.todos.length;i++){
            TodoDisplay.printTodo(currentProject.todos[i], i);
      };

      //currentProjectListeners(currentProject);
    };

    const removeProject = () => {
        document.querySelector('.printed-proj').innerHTML = "";
        projList.removeChild(getCurrentProjElement().parentNode);
    };

    const getCurrentProject = () => {
        return  currentProject;
    };

    const getCurrentProjElement = () => {
        return  currentProjElement;
    };

    const getCurrentProjIndex = () => {
        return currentProjIndex;
    }

    return { addAllProjects, getCurrentProject, getCurrentProjElement, getCurrentProjIndex};
})();

export { ProjectsDisplay };