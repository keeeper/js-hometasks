// Создаем переменную с датой +1 день от текущего момента (будет использована при создании cookie)
let expires = new Date;
expires.setDate(expires.getDate() + 1);

// Создаем переменную с датой -1 день от текущего момента (будет использована для удаления cookie)
let expired = new Date;
expired.setDate(expired.getDate() - 1);

// Создание cookie
document.cookie = "country=UA" + "; expires=" + expires;
document.cookie = "city=Niko" + "; expires=" + expires;
document.cookie = "name=Mike" + "; expires=" + expires;

let container = document.body.querySelector('.container'); // Главный контейнер (<table>)

let cookies = document.cookie.split('; '); // Преобразуем cookie в массив и убираем ';'

// Основной цикл для перебора всех элементов массива cookies (создание и заполнения DOM элементов, назначения слушателей событий)
for (let i=0; i<cookies.length; i++) {
    let tableRow = document.createElement('tr'); // Создаем элементы <tr> - ряды таблицы
    container.appendChild(tableRow); // Добавляем ряд <tr> в главный контейнер - таблицу <table>

    let deleteButton = document.createElement('button'); // Создаем элемент <button>
    deleteButton.innerHTML = "Удалить"; // Добавляем ему текст "Удалить"

    // Создаем ячейки в таблице
    let cookieName = document.createElement('td'); // Создаем 1-ю ячейку <td> в ряду таблицы (для названия cookie)
    cookieName.innerText = cookies[i].split('=').shift(); // Записываем имя cookie в 1-ю ячейку
    let cookieValue = document.createElement('td'); // Создаем 2-ю ячейку <td> в ряду таблицы (для значения cookie)
    cookieValue.innerText = cookies[i].split('=').pop(); // Записываем значение cookie в 2-ю ячейку
    let deleteButtonContainer = document.createElement('td'); // Создаем 3-ю ячейку <td> в ряду таблицы (для кнопки "Удалить")
    deleteButtonContainer.appendChild(deleteButton); // Добавляем кнопку в 3-ю ячейку ^

    // Добавляем ячейки в таблицу
    tableRow.appendChild(cookieName); // Добавляем 1-ю ячейку <td> в ряд <tr> таблицы
    tableRow.appendChild(cookieValue); // Добавляем 2-ю ячейку <td> в ряд <tr> таблицы
    tableRow.appendChild(deleteButtonContainer); // Добавляем 3-ю ячейку <td> в ряд <tr> таблицы

    // Обработчик собитий на кнопке "Удалить"
    deleteButton.addEventListener('click', (e)=>{
       let answer = confirm('Удалить cookie с именем '+ cookieName.innerText +'?'); // Выводим окно с вопросом об удалении cookie
        // Если OK
        if (answer) {
            document.cookie = cookies[i] + '; expires=' + expired; // Удаляем cookie
            e.target.parentElement.parentElement.remove();  // Удаляем из таблицы весь ряд <tr> в котором находится удаляемая cookie
        }
    });
}