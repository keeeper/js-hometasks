(function() {
    let accordeon = document.querySelector('.accordeon'); // Аккордеон

    // Слушатель события на аккордеоне и его потомках :)
    accordeon.addEventListener('click', toggleState);

    // Обработчик события
    function toggleState(e) {
        let active = e.target; // Элемент по которому кликнули
            elems = document.querySelectorAll('.accordeon__trigger'); // Все элементы аккордеона

        // Закрытие всех ранее открытых элементов аккордеона
        for (let el of elems) {
            if(el.classList.contains('active')){
                el.classList.remove('active');
                el.classList.add('is-hidden');
            }
        }

        // Открытие элемента по которому кликнули
        if (active.classList.contains('is-hidden')) {
            active.classList.remove('is-hidden');
            active.classList.add('active');
        }
    }
})();