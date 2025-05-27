const input = document.querySelector("[data-text-field]");
const addToDoBtn = document.querySelector("[data-add-todo-btn]");
const container = document.querySelector("[data-todo-container]");
const todoList = JSON.parse(localStorage.getItem("todos")) || [];

const SaveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todoList));
}

addToDoBtn.addEventListener("click", () => {
    if(input.value.trim()){
        todoList.push({ text: input.value, completed: false });
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

// Переключение выполненности
const toggleComplete = (index) => {
    todoList[index].completed = !todoList[index].completed;
    SaveToLocalStorage();
    render();
}

// Удаление задачи
const removeToDo = (index) => {
    todoList.splice(index, 1);
    SaveToLocalStorage();
    render();
}

// Обновление текста задачи
const updateToDoText = (index, newText) => {
    todoList[index].text = newText;
    SaveToLocalStorage();
    render();
}

const render = () => {
    container.innerHTML = "";
    todoList.forEach((todo, index) => {
        const todoItemDiv = document.createElement('div');
        todoItemDiv.classList.add("todo-item");
        
        // Если задача выполнена, добавляем класс для перечеркивания
        if (todo.completed) {
            todoItemDiv.classList.add("completed");
        }

        // Текст задачи или поле для редактирования
        let textSpan;

        // Создаём элемент для отображения текста или поля ввода
        if (todo.editing) {
            // Если в режиме редактирования — создаём input
            const inputEdit = document.createElement('input');
            inputEdit.type = 'text';
            inputEdit.value = todo.text;
            inputEdit.size = Math.max(todo.text.length + 2, 10);

            // Обработчик для сохранения по Enter или потере фокуса
            inputEdit.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    updateToDoText(index, inputEdit.value);
                } else if (e.key === 'Escape') {
                    // Отмена редактирования
                    delete todo.editing;
                    render();
                }
            });
            inputEdit.addEventListener('blur', () => {
                updateToDoText(index, inputEdit.value);
            });

            textSpan = inputEdit;
        } else {
            // Обычный текст задачи
            textSpan = createElement('span', todo.text);
            // Можно добавить стиль курсора при наведении
            textSpan.style.cursor = 'pointer';

            // Для начала редактирования по двойному клику
            textSpan.addEventListener('dblclick', () => {
                todo.editing = true;
                render();
            });
        }

        // Кнопка для перечеркивания/отмены выполнения
        const toggleBtn = createElement('button', "✓");
        toggleBtn.addEventListener('click', () => toggleComplete(index));

        // Кнопка удаления
        const removeBtn = createElement('button', "❌");
        removeBtn.addEventListener('click', () => removeToDo(index));

        // Кнопка редактирования
        const editBtn = createElement('button', "✏️");
        editBtn.addEventListener('click', () => {
            todo.editing = true;
            render();
        });

        // Добавляем элементы внутрь блока задачи
        todoItemDiv.appendChild(textSpan);
        todoItemDiv.appendChild(editBtn);
        todoItemDiv.appendChild(toggleBtn);
        todoItemDiv.appendChild(removeBtn);

        container.appendChild(todoItemDiv);
    });
}

// Изначальный рендер при загрузке страницы
render();