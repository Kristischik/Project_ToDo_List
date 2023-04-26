import { inputTitle, inputAutor, textareaText } from "./app.js";

function addClass(elem, nameClass) {
    elem.classList.add(nameClass);
}

function removeClass(elem, nameClass) {
    elem.classList.remove(nameClass);
}

function setSuccessFor(control) {
    const formControl = control.parentElement;
    addClass(formControl, 'success')
}

function setErrorFor(control, message) {
    const formControl = control.parentElement;
    const small = formControl.querySelector('small');
    addClass(formControl, 'error');
    small.innerText = message;
}

let textMessage = {
enterTitle: 'Необходимо ввести заголовок!',
enterDescript: 'Необходимо ввести описание задачи!',
enterAutor: 'Необходимо указать исполнителя задачи!',
}


export function checkControl() {
let inputTitleValue = inputTitle.value.trim();
let inputAutorValue = inputAutor.value.trim();
let textareaTextValue = textareaText.value.trim();

let formControls = document.querySelectorAll('.form-control');
formControls.forEach((el) => {
    el.addEventListener('input', () => {
        removeClass(el, 'error');
        addClass(el, 'success');
    });
});

if (inputTitleValue === '') {
    setErrorFor(inputTitle, textMessage.enterTitle);
    return false;
} else {
    setSuccessFor(inputTitle);
}

if (inputAutorValue === '') {
    setErrorFor(inputAutor, textMessage.enterAutor);
    return false;
} else {
    setSuccessFor(inputAutor);
}

if (textareaTextValue === '') {
    setErrorFor(textareaText, textMessage.enterDescript);
    return false;
} else {
    setSuccessFor(textareaText);
}

}