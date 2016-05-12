var canvas;
var context;
var draw_fps = 60;
var update_fps = 60;

var last_time = 0;
var update_factor = 1;

var drawables = [];
var updatables = [];

var SPACE_BAR = 32;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;

var keysPressed = {};

var xOffset = 0;


function fixWidth() {
  canvas[0].width = canvas.width();
  canvas[0].height = canvas.height();
}

function calculateOffset() {
  // xOffset = (canvas.width() / 2) - player.x;
}

function drawDrawables() {
  calculateOffset();
  for (i in drawables) {
    var drawable = drawables[i];
    if (drawable.draw != undefined) {
      drawable.draw();
    }
  }
}

function updateUpdatables() {
  for (i in updatables) {
    var updatable = updatables[i];
    if (updatable.update != undefined) {
      updatable.update();
    }
  }
}

function calculateFactor() {
  var time = Date.now();
  if (last_time > 0) {
    elapsed = time - last_time;
    update_factor = (time - last_time) / (1000 / update_fps);
  }
  last_time = time;
}

function update() {
  calculateFactor();
  updateUpdatables();
}

function draw() {
  fixWidth();
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

  setInterval(draw, 1000 / draw_fps);
  setInterval(update, 1000 / update_fps);

  $(window).keydown(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    keysPressed[keycode] = true;
  });

  $(window).keyup(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    keysPressed[keycode] = null;
  });
});
