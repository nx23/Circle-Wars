class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.powerups = 1
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    shoot(x, y) {
        const angle = Math.atan2(
            y - this.y,
            x - this.x
        )
        for (let index = 0; index < this.powerups; index++) {
            const velocity = {
                x: Math.cos(angle) * 6 - index / 10,
                y: Math.sin(angle) * 6 - index / 10
            }
            game.projectiles.push(new Projectile(
                this.x, this.y, 5, "red", velocity
            ))
        }
    }

    move(movement) {
        this.x += movement.left + movement.right
        this.y += movement.up + movement.down
        this.draw()
    }
}
