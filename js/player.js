// player.js
class Player {
    constructor() {
      this.positionX = 100;
      this.speed = 5;
      this.width = 200;
      this.element = document.getElementById('buddy');
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
      this.element.style.transform = `translateX(${this.positionX}px)`;
    }
}