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
    VK.api('users.get', {'name_case': 'gen', 'user_id': '372216738'},  function(response) {
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
    VK.api('friends.get', {'user_id': '372216738', fields:'photo_50, first_name, last_name, bdate'}, function(response) {
      if (response.error) {
        reject(new Error(response.error.error_msg));
      } else {
        // Получение возраста из даты рождения и добавление его в response.response
        for (let i = 0; i < response.response.length; i++){
          date = response.response[i].bdate;


            // Если пользователь указал дату рождения
          if (date) {
              // Вычисление возраста из bdate возвращенного VK.api
              let age = ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;

              // Добавление возраста в объект response.response для последующей передачи в handlebars
              Object.defineProperty(response.response[i], 'age', {
                  value: age,
                  enumerable: true,
                  writable: true
              });

              // Тяжелые манипуляции с датой рождения
              let dateObj = new Date(date);
              let curDate = new Date(),
                  year = curDate.getFullYear(),
                  month = dateObj.getMonth(),
                  birthdate = dateObj.getDate(),
                  birthday = new Date();

              // Меняем формат даты - месяц и день рождения местами (с дд/мм на мм/дд)
              birthday.setFullYear(year);
              birthday.setMonth(birthdate - 1);
              birthday.setDate(month + 1);

              // Сравнение даты рождения с сегодняшним днем
              let div = +birthday - curDate;
              if (div < 0) {
                  birthday.setFullYear(year + 1);
                  div = +birthday - curDate;
              }

              Object.defineProperty(response.response[i], 'timeBefore', {
                  value: div,
                  enumerable: true,
                  writable: true
              });
          }  else {
              response.response[i]['timeBefore'] = 31528800000;
              response.response[i]['age'] = null;
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