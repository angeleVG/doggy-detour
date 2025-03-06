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
      this.scores = []; // create an empty array to hold the scores for previous rounds
  }

  moveObstacles() {
      const gameAreaHeight = document.getElementById('game-area').offsetHeight;  // Retrieves height of the game area to manage obstacle movement
      document.querySelectorAll('.obstacle').forEach(obstacle => {
          let topPosition = parseFloat(obstacle.style.top) || 0;  // Retrieves the current top position of each obstacle, defaults to 0 if not set.
          topPosition += 2;  // Moves obstacles down by 2px each frame

          if (topPosition > gameAreaHeight) {
              topPosition = -50;  // If obstacles moves past the bottom of the screen, they reappear at the top of the game area

          }

          obstacle.style.top = `${topPosition}px`; // Updates the obstacle's position on screen
      });
  }

  checkCollisions() {
      const buddyElement = document.getElementById('buddy');  // Retrieves player's DOM element
      document.querySelectorAll('.obstacle').forEach(obstacleElement => {
          if (this.didCollide(buddyElement, obstacleElement)) {   // Checks if player collided with obstacle.
              console.log('Collision detected!');  // Logs collision to the console
              this.endGame(); // Ends the game if a collision is detected
          }
      });
  }

  didCollide(buddyElement, obstacleElement) {
      const buddyRect = buddyElement.getBoundingClientRect();  // return the size and position of player relative to the viewport
      const obstacleRect = obstacleElement.getBoundingClientRect(); // return the size and position of obstacles relative to the viewport
      const minOverlap = 20; // Sets overlap for a collision to be detected

      return (
          buddyRect.left < obstacleRect.right - minOverlap &&
          buddyRect.right > obstacleRect.left + minOverlap &&
          buddyRect.top < obstacleRect.bottom - minOverlap &&
          buddyRect.bottom > obstacleRect.top + minOverlap
      ); // Checks if player and obstacle rectangles overlap
  }

  gameLoop() {
      if (!this.gameRunning) return; // If the game is not running, the loop stops.
      this.moveObstacles();  // Moves the obstacles every frame
      this.checkCollisions(); // Checks for collisions every frame
      requestAnimationFrame(this.gameLoop.bind(this)); // Calls the gameLoop function repetitive to run the next frame
  }

  updateScore() {
      if (!this.gameRunning || !this.startTime) return;  // If the game is not running or startTime is not set, do nothing.
      let elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);  // Calculate the elapsed time since the game started
      document.getElementById('time').textContent = `Time: ${elapsedTime}s`;  // Updates the time display with the elapsed time in seconds
  }

  startGame() {
      console.log("Game started!"); // Logs that the game has started
      this.startTime = Date.now();  // Records the current time as start time
      this.gameRunning = true;  // Sets game to running

      if (this.scoreInterval) clearInterval(this.scoreInterval);  // Clears any existing score intervals
      this.scoreInterval = setInterval(this.updateScore.bind(this), 1000); // Starts a new interval to update score every second

      this.gameLoop(); // Starts the game loop for continuous updates
  }

  displayScores() { 
    const scoresList = document.getElementById('previous-scores'); // Retrieves DOM element for displaying previous scores
    scoresList.innerHTML = ''; // Clears any existing scores displayed
    
    this.scores.forEach((score, index) => { 
        const listItem = document.createElement('li');  // Creates a new list item for each previous score

        listItem.textContent = `🐶 ${score} seconds`; // Sets the text content of the list item to show the score for that round
        scoresList.appendChild(listItem); // add list item to the scores list
    });
}

  endGame() {
      this.gameRunning = false;  // Stops the game by setting it to not running
      let elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Calculates the total time the game was running
      

    // experiment - Play the game over sound when the game ends
    const gameOverAudio = document.getElementById('game-over-audio');
    gameOverAudio.play();

      this.displayScores(); // Displays the list of previous scores
      this.scores.push(elapsedTime); // Adds the score to the end of the list of previous scores
     
        // Sort the scores array in descending order
  this.scores.sort((a, b) => b - a);

  // Limit the scores array to top 5 scores
  if (this.scores.length > 5) {
    this.scores.splice(5);  // Removes all scores after the 5th index
  }

      document.getElementById('final-score').textContent = `You kept Buddy safe for ${elapsedTime} seconds!`; // Displays the final score on the screen
      document.getElementById('game-screen').classList.add('hidden'); // Hides the game screen
      document.getElementById('end-screen').classList.remove('hidden'); // Shows the end screen
      console.log('Game Over!');  // Logs that the game is over

          // Show scores list only if it's the second or more game over
          const scoresHeading = document.querySelector('#end-screen h3');
          if (this.scores.length >= 2) {  // Show after the second game over
              scoresHeading.style.display = 'block';
          } else {
              scoresHeading.style.display = 'none';
          }
      }

  restartGame() {
      console.log("Game reset!"); // Logs that the game is being reset
      document.getElementById('time').textContent = 'Time: 0s'; // Resets the time display to 0
      document.getElementById('final-score').textContent = '0'; // Resets the final score display to 0
      this.player.positionX = 100; // Resets the player's position to the starting point
      this.player.updatePosition(); // Updates the player's position on the screen

      document.querySelectorAll('.obstacle').forEach(obstacle => {
         
        obstacle.style.top = "-50px";  // Resets the obstacles to the top of the screen
      });

      document.getElementById('end-screen').classList.add('hidden');  // Hides the end screen
      document.getElementById('game-screen').classList.remove('hidden');  // Shows the game screen

      this.gameRunning = false;   // Stops the game
      clearInterval(this.scoreInterval); // Stops any active score intervals
      this.startGame(); // Starts a new game
  }

  initializeObstacles() {
      document.querySelectorAll('.obstacle').forEach(obstacle => {
          obstacle.style.top = '-50px';  // Resets all obstacles to start at the top of the screen
      });
  }
}

