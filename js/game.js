function Game() {
	this.level = 0;
	this.velocity = 0;
	this.score = 0;
	this.time = 0;
	this.highScore = 0;
	
	this.updateProgress = function() {
		this.level += 1;
		this.velocity += 1;
		generateEnemies();
	}
}