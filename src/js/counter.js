// Функция счетчик задач

export let countMake = document.querySelector('#total-make-count');
export let countProgress = document.querySelector('#total-progress-count');
export let countDone = document.querySelector('#total-done-count');

export function countTasks(arr, out) {
    out.textContent = arr.length;
}