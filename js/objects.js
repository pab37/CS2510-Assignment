function Player() {
	this.img = playerImg;
	
	this.x = (canvas.width / 2) - (this.img.width / 2);
	this.y = (canvas.height / 2) - (this.img.height / 2);
}

function Enemy1() { // Planet
	this.img = enemyImg1;
	
	this.x;
	this.y;
	this.spawnTime = 0;
	
	this.speed = 1;
}

function Enemy2() { // UFO
	this.img = enemyImg2;
	
	this.x;
	this.y;
	this.spawnTime = 0;
	
	this.speed = 3;
}

function Enemy3() { // Comet
	this.img = enemyImg3;
	
	this.x;
	this.y;
	this.spawnTime = 0;
	
	this.speed = 4;
}

function Enemy4() { // Satellite
	this.img = enemyImg4;
	
	this.x;
	this.y;
	this.spawnTime = 0;
	
	this.speed = 2;
}

function Enemy5() { // Happy UFO
	this.img = enemyImg5;
	
	this.x;
	this.y;
	this.spawnTime = 0;
	
	this.speed = 2;
}