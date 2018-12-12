'use strict';

(function () {
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var DEBOUNCE_INTERVAL = 300;
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  // генерируем случайный элемент массива
  var getRandomItem = function (array) {
    return array [Math.floor(Math.random() * array.length)];
  };

  var coatColor;
  var eyesColor;
  var wizards = [];

  // система "отличности" одного мага от другого
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  // сортировка, когда маги равны
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render.renderWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var showError = function (errMes) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errMes;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // закрытие формы при нажатии кнопки "Сохранить"
  var saveForm = function () {
    form.classList.add('hidden');
  };

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), saveForm, showError);
    evt.preventDefault();
  });

  var successHandler = function (dataArr) {
    wizards = dataArr;
    updateWizards();
  };

  window.load(URL, successHandler, showError);

  // устранение "дребезга"
  var lastTimeout;
  var debounce = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateWizards();
    }, DEBOUNCE_INTERVAL);
  };

  // изменяем цвет мантии
  wizardCoat.addEventListener('click', function () {
    var newColor = getRandomItem(COAT_COLOR);
    wizardCoat.style.fill = newColor;
    coatColor = newColor;
    debounce();
  });

  // изменяем цвет глаз
  wizardEyes.addEventListener('click', function () {
    var newColor = getRandomItem(EYES_COLOR);
    wizardEyes.style.fill = newColor;
    eyesColor = newColor;
    debounce();
  });

  // изменяем цвет фаербола
  wizardFireball.addEventListener('click', function () {
    var newColor = getRandomItem(FIREBALL_COLOR);
    wizardFireball.style.background = newColor;
  });

  window.setup = {
    setup: setup
  };

})();
