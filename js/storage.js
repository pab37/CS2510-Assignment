function storeHighScore(highScore) {
	localStorage.setItem("highScore", highScore);
}

function retrieveHighScore() {
	return localStorage.getItem("highScore");
}