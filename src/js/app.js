import { setDate, cardDate } from "./date.js";
import { clearData } from "./clearData.js";
import { countMake, countProgress, countDone, countTasks } from "./counter.js";
import { renderMakeToDo, renderProgress, renderDone } from "./renders.js";

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
let columnMake = document.querySelector('.cards-column-make');
let columnProgress = document.querySelector('.cards-column-progress');
let columnDone = document.querySelector('.cards-column-done');




// Создаем массивы для трех колонок
let makeToDO = JSON.parse(localStorage.getItem('make')) || [];
showTask();
let progress = JSON.parse(localStorage.getItem('progress')) || [];
toProgress();
let done = JSON.parse(localStorage.getItem('done')) || [];
toDone();

// Создаем функцию-конструктор
function CreateTaskToDo(title, text, name, date) {
    this.title = title;
    this.text = text;
    this.name = name;
    this.date = date;

}

// Вешаем событие на форму по нажатию которого будут добавляться объекты
form.addEventListener('submit', getTask);



// Функция получает из инпут значения и добавляет карточку с задачей в массив make
function getTask(e) {
    e.preventDefault();                                 // отменяем стандартное поведение формы

    let task = new CreateTaskToDo(inputTitle.value, textareaText.value, inputAutor.value, cardDate);     // создаем новый экземпляр карточки, берем значения из инпутов
    makeToDO.push(task);   // добавляем карточку, созданную в попап в массив

    localStorage.setItem('make', JSON.stringify(makeToDO));   // записываем карточку в массив в localStorage

    clearData([inputTitle, textareaText, inputAutor]);    // очищаем поля ввода

    showTask();                                           // Выводим карточку в документ
    countTasks(makeToDO, countMake);                     // считаем сколько карточек



}


// Фукция выводит карточку в документ в первую колонку make
function showTask() {
    columnMake.innerHTML = '';

    makeToDO.forEach((task, idx) => {
        columnMake.innerHTML += renderMakeToDo(task, idx);
    });

    countTasks(makeToDO, countMake);

    // let dateCards = document.querySelectorAll('.cards-head-date');   // получаем out для даты в карточке
    // setDateCard(dateCards);

    let btnsDelete = document.querySelectorAll("#card-make_delete");  // получаем все кнопки с мусорками в созданных карточках
    deleteCardMake(btnsDelete);                                             // передаем функции по удалению карточек кнопки-мусорки


    console.log(btnsDelete);

    let btnsToProgress = document.querySelectorAll(".card-to_progress");  // получаем все кнопки In progress в созданных карточках
    taskToProgress(btnsToProgress);

}

// Очищаем массив из задач, очищаем колонку в документе и счетчик обнуляем
let cleanMake = document.querySelector('#make-clean');
let cleanProgress = document.querySelector('#progress-clean');
let cleanDone = document.querySelector('#done-clean');

function cleanTasks(array, column) {
    array.forEach((element) => {                 // удаляем все элементы из массива
        let arrElements = array.length;
        array.splice(element, arrElements);
    });
    let docElements = column.children;          // удаляем все дочерние элементы из колонки документа
    for (let task of docElements) {
        task.remove();
    }
}

// Функции удаляющие все из массива из документа и из локал стораж
cleanMake.addEventListener('click', () => {         // по нажатию мусорки (верхней)
    cleanTasks(makeToDO, columnMake);                           // очищаем массив и удаляем из документа
    delMakeFromLocalStor();                          // очищаем массив в localStorage
    countMake.textContent = 0;                      // обнуляем счетчик задач
    showTask();                                     // обнуляем индексы
});

cleanProgress.addEventListener('click', () => {         // по нажатию мусорки (верхней)
    cleanTasks(progress, columnProgress);                           // очищаем массив и удаляем из документа
    delProgressFromLocalStor();                         // очищаем массив в localStorage
    countProgress.textContent = 0;                      // обнуляем счетчик задач
    toProgress();

});

cleanDone.addEventListener('click', () => {         // по нажатию мусорки (верхней)
    cleanTasks(done, columnDone);                           // очищаем массив и удаляем из документа
    delDoneFromLocalStor();                        // очищаем массив в localStorage
    countDone.textContent = 0;                      // обнуляем счетчик задач
    toDone();
});

// Удалить карточку из массива и из колонки документа, уменьшить счетчик по нажатию мусорки

function deleteCardMake(btnsDelete) {
    btnsDelete.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            makeToDO.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {
                    makeToDO.splice(idx, 1);     // удаляем из массива make карточку
                    e.target.closest('.cards-column-card').remove();    // удаляем из верстки колонки make карточку
                    showTask();      // пересчитываем индексы в массиве make
                }
            });
            delMakeFromLocalStor();    // удаляем make из LS, перезаписываем make в LS
            countTasks(makeToDO, countMake);
        });
    });
};

function deleteCardProgress(btnsDeleteProgress) {
    btnsDeleteProgress.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            progress.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {

                    progress.splice(idx, 1);     // удаляем из массива progress карточку
                    e.target.closest('.cards-column-card').remove();    // удаляем из верстки колонки progress карточку
                    toProgress();     // пересчитываем индексы в массиве progress
                }
            });
            delProgressFromLocalStor();    // удаляем progress из LS, перезаписываем mprogress в LS
            countTasks(progress, countProgress);
        });
    });
}

