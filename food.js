import theSnake from "./snake.js";

const userScore = document.querySelector(".score");

class Food {
  parentElement = document.querySelector(".game-container");
  parentSize = 30;
  position = this.getRandomPosition();

  draw() {
    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridRowStart = this.position.yAxis;
    foodElement.style.gridColumnStart = this.position.xAxis;
    this.parentElement.insertAdjacentElement("beforeend", foodElement);
  }

  update() {
    if (this.checkCollisionWithSnake()) {
      this.position = this.getRandomPosition();
      userScore.textContent = parseInt(userScore.textContent) + 1;
      theSnake.expand();
    }
  }

  getRandomPosition() {
    return {
      xAxis: Math.floor(Math.random() * this.parentSize) + 1,
      yAxis: Math.floor(Math.random() * this.parentSize) + 1,
    };
  }

  checkCollisionWithSnake() {
    return theSnake.bodySegments.some((segment) => {
      return (
        segment.xAxis === this.position.xAxis &&
        segment.yAxis === this.position.yAxis
      );
    });
  }
}

export default new Food();
