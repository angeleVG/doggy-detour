// Event listener for Start button
document.getElementById('start-button').onclick = function() {
    console.log("Start button clicked!"); // Verify the click event fires
    document.getElementById('start-screen').classList.add('hidden'); // Hide the start screen
    document.getElementById('game-screen').classList.remove('hidden'); // Show the game screen
    startGame(); // Call to start game logic
  };
  
  // Event listener for Restart button
  document.getElementById('restart-button').onclick = function() {
    console.log("Restart button clicked!"); // Log when restart is clicked
    document.getElementById('end-screen').classList.add('hidden'); // Hide the end screen
    document.getElementById('game-screen').classList.remove('hidden'); // Show the gameplay screen again
    restartGame(); // Reset the game
  };
  
  // Initialize game logic
  function startGame() {
    console.log("Game started!");
    // Additional game starting logic here...
  }
  
  // Reset game logic
  function restartGame() {
    console.log("Game reset!");
    // Additional game resetting logic here...
  }
  
  // Buddy object
  let buddy = {
    positionX: 100,
    speed: 2,
    width: 200 // Define Buddy's width for easier handling
  };
  
  let leftInterval = null, rightInterval = null;

  // Arrow key movement
  window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && !leftInterval) {
      // Start moving left if not already moving left
      leftInterval = setInterval(moveBuddyLeft, 10);
    } else if (event.key === 'ArrowRight' && !rightInterval) {
      // Start moving right if not already moving right
      rightInterval = setInterval(moveBuddyRight, 10);
    }
  });
  
  window.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
      clearInterval(leftInterval);
      leftInterval = null;
    } else if (event.key === 'ArrowRight') {
      clearInterval(rightInterval);
      rightInterval = null;
    }
  });
  
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

