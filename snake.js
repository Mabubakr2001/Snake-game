class Snake {
  parentElement = document.querySelector(".game-container");
  speed = 12;
  expantionRate = 1;
  #bodySegments = [{ xAxis: 15, yAxis: 15 }];
  direction = { xAxis: 0, yAxis: 0 };

  constructor() {
    this.getInputFromUser();
  }

  getInputFromUser() {
    window.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "ArrowUp":
          if (this.direction.yAxis === 1) break; // If I clicked down arrow before
          this.direction = { xAxis: 0, yAxis: -1 };
          break;
        case "ArrowDown":
          if (this.direction.yAxis === -1) break; // If I clicked up arrow before
          this.direction = { xAxis: 0, yAxis: 1 };
          break;
        case "ArrowRight":
          if (this.direction.xAxis === -1) break; // If I clicked left arrow before
          this.direction = { xAxis: 1, yAxis: 0 };
          break;
        case "ArrowLeft":
          if (this.direction.xAxis === 1) break; // If I clicked right arrow before
          this.direction = { xAxis: -1, yAxis: 0 };
          break;
      }
    });
  }

  draw() {
    this.parentElement.innerHTML = "";
    this.#bodySegments.forEach((segment) => {
      const snakeSegmentElement = document.createElement("div");
      snakeSegmentElement.classList.add("snake");
      snakeSegmentElement.style.gridRowStart = segment.yAxis;
      snakeSegmentElement.style.gridColumnStart = segment.xAxis;
      this.parentElement.insertAdjacentElement(
        "beforeend",
        snakeSegmentElement
      );
    });
  }

  update() {
    for (let i = this.#bodySegments.length - 2; i >= 0; i--) {
      this.#bodySegments[i + 1] = { ...this.#bodySegments[i] }; // The teil takes the position of the previous segment
    }

    // Update the head based on where we're moving
    this.#bodySegments[0].xAxis += this.direction.xAxis;
    this.#bodySegments[0].yAxis += this.direction.yAxis;
  }

  expand() {
    for (let i = 0; i < this.expantionRate; i++) {
      this.#bodySegments.push({
        ...this.#bodySegments[this.#bodySegments.length - 1],
      });
    }
  }

  get bodySegments() {
    return this.#bodySegments;
  }
}

export default new Snake();
