'use strict';

(function () {
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_WIZARD = 4;
  var setup = document.querySelector('.setup');

  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var fireBall = setup.querySelector('.setup-fireball-wrap');

  // генерируем случайный элемент массива
  var getRandomItem = function (array) {
    return array [Math.floor(Math.random() * array.length)];
  };

  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderSimilarWizards = function (dataArr) {
    var wizards = [];
    for (var i = 0; i < NUMBER_WIZARD; i++) {
      var dataArrItem = getRandomItem(dataArr);
      wizards[i] = {
        name: dataArrItem.name,
        coatColor: dataArrItem.colorCoat,
        eyesColor: dataArrItem.colorEyes
      };
    }
    var fragment = document.createDocumentFragment();

    for (i = 0; i < NUMBER_WIZARD; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
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

  window.load(renderSimilarWizards, showError);

  // закрытие формы при нажатии кнопки "Сохранить"
  var saveForm = function () {
    form.classList.add('hidden');
  };
  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), saveForm, showError);
    evt.preventDefault();
  });

  // изменяем цвет мантии
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = getRandomItem(COAT_COLOR);
  });
  // изменяем цвет глаз
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = getRandomItem(EYES_COLOR);
  });
  // изменяем цвет фаербола
  fireBall.addEventListener('click', function () {
    fireBall.style.background = getRandomItem(FIREBALL_COLOR);
  });

  window.setup = {
    setup: setup
  };

})();