function deleteCardDone(btnsDeleteDone) {
    btnsDeleteDone.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            done.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {

                    done.splice(idx, 1);     // удаляем из массива progress карточку
                    e.target.closest('.cards-column-card').remove();    // удаляем из верстки колонки progress карточку
                    toDone();     // пересчитываем индексы в массиве progress
                }
            });
            delDoneFromLocalStor();    // удаляем progress из LS, перезаписываем mprogress в LS
            countTasks(done, countDone);
        });
    });
}



// Функция записи карточек в localStorage
function saveMakeToLocalStor() {
    localStorage.setItem('make', JSON.stringify(makeToDO));
};

function saveProgressToLocalStor() {
    localStorage.setItem('progress', JSON.stringify(progress));
};

function saveDoneToLocalStor() {
    localStorage.setItem('done', JSON.stringify(done));
};

// Функция удаления записей из localStorage
function delMakeFromLocalStor() {
    localStorage.removeItem('make');
    saveMakeToLocalStor();
};

function delProgressFromLocalStor() {
    localStorage.removeItem('progress');
    saveProgressToLocalStor();
};

function delDoneFromLocalStor() {
    localStorage.removeItem('done');
    saveDoneToLocalStor();
};


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

            delMakeFromLocalStor();    // удаляем make из LS, перезаписываем make в LS

            saveProgressToLocalStor(); // записываем progress в LS

            countTasks(makeToDO, countMake);
            countTasks(progress, countProgress);

        });
    });

};


function toProgress() {
    columnProgress.innerHTML = '';
    progress.forEach((task, idx) => {
        columnProgress.innerHTML += renderProgress(task, idx);
    });

    countTasks(progress, countProgress);

    // let dateCards = document.querySelectorAll('.cards-head-date');   // получаем out для даты в карточке
    // setDateCard(dateCards);

    let btnsDeleteProgress = document.querySelectorAll("#card-progress_delete");  // получаем все кнопки с мусорками в созданных карточках
    deleteCardProgress(btnsDeleteProgress);                                             // передаем функции по удалению карточек кнопки-мусорки

    let btnsToDone = document.querySelectorAll(".card-to_done");  // получаем все кнопки In progress в созданных карточках
    taskToDone(btnsToDone);

    let btnsToMake = document.querySelectorAll(".card-to_make");  // получаем все кнопки In progress в созданных карточках
    taskToMake(btnsToMake);
};


function taskToDone(btnsToDone) {
    btnsToDone.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            progress.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {
                    done.push(task);     // добавляем карточку в массив done
                    toDone();   // рендер в колонку документа done
                    progress.splice(idx, 1);     // удаляем из массива progress карточку
                    e.target.closest('.cards-column-card').remove();    // удаляем из верстки колонки progress карточку
                    toProgress();     // пересчитываем индексы в массиве progress
                }

            });

            delProgressFromLocalStor();    // удаляем progress из LS, перезаписываем mprogress в LS

            saveDoneToLocalStor(); // записываем done в LS

            countTasks(progress, countProgress);
            countTasks(done, countDone);

        });
    });
}


function toDone() {
    columnDone.innerHTML = '';
    done.forEach((task, idx) => {
        columnDone.innerHTML += renderDone(task, idx);
    });

    countTasks(done, countDone);

    // let dateCards = document.querySelectorAll('.cards-head-date');   // получаем out для даты в карточке
    // setDateCard(dateCards);

    let btnsDeleteDone = document.querySelectorAll("#card-done_delete");  // получаем все кнопки с мусорками в созданных карточках
    deleteCardDone(btnsDeleteDone);                                             // передаем функции по удалению карточек кнопки-мусорки

    let btnsToProgressBack = document.querySelectorAll(".card-to_progress_back");  // получаем все кнопки In progress в созданных карточках
    taskToProgrresBack(btnsToProgressBack);

}


function taskToMake(btnsToMake) {
    btnsToMake.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            progress.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {
                    makeToDO.push(task);     // добавляем карточку в массив make
                    showTask();   // рендер в колонку документа make
                    progress.splice(idx, 1);     // удаляем из массива progress карточку
                    e.target.closest('.cards-column-card').remove();    // удаляем из верстки колонки progress карточку
                    toProgress();     // пересчитываем индексы в массиве progress
                }
            });

            delProgressFromLocalStor();    // удаляем progress из LS, перезаписываем mprogress в LS
            saveMakeToLocalStor(); // записываем make в LS
            countTasks(progress, countProgress);
            countTasks(makeToDO, countMake);

        });
    });
}

function taskToProgrresBack(btnsToProgressBack) {
    btnsToProgressBack.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            done.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {
                    progress.push(task);     // добавляем карточку в массив done
                    toProgress();     // пересчитываем индексы в массиве progress
                    done.splice(idx, 1);     // удаляем из массива progress карточку
                    e.target.closest('.cards-column-card').remove();    // удаляем из верстки колонки progress карточку
                    toDone();   // рендер в колонку документа done
                }
            });

            delDoneFromLocalStor();    // удаляем done из LS, перезаписываем в LS
            saveProgressToLocalStor(); // записываем progress в LS
            countTasks(progress, countProgress);
            countTasks(done, countDone);
        });
    });
}
