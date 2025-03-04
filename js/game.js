// Player Class (Buddy)
class Player {
  constructor() {
      this.positionX = 100; // Initializes the player's horizontal position to 100px
      this.speed = 5; //sets movement speed to 5px per update.
      this.width = 100; // Sets the width of the player to 100px
      this.element = document.getElementById('buddy'); // retrieves DOM element for id buddy
  }

  moveLeft() {
      this.positionX = Math.max(0, this.positionX - this.speed); //moves left but ensures player doesn't go past the left boundary (position 0).
      this.updatePosition(); // new position on the screen
  }

  moveRight() {
      const gameAreaWidth = document.getElementById('game-area').offsetWidth; // Retrieves width of the game area to prevent the player from moving off the screen.
      this.positionX = Math.min(gameAreaWidth - this.width, this.positionX + this.speed); // moves right but ensures player doesn't go past the right boundary of the game area
      this.updatePosition(); // Calls the updatePosition method to reflect the new position on screen.
  }

  updatePosition() { 
      this.element.style.transform = `translateX(${this.positionX}px)`; // Updates the player's position on screen by applying a CSS transform to move the element horizontally.
    }
  }


// Game Class
class Game {
  constructor() {
      this.gameRunning = false; // Set state of the game as not running.
      this.player = new Player(); // Creates a new player
      this.scoreInterval = null;  // set the interval variable for score updates
      this.startTime = null;  // set the start time variable to store the game start timestamp
      this.scores = []; // create an empty array to hold the scores for previous rounds.
  }

  moveObstacles() {
      const gameAreaHeight = document.getElementById('game-area').offsetHeight;
      document.querySelectorAll('.obstacle').forEach(obstacle => {
          let topPosition = parseFloat(obstacle.style.top) || 0;
          topPosition += 2;

          if (topPosition > gameAreaHeight) {
              topPosition = -50;
          }

          obstacle.style.top = `${topPosition}px`;
      });
  }

  checkCollisions() {
      const buddyElement = document.getElementById('buddy');
      document.querySelectorAll('.obstacle').forEach(obstacleElement => {
          if (this.didCollide(buddyElement, obstacleElement)) {
              console.log('Collision detected!');
              this.endGame();
          }
      });
  }

  didCollide(buddyElement, obstacleElement) {
      const buddyRect = buddyElement.getBoundingClientRect();
      const obstacleRect = obstacleElement.getBoundingClientRect();
      const minOverlap = 20; // collide when overlap with 20px for a clearer image

      return (
          buddyRect.left < obstacleRect.right - minOverlap &&
          buddyRect.right > obstacleRect.left + minOverlap &&
          buddyRect.top < obstacleRect.bottom - minOverlap &&
          buddyRect.bottom > obstacleRect.top + minOverlap
      );
  }

  gameLoop() {
      if (!this.gameRunning) return;
      this.moveObstacles();
      this.checkCollisions();
      requestAnimationFrame(this.gameLoop.bind(this));
  }

  updateScore() {
      if (!this.gameRunning || !this.startTime) return;
      let elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
      document.getElementById('time').textContent = `Time: ${elapsedTime}s`;
  }

  startGame() {
      console.log("Game started!");
      this.startTime = Date.now();
      this.gameRunning = true;

      if (this.scoreInterval) clearInterval(this.scoreInterval);
      this.scoreInterval = setInterval(this.updateScore.bind(this), 1000);

      this.gameLoop();
  }
  displayScores() { //
    const scoresList = document.getElementById('previous-scores');
    scoresList.innerHTML = ''; // Clear existing list
    this.scores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Round ${index + 1}: ${score} seconds`;
        scoresList.appendChild(listItem);
    });
}

  endGame() {
      this.gameRunning = false;
      let elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
      
      this.scores.push(elapsedTime); // Voeg de score toe aan de lijst
      this.displayScores(); // Toon de scores

      document.getElementById('final-score').textContent = `You kept Buddy safe for ${elapsedTime} seconds!`;
      document.getElementById('game-screen').classList.add('hidden');
      document.getElementById('end-screen').classList.remove('hidden');
      console.log('Game Over!');
  }

  restartGame() {
      console.log("Game reset!");
      document.getElementById('time').textContent = 'Time: 0s';
      document.getElementById('final-score').textContent = '0';
      this.player.positionX = 100;
      this.player.updatePosition();

      document.querySelectorAll('.obstacle').forEach(obstacle => {
         
        obstacle.style.top = "-50px";
      });

      document.getElementById('end-screen').classList.add('hidden');
      document.getElementById('game-screen').classList.remove('hidden');

      this.gameRunning = false;
      clearInterval(this.scoreInterval);
      this.startGame();
  }

  initializeObstacles() {
      document.querySelectorAll('.obstacle').forEach(obstacle => {
          obstacle.style.top = '-50px';
      });
  }
}
