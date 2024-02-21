class Paratrooper {
    constructor(x, y) {
        this.width = 40
        this.height = 40
        this.position = {x,y}
        this.dropSpeed = 0.5

        // Check if trooper has landed
        this.hasLanded = false

        this.paratrooperEl = document.createElement("img")
        this.paratrooperEl.src = "/images/paratrooper.png"
        this.paratrooperEl.style.position = "absolute"
        this.paratrooperEl.style.width = `${this.width}px`
        this.paratrooperEl.style.height = `${this.height}px`
        // this.paratrooperEl.style.backgroundColor = "rgb(0, 255, 0)"
        this.paratrooperEl.style.top = `${this.position.y}px`
        this.paratrooperEl.style.left = `${this.position.x}px`
        this.paratrooperEl.style.zIndex = 999
        document.getElementById("game-screen").appendChild(this.paratrooperEl)
    }

    update() {
        // If the paratrooper top postition is less than or equal to 376.9 keep descending.
        // Once the paratrooper reaches 376.9px from the top, stop it's decent.
        if (!this.landed()) {
            this.position.y += this.dropSpeed
            this.paratrooperEl.style.top = `${this.position.y}px`
        }
    }

    landed() {
        return this.position.y >= 355
    }

    remove() {
        this.paratrooperEl.remove()
    }
}