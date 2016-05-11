var canvas;
var context;
var fps = 60;
var actualFps = 60;

var drawables = [];

var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;

var keysPressed = {};


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
  player.update();
  drawDrawables();
}

function isPressed(keycode) {
  return (keysPressed[keycode] != null);
}

$(document).ready(function () {
  canvas = $("#game");
  context = canvas[0].getContext("2d");
  fixWidth();
  start();

  setInterval(update, 1000 / fps);

  $(window).keydown(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    keysPressed[keycode] = true;
  });

  $(window).keyup(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    keysPressed[keycode] = null;
  });
});
