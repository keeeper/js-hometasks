//  ДЗ #1 
function prepend(container, newElement) {	
	let cont = document.querySelector(container);
	let newEl = document.createElement('div');
	newEl.classList.add('new-element');
	newEl.innerText = newElement;
	//let newEl = document.querySelector(newElement); Уточнить нужно ли создавать новый элемент иои использовать уже существующий
	cont.insertBefore(newEl, cont.firstChild);
}
prepend('.container', 'Гарик');


//  ДЗ #2
function deleteTextNodes(el) {	
	let target = document.querySelector(el);
	let childNodes = target.childNodes;
	
	// for (let i=0; i < childNodes.length; i++) {
	// 	let node = childNodes[i];
	// 	if(node.nodeType == 3){
	// 		target.removeChild(node);
	// 	}
	// }

	//ES6
	for(let node of childNodes) { // данный тип итератора доступен в пседомассивах
		if(node.nodeType == 3){   // node - переменная в которой хранится каждый дочерний нод childNodes
			target.removeChild(node);
		}
	}
}
deleteTextNodes('.container');


// module.exports = {
// 	prepend : prepend,
// 	deleteTextNodes: deleteTextNodes
// }