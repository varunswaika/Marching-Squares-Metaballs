class Ball {
    constructor() {
        this.radius = random(20, 30);
        this.x = random(width - this.radius);
        this.y = random(height - this.radius);
        this.dx = random(-20, 20);
        this.dy = random(-20, 20);
    }

    update(speedMult = 1) {
        this.x += this.dx * speedMult;
        this.y += this.dy * speedMult;
        if (this.x > width - this.radius || this.x < this.radius) {
            this.dx *= -1;
            this.x = constrain(this.x, this.radius, width - this.radius);
        }
        if (this.y > height - this.radius || this.y < this.radius) {
            this.dy *= -1;
            this.y = constrain(this.y, this.radius, height - this.radius);
        }
    }

}