class Frogger {
  constructor() {
    this.spriteWidth = 250;
    this.spriteHeight = 250;
    this.width = this.spriteWidth / 5;
    this.height = this.spriteHeight / 5;
    this.x = canvas1.width / 2 - this.width / 2;
    this.y = canvas1.height / 2 - this.height / 2;
    this.moving = false;
    this.frameX = 0;
    this.frameY = 0;
  }

  update() {
    if (keys['ArrowUp']) {
      if (!this.moving) {
        this.y -= grid;
        this.moving = true;
        this.frameX = 1;
        this.frameY = 0;
      }
    } else if (keys['ArrowDown']) {
      if (!this.moving && this.y < canvas1.height - this.height * 2) {
        this.y += grid;
        this.moving = true;
        this.frameY = 3;
      }
    } else if (keys['ArrowLeft']) {
      if (!this.moving && this.x > this.width) {
        this.x -= grid;
        this.moving = true;
        this.frameY = 2;
      }
    } else if (keys['ArrowRight']) {
      if (!this.moving && this.x < canvas1.width - this.width * 2) {
        this.x += grid;
        this.moving = true;
        this.frameY = 1;
      }
    }

    if (this.y < 0) scored();
  }

  draw() {
    ctx4.drawImage(
      froggerSprite,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 25,
      this.y - 25,
      this.width * 2,
      this.height * 2
    );
  }

  jump() {
    if (this.moving == false) this.frameX = 1;
    else if (this.frameX === 1) {
      this.frameX = 0;
    }
  }
}

const frogger = new Frogger();
