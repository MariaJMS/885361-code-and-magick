'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var CLOUD_BOTTOM = 250;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var TEXT_HEIGHT = 16;
  var TEXT_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура, вы победили!', CLOUD_X + GAP * 4, CLOUD_Y + GAP * 2);
    ctx.fillText('Список результатов:', CLOUD_X + GAP * 4, CLOUD_Y + GAP * 2 + TEXT_HEIGHT);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.' + Math.ceil(Math.random() * 9);
      }
      var BAR_HEIGHT_RESULT = BAR_HEIGHT * Math.round(times[i]) / maxTime;

      ctx.fillRect(CLOUD_X + TEXT_GAP + (BAR_WIDTH + TEXT_GAP) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT - BAR_HEIGHT_RESULT, BAR_WIDTH, BAR_HEIGHT_RESULT);
      ctx.fillStyle = '#000';
      ctx.fillText(Math.round(times[i]), CLOUD_X + TEXT_GAP + (BAR_WIDTH + TEXT_GAP) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT - BAR_HEIGHT_RESULT - TEXT_HEIGHT);
      ctx.fillText(names[i], CLOUD_X + TEXT_GAP + (BAR_WIDTH + TEXT_GAP) * i, CLOUD_BOTTOM + GAP);
    }
  };

  window.stat = {
    renderStatistics: renderStatistics
  };

})();
