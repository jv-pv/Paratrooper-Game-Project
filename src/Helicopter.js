class Helicopter {
    constructor(gameWidth) {
        this.width = 60
        this.height = 30
        this.gameWidth = gameWidth

        // ! Randomly spawn the heli on either side of the screen at a random height 
        this.position = {x: Math.random() < 0.5 ? -this.width : gameWidth, y: 25 + Math.random() * 100}

        // ! Dictates the direction to move based on wich side it spawned (dictated by this.position).
        this.speed = this.position.x < 0  ? 1.25 : -1.25

        this.helicopterEl = document.createElement("div")
        this.helicopterEl.style.position = "absolute"
        this.helicopterEl.style.width = `${this.width}px`
        this.helicopterEl.style.height = `${this.height}px`
        this.helicopterEl.style.backgroundColor = "gray"
        this.helicopterEl.style.top = `${this.position.y}px`
        this.helicopterEl.style.left = `${this.position.x}px`
        document.getElementById("game-screen").appendChild(this.helicopterEl)
    }


    updateHelicopter() {
        // console.log(this.position.x)

        // ! Update the helicopter's horizontal position by its speed to make it move

        this.position.x += this.speed
  
        // ! If the heli exits the screen on either side it will turn back

        if(this.position.x > this.gameWidth || this.position.x < -this.width) {
            // If I multiply the speed by negative one it should reverse it's direction
            this.speed *= -1
        }

        // ? Update the position of the helicopter element

        this.helicopterEl.style.left = `${this.position.x}px`
    }

    dropParatrooper() {
        return new Paratrooper(this.position.x + 25, this.position.y + this.height)
    }

    removeHelicopter() {
        this.helicopterEl.remove()
    }

}