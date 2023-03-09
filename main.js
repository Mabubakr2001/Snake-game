import theFood from "./food.js";
import theSnake from "./snake.js";

let lastTime = 0;
let gameOver = false;

// Update loop
function runTheGame(currentTime) {
  if (gameOver) return finishGame();

  window.requestAnimationFrame(runTheGame);

  const delta = (currentTime - lastTime) / 1000;
  if (delta < 1 / theSnake.speed) return;

  lastTime = currentTime;

  mainUpdate();
  mainDraw();
}

function mainDraw() {
  theSnake.draw();
  theFood.draw();
}

function mainUpdate() {
  theSnake.update();
  theFood.update();
  checkLose();
}

function checkLose() {
  const snakeHead = theSnake.bodySegments[0];
  if (
    snakeHead.xAxis > 30 ||
    snakeHead.xAxis < 1 ||
    snakeHead.yAxis > 30 ||
    snakeHead.yAxis < 1
  ) {
    gameOver = true;
  }

  for (let i = 1; i < theSnake.bodySegments.length; i++) {
    if (
      theSnake.bodySegments[i].xAxis === snakeHead.xAxis &&
      theSnake.bodySegments[i].yAxis === snakeHead.yAxis
    ) {
      gameOver = true;
    }
  }
}

function finishGame() {
  const gameOverElement = document.createElement("div");
  gameOverElement.classList.add("game-over");
  gameOverElement.textContent = "Game over";
  document
    .querySelector(".game-container")
    .insertAdjacentElement("beforeend", gameOverElement);
}

window.requestAnimationFrame(runTheGame);
