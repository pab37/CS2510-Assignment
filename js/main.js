var playerImg = new Image();
var enemyImg1 = new Image();
var enemyImg2 = new Image();
var enemyImg3 = new Image();
var enemyImg4 = new Image();
var enemyImg5 = new Image();
var background = new Image();

var canvas, context;

var enemies,game, player, score;
var explosion = [];

var explosionAudio = new Audio();

var collision = false;
var inMenu = true;

var playGameInterval;
var menuInterval;

//// BACKGROUND
var background_x = 0;
var background_y = 0;

//// GAME PARAMETERS
var currentTime = new Date();

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.fillStyle = 'white';
	
	canvas.addEventListener('mousemove', seenmotion, false);
	window.addEventListener('keyup', function(event) { event.preventDefault(); Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { event.preventDefault(); Key.onKeydown(event); }, false);
	canvas.addEventListener('click', click, false);

	
	//// IMAGES
	loadImages();
	
	//// GAME
	game = new Game();
	game.highScore = retrieveHighScore();
	enemies = [];

	//// ASTRONAUT
	player = new Player();
	
	//// AUDIO
	explosionAudio.src = "./audio/explosion.wav";
	
	context.font="bold 24px TitilliumWeb";
	
	if (inMenu)
		menuInterval = setInterval(drawMenu, 10);
}

function update() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	drawBackground(background_x, background_y);
	
	background_y += game.velocity;
	
	game.time += 0.01;
	
	if (enemies.length) {
		moveEnemies();
		drawEnemies();
	} else {
		game.updateProgress()
	}
	
	movePlayer();
	drawPlayer();
	
	collision = false;
	checkCollision();
	
	score = Math.floor(game.time * 100);
	context.fillText("Score:", canvas.width-70, 30);
	context.fillText(score, canvas.width-70, 55);
	
	if (game.highScore) {
		context.fillText("High score:", canvas.width-70, 80);
		context.fillText(game.highScore, canvas.width-70, 110);
	}
	
	context.fillText("Level ", 50, 50);
	context.fillText(game.level, 90, 50);
}

function drawMenu() {	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	drawBackground(background_x, background_y);
	
	background_y += 1;
	
	movePlayer();
	drawPlayer();
	
	context.fillText("CLICK TO START", (canvas.width / 2), (canvas.height / 2));              
	context.textAlign = "center"; 
}

function stopGame() {
	clearInterval(playGameInterval);
	
	collision = true;
	
	if (score > game.highScore) {
		storeHighScore(score);
		context.fillText("NEW HIGH SCORE", (canvas.width / 2), (canvas.height / 2) - 15);
		context.fillText(score, (canvas.width / 2), (canvas.height / 2) + 15);
	} else {
		context.fillText("YOUR SCORE", (canvas.width / 2), (canvas.height / 2) - 15);
		context.fillText(score, (canvas.width / 2), (canvas.height / 2) + 15);
	}
	
	context.fillText("GAME OVER", (canvas.width / 2), (canvas.height / 2) - 100); 
	context.fillText("CLICK TO TRY AGAIN", (canvas.width / 2), (canvas.height / 2) + 100);              

	context.textAlign = "center"; 
}

function click() {
	if (inMenu) {
		clearInterval(menuInterval);
		inMenu = false;
		playGameInterval = setInterval(update, 10);
	}
	
	if (collision) {
		init();
		collision = false;
		playGameInterval = setInterval(update, 10);
	}
}

function drawBackground(x, y) {
	context.drawImage(background, x, y);
	context.drawImage(background, 0, y - background.height);
	
	if (background_y > canvas.height) {
		background_y = 0;
	}
}

function drawPlayer() {
	if (player.x < 0) player.x = 0;
	else if (player.x > (canvas.width - playerImg.naturalWidth)) player.x = (canvas.width - playerImg.naturalWidth);
	else if (player.y < 0) player.y = 0;
	else if (player.y > (canvas.height - playerImg.height)) player.y = (canvas.height - playerImg.height);
	else if ((player.x < 4) && (player.y < 4)) {
		player.x = 0;
		player.y = 0;
	}
	context.drawImage(player.img, player.x, player.y);
}

function getRandom(min, max) {
	return Math.floor((Math.random() * max) + min);
}

function drawEnemies() {
	for (i = enemies.length; i > 0; i--) {
		var tempEnemy = enemies.shift();
		
		if (tempEnemy.spawnTime < game.time) {
			context.drawImage(tempEnemy.img, tempEnemy.x, tempEnemy.y);
		}
		
		if (tempEnemy.y <= canvas.height) {
			enemies.push(tempEnemy);
		}
	}
}

function moveEnemies() {
	for (i = 0; i < enemies.length; i++) {
		var tempEnemy = enemies[i];
		if (tempEnemy.spawnTime < game.time) {
			tempEnemy.y += tempEnemy.speed + game.velocity;
		}
	}
}

function generateEnemies() {
	var numberOfEnemies = game.level * 5;
	var drawTime = game.time;
	
	for (i = 0; i < numberOfEnemies; i++) {
		var type = getRandom(1, 6);
		if (type >= 5) var enemy = new Enemy1();
			else if (type >= 4) var enemy = new Enemy2();
				else if (type >= 3) var enemy = new Enemy3();
					else if (type >= 2) var enemy = new Enemy4();
						else if (type >= 1) var enemy = new Enemy5();
				
		enemy.spawnTime = drawTime;
		drawTime += 5 / game.level;
		enemy.y = -300;
		enemy.x = getRandom(0, (canvas.width - 150));
		enemies.push(enemy);
	}
}

function loadImages() {
	playerImg.src = "./img/spaceship.png"; // http://www.clipartlord.com/category/space-clip-art/astronaut-clip-art/
	
	enemyImg1.src = "./img/enemy1.png";
	enemyImg2.src = "./img/enemy2.png";
	enemyImg3.src = "./img/enemy3.png";
	enemyImg4.src = "./img/enemy4.png";
	enemyImg5.src = "./img/enemy5.png";
	
	background.src = "./img/background.jpg";
	
	for (i = 0; i < 19; i++) {
		var explosionFrame = new Image();
		explosionFrame.src = "./img/explosion/tmp-" + i + ".gif";
		explosion.push(explosionFrame);
	}
}

function checkCollision() {
	for (i = 0; i < enemies.length; i++) {
		var tempEnemy = enemies[i];
		if (player.x < (tempEnemy.x + (tempEnemy.img.width / 2))) {
			if ((player.x + (playerImg.naturalWidth / 2)) > tempEnemy.x) {
				if (player.y < (tempEnemy.y + (tempEnemy.img.height / 2))) {
					if ((player.y + (playerImg.height / 2)) > tempEnemy.y) { 
						for (i = 0; i < explosion.length; i++) {
							context.drawImage(explosion[i], tempEnemy.x, tempEnemy.y);							
						}
						explosionAudio.play();
						stopGame();
					}
				}
			}
		}
	}
}