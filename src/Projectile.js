class Projectile {
    constructor (angle) {
        this.projectile = document.createElement('div')
        this.gameScreen = document.getElementById("game-screen")
        this.projectile.style.width = '25px'
        this.projectile.style.height = '25px'
        this.angle = angle * (Math.PI / 180)
        this.top = 370
        this.left = 300
        this.xVelocity = Math.cos(angle)
        this.yVelocity = Math.sin(angle)
        this.projectile.style.top = `${this.top}px`
        this.projectile.style.left = `${this.left}px`
        this.projectile.style.position = 'absolute'
        this.projectile.style.backgroundColor = 'black'
        this.projectile.id = 'projectile'
        this.projectile.style.zIndex = 99
        this.gameScreen.appendChild(this.projectile)
    }

    udpatePosition() {

        console.log("Updating projectile", this)

        this.left += this.xVelocity 
        this.top += this.yVelocity 
        this.projectile.style.top = `${this.top}px`
        this.projectile.style.left = `${this.left}px`
    }
}