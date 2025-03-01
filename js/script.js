// Start and Restart Game Handlers
document.getElementById('start-button').onclick = function() {
  console.log("Start button clicked!");
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  startGame();
};

document.getElementById('restart-button').onclick = function() {
  console.log("Restart button clicked!");
  document.getElementById('end-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  restartGame();
};

// Initialize Game Logic
function startGame() {
  console.log("Game started!");
  startGameLoop(); // Start the game loop
}

function restartGame() {
  console.log("Game reset!");
  // Reset game status here (if needed)
  startGameLoop();
}

// Buddy Object and Movement
let buddy = {
  positionX: 100,
  speed: 2,
  width: 200
};

let leftInterval = null, rightInterval = null;

// Keydown Event Listeners for Movement
window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft' && !leftInterval) {
      leftInterval = setInterval(moveBuddyLeft, 10);
  } else if (event.key === 'ArrowRight' && !rightInterval) {
      rightInterval = setInterval(moveBuddyRight, 10);
  }
});

// Keyup Event Listeners for Clearing Movement Interval
window.addEventListener('keyup', function(event) {
  if (event.key === 'ArrowLeft') {
      clearInterval(leftInterval);
      leftInterval = null;
  } else if (event.key === 'ArrowRight') {
      clearInterval(rightInterval);
      rightInterval = null;
  }
});

// Buddy Movement Functions
function moveBuddyLeft() {
  buddy.positionX = Math.max(0, buddy.positionX - buddy.speed);
  updateBuddyPosition();
}

function moveBuddyRight() {
  const gameAreaWidth = document.getElementById('game-area').offsetWidth;
  buddy.positionX = Math.min(gameAreaWidth - buddy.width, buddy.positionX + buddy.speed);
  updateBuddyPosition();
}

function updateBuddyPosition() {
  const buddyElement = document.getElementById('buddy');
  buddyElement.style.transform = `translateX(${buddy.positionX}px)`;
}

// Obstacle Movement
function moveObstacles() {
  const gameAreaHeight = document.getElementById('game-area').offsetHeight;
  const obstacles = document.querySelectorAll('.obstacle');

  obstacles.forEach(obstacle => {
      let topPosition = parseFloat(obstacle.style.top) || 0;
      topPosition += 2;  // Move down by 2 pixels

      if (topPosition > gameAreaHeight) {
          topPosition = -50; // Reset to above the visible area
      }

      obstacle.style.top = `${topPosition}px`;
  });
}

// Collision Detection Functions
function checkCollisions() {
  const buddyElement = document.getElementById('buddy');
  const obstacles = document.querySelectorAll('.obstacle');

  obstacles.forEach(obstacleElement => {
      if (didCollide(buddyElement, obstacleElement)) {
          console.log('Collision detected!');
          endGame(); // Call endGame when a collision is detected
      }
  });
}
function endGame() {
  clearInterval(gameLoop); // Clear the game loop interval
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('end-screen').classList.remove('hidden');
  console.log('Game Over!'); // Optionally log or alert game over
}

function didCollide(buddyElement, obstacleElement) {
  const buddyRect = buddyElement.getBoundingClientRect();
  const obstacleRect = obstacleElement.getBoundingClientRect();

  return (
      buddyRect.left < obstacleRect.right &&
      buddyRect.right > obstacleRect.left &&
      buddyRect.top < obstacleRect.bottom &&
      buddyRect.bottom > obstacleRect.top
  );
}

// Game Loop
let gameLoop;

function startGameLoop() {
  gameLoop = setInterval(() => {
    moveObstacles();
    checkCollisions();
  }, 20);
}

function restartGame() {
  console.log("Game reset!");

  // Reset buddy position
  buddy.positionX = 100;
  updateBuddyPosition();

  // Optionally reset obstacle positions
  const obstacles = document.querySelectorAll('.obstacle');
  obstacles.forEach(obstacle => {
    obstacle.style.top = "-50px"; // Or whatever starting position is appropriate
  });

  document.getElementById('end-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  startGameLoop();
}