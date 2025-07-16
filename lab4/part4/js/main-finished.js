// ###############    GENERAL    ###############
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
  update() {
    // Establish bounce-back and size reduction amounts
    const BOUNCE = 5;
    const REDUCTION = 1;

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
    size
  );
  // Add the ball to the array
  balls.push(ball);
}

// Create a loop to automatically draw the canvas and it's balls, refreshing with each update
function loop() {
  // Draw the canvas
  ctx.fillStyle = "rgba(0, 0, 0, 0.37)";  
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


// ###############    EXECUTION    ###############
// Call the canvas and balls for visualization
loop();

