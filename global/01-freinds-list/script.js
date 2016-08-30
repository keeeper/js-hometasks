// Ждем загрузку страницы
new Promise(function(resolve) {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
}).then(function() { // Ждем подтверждения авторизации
    return new Promise(function(resolve, reject) {
        VK.init({
            apiId: 5576711
        });
        VK.Auth.login(function(response) {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}).then(function() { // Получаем и обрабатываем список друзей
    if(!localStorage.length) {  //  если localStorage пуст, то
        return new Promise(function(resolve, reject) {  // создаем промис, в котором получаем и обрабатываем список друзей
            VK.api('friends.get', {fields:'photo_50, first_name, last_name'}, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    // Передача данных в HandleBars и получение обработанного результата
                    let source = friendItemTemplate.innerHTML;
                    let templateFn = Handlebars.compile(source);
                    let template = templateFn({list: response.response, });
                    friendList.innerHTML = template; // Добавление элментов в DOM
                    resolve();
                }
            });
        });
    }
});

// Drug and drop
// Основные переменные
let mainList = document.querySelector('#friendList'), // Главный список (левый)
    secList = document.querySelector('#featuredList'), // Список избранных (правый)
    activeItem, // Элемент с которым будут совершатся действия drun and drop
    offsetX = 0, // Сдвиг
    offsetY = 0;

// Функция, которая перемещает друзей из одного списка в другой
function relocate(curItem) {
    let clone = curItem.cloneNode(true); // Создание клон елемента
    if (curItem.parentNode == friendList) {  // Проверка родительского елемента
        friendList.removeChild(curItem);  // Удаление елемента
        secList.appendChild(clone); // Вставка клона в соседний список
    } else if (curItem.parentNode == featuredList ) {  // Проверка родительского елемента
        secList.removeChild(curItem);  // Удаление елемента
        mainList.appendChild(clone);   // Вставка клона в соседний список
    }
};

// Отлючение выделения элементов в браузере
document.body.onselectstart= function() {return false;}

// Обработчики событий
function mouseDown(e) { // При нажатии на элемент
    activeItem = e.target.closest('.list-item'); // Назначение активного элемента
    activeItem.removeAttribute('style'); // Обнулени стилей если элемент ранее перетаскивался
    offsetX = e.offsetX;
    offsetY = e.offsetY;
}
function mouseMove(e) { // При перетаскивани
    if (activeItem) {  // Проверка если элемент активен
        activeItem.style.position = 'absolute';
        activeItem.style.zIndex = '1';
        activeItem.style.left = (e.clientX - offsetX) + "px";  // получение координат перемещения
        activeItem.style.top = (e.clientY - offsetY) + "px";
    };
}
function mouseUp(e) { // При отжатии
    activeItem.style.left = "0";
    activeItem.style.top = "0";
    activeItem.style.zIndex = '0';
    activeItem.style.position = 'relative';
    // Проверка возможности переноса элемента в пртивоположный список
    let mouseUpElems = document.elementsFromPoint(e.clientX, e.clientY); // Список элементов над которыми отпущена кнопка мыши
    if ((mouseUpElems[0].closest('#friendList')) || (mouseUpElems[0].closest('#featuredList'))) { //Если мышь отпущена над одним из списков
        if ((activeItem.closest('ul')) != (mouseUpElems[0].closest('ul'))) {
            relocate(activeItem);
        }
    }
    activeItem = false;
}

// Слушатели событий
mainList.addEventListener('mousedown', mouseDown);
mainList.addEventListener('mouseup', mouseUp);
secList.addEventListener('mousedown', mouseDown);
secList.addEventListener('mouseup', mouseUp);
document.addEventListener('mousemove', mouseMove);

// Перемещение элемента посредством клика по кнопке
mainList.addEventListener('click', (e) => { // в правый список
    if (e.target.getAttribute('class') == 'btn-add') {
        relocate(e.target.closest('.list-item'));
    };
});
secList.addEventListener('click', (e) => { // в левый список
    if (e.target.getAttribute('class') == 'btn-add') {
        relocate(e.target.parentNode);
    };
});

// Фильтры
// Своя упрощенная функция upperCase, т.к. встроенная выдавала ошибку
let uppCase = function myToUpperCase(s){
    var t='';
    switch(s){
        case'а':t+='А';break;
        case'б':t+='Б';break;
        case'в':t+='В';break;
        case'г':t+='Г';break;
        case'д':t+='Д';break;
        case'е':t+='Е';break;
        case'ё':t+='Ё';break;
        case'ж':t+='Ж';break;
        case'з':t+='З';break;
        case'и':t+='И';break;
        case'й':t+='Й';break;
        case'к':t+='К';break;
        case'л':t+='Л';break;
        case'м':t+='М';break;
        case'н':t+='Н';break;
        case'о':t+='О';break;
        case'п':t+='П';break;
        case'р':t+='Р';break;
        case'с':t+='С';break;
        case'т':t+='Т';break;
        case'у':t+='У';break;
        case'ф':t+='Ф';break;
        case'х':t+='Х';break;
        case'ц':t+='Ц';break;
        case'ч':t+='Ч';break;
        case'ш':t+='Ш';break;
        case'щ':t+='Щ';break;
        case'ъ':t+='Ъ';break;
        case'ы':t+='Ы';break;
        case'ь':t+='Ь';break;
        case'э':t+='Э';break;
        case'ю':t+='Ю';break;
        case'я':t+='Я';break;
        default:t+=s;
    }
    return t;
};

// Функция поиска
let searchFunc = function (arr, input)  {
    for (let j = 0; j < arr.length; j++) { // приведение списка в исходное состояние
        arr[j].style.display = "block";
    }

    for (let j = 0; j < arr.length; j++) { // перебор всех li
        let name = arr[j].children[1].innerText,  // объявление переменной name, которой присвоено имя и фамилия
            eq1 = true, // флаг равенства для проверки всего name
            eq2 = true; // флаг равенства для проверки фамилии
        for (let i = 0; i < input.length; i++) { //запускаем цикл длиной в количество символов текущего inputа, для перебора каждого символа input
            if (uppCase(input[i]) !== uppCase(name[i])) {
                eq1 = false;
            }
        };
        for (let i = 0; i < input.length; i++) { // Запуск цикла длиной в количество символов текущего inputа, для перебора каждого символа input
            if (uppCase(input[i]) !== uppCase(name.split(' ').pop()[i])) {
                eq2 = false;
            }
        };
        if (!(eq1 || eq2)) {
            arr[j].style.display = "none";
        };
    };
};

document.querySelector('.full-list .search-fld').addEventListener('keyup', () => {
    let frListArr = document.querySelectorAll('#friendList li'), // объявление переменной, которая хранит массив из элементов основного списка
    input = document.querySelector('.full-list .search-fld').value; // объявление переменной, которая хранит значение основного поля ввода
searchFunc(frListArr, input);
});

document.querySelector('.featured-list .search-fld').addEventListener('keyup', () => {
    let featListArr = document.querySelectorAll('#featuredList li'), // объявление переменной, которая хранит массив из элементов второго списка
    input = document.querySelector('.featured-list .search-fld').value; // объявление переменной, которая хранит значение основного поля ввода
searchFunc(featListArr, input);
});

// Localstorage
// Сохранение данных в localStorage
document.querySelector('.btn-save').addEventListener('click', () => {
    window.localStorage.clear();
    let featListArr = document.querySelectorAll('#featuredList li'),
        frListArr = document.querySelectorAll('#friendList li'),
        successMessage = document.querySelector('.message');
    for (let i = 0; i < featListArr.length; i++) {
        localStorage.setItem(`sec-item${[i]}`,featListArr[i].innerHTML);
    }
    for (let i = 0; i < frListArr.length; i++) {
        localStorage.setItem(`item${[i]}`,frListArr[i].innerHTML);
    }

});
// Загрузка данных из localStorage
window.addEventListener("load",function() {
    for (let i = 0; i < localStorage.length; i++) {  // для второго списка
        if (localStorage.getItem(`sec-item${[i]}`)) {
            let li = document.createElement('li');
            li.setAttribute('class', 'list-item');
            li.innerHTML = localStorage.getItem(`sec-item${[i]}`);
            featuredList.appendChild(li);
        }
    }
    if (localStorage.length) { // для основного списка
        friendList.innerHTML ='';
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(`item${[i]}`)) {
                let li = document.createElement('li');
                li.setAttribute('class', 'list-item');
                li.innerHTML = localStorage.getItem(`item${[i]}`);
                friendList.appendChild(li);
            }
        }
    }
});