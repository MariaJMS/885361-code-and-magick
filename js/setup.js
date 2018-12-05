'use strict';

(function () {
  var WIZARD_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
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

  // создем объект персонажа
  var createWizard = function (name, coatColor, eyesColor) {
    var newWizard = {
      name: name,
      coatColor: coatColor,
      eyesColor: eyesColor
    };
    return newWizard;
  };

  // заполняем объект свойствами
  var genericWizard = function () {
    var nameWizard = getRandomItem(WIZARD_NAME) + ' ' + getRandomItem(WIZARD_SURNAME);
    var coatColorWizard = getRandomItem(COAT_COLOR);
    var eyesColorWizard = getRandomItem(EYES_COLOR);

    return createWizard(nameWizard, coatColorWizard, eyesColorWizard);
  };

  // записываем объекты в массив персонажей
  var wizards = [];
  for (var i = 0; i < NUMBER_WIZARD; i++) {
    wizards.push(genericWizard());
  }

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  setup.querySelector('.setup-similar').classList.remove('hidden');

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
