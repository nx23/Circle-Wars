class Particle {
    constructor(x, y, radius, velocity, red, blue, green){
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.red = red
        this.blue = blue
        this.green = green
        this.alpha = 1
        this.friction = 0.99
    }

    draw() {
        c.beginPath()
        if(this.radius < 0){
            this.radius = 0.3
        }
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        c.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        c.stroke();
        c.fill();
    }

    update(){
        this.draw()
        this.velocity.x = this.velocity.x * this.friction
        this.velocity.y = this.velocity.y * this.friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
}