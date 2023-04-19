import { todoListeners } from "./eventListeners";
import { format } from "date-fns";

const TodoDisplay = (() => {
    const printTodo = (todo, index) => {
        const projTodos = document.querySelector('.proj-todos');
        const card = document.createElement('div');
        card.className = `todo-card ${todo.priority}`;
        projTodos.appendChild(card);
        const expCollBtn = document.createElement('button');
        expCollBtn.innerHTML = `<i class="fa-solid fa-chevron-down fa-lg"></i>`;
        expCollBtn.className = 'expand-collapse-btn';
        expCollBtn.id = `exp${index}`;
    
        card.appendChild(titleElement(todo, index));
        card.appendChild(dateElement(todo, index));
        card.appendChild(expCollBtn);
        card.appendChild(collapsibleContent(todo, index));
        
        todoListeners(index);
    };

    const titleElement = (todo, index) => {
        const container = document.createElement('div');
        container.className = 'title-element';
        const checkBoxAndTitle = document.createElement('div');
        checkBoxAndTitle.className = 'card-checkbox-title';
        const checkBoxDiv = document.createElement('div');
        const checkBox = document.createElement('input');
        checkBoxDiv.appendChild(checkBox);
        checkBox.type = 'checkbox';
        checkBox.id = `checkbox${index}`;
        checkBox.checked = todo.completed;
        const todoTitle = document.createElement('p');
        todoTitle.className = 'card-title';
        todoTitle.textContent = todo.title;
        todoTitle.id = `title${index}`;
        todo.lineThroughCompleted(todoTitle);

        checkBoxAndTitle.appendChild(checkBoxDiv);
        checkBoxAndTitle.appendChild(todoTitle);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can fa-lg"></i>`;
        deleteBtn.className = 'card-del-btn';
        deleteBtn.id = `del${index}`;

        container.appendChild(checkBoxAndTitle);
        container.appendChild(deleteBtn);
        
        return container;
    }
        
    const dateElement = (todo, index) => {
        const date = document.createElement('div');
        date.className = 'date-element';
        date.textContent = `Due: ${todo.dueDate}`;
        date.id = `date${index}`;
        
        return date;
    };

    const collapsibleContent = (todo, index) => {
        const container = document.createElement('div');
        container.className = 'collapsible';
        const form = document.createElement('form');
        form.className = 'todo-form';
        form.id = `form${index}`;
        form.action = 'index.html';
        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit';
        submitBtn.id = `sub${index}`;
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Save';
       
        form.appendChild(titleInput(todo, index));
        form.appendChild(dueDateInput(todo, index));
        form.appendChild(priorityInput(todo, index));
        form.appendChild(submitBtn);

        container.appendChild(form);
        
        return container;
    };

    const titleInput = (todo, index) => {
        const line = document.createElement('div');
        line.className = 'form-line';
        const label = document.createElement('label');
        label.for = `title${index}`;
        label.textContent = 'Title:';
        const input = document.createElement('input');
        input.className = 'edit-todo-title';
        input.id = `title${index}`;
        input.value = todo.title;
        input.type = 'textarea';
        input.required = 'true';
       
        line.appendChild(label);
        line.appendChild(input);
        
        return line;
    }

    const dueDateInput = (todo, index) => {
		const line = document.createElement("div");
        line.className = 'form-line';
		const label = document.createElement("label");
		label.for = `date${index}`;
		label.textContent = "Due:";
        const input = document.createElement("input");
		input.className = "edit-todo-date";
		input.id = `date${index}`;
		input.value = format(Date.parse(todo.dueDate), 'yyyy-MM-dd');
		input.type = "date";
		input.required = "true";

		line.appendChild(label);
		line.appendChild(input);
		
        return line;
	};

	const priorityInput = (todo, index) => {
		const line = document.createElement("div");
        line.className = 'form-line';
		const label = document.createElement("label");
        label.for = `priority${index}`;
		label.textContent = "Priority:";
		const select = document.createElement("select");
        select.className = "edit-todo-priority";
		select.value = todo.priority;
		select.id = `priority${index}`;
		const critical = document.createElement("option");
        critical.value = "critical";
		critical.textContent = "Critical";
		const high = document.createElement("option");
        high.textContent = "High";
		high.value = "high";
		const medium = document.createElement("option");
        medium.textContent = "Medium";
		medium.value = "medium";
		const low = document.createElement("option");
        low.textContent = "Low";
		low.value = "low";

		select.add(critical);
		select.add(high);
		select.add(medium);
		select.add(low);
        select.selectedIndex = ['critical', 'high', 'medium', 'low'].findIndex(
            (el) => el === todo.priority
          );

        line.appendChild(label);
		line.appendChild(select);

		return line;
	};
    
      return { printTodo };
})();

  export { TodoDisplay };