var canvas;
var context;
var fps = 60;
var actualFps = 60;

var drawables = [];


function fixWidth() {
  canvas[0].width = canvas.width();
  canvas[0].height = canvas.height();
}

function drawDrawables() {
  for (i in drawables) {
    var drawable = drawables[i];
    if (drawable.draw != undefined) {
      drawable.draw();
    }
  }
}

function update() {
  fixWidth();
  drawDrawables();
}

$(document).ready(function () {
  canvas = $("#game");
  context = canvas[0].getContext("2d");
  fixWidth();
  start();

  setInterval(update, 1000 / fps);
});
