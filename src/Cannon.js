class Cannon {
    constructor() {
        this.cannonEl = document.getElementById("cannon")
        this.currentAngle = 0
        this.minAngle = -60
        this.maxAngle = 60
    }


    rotateLeft() {
        if (this.currentAngle > this.minAngle) {
            this.currentAngle -= 5
            console.log(this.currentAngle)
            this.updateRotation()
        }
    }

    rotateRight() {
        if (this.currentAngle < this.maxAngle) {
            this.currentAngle += 5
            console.log(this.currentAngle)
            this.updateRotation()
        }
    }

    updateRotation() {
        this.cannonEl.style.transform = `rotate(${this.currentAngle}deg)`
    }
}