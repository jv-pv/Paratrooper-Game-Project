class Paratrooper {
    constructor(x, y) {
        this.width = 40
        this.height = 40
        this.position = {x,y}
        this.dropSpeed = 0.6

        // Check if trooper has landed
        this.hasLanded = false

        this.paratrooperEl = document.createElement("img")
        this.paratrooperEl.id = "paratrooper"
        this.paratrooperEl.src = "/images/paratrooper.png"
        this.paratrooperEl.style.position = "absolute"
        this.paratrooperEl.style.width = `${this.width}px`
        this.paratrooperEl.style.height = `${this.height}px`
        // this.paratrooperEl.style.backgroundColor = "rgb(0, 255, 0)"
        this.paratrooperEl.style.top = `${this.position.y}px`
        this.paratrooperEl.style.left = `${this.position.x}px`
        this.paratrooperEl.style.zIndex = 9
        document.getElementById("game-screen").appendChild(this.paratrooperEl)
    }

    update(deltaTime) {
        // Use deltaTime to adjust drop speed
        if (!this.landed()) {
            this.position.y += this.dropSpeed * (deltaTime / 16.67);
            this.paratrooperEl.style.top = `${this.position.y}px`;
        }
    }

    landed() {
        return this.position.y >= 355
    }

    explodeTrooper() {

        let explosionEl = document.createElement("img")

        explosionEl.src = "/images/splatter.gif"
        explosionEl.style.width = `${this.width}px`
        explosionEl.style.height = `${this.height}px`
        explosionEl.style.position = "absolute"
        explosionEl.style.top = `${this.position.y}px`
        explosionEl.style.left = `${this.position.x}px`

        document.getElementById("game-screen").appendChild(explosionEl)

        setTimeout(() => {
            explosionEl.remove()
        }, 1000)

    }

    remove() {
        this.paratrooperEl.remove()
    }
}