class Enemy {
    constructor(x, y, radius, velocity, red, blue, green){
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.red = red;
        this.blue = blue;
        this.green = green;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, 1)`;
        c.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, 1)`;
        c.stroke();
        c.fill();
    }

    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}