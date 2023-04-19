export default class Project {
    constructor(title, description){
        this.title = title
        this.description = description
        this.todos = []
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }
}