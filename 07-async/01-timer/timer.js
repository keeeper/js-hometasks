function timer(sec){
   return new Promise((resolve) => { // Создание и возврат промиса
        setTimeout(()=>{ // Запуск таймера
            resolve(); // Промис успешно выполнен (fullfiled)
        }, sec);
    });
}
// Проверка
timer(3000).then(() => console.log('я вывелась через 3 секунды'))

// Экспорт модуля
module.exports = timer;