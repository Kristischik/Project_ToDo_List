import { showTask, toDone, toProgress, columnMake, columnProgress, columnDone, makeToDO, progress, done } from "./app.js";
import { countMake, countProgress, countDone} from "./counter.js";
import { delMakeFromLocalStor, delDoneFromLocalStor, delProgressFromLocalStor } from "./localStor.js";


// Очищаем массив из задач, очищаем колонку в документе и счетчик обнуляем
let cleanMake = document.querySelector('#make-clean');              // получаем мусорку для удаления всего из make
let cleanProgress = document.querySelector('#progress-clean');     // получаем мусорку для удаления всего из progress
let cleanDone = document.querySelector('#done-clean');              // получаем мусорку для удаления всего из done

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
    cleanTasks(makeToDO, columnMake);               // очищаем массив make и удаляем из документа
    delMakeFromLocalStor();                          // очищаем массив в localStorage
    countMake.textContent = 0;                      // обнуляем счетчик задач
    showTask();                                     // обнуляем индексы
});

cleanProgress.addEventListener('click', () => {         // по нажатию мусорки (верхней)
    cleanTasks(progress, columnProgress);               // очищаем массив progress и удаляем из документа
    delProgressFromLocalStor();                         // очищаем массив в localStorage
    countProgress.textContent = 0;                      // обнуляем счетчик задач
    toProgress();

});

cleanDone.addEventListener('click', () => {         // по нажатию мусорки (верхней)
    cleanTasks(done, columnDone);                   // очищаем массив done и удаляем из документа
    delDoneFromLocalStor();                        // очищаем массив в localStorage
    countDone.textContent = 0;                      // обнуляем счетчик задач
    toDone();
});