class Jet {
    constructor(gameWidth) {
        this.width = 65
        this.height = 25  
        this.gameWidth = gameWidth
        this.lives = 4

        // ! Randomly spawn the jets on either side of the screen at a random height 
        this.position = {x: Math.random() < 0.5 ? -this.width : gameWidth, y: 10 + Math.random() * 20}

        // ! Dictates the direction to move based on which side it spawned (dictated by this.position).
        this.speed = this.position.x < 0  ? 1.1 : -1.1

        this.jetImg = document.createElement("img")

        this.jetImg.src = "./images/jet.gif"

        this.jetImg.style.position = "absolute"
        this.jetImg.style.zIndex = "999"
        this.jetImg.style.width = `${this.width}px`
        this.jetImg.style.height = `${this.height}px`
        this.jetImg.style.top = `${this.position.y}px`
        this.jetImg.style.left = `${this.position.x}px`


        // this.speed > 0; Positive value means moving to the right, negative value means moving to the left
        this.jetImg.style.transform = `scaleX(${this.speed > 0 ? 1 : -1})`

        document.getElementById("game-screen").appendChild(this.jetImg)
    }


    updateJet() {
        // console.log(this.position.x)

        // ! Update the jet's horizontal position by its speed to make it move

        this.position.x += this.speed
  
        // ! If the jet exits the screen on either side it will turn back

        if(this.position.x > this.gameWidth || this.position.x < -this.width) {
            // If I multiply the speed by -1 it should reverse it's direction
            this.speed *= -1

            // Make the jet element switch direction when exiting the screen
            this.jetImg.style.transform = `scaleX(${this.speed > 0 ? 1 : -1})`
        }

        // ? Update the position of the jet element

        this.jetImg.style.left = `${this.position.x}px`
    }

    dropBomb() {
        return new Bomb(this.position.x, this.position.y + this.height)
    }

    createExplosion() {
        let explosionEl = document.createElement("img")

        explosionEl.src = "/images/explosion.gif"
        explosionEl.style.position = "absolute"
        explosionEl.style.top = `${this.position.y}px`
        explosionEl.style.left = `${this.position.x}px`
        explosionEl.style.width = `125px`
        explosionEl.style.height = `60px`

        document.getElementById("game-screen").appendChild(explosionEl)

        setTimeout(() => {
            explosionEl.remove()
        }, 1000)
    }

    removeJet() {
        this.jetImg.remove()
    }

}