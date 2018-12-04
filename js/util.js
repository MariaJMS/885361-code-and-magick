'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isEnterEvent = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
}
)();
