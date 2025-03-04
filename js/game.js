// Player Class (Buddy)
class Player {
    constructor() {
      this.positionX = 100;
      this.speed = 5;
      this.width = 200;
    }
  
    moveLeft() {
      this.positionX = Math.max(0, this.positionX - this.speed);
      this.updatePosition();
    }
  
    moveRight() {
      const gameAreaWidth = document.getElementById('game-area').offsetWidth;
      this.positionX = Math.min(gameAreaWidth - this.width, this.positionX + this.speed);
      this.updatePosition();
    }
  
    updatePosition() {
      document.getElementById('buddy').style.transform = `translateX(${this.positionX}px)`;
    }
  }
  
  // Game Class
  class Game {
    constructor() {
      this.gameRunning = false;
      this.leftInterval = null;
      this.rightInterval = null;
      this.scoreInterval = null;
      this.startTime = null;
      this.player = new Player();  // Create an instance of Player
  
      this.bindEvents();
    }
  
    bindEvents() {
      // Start and Restart Game Handlers
      document.getElementById('start-button').addEventListener('click', () => {
        console.log("Start button clicked!");
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        this.startGame();
      });
  
      document.getElementById('restart-button').addEventListener('click', () => {
        console.log("Restart button clicked!");
        document.getElementById('end-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        this.restartGame();
      });
  
      // Keydown Event Listeners for Movement
      window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && !this.leftInterval) {
          this.leftInterval = setInterval(this.player.moveLeft.bind(this.player), 10);
        } else if (event.key === 'ArrowRight' && !this.rightInterval) {
          this.rightInterval = setInterval(this.player.moveRight.bind(this.player), 10);
        }
      });
  
      // Keyup Event Listeners for Clearing Movement Interval
      window.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') {
          clearInterval(this.leftInterval);
          this.leftInterval = null;
        } else if (event.key === 'ArrowRight') {
          clearInterval(this.rightInterval);
          this.rightInterval = null;
        }
      });
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
      const minOverlap = 20;
  
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
  
    endGame() {
      this.gameRunning = false;
      let elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
      document.getElementById('final-score').textContent = `You kept Buddy safe for ${elapsedTime}s!`;
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
  
    // Initialize obstacle positions on DOM load
    initializeObstacles() {
      document.querySelectorAll('.obstacle').forEach(obstacle => {
        obstacle.style.top = '-50px';
      });
    }
  }
  
  // Initialize the game after the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.initializeObstacles();
  });
  