'use strict';
(function () {
  var NUMBER_WIZARD = 4;
  var wizardTemplate = document.querySelector('#similar-wizard-template');

  var createWizard = function (wizard) {
    var element = wizardTemplate.content.cloneNode(true);
    var wizardElement = element.querySelector('.wizard');

    element.querySelector('.setup-similar-label').innerText = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return element;
  };

  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');

  var renderWizards = function (dataArr) {
    var takeNumber = dataArr.length > NUMBER_WIZARD ? NUMBER_WIZARD : dataArr.length;
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(createWizard(dataArr[i]));
    }
    similar.classList.remove('hidden');
  };

  window.render = {
    renderWizards: renderWizards
  };

})();
