class Paratrooper {
    constructor(x, y) {
        this.width = 10
        this.height = 20
        this.position = {x,y}
        this.dropSpeed = 1

        this.paratrooperEl = document.createElement("div")
        this.paratrooperEl.style.position = "absolute"
        this.paratrooperEl.style.width = `${this.width}px`
        this.paratrooperEl.style.height = `${this.height}px`
        this.paratrooperEl.style.backgroundColor = "green"
        this.paratrooperEl.style.top = `${this.position.y}px`
        this.paratrooperEl.style.left = `${this.position.x}px`
        document.getElementById("game-screen").appendChild(this.paratrooperEl)
    }

    update() {
        this.position.y += this.dropSpeed
        this.paratrooperEl.style.top = `${this.position.y}px`
    }

    landed() {
        return this.position.y >= 360
    }

    remove() {
        this.paratrooperEl.remove()
    }
}