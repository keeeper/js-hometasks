var objA = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        }
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10)
};

var objB = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/03/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    }
};


let result = 'Объекты равны!';
let deepEqual = function (obj1, obj2) {
  let obj1Keys = Object.getOwnPropertyNames(obj1),  // массив со свойствами первого объекта
      obj2Keys = Object.getOwnPropertyNames(obj2);  // массив со свойствами второго объекта
  
  if (obj1Keys.length == obj2Keys.length) {  // проверяем одинаково ли число свойств у объектов
    for (let key in obj1) {  // перебираем все свойства первого объекта
      if (key in obj2) {   // проверяем наличие свойства объекта с таким же именем у второго объекта
        if ( (typeof obj1[key] == 'object')  &&  (typeof obj2[key] == 'object') ) {   // проверка: является ли свойство обоих объектов вложенным объектом 
          if ((obj1[key] instanceof Date) && (obj2[key] instanceof Date)) { // проверка: является ли объект Data 
            let time1 = (Date.parse(obj1[key])),
                time2 = (Date.parse(obj2[key]));
            if (time1 != time2) {
              result = "Объекты не равны!";
            }
          } else {
            deepEqual(obj1[key], obj2[key]);  // рекурсивно вызываем эту же функцию
          }
        } 
        
        else { // свойство не объект и не массив
          if (obj1[key] !== obj2[key]) { // проверка значений свойств на равенство НЕТ
            result = "Объекты не равны!";
          }
        } ;
 
      } else { // нет свойства с таким именем во втором объекте
        result = "Объекты не равны!";
      }
    }
  } else {  // разное количество свойств у объекта
    result = "Объекты не равны! ";
  }
  return result;
};

// Проверка
console.log (deepEqual(objA, objB));