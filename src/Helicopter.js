class Helicopter {
    constructor(gameWidth) {
        this.width = 125
        this.height = 60 
        this.gameWidth = gameWidth
        this.lives = 3

        // ! Randomly spawn the heli on either side of the screen at a random height 
        this.position = {x: Math.random() < 0.5 ? -this.width : gameWidth, y: 25 + Math.random() * 100}

        // ! Dictates the direction to move based on which side it spawned (dictated by this.position).
        this.speed = this.position.x < 0  ? 0.90 : -0.90

        this.helicopterImg = document.createElement("img")

        this.helicopterImg.src = "./images/helicopter.gif"

        this.helicopterImg.style.position = "absolute"
        this.helicopterImg.style.zIndex = "999"
        this.helicopterImg.style.width = `${this.width}px`
        this.helicopterImg.style.height = `${this.height}px`
        this.helicopterImg.style.top = `${this.position.y}px`
        this.helicopterImg.style.left = `${this.position.x}px`


        // this.speed > 0; Positive value means moving to the right, negative value means moving to the left
        this.helicopterImg.style.transform = `scaleX(${this.speed > 0 ? 1 : -1})`

        document.getElementById("game-screen").appendChild(this.helicopterImg)
    }


    updateHelicopter() {
        // console.log(this.position.x)

        // ! Update the helicopter's horizontal position by its speed to make it move

        this.position.x += this.speed
  
        // ! If the heli exits the screen on either side it will turn back

        if(this.position.x > this.gameWidth || this.position.x < -this.width) {
            // If I multiply the speed by -1 it should reverse it's direction
            this.speed *= -1

            // Make the heli element switch direction when exiting the screen
            this.helicopterImg.style.transform = `scaleX(${this.speed > 0 ? 1 : -1})`
        }

        // ? Update the position of the helicopter element

        this.helicopterImg.style.left = `${this.position.x}px`
    }

    dropParatrooper() {
        return new Paratrooper(this.position.x + 25, this.position.y + this.height)
    }

    createExplosion() {
        let explosionEl = document.createElement("img")

        explosionEl.src = "/images/explosion.gif"
        explosionEl.style.position = "absolute"
        explosionEl.style.top = `${this.position.y}px`
        explosionEl.style.left = `${this.position.x}px`
        explosionEl.style.width = `${this.width}px`
        explosionEl.style.height = `${this.height}px`

        document.getElementById("game-screen").appendChild(explosionEl)

        setTimeout(() => {
            explosionEl.remove()
        }, 750)
    }

    removeHelicopter() {
        this.helicopterImg.remove()
    }

}