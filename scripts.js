const input = document.querySelector("[data-text-field]");
const addToDoBtn = document.querySelector("[data-add-todo-btn]");
const container = document.querySelector("[data-todo-container]");
const todoList = JSON.parse(localStorage.getItem("todos")) || [];

const SaveToLocalStorage = (key = "todos") => {
	localStorage.setItem("todos", JSON.stringify(todoList));
}
addToDoBtn.addEventListener("click", () => {
	if(input.value.trim()){
		todoList.push(input.value);
		input.value = '';
		SaveToLocalStorage();
		render();
	}

})

const createElement = (tagName, textContent) => {
	const element = document.createElement(tagName);
	element.textContent = textContent;

	return element;
}

const removeToDo = (index) => {
	todoList.splice(index, 1);
	SaveToLocalStorage();
	render();
}

const render = () => {
	container.innerHTML = "";
	todoList.forEach((todo, index) => {
	const todoElement = createElement('div' , todo);
	const removeBtn = createElement('button' , "❌");

	removeBtn.addEventListener('click', () => removeToDo(index));

	todoElement.classList.add("todo-item");
	todoElement.append(removeBtn);

	container.append(todoElement);

})
}
render();