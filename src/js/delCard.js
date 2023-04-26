import { showTask, toDone, toProgress, columnMake, columnProgress, columnDone, makeToDO, progress, done } from "./app.js";
import { countMake, countProgress, countDone, countTasks} from "./counter.js";
import { delMakeFromLocalStor, delDoneFromLocalStor, delProgressFromLocalStor } from "./localStor.js";



// Удалить карточку из массива и из колонки документа, уменьшить счетчик по нажатию мусорки

export function deleteCardMake(btnsDelete) {
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

export function deleteCardProgress(btnsDeleteProgress) {
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

export function deleteCardDone(btnsDeleteDone) {
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
