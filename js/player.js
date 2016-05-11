function Player() {
  this.x = 0;
  this.y = 0;
  this.speed = 5;
  this.yv = 0;
  this.width = 60;
  this.height = 100;
  this.left = false;
  this.right = false;
  this.jumped = false;

  this.setX = function (x) {
    this.x = x;
    console.log(this.x);
  };

  this.setY = function (y) {
    this.y = y;
  };

  this.jump = function () {
    if (this.jumped) return;
    this.yv = 2 * this.speed;
    this.jumped = true;
  };

  this.update = function () {
    if (isPressed(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (isPressed(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (isPressed(UP_ARROW)) {
      this.jump();
    }
    if (this.jumped) {
      this.y += this.yv;
      this.yv -= gravity;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.yv = 0;
      this.jumped = false;
    }
  };

  this.draw = function () {
    var oldStroke = context.strokeStyle;
    context.strokeStyle = "black";
    context.strokeRect(this.x - (this.width / 2), canvas.height() - this.y - this.height, this.width, this.height);
    context.strokeStyle = oldStroke;
  };
}
