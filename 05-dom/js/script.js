//  ДЗ #1 
let section = document.querySelector('section'),
	p = document.querySelector('p');

function prepend(container, newElement) {
	container.insertBefore(newElement, container.firstChild);
}


//  ДЗ #2
function deleteTextNodes(el) {	
	let childNodes = el.childNodes;	
	for(let node of childNodes) { // данный тип итератора доступен в пседомассивах
		if(node.nodeType == 3){   // node - переменная в которой хранится каждый дочерний нод childNodes
			el.removeChild(node);
		}		
	}
	//console.log(childNodes);
}

// Проверка ДЗ #2
deleteTextNodes(section);
// Проверка ДЗ #1
prepend(section, p);


// Експорт модулей
module.exports = {
	prepend : prepend,
	deleteTextNodes: deleteTextNodes
}