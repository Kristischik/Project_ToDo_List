import { setDate, cardDate } from "./date.js";
import { clearData } from "./clearData.js";
import { countMake, countProgress, countDone, countTasks } from "./counter.js";
import { renderMakeToDo, renderProgress, renderDone } from "./renders.js";
import { deleteCardMake, deleteCardProgress, deleteCardDone } from "./delCard.js";
import { saveMakeToLocalStor, saveProgressToLocalStor, saveDoneToLocalStor, delMakeFromLocalStor, delProgressFromLocalStor, delDoneFromLocalStor } from "./localStor.js";
import { checkControl } from "./valid.js";

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

export let inputTitle = addTask.elements.title_text;
export let inputAutor = addTask.elements.task_autor;
export let textareaText = document.querySelector('textarea');
export let columnMake = document.querySelector('.cards-column-make');
export let columnProgress = document.querySelector('.cards-column-progress');
export let columnDone = document.querySelector('.cards-column-done');

// Создаем массивы для трех колонок
export let makeToDO = JSON.parse(localStorage.getItem('make')) || [];
showTask();                                                             // вызываем задания из массива make из Local Storage в документ
export let progress = JSON.parse(localStorage.getItem('progress')) || [];
toProgress();                                                            // вызываем задания из массива progress из Local Storage в документ
export let done = JSON.parse(localStorage.getItem('done')) || [];
toDone();                                                                  // вызываем задания из массива done из Local Storage в документ



// Создаем функцию-конструктор
function CreateTaskToDo(title, text, name, date) {
    this.title = title;
    this.text = text;
    this.name = name;
    this.date = date;
}

// Вешаем событие на форму по нажатию которого будут добавляться объекты
form.addEventListener('submit', getTask);

// Функция получает из формы значения инрутов и добавляет карточку с задачей в массив make
function getTask(e) {
    e.preventDefault();      // отменяем стандартное поведение формы
   
    checkControl();                                                       

    let task = new CreateTaskToDo(inputTitle.value, textareaText.value, inputAutor.value, cardDate);     // создаем новый экземпляр карточки, берем значения из инпутов
    makeToDO.push(task);                                                           // добавляем карточку, созданную в попап в массив

    localStorage.setItem('make', JSON.stringify(makeToDO));                        // записываем карточку в массив в localStorage

    clearData([inputTitle, textareaText, inputAutor]);                             // очищаем поля ввода

    showTask();                                                                   // Выводим карточку в документ
    countTasks(makeToDO, countMake);                                              // считаем сколько карточек

}


// Фукция выводит карточку в документ в первую колонку make
export function showTask() {
    columnMake.innerHTML = '';

    makeToDO.forEach((task, idx) => {
        columnMake.innerHTML += renderMakeToDo(task, idx);
    });

    countTasks(makeToDO, countMake);

    let btnsDelete = document.querySelectorAll("#card-make_delete");          // получаем все кнопки с мусорками в созданных карточках
    deleteCardMake(btnsDelete);                                               // передаем функции по удалению карточек кнопки-мусорки
 
    let btnsToProgress = document.querySelectorAll(".card-to_progress");      // получаем все кнопки In progress в созданных карточках
    taskToProgress(btnsToProgress);                                           // вызываем функцию переброса карточки в прогресс

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

            delMakeFromLocalStor();    // удаляем make из LS, перезаписываем make в LS

            saveProgressToLocalStor(); // записываем progress в LS

            countTasks(makeToDO, countMake);
            countTasks(progress, countProgress);

        });
    });

};


export function toProgress() {
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

// Функция перемещения карточки из progress в done
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


export function toDone() {
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

// Функция перемещения карточки из progress в make 
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

// Функция перемещения карточки из done в progress
function taskToProgrresBack(btnsToProgressBack) {
    btnsToProgressBack.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            done.forEach((task, idx) => {
                if (e.target.closest('.cards-column-card').dataset.taskid == idx) {
                    progress.push(task);                  // добавляем карточку в массив progress
                    toProgress();                         // пересчитываем индексы в массиве progress
                    done.splice(idx, 1);                 // удаляем из массива done карточку
                    e.target.closest('.cards-column-card').remove();    // удаляем из верстки колонки done карточку
                    toDone();                             //пересчитываем индексы в done
                }
            });

            delDoneFromLocalStor();                    // удаляем done из LS, перезаписываем в LS
            saveProgressToLocalStor();                 // записываем progress в LS
            countTasks(progress, countProgress);
            countTasks(done, countDone);
        });
    });
}
