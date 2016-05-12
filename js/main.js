$.getScript("player.js");
$.getScript("watcher.js");
$.getScript("box.js");
$.getScript("init.js");

var player;

var gravity = 0.5;

function start() {
  player = new Player();
  player.setX(canvas.width() / 2);
  player.setY(0);
  drawables.push(player);
  updatables.push(player);

  watcher = new Watcher();
  watcher.setPostX(watcher.width * 2);
  watcher.setPostY(0);
  watcher.setX(watcher.postX);
  watcher.setY(watcher.postY);
  drawables.push(watcher);
  updatables.push(watcher);
}
