// Start and Restart Game Handlers
document.getElementById('start-button').addEventListener('click', () => {
  console.log("Start button clicked!");
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  startGame();
});

document.getElementById('restart-button').addEventListener('click', () => {
  console.log("Restart button clicked!");
  document.getElementById('end-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  restartGame();
});

// Buddy Object and Movement
const buddy = {
  positionX: 100,
  speed: 5,
  width: 200
};

let leftInterval = null, rightInterval = null;

// Keydown Event Listeners for Movement
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && !leftInterval) {
    leftInterval = setInterval(moveBuddyLeft, 10);
  } else if (event.key === 'ArrowRight' && !rightInterval) {
    rightInterval = setInterval(moveBuddyRight, 10);
  }
});

// Keyup Event Listeners for Clearing Movement Interval
window.addEventListener('keyup', (event) => {
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
  document.getElementById('buddy').style.transform = `translateX(${buddy.positionX}px)`;
}

// Obstacle Movement & Collision Detection
function moveObstacles() {
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

function checkCollisions() {
  const buddyElement = document.getElementById('buddy');
  document.querySelectorAll('.obstacle').forEach(obstacleElement => {
    if (didCollide(buddyElement, obstacleElement)) {
      console.log('Collision detected!');
      endGame();
    }
  });
}

function didCollide(buddyElement, obstacleElement) {
  const buddyRect = buddyElement.getBoundingClientRect();
  const obstacleRect = obstacleElement.getBoundingClientRect();
  const minOverlap = 20; // collides with slight overlap for a natural look

  return (
    buddyRect.left < obstacleRect.right - minOverlap &&
    buddyRect.right > obstacleRect.left + minOverlap &&
    buddyRect.top < obstacleRect.bottom - minOverlap &&
    buddyRect.bottom > obstacleRect.top + minOverlap
  );
}

// Game Loop using requestAnimationFrame
let gameRunning = false;

function gameLoop() {
  if (!gameRunning) return;
  moveObstacles();
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

function updateScore() { //
  if (!gameRunning || !startTime) return; // Ensure startTime is set
  let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById('time').textContent = `Time: ${elapsedTime}s`;
}

let scoreInterval; //

// start game
function startGame() {
  console.log("Game started!");
  startTime = Date.now();
  gameRunning = true;

  // Start updating score every second
  if (scoreInterval) clearInterval(scoreInterval); // Clear any existing interval
  scoreInterval = setInterval(updateScore, 1000);

  gameLoop();

}

function endGame() {
  gameRunning = false;
  let elapsedTime = Math.floor((Date.now() - startTime) / 1000); //
  document.getElementById('final-score').textContent = `You kept Buddy safe for ${elapsedTime}s!`; //
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('end-screen').classList.remove('hidden');
  console.log('Game Over!');
}

// Reset Game State
function restartGame() {
  console.log("Game reset!");
  document.getElementById('time').textContent = 'Time: 0s'; // set time at 0
  document.getElementById('final-score').textContent = '0'; //
  buddy.positionX = 100;
  updateBuddyPosition();

  document.querySelectorAll('.obstacle').forEach(obstacle => {
    obstacle.style.top = "-50px";
  });

  document.getElementById('end-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  gameRunning = false; // Stop old game loop
  clearInterval(scoreInterval);  //
  startGame();
  
}

// Initialize obstacle positions on DOM load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.obstacle').forEach(obstacle => {
    obstacle.style.top = '-50px';
  });
});
