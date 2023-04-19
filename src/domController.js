//import  { getProjects } from "./index";
import { defaultProject} from "./default";
import { newProjectListeners, currentProjectListeners } from "./eventListeners";
import { TodoDisplay } from "./todoDisplay"; 

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
    let allProjects = [];
    
    const addAllProjects = () => {
        allProjects.push(defaultProject());
        for (let i = 0; i < allProjects.length; i++) {
			createProjectList(allProjects[i], i);
		}
    };

    const createProjectList = (project, index) => {
		let projItem = document.createElement("li");
		let projBtn = document.createElement("button");
		projItem.appendChild(projBtn);
		projList.append(projItem);
		projBtn.className = "proj-btn";
        projBtn.dataset.index = index;
        projBtn.id = `btn${index}`;
		projBtn.textContent = project.title;
		projBtn.addEventListener("click", printProject);
	};
    
    const printProject = (e) => {
        if (currentProjElement){
            currentProjElement.classList.remove("active-project");
        }
        currentProjIndex = e.target.dataset.index;
        currentProject = allProjects[currentProjIndex];
        currentProjElement = e.target;
        currentProjElement.classList.add("active-project");
        projEditBtn.style.display = 'block';
        projDelBtn.style.display = 'block';
        newTodoBtn.style.display = 'block';
        projTitle.textContent = currentProject.title;
        projDesc.textContent = currentProject.description;
        document.querySelector('.proj-todos').innerHTML = "";
        
        for (let i=0;i < currentProject.todos.length;i++){
            TodoDisplay.printTodo(currentProject.todos[i], i);
      };

      currentProjectListeners(currentProject);
    };

    const addProject = (project, index) => {
        createProjectList(project, index);
    };

    const removeProject = () => {
        projEditBtn.style.display = 'none';
        projDelBtn.style.display = 'none';
        newTodoBtn.style.display = 'none';
        projTitle.textContent = "";
        projDesc.textContent = "";
        document.querySelector('.proj-todos').innerHTML = "";
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

    const getAllProjects = () => {
        return allProjects;
    }

    return { addAllProjects, getCurrentProject, getCurrentProjElement, getCurrentProjIndex, getAllProjects, addProject, removeProject};
})();

export { ProjectsDisplay };