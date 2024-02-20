class Helicopter {
    constructor(gameWidth) {
        this.width = 60
        this.height = 30
        this.gameWidth = gameWidth
        this.position = {x: Math.random() < 0.5 ? -this.width : gameWidth, y: 50}
        this.speed = this.position.x < 0  ? 2 : -2

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
        this.position.x += this.speed
        if(this.position.x > this.gameWidth || this.position.x < -this.width) {
            this.speed *= -1
        }
        this.helicopterEl.style.left = `${this.position.x}px`
    }

    dropParatrooper() {
        return new Paratroopers(this.position.x, this.position.y + this.height)
    }

    removeHelicopter() {
        this.helicopterEl.remove()
    }

}