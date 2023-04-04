// Установить текущую дату

let dateCalendar = document.querySelector('.main-date');

function setDate() {
    let date = new Date();
    dateCalendar.innerHTML = `${addDate(date.getDate())}.${addDate(date.getMonth() + 1)}.${addDate(date.getFullYear())}`;
}

// Фцнкция проверяет числа до 9 и добавляет перед ними ноль для даты
function addDate(num) {
    if (num >= 1 && num <= 9) {
        return '0' + num;
    } else {
        return num;
    }
}

setDate()

// Вызов попап добавления задачи

let form = document.querySelector('.form');                 // Фон попап окна
let addTask = document.querySelector('.add-task');           // Само окно
let openPopup = document.querySelector('.fa-plus');           // Кнопка для показа окна
let closePopup = document.querySelector('.fa-circle-xmark'); // Кнопка для скрытия окна
let cancelPopup = document.querySelector('.form-cancel');    // Кнопка для скрытия окна

openPopup.addEventListener('click', (e) => {                 // Вешаем обработчик на плюсик
    e.preventDefault();
    form.classList.add('active');                           // Добавляем активный класс фону
    addTask.classList.add('active');                         // И окну
});

closePopup.addEventListener('click', () => {                   // Вешаем обработчик на крестик
    form.classList.remove('active');                           // Убираем активный класс с фона
    addTask.classList.remove('active');                         // И с окна
});

cancelPopup.addEventListener('click', () => {                     // Вешаем обработчик на кнопку Cancel
    form.classList.remove('active');                              // Убираем активный класс с фона
    addTask.classList.remove('active');                            // И с окна
});

document.addEventListener('click', (e) => {                        // Вешаем обработчик на весь документ
    if (e.target === form) {                                       // Если цель клика - фон, то:
        form.classList.remove('active');                          // Убираем активный класс с фона
        addTask.classList.remove('active');                         // И с окна
    }
});

// Заполнение формы и размещение в карточку

let inputTitle = addTask.elements.title_text;
let inputAutor = addTask.elements.task_autor;
let textareaText = document.querySelector('textarea');
let btnCreateTask = document.querySelector('.form-create');
let columnMake = document.querySelector('.cards-column-make');




// Создаем массивы для трех колонок
let makeToDO = [];
let progress = [];
let done = [];

// Создаем функцию-конструктор
function CreateTaskToDo(title, text, name, status) {
    this.title = title;
    this.text = text;
    this.name = name;
    this.status = false;
}

// Вешаем событие на форму по нажатию которого будут добавляться объекты
form.addEventListener('submit', getTask);

// Функция получает из инпут значения и добавляет карточку с задачей в массив make
function getTask(e) {
    e.preventDefault();
    let task = new CreateTaskToDo(inputTitle.value, textareaText.value, inputAutor.value, false);
    makeToDO.push(task);

    saveToLocalStor(makeToDO);                       // записываем карточку в localStorage

    clearData([inputTitle, textareaText, inputAutor]);    // очищаем поля ввода

    showTask();                                           // Выводим карточку в документ
    countTasks(makeToDO, countMake);                     // считаем сколько карточек

    console.log(makeToDO);
}

// Функция для очищения полей ввода
function clearData(inputs) {
    inputs.forEach((input) => {
        input.value = "";
    });
}

// Фукция выводит карточку в документ в первую колонку make
function showTask() {
    columnMake.innerHTML = '';

    makeToDO.forEach((task, idx) => {
        columnMake.innerHTML += render(task, idx);
    });

    let dateCards = document.querySelectorAll('.cards-head-date');
    setDateCard(dateCards);

    let btnsDelete = document.querySelectorAll(".card-make-delete");
    deleteTask(btnsDelete);

}

// Функция вставляет дату в карточку
function setDateCard(dateCards) {
    let date = new Date();
    dateCards.forEach((element) => {
        element.innerHTML = `${addDate(date.getDate())}.${addDate(date.getMonth() + 1)}.${addDate(date.getFullYear())}`;
    })
}


// Функция счетчик задач

let countMake = document.querySelector('#total-make-count');

function countTasks(arr, out) {
    let taskCounter = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr.length == 0) {
            out.textContent = 0;
        } else {
            taskCounter += 1
            out.textContent = `${taskCounter}`;
        }
        console.log(taskCounter);
    }

}

// Очищаем массив из задач, очищаем колонку в документе и счетчик обнуляем
let cleanMake = document.querySelector('#make-clean');

function cleanTasks(array) {
    array.forEach((element) => {                 // удаляем все элементы из массива
        let arrElements = array.length;
        array.splice(element, arrElements);
    });
    let docElements = columnMake.children;          // удаляем все дочерние элементы из колонки документа
    for (let task of docElements) {
        task.remove();
    }

    showTask();                                     // обнуляем индексы
}

function cleanTasksLocalSt(array) {                // очищаем массив в localStorage
    localStorage.clear('array');
}

cleanMake.addEventListener('click', () => {         // по нажатию мусорки (верхней)
    cleanTasks(makeToDO);                           // очищаем массив и удаляем из документа
    cleanTasksLocalSt(makeToDO);                    // очищаем массив в localStorage
    countMake.textContent = 0;                      // обнуляем счетчик задач
    
    console.log(makeToDO);                          
});

// Удалить карточку из массива и из колонки документа, уменьшить счетчик по нажатию мусорки

function deleteTask(btnsDelete) {
    btnsDelete.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            makeToDO.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {
                    makeToDO.splice(idx, 1);
                    e.target.closest('.cards-column-card').remove();
                    showTask();
                }
                deleteFromLocalStor(makeToDO);       // удаляем карточку из localStorage

            });
            console.log(makeToDO);

            countTasks(makeToDO, countMake);

        });
    });
}

// Функция рендер для массива make
function render(task, idx) {
    return `                       
    <div class="cards-column-card" data-taskid='${idx}'>
       <div class="cards-head">
          <span class="cards-head-logo">ToDo</span>
          <div class="cards-head-date"></div>
      </div>
      <div class="cards-text">
          <h2 class="cards-text-title">${task.title}</h2>
          <div class="cards-text-description">
            <p>${task.text}</p>
        </div>
      </div>
      <div class="cards-info">
          <span class="cards-info-name">${task.name}</span>
          <button class="card-to_progress">In progress</button>
          <i class="fa-solid fa-trash card-make-delete"></i>
       </div>
    </div>
`;
}

// Функция записи карточек в localStorage
function saveToLocalStor(array) {
    localStorage.setItem('array', JSON.stringify(array));
}

// Функция чтоб забирать данные из localStorage
function parseFromLocalStor(array) {
    let data = JSON.parse(localStorage.getItem("array"));

    // if (data) {
    //   sortItem(data);
    // } else {
    //   out.textContent = "";
    // }
}

// Функция удаления записи из localStorage
function deleteFromLocalStor(array) {
    localStorage.removeItem('array');
    showTask();
    saveToLocalStor(array);
}