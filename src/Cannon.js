class Cannon {
    constructor() {
        this.cannonEl = document.getElementById("cannon")
        
        this.currentAngle = 0
        this.minAngle = -70
        this.maxAngle = 70

        this.projectiles = []
        
        // Add debounce properties
        this.canFire = true
        this.fireDelay = 350 // 500ms delay between shots
        this.lastFireTime = 0
        
        // Create cooldown indicator
        this.createCooldownIndicator()
        
        // Initialize sound effects
        this.initSounds()
    }
    
    initSounds() {
        // Create audio element for cannon fire sound
        this.fireSound = new Audio()
        this.fireSound.src = 'sounds/cannon-fire.mp3'
        this.fireSound.volume = 0.4
        
        // Preload the sound
        this.fireSound.load()
    }
    
    createCooldownIndicator() {
        // Create cooldown indicator element
        this.cooldownIndicator = document.createElement('div')
        this.cooldownIndicator.id = 'cooldown-indicator'
        this.cooldownIndicator.style.display = 'none'
        document.getElementById('game-screen').appendChild(this.cooldownIndicator)
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
        // Apply rotation without affecting recoil animation
        this.cannonEl.style.transform = `rotate(${this.currentAngle}deg)`
    }

    fireCannon() {
        const currentTime = performance.now()
        
        // Check if enough time has passed since the last shot
        if (currentTime - this.lastFireTime >= this.fireDelay) {
            this.projectiles.push(Projectile.getProjectile(this.currentAngle));
            this.lastFireTime = currentTime
            
            // Play fire sound
            this.playFireSound()
            
            // Visual feedback for firing - apply recoil without affecting rotation
            this.applyRecoilEffect()
            
            // Show cooldown
            this.showCooldown()
        }
    }
    
    applyRecoilEffect() {
        // Save current transform
        const currentTransform = this.cannonEl.style.transform
        
        // Add recoil class for animation
        this.cannonEl.classList.add('firing')
        
        // Remove the class after animation completes
        setTimeout(() => {
            this.cannonEl.classList.remove('firing')
        }, 100)
    }
    
    playFireSound() {
        // Clone the sound to allow overlapping sounds
        const soundClone = this.fireSound.cloneNode()
        soundClone.volume = 0.4
        soundClone.play()
        
        // Clean up the clone after it's done playing
        soundClone.onended = () => {
            soundClone.remove()
        }
    }
    
    showCooldown() {
        // Position the cooldown indicator below the tank
        this.cooldownIndicator.style.left = `${300 - 15}px` // Center of screen - half indicator width
        this.cooldownIndicator.style.top = `${380}px` // Position at the bottom of the screen
        this.cooldownIndicator.style.display = 'block'
        
        // Animate the cooldown
        this.cooldownIndicator.style.animation = `cooldown ${this.fireDelay / 1000}s linear`
        
        // Hide after cooldown completes
        setTimeout(() => {
            this.cooldownIndicator.style.display = 'none'
            this.cooldownIndicator.style.animation = 'none'
        }, this.fireDelay)
    }

    updateProjectiles(deltaTime) {
        const gameWidth = 600;
        const gameHeight = 400;
        
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.updatePosition(deltaTime);
            
            // Check if projectile is out of bounds
            if (projectile.left + 10 >= gameWidth || 
                projectile.left + 10 <= 0 || 
                projectile.top + 10 <= 0) {
                
                projectile.deactivate(); // Return to pool instead of removing
                this.projectiles.splice(i, 1);
            }
        }
    }
}