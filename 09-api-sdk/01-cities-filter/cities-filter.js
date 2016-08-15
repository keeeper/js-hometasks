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

// Вызов и обработка полученного результата
window.addEventListener('load', () => {
	getCities('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then (response => {		
		// Сортировка полученного списка в алфавитном порядке
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

		// Передача данных в HandleBars и получение списка городов
        let source = citiesListTemplate.innerHTML;        
        let templateFn = Handlebars.compile(source);
        let template = templateFn({list: response});
        results.innerHTML = template; 
	});
});

// Обработка взаимодействия с полем ввода и вывод результата
myInput.addEventListener('input', () => { // Создаем EventListener для поля ввода событие keypress
	results.innerHTML = ''; // Обнуляем контейнер подсказок при каких-то изменениях в поле

	getCities('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then (response => {
		let input = myInput.value; // Обявляем переменную input и присваиваем ей текущее значение поля ввода

		// Сортировка полученного списка в алфавитном порядке
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

        // Перебираем значения всех свойств name в объектах из массива response 
		for({name} of response) {
			let equal,
			emptyFlag = true;

			// Функия фильтрации и вывода результата
			let filtFunc = function (curLet) {
				for(let i = 0; i < input.length; i++) {
					if (name[curLet+i]) { // проверка наличия такого количества букв в значении свойства name 
						if (input[i].toLowerCase() !== name[curLet+i].toLowerCase()) { // Если i-тая буква inputa  и i-тая буква от первой найденной буквы в значении свойства name не равны, то
							equal = false;  // Меняем временный флаг
						};
					} else {
						equal = false;
					}
				};
				if (equal) { // Если временный файл остался TRUE, т.е. символы inputa и значения name равны, то ...
					let list = document.createElement('div'); // создаем новый эелмент div, которому ...
					list.setAttribute('class', 'list'); // назначаем класс list и ...
					list.innerText = name; // присваиваем ему зачение name ...
					results.appendChild(list); // добавляем его в DOM				
				}
			}

			for(let j = 0; j < name.length; j++) { // Осуществляется перебор каджой буквы значения name
				equal = true; // Создаем временный флаг для проверки равенства
				if (input) {
					if (input[0].toLowerCase() == name[j].toLowerCase()) { // Если первая буква inputa  и значения свойства name равны, то вызываем фильтрующую ф-цию
						filtFunc(j);
					};
				} else {
					emptyFlag = false;
				}
			};
			if (!emptyFlag) {
				filtFunc(0);
			}	
		}
	});
});