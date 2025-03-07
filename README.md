
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Doggy Detour</h1>
Guide Buddy through a park while avoiding hazards. Use the left and right arrow keys to dodge obstacles. If Buddy hits an obstacle, the game ends and reveals your score based on the time you kept Buddy safe. 

<ul>
    <li>Objective: Avoid obstacles to extend your walk with Buddy</li>
    <li>Controls: Arrow keys for left and right movement </li>
</ul>  
 <h2>MVP</h2>
<ol>
<li>Simple game</li>
<li>Using best practices</li>
<li>Single page (Only one HTML file)</li>
<li>Minimum 3 screens that you hide and show with DOM Manipulation</li>
<li>Win/Lose Logic</li>
<li>Basic HTML + CSS</li>
<li>OOP (at least 2 classes are required)</li>
<li>At least one commit per class day</li>
<li>Bonus: audio when collision has occurred</li>
</ol>
<h2>Backlog</h2>
<ul>
<li>Introduce extra obstacles that vary in speed to increase the difficultness </li>
<li>Develop "good" obstacles that replenish Buddy's health when collected 
</li>
<li>Add a health bar that increases by +1 each time Buddy collects a "good” obstacle 
</li>
<li>Enhance the visual quality of Buddy, the obstacles, and the background to create an attractive game experience 
</li>
<li>Allow players to move Buddy also forward and backward using arrow keys 
</li>
<li>Redesign the game for mobile, ensuring responsive design and touch control 
</li>
</ul>
<h2>Data structure</h2>
<h3>1. Player Class</h3>
<p><strong>Description:</strong> Handles the player's movement within the game area.</p>
    <p><strong>Methods:</strong></p>
    <ul>
        <li><code>moveLeft()</code></li>
        <li><code>moveRight()</code>:</li>
        <li><code>updatePosition()</code></li>
           </ul>
      <h3>2. Game Class</h3>
    <p><strong>Description:</strong> Manages the core logic of the game, including the game state, player, obstacles, score, and interactions.</p>
    <p><strong>Methods:</strong></p>
    <ul>
      <li><code>moveObstacles()</code></li>
        <li><code>checkCollisions()</code></li>
        <li><code>didCollide(buddyElement, obstacleElement)</code></li>
        <li><code>gameLoop()</code></li>
        <li><code>updateScore()</code></li>
        <li><code>startGame()</code></li>
        <li><code>displayScores()</code></li>
        <li><code>endGame()</code></li>
        <li><code>restartGame()</code></li>
        <li><code>initializeObstacles()</code></li>
    </ul>
<h2>Links</h2>
<ul>
    <li><a href="https://trello.com/b/oMJCODUN/project-1-the-game">Trello board</a></li>
    <li><a href="https://docs.google.com/presentation/d/152ZueACfC_cCtdzoN6DTQVhHMFFJVhjhrLyc1oAarlo/edit?usp=sharing">Slides link</a></li>
    <li><a href="https://github.com/angeleVG/doggy-detour">Github repository</a></li>
    <li><a href="https://angelevg.github.io/doggy-detour">Deployment link</a></li>
</ul>
</body>
</html>