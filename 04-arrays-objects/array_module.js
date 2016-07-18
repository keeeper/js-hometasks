let array = [1, 2, 3, 4, 5, 6];

// forEach
function forEach(array, fn) { 
  for(let i=0; i < array.length; i++) {              
     fn(array[i]);
  }
}
function output(val){  
  console.log(val);
}
// Проверка
// forEach(array, output);



//Filter
let j = 0;
function filter(array, fn) {
  let newArray = [];
   for(let i=0; i < array.length; i++) {
      if(fn(array[i]) == true){
        newArray[j] = array[i];
        j++;
      }
   }
  return newArray;
}
function greaterThan4(val) {    
    return val > 4;    
}
// Проверка
filter(array, greaterThan4);



//Map
function map(array, fn) {
  let newArray = [];
   for(let i=0; i < array.length; i++) {              
        newArray[i] = fn(array[i]);
   }
  return newArray;
}
function mapExpression(val) {  
  return val + val;
}
// Проверка
map(array, mapExpression);



// Slice
function slice(array, begin, end) {  
  let newArray = [],
    j = 0;
    if (!end) {
      end = array.length;
    }
    if(end < 0)  {
      end = end + array.length;
    }
    if (begin < 0) {
      begin = begin + array.length;
    }
    for(let i = begin; i < end; i++) {      
        newArray[j] = array[i];       
        j++;
   }
   return newArray;
}
// Проверка
//slice(array, -3, -1);


//Reduce
function reduce(array, fn) {
  let result = 0;
  for (i=0; i < array.length; i++) {
    result = fn(result, array[i]);   
  }  
  console.log(result);
}
function reduceFn(prevSum, curNum){
  return prevSum + curNum;
}
// Проверка
//reduce(array, reduceFn);



// Експорт модулей
module.exports = {
	reduce : reduce,
	filter : filter,
	map : map,
	slice : slice,
	reduce : reduce
}