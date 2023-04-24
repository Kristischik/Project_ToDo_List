// Установить текущую дату

let dateCalendar = document.querySelector('.main-date');


export function setDate() {
    let date = new Date();
    dateCalendar.innerHTML = `${addDate(date.getDate())}.${addDate(date.getMonth() + 1)}.${addDate(date.getFullYear())}`;
}

// Функция проверяет числа до 9 и добавляет перед ними ноль для даты
export function addDate(num) {
    if (num >= 1 && num <= 9) {
        return '0' + num;
    } else {
        return num;
    }
}

//  Вставить дату в карточку при создании

let currentDate = new Date();
export let cardDate = `${addDate(currentDate.getDate())}.${addDate(currentDate.getMonth() + 1)}.${addDate(currentDate.getFullYear())}`;