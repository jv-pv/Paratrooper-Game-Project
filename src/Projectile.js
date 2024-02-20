class Projectile {
    constructor (angle) {
        this.projectile = document.createElement('div')
        this.gameScreen = document.getElementById("game-screen")
        this.top = 370
        this.left = 300

        const projectileVelocity = 5
        this.angle = angle * (Math.PI / 180)
        this.xVelocity = Math.cos(this.angle) * projectileVelocity
        this.yVelocity = Math.sin(this.angle) * projectileVelocity
        this.projectile.style.width = '15px'
        this.projectile.style.height = '15px'
        this.projectile.style.top = `${this.top}px`
        this.projectile.style.left = `${this.left}px`
        this.projectile.style.position = 'absolute'
        this.projectile.style.backgroundColor = 'black'
        this.projectile.style.borderRadius = "50%"
        this.projectile.id = 'projectile'
        this.projectile.style.zIndex = 99
        this.gameScreen.appendChild(this.projectile)
    }

   

    updatePosition() {

        console.log("Updating projectile", this)

        this.left += this.xVelocity 
        this.top -= this.yVelocity 
        this.projectile.style.left = `${this.left}px`
        this.projectile.style.top = `${this.top}px`
    }
}


// CSS Tranform Rotate 0deg points updwards, but in trig 0 deg points to the right, 90 deg up, and 180 to the left?
// maybe converting to match how angles are used in trig can make it work. 0 needs to be 90deg