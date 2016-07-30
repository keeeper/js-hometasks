let container = document.body.querySelector('.container'); // Контейнер (<table>) в который добавляются cookie

// Создаем переменную с датой +1 день от текущего момента (будет использована при создании cookie)
let expires = new Date;
expires.setDate(expires.getDate() + 1);

// Создаем переменную с датой -1 день от текущего момента (будет использована для удаления cookie)
let expired = new Date;
expired.setDate(expired.getDate() - 1);

// Создаем переменную которая будет использована для получения срока годности cookie
let newExpireDate = new Date;

// Создание произвольных cookie с датой указанной в переменной expires
document.cookie = "country=UA" + "; expires=" + expires;
document.cookie = "city=Niko" + "; expires=" + expires;
document.cookie = "name=Mike" + "; expires=" + expires;

let cookies = document.cookie.split('; '); // Преобразуем cookie в массив и убираем ';'

// Берем элементы формы
let cookieForm = document.forms.addForm,
    formElements = cookieForm.elements, // Все элементы формы
    cookieName = formElements.nameFiled, // Поле "Имя"
    cookieValue = formElements.valueFiled, // Поле "Значение"
    cookieExpires = formElements.expiresField, // Поле "Срок годности"
    addButton = document.querySelector('#addButton'); // Кнопка "Добавить"


// Функиця создания cookie используя данные формы (по сути - ДЗ #2)
function createCookie (e){
    // Проверяем все ли поля формы заполнены
    if (cookieName.value === '' || cookieValue.value === '' || cookieExpires.value === '') {
        alert('Заполните все поля формы!'); // Если нет - выводим сообщение
        return;
    } else {
        //  Устанавливаем срок годности cookie (используя значение введенное в поле expiresField)
        newExpireDate.setDate(newExpireDate.getDate() + parseInt(cookieExpires.value));

        // Создаем cookie с заданными в форме значениями
        let newCookie = document.cookie = cookieName.value + "=" + cookieValue.value + "; expires=" + newExpireDate.toUTCString();
        let cookieSplit = newCookie.split('; ').shift(); // Убираем из cookie свойство expires, оставляя только имя и значение

        // Вызываем функцию добавления cookie в таблицу и ввывода ее на экран
        outPutCookie(newCookie, cookieSplit);

        // Очистка полей формы
        cookieName.value = cookieValue.value = cookieExpires.value = null;
    }
}

// Функция добавления cookie в таблицу и ввывода ее на экран (По сути - ДЗ #1)
function outPutCookie (nc, cs) {
    let tableRow = document.createElement('tr'); // Создаем элементы <tr> - ряды таблицы
    container.appendChild(tableRow); // Добавляем ряд <tr> в главный контейнер - таблицу <table>

    let deleteButton = document.createElement('button'); // Создаем элемент <button>
    deleteButton.innerHTML = "Удалить"; // Добавляем ему текст "Удалить"

    // Создаем ячейки в таблице
    let cookieNameCell = document.createElement('td'); // Создаем 1-ю ячейку <td> в ряду таблицы (для названия cookie)
    cookieNameCell.innerText = cs.split('=').shift(); // Записываем имя cookie в 1-ю ячейку
    let cookieValueCell = document.createElement('td'); // Создаем 2-ю ячейку <td> в ряду таблицы (для значения cookie)
    cookieValueCell.innerText = cs.split('=').pop(); // Записываем значение cookie в 2-ю ячейку
    let deleteButtonCell = document.createElement('td'); // Создаем 3-ю ячейку <td> в ряду таблицы (для кнопки "Удалить")
    deleteButtonCell.appendChild(deleteButton); // Добавляем кнопку в 3-ю ячейку ^

    // Добавляем ячейки в таблицу
    tableRow.appendChild(cookieNameCell); // Добавляем 1-ю ячейку <td> в ряд <tr> таблицы
    tableRow.appendChild(cookieValueCell); // Добавляем 2-ю ячейку <td> в ряд <tr> таблицы
    tableRow.appendChild(deleteButtonCell); // Добавляем 3-ю ячейку <td> в ряд <tr> таблицы

    // Обработчик собитий на кнопке "Удалить"
    deleteButton.addEventListener('click', (e)=>{
        let answer = confirm('Удалить cookie с именем '+ cookieNameCell.innerText +'?'); // Выводим окно с вопросом об удалении cookie
        // Если OK
        if (answer) {
            document.cookie = nc + '; expires=' + expired; // Удаляем cookie
            e.target.closest('tr').remove();  // Удаляем из таблицы весь ряд <tr> в котором находится удаляемая cookie
        }
    });
};

// Основной цикл для перебора всех элементов массива cookies (создание и заполнения DOM элементов, назначения слушателей событий)
for (let i=0; i<cookies.length; i++) {
    outPutCookie(cookies[i], cookies[i]); // Вызов вывода добавления cookie в таблицу и ввывода ее на экран
}

// Слушатель собтия на кнопке "Добавть", вызывает функцию создания cookie
addButton.addEventListener('click', createCookie);