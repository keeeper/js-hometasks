// Кроссбраузерность
var eventsObj = {
  addEvent: function (el, type, fn) {
    if (typeof addEventListener !== 'undefined') {
      el.addEventListener(type, fn, false);
    } else if (typeof attachEvent !== 'undefined') {
      el.attachEvent('on' + type, fn);
    } else {
      el['on' + type] = fn;
    }
  },

  getTarget: function (event) {
    if (typeof event.target !== 'undefined') {
      return event.target;
    } else {
      return event.srcElement;
    }
  },

  preventDefault: function (event) {
    if (typeof event.preventDefault !== 'undefined') {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
};

// Аккордеон
(function() {
  var toggleState = function (e) {
    eventsObj.preventDefault(e);

    var elem = eventsObj.getTarget(e),
        elems = document.getElementsByClassName('accordeon__trigger');
        dataTrigger = elem.getAttribute('data-trigger');

    for (var i=0; i < elems.length; i++) {
      if(elems[i].classList.contains('active')){
        elems[i].classList.remove('active');
        elems[i].classList.add('is-hidden');
      }
    }
    if (dataTrigger) {
      elem.classList.toggle('is-hidden');
      elem.classList.toggle('active');
    }
  }

  eventsObj.addEvent(document, 'click', toggleState);
})();