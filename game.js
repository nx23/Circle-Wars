class Game {
    constructor() {
        this.player = new Player(canvas.width/2, canvas.height/2, 15, "white")
        this.projectiles = []
        this.enemies = []
        this.particles = []
        this.animationId
        this.lose = false
        this.movement = {up: 0, left: 0, down: 0, right: 0}

    }
    
    spawnEnemy() {
        setInterval(() => {
            const radius = Math.random() * (50 - 10) + 10
            let x
            let y
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius :canvas.width + radius
                y = Math.random() * (canvas.height + radius)
            } else {
                x = Math.random() * (canvas.width + radius)
                y = Math.random() < 0.5 ? 0 - radius :canvas.height + radius
            }
            const red = Math.random() * 220;
            const blue = Math.random() * 220;
            const green = Math.random() * 220;
            const angle = Math.atan2(
                this.player.y - y,
                this.player.x - x
            )
    
            const velocity = {
                x: Math.cos(angle) / (radius / 5),
                y: Math.sin(angle) / (radius / 5)
            }
    
            this.enemies.push(new Enemy(x, y, radius, velocity, red, blue, green))
        }, 1000)
    }
    
    movePlayer(event, move) {
        if(move) {
            if (event.key === "w") {
                this.movement.up = -5
            }
            if (event.key === "a") {
                this.movement.right = -5
            }
            if (event.key === "s") {
                this.movement.down = 5
            }
            if (event.key === "d") {
                this.movement.left = 5
            }
        } else {
            if (event.key === "w") {
                this.movement.up = -1
            }
            if (event.key === "a") {
                this.movement.right = -1
            }
            if (event.key === "s") {
                this.movement.down = 1
            }
            if (event.key === "d") {
                this.movement.left = 1
            }
        }
        console.log(this.movement)
        this.player.move(this.movement)
    }
        
}
