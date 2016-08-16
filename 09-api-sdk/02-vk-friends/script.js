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
      apiId: 5569612
    });

    VK.Auth.login(function(response) {
      if (response.session) {
        resolve(response);
      } else {
        reject(new Error('Не удалось авторизоваться'));
      }
    }, 2);
  });
}).then(function() { // Получаем заголовок
  return new Promise(function(resolve, reject) {
    VK.api('users.get', {'name_case': 'gen'},  function(response) {
      if (response.error) {
        reject(new Error(response.error.error_msg));
      } else {
        headerInfo.textContent = `Друзья ${response.response[0].first_name} ${response.response[0].last_name}`;
        resolve();
      }
    });
  })
}).then(function() { // Получаем и обрабатываем список друзей
  return new Promise(function(resolve, reject) {
    VK.api('friends.get', {fields:'photo_50, first_name, last_name, bdate'}, function(response) {
      if (response.error) {
        reject(new Error(response.error.error_msg));
      } else {
        // Получение возраста из даты рождения и добавление его в response.response
        for (let i = 0; i < response.response.length; i++){
            date = response.response[i].bdate;

            // Функция преобразования даты в формат гггг/мм/дд для последующей обработки
            function toDate(dateStr) {
                var parts = dateStr.split(".");
                if (parts.length == 3) {
                    return new Date(parts[2], parts[1] - 1, parts[0]); // Определение даты, если дата роджения указана полностью
                } else if (parts.length == 2) {
                    return new Date("", parts[1] - 1, parts[0]); // Определение даты, если дата роджения указана не полностью
                }
            }

            // Если пользователь указал дату рождения
          if (date) {
              // Вычисление возраста из bdate возвращенного VK.api
              let age = ((new Date().getTime() - new Date(toDate(date))) / (24 * 3600 * 365.25 * 1000)) | 0;
              // Не выводим недостоверную информацию о возрасте
              if (age > 110) { // Если кто-то "накинул" себе годиков — обнуляем
                  age = null;
              }

              // Добавление возраста в объект response.response для последующей передачи в handlebars
              Object.defineProperty(response.response[i], 'age', {
                  value: age,
                  enumerable: true,
                  writable: true
              });

              // Тяжелые манипуляции с датой рождения
              let dateObj = new Date(date);
              let curDate = new Date(),
                  birthday = new Date();
              // Меняем формат даты - месяц и день рождения местами (с дд/мм на мм/дд)
              birthday = toDate(date);
              // Преобразовываем дату рождения в день рождения в текущем году
              birthday.setFullYear(curDate.getFullYear());

              // Сравнение даты рождения с сегодняшним днем
              let div = +birthday - curDate;
              if (div < 0) {
                  birthday.setFullYear(curDate.getFullYear() + 1);
                  div = +birthday - curDate;
              }
              Object.defineProperty(response.response[i], 'timeBefore', {
                  value: div,
                  enumerable: true,
                  writable: true
              });
          } else { // Если дата рождения не указана
             response.response[i]['timeBefore'] = 31622500000; // то время до дня рождения больше года, т.е. эти пользователи будут выведены в конце списка
             response.response[i]['age'] = null; // возраст - неопределен
          }

        }

        // Сортируем результаты
        let res = response.response.sort((a, b) => {
            if (a.timeBefore > b.timeBefore) {
              return 1;
            }
            if (a.timeBefore < b.timeBefore) {
              return -1;
            }
        });

        // Передача данных в HandleBars и получение обработанного результата
        let source = friendItemTemplate.innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({list: res, });
        results.innerHTML = template; // Добавление элментов в DOM
        resolve();
      }
    });
  })
});