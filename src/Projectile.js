class Projectile {
    constructor (angle) {
        this.projectile = document.createElement("div")
        this.gameScreen = document.getElementById("game-screen")
        this.projectile.style.width = "10px"
        this.projectile.style.height = "10px"
        angle = 90 - angle // ! Correcting the angle
        this.angle = angle * (Math.PI / 180) // ! Convert to radians
    
        const cannonLength = 30;
        const cannonTipAdjustments = 8
        const xOffset = Math.cos(this.angle) * (cannonLength + cannonTipAdjustments)
        const yOffset = Math.sin(this.angle) * (cannonLength + cannonTipAdjustments)
    
        this.left = 295 + (xOffset + 1.20)
        this.top = 380 - yOffset

        console.log("TOP", this.top, "OFFSET Y", yOffset)
        console.log("LEFT", this.left, "OFFSET X", xOffset)
    
        this.xVelocity = Math.cos(this.angle) * 5
        this.yVelocity = Math.sin(this.angle) * 5
    
        this.projectile.id = "projectile"
        this.projectile.style.top = `${this.top}px`
        this.projectile.style.left = `${this.left}px`
        this.projectile.style.borderRadius = "50%"
        this.gameScreen.appendChild(this.projectile)
    }

   

    updatePosition() {

        // console.log("Updating projectile", this)

        this.left += this.xVelocity 
        this.top -= this.yVelocity 
        this.projectile.style.left = `${this.left}px`
        this.projectile.style.top = `${this.top}px`
    }
}


// ? CSS Tranform Rotate 0deg points updwards, but in trig 0 deg points to the right, 90 deg up, and 180 to the left?
// ? maybe converting to match how angles are used in trig can make it work. 0 needs to be 90deg