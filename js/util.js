'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var DEBOUNCE_INTERVAL = 300;


  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isEnterEvent = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  // устранение "дребезга"
  var lastTimeout;
  var debounce = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.setup.updateWizards();
    }, DEBOUNCE_INTERVAL);
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    debounce: debounce
  };

})();
