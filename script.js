// Элементы управления блока с выбором города
let btnCity = document.getElementById('confirm');
let city = document.getElementById('city');
let cityForm = document.getElementById('cityform');
let greet = document.getElementById('greet');
let yourCity = document.getElementById('yourcity');
let deleteCity = document.getElementById('deletecity');

// Элементы управления блока с выбором галочек
let check1 = document.getElementById('check1');
let check2 = document.getElementById('check2');
let check3 = document.getElementById('check3');
let check4 = document.getElementById('check4');
let check5 = document.getElementById('check5');
let check6 = document.getElementById('check6');
let btnCheck = document.getElementById('savecheck');

// Массив элементов галочек для перебора
let checks = [check1, check2, check3, check4, check5, check6];


// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


// Удаление куки
function deleteCookie(name) {
    document.cookie = name + '=' + '' +  '; max-age=-1';
}


// Проверка на существование куки с именем city
// Если не существует - показать форму
// Если существует - показать приветствие
let userCity = getCookie('city');

if (userCity === undefined) {
    cityForm.style.display = "flex";
} else {
    yourCity.innerText = 'Ваш город - ' + userCity + '.';
    greet.style.display = "flex";
}

// Событие при нажатии на кнопку "задать город"
btnCity.onclick = function () {
    if (city.value.length === 0) {
        alert('Необходимо ввести название города!');
    } else {
        document.cookie = 'city=' + encodeURIComponent(city.value) + '; max-age=2592000';
        document.location.reload();
    }
};

// Событие при нажатии на кнопку "удалить информацию о городе"
deleteCity.onclick = function () {
    deleteCookie('city');
    document.location.reload();
};


// Проверка на существование куки с именем checked
// Если не существует дать возможность выбрать галочки и сохранить
// Если существует - отметить нужные галочки и не дать менять
let checked = getCookie('checked');

if  (checked != undefined) {
    // Пройтись про всем 6 цифрам в куки
    let idx = 0; // Переменная для перебора значений в массиве
    for (let isChecked of checked) {
        // Если текущая цифра в куке - 1, то поставить галочку
        if (isChecked == '1') {
            checks[idx].checked = true;
        }
        checks[idx].disabled = true;
        idx += 1;
    }
    // Отключить кнопку
    btnCheck.disabled = true;
}


// Событие при нажатии на кнопку "Сохранить"
// Перебрать все чекбоксы
// Для отмеченных указать 1, неотмеченных - 0
btnCheck.onclick = function () {
    let checkedValues = '';
    for (const chk of checks) {
        if (chk.checked == true) {
            checkedValues += '1'
        } else {
            checkedValues += '0'
        }
    }
    document.cookie = 'checked=' + checkedValues + '; max-age=2592000';
    document.location.reload();
};