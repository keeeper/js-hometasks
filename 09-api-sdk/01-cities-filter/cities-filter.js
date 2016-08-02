 // AJAX запрос на промисе
let getCities = function (url) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = 'json'; // Определение типа полученного документа и распарс его
		xhr.addEventListener ('load', () => {
			resolve(xhr.response); // Передача полученных данных в then
		});
		xhr.addEventListener('error', () => {
			reject();
		});
		xhr.send();
	});
};
let dropdown = document.createElement('div'); // Создаем новый тег div (контейнер подсказок)
dropdown.setAttribute('class', 'dropdown'); // Присваиваем divу класс dropdown
container.appendChild(dropdown); // Добавляем div в родительский контейнер

// Вызов и обработка полученного результата
window.addEventListener('load', () => {
	getCities('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then (response => {
		// Обработка элементов полученных из JSON объекта
		response.sort(function(a, b){
	            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
	            if (nameA < nameB) {
	                return -1;
	            }
	            if (nameA > nameB) {
	                return 1;
	            }
	            return 0;
	        });
		for({name} of response) {			
			let list = document.createElement('div'); // Создаем новый элемент, которому ...
				list.setAttribute('class', 'list'); // назначаем класс list и ...
				list.innerText = name; // присваиваем ему зачение name.
				dropdown.appendChild(list); // Добавляем его в DOM
		}
	});
});

// Обработка взаимодействия с полем ввода и вывод результата
myInput.addEventListener('keyup', () => { // Создаем EventListener для поля ввода событие keypress
	dropdown.innerHTML = ''; // Обнуляем контейнер подсказок при каких-то изменениях в поле

	getCities('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then (response => {
		let input = myInput.value; // Обявляем переменную input и присваиваем ей текущее значение поля ввода
		// Перебираем значения всех свойств name в объектах из массива response 
		for({name} of response) {
			let equal = true; // Создаем временный флаг для проверки равенства
			for (let i = 0; i < input.length; i++) { //Запускаем цикл длиной в количество символов текущего inputа, для перебора каждого символа input
				if (input[i] !== name[i]) { // Если i-тая буква inputa  и значения свойства name не равны, то
					equal = false;  // Меняем временный флаг
				};
			};
			if (equal) { // Если временный файл остался TRUE, т.е. символы inputa и значения name равны, то ...
				let list = document.createElement('div'); // создаем новый эелмент div, которому ...
				list.setAttribute('class', 'list'); // назначаем класс list и ...
				list.innerText = name; // присваиваем ему зачение name ...
				dropdown.appendChild(list); // добавляем его в DOM
			}
		}
	});
});