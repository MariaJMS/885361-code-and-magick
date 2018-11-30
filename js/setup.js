'use strict';

var WIZARD_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_WIZARD = 4;

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var button = document.querySelector('.setup-submit');
var userNameInput = setup.querySelector('.setup-user-name');

var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var fireBall = setup.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
// открытие окна настройки персонажа
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// закрытие окна настройки персонажа
var closePopup = function () {
  setup.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

// отправка данных на сервер
button.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

// валидация ввода имени персонажа
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
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

userDialog.querySelector('.setup-similar').classList.remove('hidden');
