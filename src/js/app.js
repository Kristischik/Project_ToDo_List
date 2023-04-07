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
let columnProgress = document.querySelector('.cards-column-progress');
let columnDone = document.querySelector('.cards-column-done');



// Создаем массивы для трех колонок
let makeToDO = [];
let progress = [];
let done = [];

// Создаем функцию-конструктор
function CreateTaskToDo(title, text, name) {
    this.title = title;
    this.text = text;
    this.name = name;

}

// Вешаем событие на форму по нажатию которого будут добавляться объекты
form.addEventListener('submit', getTask);

// Функция получает из инпут значения и добавляет карточку с задачей в массив make
function getTask(e) {
    e.preventDefault();
    let task = new CreateTaskToDo(inputTitle.value, textareaText.value, inputAutor.value);
    makeToDO.push(task);

    localStorage.setItem('make', JSON.stringify(makeToDO));   // записываем карточку в localStorage

    clearData([inputTitle, textareaText, inputAutor]);    // очищаем поля ввода

    showTask();                                           // Выводим карточку в документ
    countTasks(makeToDO, countMake);                     // считаем сколько карточек

    // console.log(makeToDO);
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
        columnMake.innerHTML += renderMakeToDo(task, idx);
    });

    let dateCards = document.querySelectorAll('.cards-head-date');   // получаем дату в карточке
    setDateCard(dateCards);

    let btnsDelete = document.querySelectorAll(".card-make-delete");  // получаем все кнопки с мусорками в созданных карточках
    deleteTask(btnsDelete);                                             // передаем функции по удалению карточек кнопки-мусорки

    let btnsToProgress = document.querySelectorAll(".card-to_progress");  // получаем все кнопки с In progress в созданных карточках
    taskToProgress(btnsToProgress);

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
let countProgress = document.querySelector('#total-progress-count');
let countDone = document.querySelector('#total-done-count');

function countTasks(arr, out) {
    out.textContent = arr.length;
}

// Очищаем массив из задач, очищаем колонку в документе и счетчик обнуляем
let cleanMake = document.querySelector('#make-clean');
let cleanProgress = document.querySelector('#progress-clean');
let cleanDone = document.querySelector('#done-clean');

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

// Функция удаляющая все из массива make из документа и из локал стораж
cleanMake.addEventListener('click', () => {         // по нажатию мусорки (верхней)
    cleanTasks(makeToDO);                           // очищаем массив и удаляем из документа
    DelMakeFromLocalStor();                          // очищаем массив в localStorage
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
                DelMakeFromLocalStor();       // удаляем массив make из localStorage и перезаписываем

            });
            console.log(makeToDO);

            countTasks(makeToDO, countMake);

        });
    });
}

// Функция рендер для массива make
function renderMakeToDo(task, idx) {
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
function saveToLocalStor() {
    localStorage.setItem('make', JSON.stringify(makeToDO));
}

function saveProgressToLocalStor() {
    localStorage.setItem('progress', JSON.stringify(progress));
}

function saveDoneToLocalStor() {
    localStorage.setItem('done', JSON.stringify(done));
}


// // Функция чтоб забирать данные из localStorage
// function parseFromLocalStor() {
//     let data = JSON.parse(localStorage.getItem("make"));

//     if (data) {
//       sortItem(data);
//     } else {
//       out.textContent = "";
//     }
// }

// Функция удаления записей из localStorage
function DelMakeFromLocalStor() {
    localStorage.removeItem('make');
    saveToLocalStor();
}


// Функция перемещения карточки из make в progress
function taskToProgress(btnsToProgress) {
    btnsToProgress.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            makeToDO.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {
                    progress.push(task);     // добавляем карточку в массив progress
                    toProgress();   // рендер в колонку документа прогресс
                    makeToDO.splice(idx, 1);     // удаляем из массива make карточку
                    e.target.closest('.cards-column-card').remove();    // удаляем из верстки колонки make карточку
                    showTask();      // пересчитываем индексы в массиве make
                }

            });

            
         
            DelMakeFromLocalStor();    // удаляем make из LS, перезаписываем make в LS

            saveProgressToLocalStor(); // записываем progress в LS
           
            countTasks(makeToDO, countMake);
            countTasks(progress, countProgress);

        });
    });

}


function toProgress() {
    columnProgress.innerHTML = '';
    progress.forEach((task, idx) => {
        columnProgress.innerHTML += renderProgress(task, idx);
    });

}

function renderProgress(task, idx) {
    return `
    <div class="cards-column-card" data-taskid='${idx}>
    <div class="cards-head">
        <span class="cards-head-logo">ToDo</span>
        <div class="cards-head-date">30.03.2023</div>
    </div>
    <div class="cards-text">
        <h2 class="cards-text-title">${task.title}</h2>
        <div class="cards-text-description">
            <p>${task.text}</p>
        </div>
    </div>
    <div class="cards-info">
        <span class="cards-info-name">${task.name}</span>
        <button class="card-to_make">To Make</button>
        <button class="card-to_done">To Done</button>
        <i class="fa-solid fa-trash card-progress-delete"></i>
    </div>
</div>
    `;
};

// const getCardFromLocalStor = () => {
//     let data = JSON.parse(localStorage.getItem('progress'));
//    console.log(data);
//     if (data) {
//         sortItem(data);
//       } else {
//         columnProgress.textContent = "";
//       }
// };

// const sortItem = (data) => {
//     data.forEach((task, idx) => {
//         columnProgress.innerHTML += renderProgress(task, idx);
//     });
//   };
