class Game {
    constructor(cannon) {
        this.startScreen = document.getElementById("game-intro")
        this.gameContainer = document.getElementById("game-container")
        this.gameScreen = document.getElementById("game-screen")
        this.endScreen = document.getElementById("game-end")   
        this.gameScoreEl = document.getElementById("score-el")
        this.gameLandedEl = document.getElementById("landed-el")
        this.endScoreEl = document.getElementById("end-score")
        this.endLandedEl = document.getElementById("end-landed")

        this.cannon = cannon
        this.width = 600
        this.height = 400

        this.helicoptersArr = []
        this.paratroopersArr = []

        this.score = 0
        this.landedParatroopers = 0

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

        if (this.frames % 320 === 0) {
            this.helicoptersArr.push(new Helicopter(this.width))

        }



        // ! Before dropping, check if there are any helis in the screen and in the array.
        const safeZone = 75
        if (this.frames > 320 && this.frames % 120 === 0 && this.helicoptersArr.length > 0) {
            let randomIndex = Math.floor(Math.random() * this.helicoptersArr.length)
            let helicopter = this.helicoptersArr[randomIndex]
            // ! Check if the heli is within the game screen safe zone to avoid dropping troopers of screen or on the edge. 
            // ! Check if the center of the helicopter is more than safeZone pixels away from the left or right edge of the game screen. 
            if (helicopter.position.x + helicopter.width/2 > safeZone && helicopter.position.x + helicopter.width/2 < this.width - safeZone) {
                this.paratroopersArr.push(helicopter.dropParatrooper())
            }
        }

        this.update()

        
        if (this.landedParatroopers === 5) {
            setTimeout(() => {
                this.endGame()
                clearInterval(this.gameIntervalId)
            }, 350);
        }

    }

    update() {
        this.cannon.updateProjectiles()
        this.checkCollisions()
        this.checkLandedParatroopers()


        this.helicoptersArr.forEach(helicopter => {
            helicopter.updateHelicopter()
        })
        this.paratroopersArr.forEach((troop) => {
            troop.update()
        })


    }

    checkCollisions() {

        this.cannon.projectiles.forEach((projectile, projectileIndex) => {
            this.helicoptersArr.forEach((helicopter, helicopterIndex) => {
                if (this.didCollide(projectile.projectile, helicopter.helicopterImg)) {
                    // console.log("COLLIDING!!!!")
                    helicopter.lives--
                    console.log(helicopter.lives)
                    if (helicopter.lives === 0) {
                        this.score += 3
                        
                        helicopter.createExplosion()
                        helicopter.removeHelicopter()
                        this.helicoptersArr.splice(helicopterIndex,1)
                        
                    }
                    
                    projectile.projectile.remove()
                    this.cannon.projectiles.splice(projectileIndex,1)

                }
            })
            this.paratroopersArr.forEach((trooper, trooperIndex) => {
                if (this.didCollide(projectile.projectile, trooper.paratrooperEl) && !trooper.hasLanded) {

                    this.score += 1

                    trooper.remove()
                    this.paratroopersArr.splice(trooperIndex,1)

                    projectile.projectile.remove()
                    this.cannon.projectiles.splice(projectileIndex,1)

                }
            })
        })
        
        this.gameScoreEl.innerText = `Score: ${this.score}`
        this.gameLandedEl.innerText = `Landed: ${this.landedParatroopers}`

        this.endScoreEl.innerText = `Score: ${this.score}`
        this.endLandedEl.innerText = `Landed: ${this.landedParatroopers}`

    }

    checkLandedParatroopers() {
        // console.log("Landed!")
        this.paratroopersArr.forEach((trooper) => {
            // ! If trooper.hasLanded is true (meaning the trooper was already marked as landed), !trooper.hasLanded becomes false effectively skipping the logic. If trooper.hasLanded is false (the trooper hasn't been marked as landed yet), !trooper.hasLanded becomes true executing the logic.
            // ? "if the trooper has landed AND has not yet been marked as landed"
            if (trooper.landed() && !trooper.hasLanded) {
                trooper.paratrooperEl.src = "/images/paratrooper-landed.png"
                trooper.paratrooperEl.style.width = "20px"
                trooper.paratrooperEl.style.height = "20px"
                trooper.paratrooperEl.style.top = "365px"

                trooper.hasLanded = true
                this.landedParatroopers += 1
            }
        })
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
                return true;
            } else {
                return false;
            }
        }
        
    endGame() {
        this.gameContainer.style.display = "none"
        this.endScreen.style.display = "flex"
        console.log("GAME OVER!")
    }
}