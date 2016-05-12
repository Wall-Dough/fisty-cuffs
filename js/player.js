function Watcher() {
  this.x = 0;
  this.y = 0;
  this.postX = 0;
  this.postY = 0;
  this.speed = 3;
  this.width = 60;
  this.height = 100;
  this.text = "Hey, no jumping!";

  this.searching = false;
  this.returning = true;

  this.setX = function (x) {
    this.x = x;
  };

  this.setY = function (y) {
    this.y = y;
  };

  this.setPostX = function (x) {
    this.postX = x;
  };

  this.setPostY = function (y) {
    this.postY = y;
  };

  this.isNear = function (x) {
    return (Math.abs(this.x - x) < (this.width / 2));
  };

  this.hasFound = function () {
    return this.isNear(player.x);
  };

  this.hasReturned = function () {
    return this.isNear(this.postX);
  };

  this.alert = function () {
    this.searching = true;
  };

  this.update = function () {

    if (this.searching) {
      if (this.x < player.x) {
        this.x += this.speed * update_factor;
      }
      else if (this.x > player.x) {
        this.x -= this.speed * update_factor;
      }
      if (this.hasFound()) {
        this.searching = false;
        this.returning = true;
        player.freeze();
      }
    }
    else if (this.returning) {
      if (this.x < this.postX) {
        this.x += this.speed * update_factor;
        player.moveX(this.speed);
      }
      else if (this.x > this.postX) {
        this.x -= this.speed * update_factor;
        player.moveX(-this.speed);
      }
      if (this.hasReturned()) {
        this.returning = false;
        player.unfreeze();
      }
    }
  };

  this.draw = function () {
    var oldStroke = context.strokeStyle;
    context.strokeStyle = "black";
    context.strokeRect(this.x - (this.width / 2) + xOffset, canvas.height() - this.y - this.height, this.width, this.height);
    if (this.searching) {
      context.strokeText(this.text, this.x - (this.width / 2) + xOffset, canvas.height() - this.y - this.height - 20);
    }
    context.strokeStyle = oldStroke;
  };
}

function Player() {
  this.x = 0;
  this.y = 0;
  this.speed = 5;
  this.yv = 0;
  this.width = 60;
  this.scaleWidth = 1;
  this.scaleHeight = 1;
  this.height = 100;
  this.left = false;
  this.right = false;
  this.jumped = false;
  this.frozen = false;

  this.setX = function (x) {
    this.x = x;
    console.log(this.x);
  };

  this.setY = function (y) {
    this.y = y;
  };

  this.moveX = function (dx) {
    this.x += dx * update_factor;
  };

  this.jump = function () {
    if (this.jumped) return;
    watcher.alert();
    this.yv = 2 * this.speed * update_factor;
    this.jumped = true;
  };

  this.freeze = function () {
    this.frozen = true;
  };

  this.unfreeze = function () {
    this.frozen = false;
  };

  this.update = function () {
    if (!this.frozen) {
      if (isPressed(LEFT_ARROW)) {
        this.x -= this.speed * update_factor;
      }
      if (isPressed(RIGHT_ARROW)) {
        this.x += this.speed * update_factor;
      }
      if (isPressed(SPACE_BAR)) {
        this.jump();
      }
    }
    if (isPressed(DOWN_ARROW)) {
      this.scaleHeight = 0.8;
      this.scaleWidth = 1.2;
    }
    else if (isPressed(UP_ARROW)) {
      this.scaleHeight = 1.2;
      this.scaleWidth = 0.8;
    }
    else {
      this.scaleHeight = this.scaleWidth = 1;
    }
    if (this.jumped) {
      this.y += this.yv * update_factor;
      this.yv -= gravity * update_factor;
      var speed = Math.abs(this.yv);
      if (speed > 2) {
        this.scaleHeight = 1.1;
        this.scaleWidth = 0.9;
      }
      else {
        this.scaleHeight = this.scaleWidth = 1;
      }
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
    var width = this.width * this.scaleWidth;
    var height = this.height * this.scaleHeight;
    context.strokeRect(this.x - (width / 2) + xOffset, canvas.height() - this.y - height, width, height);
    context.strokeStyle = oldStroke;
  };
}
