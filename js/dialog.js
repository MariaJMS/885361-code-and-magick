'use strict';

var setupDialogElement = document.querySelector('.setup');
var dialogHandler = setupDialogElement.querySelector('.upload');

// ограничение
var limits = {
  top:  document.documentElement.offsetHeight - setupDialogElement.offsetHeight,
  right: document.documentElement.offsetWidth - setupDialogElement.offsetWidth,
  bottom: document.documentElement.offsetTop,
  left: document.documentElement.offsetLeft
};

var getValueInLimit = function (value, min, max) {
  if (value < min) {
    value = min;
  } if (value > max) {
    value = max;
  }
  return value;
};

var setupCoords = function (coords) {
  coords.x = getValueInLimit(coords.x, limits.left, limits.right);
  coords.y = getValueInLimit(coords.y, limits.bottom, limits.top);

  return coords;
};

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  // координаты курсора мыши на момент начала движения
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    // смещение
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    // текущие координаты курсора
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var resultCoords = {
      x: setupDialogElement.offsetLeft - shift.x,
      y: setupDialogElement.offsetTop - shift.y
    };

    setupCoords(resultCoords);

    setupDialogElement.style.top = resultCoords.y + 'px';
    setupDialogElement.style.left = resultCoords.x + 'px';

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (prevEvt) {
        prevEvt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
