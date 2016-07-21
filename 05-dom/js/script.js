//  ДЗ #1 
let section = document.querySelector('section'),
	p = document.querySelector('p');

function prepend(container, newElement) {
	container.insertBefore(newElement, container.firstChild);
}
prepend(section, p);


//  ДЗ #2
function deleteTextNodes(el) {	
	let childNodes = el.childNodes;
	//ES6	
	for(let node of childNodes) { // данный тип итератора доступен в пседомассивах
		if(childNodes[i].nodeType == 3){   // node - переменная в которой хранится каждый дочерний нод childNodes
			el.removeChild(childNodes[i]);
		}		
	}
	console.log(childNodes);
}
deleteTextNodes(section);

// Експорт модулей
module.exports = {
	prepend : prepend,
	deleteTextNodes: deleteTextNodes
}