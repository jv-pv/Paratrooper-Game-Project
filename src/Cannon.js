class Cannon {
    constructor() {
        this.cannonEl = document.getElementById("cannon")
        
        this.currentAngle = 0
        this.minAngle = -60
        this.maxAngle = 60


        this.projectiles = []
        
    }


    rotateLeft() {
        if (this.currentAngle > this.minAngle) {
            this.currentAngle -= 5
            console.log("Left", this.currentAngle)
            this.updateRotation()
        }
    }

    rotateRight() {
        if (this.currentAngle < this.maxAngle) {
            this.currentAngle += 5
            console.log("Right", this.currentAngle)
            this.updateRotation()
        }
    }

    updateRotation() {
        this.cannonEl.style.transform = `rotate(${this.currentAngle}deg)`
    }

    fireCannon() {
        this.projectiles.push(new Projectile(this.currentAngle))
    }

    updateProjectiles() {

        console.log("Array", this.projectiles)

        this.projectiles.forEach((projectile, i) => {
            console.log("Projectile", projectile)
            projectile.updatePosition()
        })

    }
}