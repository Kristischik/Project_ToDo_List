// Функция для очищения полей ввода

export function clearData(inputs) {
    inputs.forEach((input) => {
        input.value = "";
    });
}