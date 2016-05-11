var player;

var gravity = 0.5;

function start() {
  player = new Player();
  player.setX(canvas.width() / 2);
  player.setY(0);
  drawables.push(player);
}
