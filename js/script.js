// script.js 

document.addEventListener('DOMContentLoaded', () => { 

  // Maak nieuwe instanties van Player en Game 

  const player = new Player(); 
  const game = new Game(); 

 

  // Start game 

  document.getElementById('start-button').addEventListener('click', () => { 

    console.log("Start button clicked!"); 

    document.getElementById('start-screen').classList.add('hidden'); 

    document.getElementById('game-screen').classList.remove('hidden'); 

    game.startGame(); 

  }); 

   // Restart game 

   document.getElementById('restart-button').addEventListener('click', () => { 

    console.log("Restart button clicked!"); 

    document.getElementById('end-screen').classList.add('hidden'); 

    document.getElementById('game-screen').classList.remove('hidden'); 

    game.restartGame(); 

  }); 

  // movements of player

  let leftInterval = null; 

  let rightInterval = null; 

 

  window.addEventListener('keydown', (event) => { 

    if (event.key === 'ArrowLeft' && !leftInterval) { 

      leftInterval = setInterval(() => player.moveLeft(), 10); 
    } else if (event.key === 'ArrowRight' && !rightInterval) { 

      rightInterval = setInterval(() => player.moveRight(), 10); 

    } 

  }); 

  window.addEventListener('keyup', (event) => { 

    if (event.key === 'ArrowLeft') { 

      clearInterval(leftInterval); 

      leftInterval = null; 

    } else if (event.key === 'ArrowRight') { 

      clearInterval(rightInterval); 

      rightInterval = null; 

    } 

  }); 

}); 