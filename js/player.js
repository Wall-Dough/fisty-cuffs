function Player() {
  this.x = 0;
  this.y = 0;
  this.width = 50;
  this.height = 50;

  this.setX = function (x) {
    this.x = x;
    console.log(this.x);
  };

  this.setY = function (y) {
    this.y = y;
  };

  this.draw = function () {
    var oldStroke = context.strokeStyle;
    context.strokeStyle = "black";
    context.strokeRect(this.x - (this.width / 2), canvas.height() - this.y - this.height, this.width, this.height);
    context.strokeStyle = oldStroke;
  };
}
