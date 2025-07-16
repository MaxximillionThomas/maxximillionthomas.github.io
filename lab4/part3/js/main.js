// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  // Instantiate the bouncy ball object
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // Draw the ball onto the screen 
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Update the ball's position (& velocity after it hits window boundaries)
  update() {
    // Check position relative to left/right boundaries
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    // Check position relative to top/bottom boundaries
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    // Update position 
    this.x += this.velX;
    this.y += this.velY;
  }

  // Change ball colors when they make contact
  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Create new array of balls
const balls = [];
// Randomize 25 unique balls and add them to the array
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // Ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );
  // Add the ball to the array
  balls.push(ball);
}

// Create a loop to automatically draw the canvas and it's balls, refreshing with each update
function loop() {
  // Draw the canvas
  ctx.fillStyle = "rgb(0 0 0 / 37%)";
  ctx.fillRect(0, 0, width, height);
  // Draw the balls
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }
  // Refresh the canvas
  requestAnimationFrame(loop);
}

// Call the canvas and balls for visualization
loop();

