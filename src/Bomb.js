class Bomb {
    constructor(x, y) {
        this.width = 60
        this.height = 19
        this.position = {x,y}
        this.dropSpeed = 0.4

        // Check if trooper has landed
        this.hasLanded = false

        this.bombEl = document.createElement("img")
        this.bombEl.src = "/images/jet-bomb.gif"
        this.bombEl.style.position = "absolute"
        this.bombEl.style.width = `${this.width}px`
        this.bombEl.style.height = `${this.height}px`
        // this.bombEl.style.backgroundColor = "rgb(0, 255, 0)"
        this.bombEl.style.transform = "rotate(90deg)"
        this.bombEl.style.top = `${this.position.y}px`
        this.bombEl.style.left = `${this.position.x}px`
        this.bombEl.style.zIndex = "9999"
        document.getElementById("game-screen").appendChild(this.bombEl)
    }

    update() {
        // ? If this.landed is true (meaning the trooper has landed) flip to boolean false and skip the logic to stop it's descent. If this.landed is false (meaning the trooper is still in the air) flip the boolean to true and continue droppping.
        if (!this.landed()) {
            this.position.y += this.dropSpeed
            this.bombEl.style.top = `${this.position.y}px`
        }
    }

    landed() {
        return this.position.y >= 349
    }

    explodeBomb() {

        let explosionEl = document.createElement("img")

        explosionEl.src = "/images/explosion.gif"
        explosionEl.style.width = `125px`
        explosionEl.style.height = `60px`
        explosionEl.style.position = "absolute"
        explosionEl.style.top = `${this.position.y}px`
        explosionEl.style.left = `${this.position.x}px`

        document.getElementById("game-screen").appendChild(explosionEl)

        setTimeout(() => {
            explosionEl.remove()
        }, 1000)

    }

    remove() {
        this.bombEl.remove()
    }
}