'use strict';

(function () {
  var initialPositionTop = '80px';
  var initialPositionLeft = '50%';

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.setup.querySelector('.setup-close');

  // первоначальное положение окна
  var setPositionSetup = function () {
    window.setup.setup.style.top = initialPositionTop;
    window.setup.setup.style.left = initialPositionLeft;
  };

  var onPopupEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closePopup();
    }
  };

  // открытие окна настройки персонажа
  var openPopup = function () {
    window.setup.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      openPopup();
    }
  });

  // закрытие окна настройки персонажа
  var closePopup = function () {
    window.setup.setup.classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setPositionSetup();
  };

  setupClose.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      closePopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

})();
