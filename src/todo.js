import { parseISO, format } from 'date-fns';
export default class Todo {
    constructor(title, dueDate, priority, completed = false){
        this.title = title;
        this.dueDate = format(parseISO(dueDate), 'MM/dd/yy');
        this.priority = priority;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
  
    lineThroughCompleted(e) {
        if (this.completed) {
          e.style.textDecoration = 'line-through';
        } else {
          e.style.textDecoration = 'none';
        }
    };
  
   /* formattedDueDate() {
        return isValid(this.dueDate) ? format(this.dueDate, 'MM/dd/yy') : '';
    }
  
    stringifiedDueDate() {
        return isValid(this.dueDate) ? format(this.dueDate, 'yyyy-MM-dd') : '';
    }*/
  
  };