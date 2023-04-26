import { makeToDO, progress, done } from "./app.js";

// Функция записи карточек в localStorage
export function saveMakeToLocalStor() {
    localStorage.setItem('make', JSON.stringify(makeToDO));
};

export function saveProgressToLocalStor() {
    localStorage.setItem('progress', JSON.stringify(progress));
};

export function saveDoneToLocalStor() {
    localStorage.setItem('done', JSON.stringify(done));
};

// Функция удаления записей из localStorage
export function delMakeFromLocalStor() {
    localStorage.removeItem('make');
    saveMakeToLocalStor();
};

export function delProgressFromLocalStor() {
    localStorage.removeItem('progress');
    saveProgressToLocalStor();
};

export function delDoneFromLocalStor() {
    localStorage.removeItem('done');
    saveDoneToLocalStor();
};
