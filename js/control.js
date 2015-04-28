var speed = 5;

function moveUp() {
	player.y -= speed;
}

function moveDown() {
	player.y += (speed + 3);
}

function moveLeft() {
	player.x -= speed;
}

function moveRight() {
	player.x += speed;
}

function keyDown(e) {
	e.preventDefault();
	
	switch (e.keyCode) {
		case 87:
		case 38:
			moveUp();
			break;
		case 83:
		case 40:
			moveDown();
			break;
		case 65:
		case 37:
			moveLeft();
			break;
		case 68:
		case 39:
			moveRight();
			break;
	}
}

function seenmotion(e) {
	var bounding_box = canvas.getBoundingClientRect();
	player.x = (e.clientX - bounding_box.left - (player.img.width / 2)) * (canvas.width / bounding_box.width);
	player.y = (e.clientY - bounding_box.top - (player.img.height / 2)) * (canvas.height / bounding_box.height);
}

function movePlayer() {	
	if (Key.isDown(Key.UP)) moveUp();
  	if (Key.isDown(Key.LEFT)) moveLeft();
  	if (Key.isDown(Key.DOWN)) moveDown();
  	if (Key.isDown(Key.RIGHT)) moveRight();
}

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};