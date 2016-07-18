//  ДЗ #1 
function prepend(container, newElement) {	
	let cont = document.querySelector(container); 
	let newEl = document.createElement('div'); // Создаем новый <div>
	newEl.classList.add('new-element'); // Добавляем ему класс
	newEl.innerText = newElement; // Добавляем ему контент
	cont.insertBefore(newEl, cont.firstChild);
}
prepend('.container', 'Гарик');


//  ДЗ #2
function deleteTextNodes(el) {	
	let target = document.querySelector(el);
	let childNodes = target.childNodes;
	//ES6
	for(let node of childNodes) { // данный тип итератора доступен в пседомассивах
		if(node.nodeType == 3){   // node - переменная в которой хранится каждый дочерний нод childNodes
			target.removeChild(node);
		}		
	}
	console.log(childNodes);
}
deleteTextNodes('.container');

// Експорт модулей
module.exports = {
	prepend : prepend,
	deleteTextNodes: deleteTextNodes
}