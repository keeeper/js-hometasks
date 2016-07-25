(function() {
    let container = document.querySelector('.container');

    // AJAX запрос на промисе
    function getCities(url){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'json'; // Определение типа полученного документа и распарс его
            xhr.addEventListener('load', ()=>{
                resolve(xhr.response); // Передача полученных данных в then
            });
            xhr.addEventListener('error', ()=>{
               reject();
            });
            xhr.send();
        });
    }

    // Вызов и обработка полученного результата
    getCities('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then((response)=>{
        // Сортировка полученного списка в алфавитном порядке
        response.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })

        // Добавление элементов на страницу
        for ({name} of response) {
            let div = document.createElement('div');
            div.innerText = name;
            container.appendChild(div);
        }
    });

})();