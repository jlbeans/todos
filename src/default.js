import { add, format } from "date-fns";
import Project from "./project";
import Todo from "./todo";

function defaultProject() {
  const project = new Project( "Welcome", "Welcome to todos");
    
  const first = new Todo(
    'Welcome to Todos', 
    format(new Date(add(Date.now(), { days: 1 })),'yyyy-MM-dd'), 
    'critical',
    );

  const second = new Todo(
    "To create a new project, click the '+' button on the left",
    format(new Date(add(Date.now(), { days: 2 })),'yyyy-MM-dd'), 
    'high',
  );

  const third = new Todo(
    "To create a new todo, click the '+' button at the top",
    format(new Date(add(Date.now(), { days: 3 })),'yyyy-MM-dd'), 
    'medium',
  );

  [first, second, third].forEach((todo) => project.addTodo(todo));
  
  return project;
  };

export { defaultProject };