class Game {
    constructor(cannon) {
        this.startScreen = document.getElementById("game-intro")
        this.gameContainer = document.getElementById("game-container")
        this.gameScreen = document.getElementById("game-screen")
        this.endScreen = document.getElementById("game-end")    
        this.cannon = cannon
        this.width = 600
        this.height = 400
        this.helicoptersArr = []
        this.paratroopersArr = []
        this.kills = 0
        this.lives = 1
        this.gameIsOver = false
        this.gameIntervalId;
        this.gameLoopFrequency = 1000/60
        this.frames = 0
    }



    startGame() {
        // Set Width and Height for Game Screen
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`

        // On start game click display Game Screen and hide Start Screen
        this.startScreen.style.display = "none"
        this.gameContainer.style.display = "flex"

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)

    }

    gameLoop() {
        this.frames++

        if (this.frames % 600 === 0) {
            this.helicoptersArr.push(new Helicopter(this.width))

        }

        if (this.frames > 600 && this.frames % 120 == 0) {
            let randomIndex = Math.floor(Math.random() * this.helicoptersArr.length)
            this.paratroopersArr.push(this.helicoptersArr[randomIndex].dropParatrooper())
        }

        this.update()

        
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }

    }

    update() {
        this.cannon.updateProjectiles()

        this.cannon.projectiles.forEach((projectile) => {
            this.helicoptersArr.forEach((helicopter) => {
                if (this.didCollide(projectile.projectile, helicopter.helicopterEl)) {
                    console.log("COLLIDING!!!!")
                }
            })
            this.paratroopersArr.forEach((trooper) => {
                if (this.didCollide(projectile.projectile, trooper.paratrooperEl)) {
                    console.log("COLLIDING!!!!")
                }
            })
        })

        this.helicoptersArr.forEach(helicopter => {
            helicopter.updateHelicopter()
        })
        this.paratroopersArr.forEach((troop) => {
            troop.update()
        })


    }


    endGame() {
        this.gameContainer.style.display = "none"
        this.endScreen.style.display = "flex"
    }

    didCollide(projectile, obstacle) {
        const projectileRect = projectile.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
    
        if (
          projectileRect.left < obstacleRect.right &&
          projectileRect.right > obstacleRect.left &&
          projectileRect.top < obstacleRect.bottom &&
          projectileRect.bottom > obstacleRect.top
        ) {
          console.log("Colliding"); 
          return true;
        } else {
          return false;
        }
      }

}