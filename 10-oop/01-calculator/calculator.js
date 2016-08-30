// function calculator(firstNumber){
//     let result = firstNumber;
//     return {
//         sum : function() {
//             for (let arg of arguments) {
//                 result += arg;
//             }
//             return result;
//         },
//         diff : function() {
//             for (let arg of arguments) {
//                 result -= arg;
//             }
//             return result;
//         },
//         div : function() {
//             for (let arg of arguments) {
//                 if(arg == 0){
//                     throw new Error('На 0 делить нельзя!');
//                 } else {
//                     result /= arg;
//                 }
//             }
//             return result;
//         },
//         mul : function() {
//             for (let arg of arguments) {
//                 result *= arg;
//             }
//             return result;
//         },
//     }
// }
//
// let myCalculator = calculator(100);

//Проверки
// console.log(myCalculator.sum(10,20,30));
// console.log(myCalculator.diff(10,20,30));
// console.log(myCalculator.mul(1,2,2));
//
// try {
//     console.log(myCalculator.div(1,2,2));
// } catch(e) {
//     console.error(e.message);
// }



//////////////////////////////////////////

// Ф-ция конструктор
var Calculator = function (firstNumber){
    this.result = firstNumber;
}

// Добавление метода sum в ф-цию конструктор
Calculator.prototype.sum = function () {
    for (let arg of arguments) {
        this.result += arg;
    }
    return this.result;
}

// Добавление метода diff в ф-цию конструктор
Calculator.prototype.diff = function () {
    for (let arg of arguments) {
        this.result -= arg;
    }
    return this.result;
}

// Добавление метода div в ф-цию конструктор
Calculator.prototype.div = function () {
    for (let arg of arguments) {
        if(arg == 0){
            throw new Error('На 0 делить нельзя!');
        } else {
            this.result /= arg;
        }
    }
    return this.result;
}

// Добавление метода mul в ф-цию конструктор
Calculator.prototype.mul = function () {
    for (let arg of arguments) {
        this.result *= arg;
    }
    return this.result;
}


var SqrCalc = function (firstNumber){
   this.result = firstNumber;
   let res = Calculator.prototype.sum.call(this, firstNumber);
   console.log('res=' + res);
}


// Наследование Calculator'а
SqrCalc.prototype = Object.create(Calculator.prototype);


// Создание экземпляра класса SqrCalc
let myCalculator = new SqrCalc(100);


//Проверка
let output = myCalculator.sum(1,2,3);
try {
  console.log(output);
} catch(e) {
   console.error(e.message);
}