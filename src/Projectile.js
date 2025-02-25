class Projectile {
    constructor (angle) {
        this.projectile = document.createElement("div")
        this.gameScreen = document.getElementById("game-screen")
        this.projectile.style.width = "10px"
        this.projectile.style.height = "10px"
        this.projectile.id = "projectile"
        this.projectile.style.borderRadius = "50%"
        this.gameScreen.appendChild(this.projectile)
        
        this.active = false
        this.init(angle)
    }

    init(angle) {
        angle = 90 - angle // ! Correcting the angle
        this.angle = angle * (Math.PI / 180) // ! Convert to radians
    
        const cannonLength = 30;
        const cannonTipAdjustments = 8
        const xOffset = Math.cos(this.angle) * (cannonLength + cannonTipAdjustments)
        const yOffset = Math.sin(this.angle) * (cannonLength + cannonTipAdjustments)
    
        this.left = 295 + (xOffset + 1.20)
        this.top = 380 - yOffset
    
        // Base velocity values - will be multiplied by deltaTime in updatePosition
        this.baseXVelocity = Math.cos(this.angle) * 5
        this.baseYVelocity = Math.sin(this.angle) * 5
    
        this.projectile.style.top = `${this.top}px`
        this.projectile.style.left = `${this.left}px`
        this.projectile.style.display = "block"
        this.active = true
    }

    updatePosition(deltaTime = 1) {
        if (!this.active) return;
        
        // Apply delta time for smooth movement regardless of frame rate
        const xVelocity = this.baseXVelocity * deltaTime;
        const yVelocity = this.baseYVelocity * deltaTime;
        
        this.left += xVelocity;
        this.top -= yVelocity;
        this.projectile.style.left = `${this.left}px`
        this.projectile.style.top = `${this.top}px`
    }
    
    deactivate() {
        this.active = false;
        this.projectile.style.display = "none";
    }
}

// Static pool for projectiles
Projectile.pool = [];
Projectile.maxPoolSize = 20;

// Get a projectile from the pool or create a new one
Projectile.getProjectile = function(angle) {
    // Look for an inactive projectile in the pool
    for (let i = 0; i < Projectile.pool.length; i++) {
        if (!Projectile.pool[i].active) {
            Projectile.pool[i].init(angle);
            return Projectile.pool[i];
        }
    }
    
    // If no inactive projectile found and pool isn't full, create a new one
    if (Projectile.pool.length < Projectile.maxPoolSize) {
        const projectile = new Projectile(angle);
        Projectile.pool.push(projectile);
        return projectile;
    }
    
    // If pool is full, reuse the oldest one
    const oldestProjectile = Projectile.pool.shift();
    oldestProjectile.init(angle);
    Projectile.pool.push(oldestProjectile);
    return oldestProjectile;
};

// ? CSS Tranform Rotate 0deg points updwards, but in trig 0 deg points to the right, 90 deg up, and 180 to the left?
// ? maybe converting to match how angles are used in trig can make it work. 0 needs to be 90deg