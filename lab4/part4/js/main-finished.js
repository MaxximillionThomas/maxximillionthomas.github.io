// ================================================
// ===============    ATTRIBUTES    =============== 
// ================================================

// Canvas setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Number of balls
const STARTING_BALLS = 50;
let ballCount = STARTING_BALLS;
const BALL_COUNT_DISPLAY = document.querySelector("p");

// Winning / losing the game
const WIN_LOSE_MESSAGE = document.querySelector("div");

// ================================================
// =============    BASE FUNCTIONS    ============= 
// ================================================

// Generate a random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// ================================================
// ================    CLASSES    =================
// ================================================

// ###############    SHAPE    ###############
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// ###############    EVIL CIRCLE    ###############
class EvilCircle extends Shape {
  // Instantiate the evil circle object
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "rgb(255, 255, 255)";
    this.size = 10;
    this.exists = true;

    // Allow movement of the cirle with WASD keys
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  // Draw the circle onto the screen 
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Update the circle's position (& velocity after it hits window boundaries)
  checkBounds() {
    // Establish bounce-back and size reduction amounts
    const BOUNCE = 20;
    const REDUCTION = .5;

    // Check position relative to left/right boundaries
    if (this.x + this.size >= width) {
      this.x -= BOUNCE;
      this.size -= REDUCTION;
    }

    if (this.x - this.size <= 0) {
      this.x += BOUNCE;
      this.size -= REDUCTION;
    }

    // Check position relative to top/bottom boundaries
    if (this.y + this.size >= height) {
      this.y -= BOUNCE;
      this.size -= REDUCTION;
    }

    if (this.y - this.size <= 0) {
      this.y += BOUNCE;
      this.size -= REDUCTION;
    }

    // Player loses if size drops to 0
    if (this.size <= 0) {
      this.exists = false;
    }
  }

  // Interact with balls
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          ballCount -= 1;
        }
      }
    }
  }
}

// ###############    BALL    ###############
class Ball extends Shape {
  // Instantiate the bouncy ball object
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
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
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    // Check position relative to top/bottom boundaries
    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    // Update position 
    this.x += this.velX;
    this.y += this.velY;
  }

  // Change ball colors when they make contact
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
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

// ================================================
// ===========    ADVANCED FUNCTION   =============
// ================================================

// ###############    LOOP    ###############
// Automatically refresh the canvas, evil cirlce and balls
function loop() {
  // Draw the canvas
  ctx.fillStyle = "rgba(0, 0, 0, 0.37)";  
  ctx.fillRect(0, 0, width, height);

  // Draw the evil cirle
  if (circle.exists) {
    circle.draw();
    circle.update();
    circle.collisionDetect();
  } else {
    // Circle has shrunk too much - player loses
    WIN_LOSE_MESSAGE.setAttribute("class", "GamerOver");
    WIN_LOSE_MESSAGE.textContent = "You lose! That's too bad :(";
    WIN_LOSE_MESSAGE.style.backgroundColor = "rgba(194, 74, 4, 1)";
    WIN_LOSE_MESSAGE.style.borderColor = "rgba(194, 29, 4, 1)";
  }

  // Draw the balls
  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }
  
  // Display the ball count
  BALL_COUNT_DISPLAY.textContent = "Ball count: " + ballCount;

  if (ballCount == 0) {
    WIN_LOSE_MESSAGE.setAttribute("class", "GamerOver");
    WIN_LOSE_MESSAGE.textContent = "You win, congratulations!!!";
  }

  // Refresh the canvas
  requestAnimationFrame(loop);
}

// ================================================
// ===============    EXECUTION   =================
// ================================================

// Create new array of balls
const balls = [];

// Randomize x number of unique balls 
while (balls.length < STARTING_BALLS) {
  const size = random(10, 20);
  const ball = new Ball(
    // Ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  // Add the ball to the array
  balls.push(ball);
}

// Create the evil circle
const circle = new EvilCircle(width / 2, height / 2);

// Give life to the canvas and it's objects
loop();

