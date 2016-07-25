(function() {
    let accordeon = document.querySelector('.accordeon');

    let toggleState = function (e) {
        let element = e.target; // Элемент по которому кликнули
            elems = document.querySelectorAll('.accordeon__trigger'); // Все элементы аккордеона

        // Закрытие всех ранее открытых элементов аккордеона
        for (let el of elems) {
            if(el.classList.contains('active')){
                el.classList.remove('active');
                el.classList.add('is-hidden');
            }
        }
        
        // Открытие элемента по которому кликнули
        if (element.classList.contains('is-hidden')) {
            element.classList.remove('is-hidden');
            element.classList.add('active');
        }
    }
    accordeon.addEventListener('click', toggleState);
})();