const canvas = document.getElementById('game')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Game {
    constructor() {
        this.player = new Player(canvas.width/2, canvas.height/2, 15, "white")
        this.projectiles = []
        this.enemies = []
        this.particles = []
        this.animationId
        this.lose = false
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
    
    movePlayer(event) {
        if (event.code === "KeyW") {
            this.player.moveUp()
        }
        if (event.code === "KeyA") {
            this.player.moveLeft()
        }
        if (event.code === "KeyS") {
            this.player.moveDown()
        }
        if (event.code === "KeyD") {
            this.player.moveRight()
        }
    }
        
}

const game = new Game()

function animate() {
    game.animationId = requestAnimationFrame(animate)
    c.fillStyle = "rgb(0, 0, 0, 0.05)"
    c.fillRect(0, 0, canvas.width, canvas.height)
    game.player.draw()
    game.particles.forEach((particle, particleIndex) => {
        particle.update()
        gsap.to(particle, {
            radius: particle.radius - 0.1
        })
        if(particle.radius < 0.5){
            setTimeout(() => {
                game.particles.splice(particleIndex, 1)
            }, 0)
        }
    })
    game.projectiles.forEach((projectile, projectileIndex) => {
        projectile.update()
        // despawn projectile when out of the screen
        if(
            projectile.x + projectile.radius < 0
            || projectile.x - projectile.radius > canvas.width 
            || projectile.y + projectile.radius < 0
            || projectile.y - projectile.radius > canvas.height
        ) {
            setTimeout(() => {
                game.projectiles.splice(projectileIndex, 1)
            }, 0)
        }
    })

    game.enemies.forEach((enemy, enemeyIndex) => {
        enemy.update()
        // despawn enemy
        if(enemy.x - enemy.radius> canvas.width & enemy.y - enemy.radius > canvas.height) {
            setTimeout(() => {
                enemies.splice(enemy, 1)
            }, 0)
        }
        // end game
        const dist = Math.hypot(game.player.x - enemy.x, game.player.y - enemy.y)
        if (dist - enemy.radius - game.player.radius < 1) {
            cancelAnimationFrame(game.animationId)
            game.lose = true
        }
        // projectile colision
        game.projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (dist - enemy.radius - projectile.radius < 1) {
                // create particles when hit the enemy
                for (let index = 0; index < 10; index++) {
                    game.particles.push(new Particle(
                        projectile.x,
                        projectile.y,
                        2,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * 5),
                            y: (Math.random() - 0.5) * (Math.random() * 5)
                        },
                        enemy.red, enemy.blue, enemy.green
                    ))
                }
                if (enemy.radius - 10 > 5) {
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                        game.projectiles.splice(projectileIndex, 1)
                } else {
                        game.enemies.splice(enemeyIndex, 1)
                        game.projectiles.splice(projectileIndex, 1)
                }
            }
        })
    })
}


// shooting
addEventListener('click', (event) => {
    game.player.shoot(event.clientX, event.clientY)
})

addEventListener('keyup', (event) => {
    // refill magazine
    if (event.code === "Space"){
        game.player.refillMagazine()
    }
})

addEventListener('keydown', (event) => {
    if (!game.lose) {
        game.movePlayer(event)
    }
})

animate()
game.spawnEnemy()
