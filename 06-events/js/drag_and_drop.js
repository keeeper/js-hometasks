let button = document.querySelector('button'),
    activeElement,
    offsetX = 0,
    offsetY = 0;

button.addEventListener('click', addElement);

function addElement(e) {
    let newEl = document.createElement('div'); // Создание элемента
    let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Генерация рандомного цвета
    newEl.style.backgroundColor = randomColor; // Назначение цвета элементу
    document.body.appendChild(newEl); // Добавление элемента в DOM

    // Обработчики событий
    function mouseDown(e){
        activeElement = e.currentTarget;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        console.log('mouse down', e.currentTarget);
    }
    function mouseUp(e){
        activeElement = null;
        console.log('mouse up', e.currentTarget);
    }
    function mouseMove(e){
        if(activeElement) {
            activeElement.style.top = (e.clientY - offsetY) + "px";
            activeElement.style.left = (e.clientX - offsetX) + "px";
        }
    }

    // Слушатели событий
    newEl.addEventListener('mousedown', mouseDown);
    newEl.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);
}