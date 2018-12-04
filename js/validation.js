'use strict';

(function () {
  var button = document.querySelector('.setup-submit');
  var userNameInput = window.setup.querySelector('.setup-user-name');

  // валидация ввода имени персонажа
  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  // отправка данных на сервер
  button.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
})();
