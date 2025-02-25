class Game {
    constructor(cannon) {
        this.startScreen = document.getElementById("game-intro")
        this.gameContainer = document.getElementById("game-container")
        this.gameScreen = document.getElementById("game-screen")
        this.endScreen = document.getElementById("game-end")   
        this.gameScoreEl = document.getElementById("score-el")
        this.gameLandedEl = document.getElementById("landed-el")
        this.endScoreEl = document.getElementById("end-score")
        this.endLandedEl = document.getElementById("end-landed")

        this.cannon = cannon
        this.width = 600
        this.height = 400

        this.helicoptersArr = []
        this.paratroopersArr = []
        this.jetArr = []
        this.bombArr = []

        this.score = 0
        this.landedParatroopers = 0

        this.gameIsRunning = false
        this.lastTimestamp = 0
        this.targetFPS = 60
        this.frameInterval = 1000 / this.targetFPS
        this.frames = 0
    }



    startGame() {
        // Set Width and Height for Game Screen
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`

        // On start game click display Game Screen and hide Start Screen
        this.startScreen.style.display = "none"
        this.gameContainer.style.display = "flex"

        this.gameIsRunning = true
        this.lastTimestamp = performance.now()
        requestAnimationFrame(this.animationLoop.bind(this))
    }

    animationLoop(timestamp) {
        if (!this.gameIsRunning) return;
        
        // Calculate elapsed time since last frame
        const elapsed = timestamp - this.lastTimestamp;
        const deltaTime = elapsed / (1000 / 60); // Normalize to 60 FPS
        
        // Only update if enough time has passed for our target frame rate
        if (elapsed >= this.frameInterval) {
            this.lastTimestamp = timestamp - (elapsed % this.frameInterval);
            this.gameLoop(deltaTime);
        }
        
        requestAnimationFrame(this.animationLoop.bind(this));
    }

    gameLoop(deltaTime) {
        this.frames++;

        if (this.frames % 340 === 0) {
            this.helicoptersArr.push(new Helicopter(this.width));
        }
        if (this.frames % 2000 === 0) {
            this.jetArr.push(new Jet(this.width));
        }

        // ! Before dropping, check if there are any helis in the screen and in the array.
        const safeZoneHeli = 75;
        const safeZoneJet = 125;
        if (this.frames > 340 && this.frames % 140 === 0 && this.helicoptersArr.length > 0) {
            let randomIndex = Math.floor(Math.random() * this.helicoptersArr.length);
            let helicopter = this.helicoptersArr[randomIndex];
            // ! Check if the heli is within the game screen safe zone to avoid dropping troopers of screen or on the edge. 
            // ! Check if the center of the helicopter is more than safeZone pixels away from the left or right edge of the game screen. 
            if (helicopter.position.x + helicopter.width/2 > safeZoneHeli && helicopter.position.x + helicopter.width/2 < this.width - safeZoneHeli) {
                this.paratroopersArr.push(helicopter.dropParatrooper());
            }
        }

        if (this.frames > 2400 && this.frames % 240 === 0 && this.jetArr.length > 0) {
            let randomIndex = Math.floor(Math.random() * this.jetArr.length);
            let jet = this.jetArr[randomIndex];

            if (jet.position.x + jet.width/2 > safeZoneJet && jet.position.x + jet.width/2 < this.width - safeZoneJet) {
                this.bombArr.push(jet.dropBomb());
            }
        }

        this.update(deltaTime);
        
        if (this.landedParatroopers === 5) {
            setTimeout(() => {
                this.endGame();
            }, 350);
        }
    }

    update(deltaTime) {
        this.cannon.updateProjectiles(deltaTime);
        this.checkCollisions();
        this.checkLanded();

        this.helicoptersArr.forEach(helicopter => {
            helicopter.updateHelicopter(deltaTime);
        });
        this.paratroopersArr.forEach((troop) => {
            troop.update(deltaTime);
        });
        this.jetArr.forEach(jet => {
            jet.updateJet(deltaTime);
        });
        this.bombArr.forEach(bomb => {
            bomb.update(deltaTime);
        });
    }

    checkCollisions() {
        // Create a copy of arrays to safely modify during iteration
        const projectiles = [...this.cannon.projectiles];
        const helicopters = [...this.helicoptersArr];
        const paratroopers = [...this.paratroopersArr];
        const jets = [...this.jetArr];
        const bombs = [...this.bombArr];
        
        // Track which projectiles have been used in collisions
        const usedProjectiles = new Set();

        // Check projectile collisions
        for (let i = 0; i < projectiles.length; i++) {
            const projectile = projectiles[i];
            if (usedProjectiles.has(i)) continue; // Skip if already used in collision
            
            // Get projectile bounds once
            const projectileRect = projectile.projectile.getBoundingClientRect();
            
            // Check helicopter collisions
            for (let j = 0; j < helicopters.length; j++) {
                const helicopter = helicopters[j];
                if (this.checkRectCollision(projectileRect, helicopter.helicopterImg.getBoundingClientRect())) {
                    helicopter.lives--;
                    if (helicopter.lives === 0) {
                        this.score += 3;
                        helicopter.createExplosion();
                        helicopter.removeHelicopter();
                        this.helicoptersArr.splice(this.helicoptersArr.indexOf(helicopter), 1);
                    }
                    
                    projectile.deactivate();
                    this.cannon.projectiles.splice(this.cannon.projectiles.indexOf(projectile), 1);
                    usedProjectiles.add(i);
                    break; // Exit loop after collision
                }
            }
            if (usedProjectiles.has(i)) continue;
            
            // Check paratrooper collisions
            for (let j = 0; j < paratroopers.length; j++) {
                const trooper = paratroopers[j];
                if (!trooper.hasLanded && this.checkRectCollision(projectileRect, trooper.paratrooperEl.getBoundingClientRect())) {
                    this.score += 1;
                    trooper.explodeTrooper();
                    trooper.remove();
                    this.paratroopersArr.splice(this.paratroopersArr.indexOf(trooper), 1);
                    
                    projectile.deactivate();
                    this.cannon.projectiles.splice(this.cannon.projectiles.indexOf(projectile), 1);
                    usedProjectiles.add(i);
                    break;
                }
            }
            if (usedProjectiles.has(i)) continue;
            
            // Check jet collisions
            for (let j = 0; j < jets.length; j++) {
                const jet = jets[j];
                if (this.checkRectCollision(projectileRect, jet.jetImg.getBoundingClientRect())) {
                    jet.lives--;
                    if (jet.lives === 0) {
                        this.score += 5;
                        jet.createExplosion();
                        jet.removeJet();
                        this.jetArr.splice(this.jetArr.indexOf(jet), 1);
                    }
                    
                    projectile.deactivate();
                    this.cannon.projectiles.splice(this.cannon.projectiles.indexOf(projectile), 1);
                    usedProjectiles.add(i);
                    break;
                }
            }
            if (usedProjectiles.has(i)) continue;
            
            // Check bomb collisions
            for (let j = 0; j < bombs.length; j++) {
                const bomb = bombs[j];
                if (this.checkRectCollision(projectileRect, bomb.bombEl.getBoundingClientRect())) {
                    this.score += 1;
                    bomb.explodeBomb();
                    bomb.remove();
                    this.bombArr.splice(this.bombArr.indexOf(bomb), 1);
                    
                    projectile.deactivate();
                    this.cannon.projectiles.splice(this.cannon.projectiles.indexOf(projectile), 1);
                    usedProjectiles.add(i);
                    break;
                }
            }
        }

        // Check bomb collisions with tank
        const tankEl = document.getElementById("tank");
        const tankRect = tankEl.getBoundingClientRect();
        
        for (let i = 0; i < bombs.length; i++) {
            const bomb = bombs[i];
            if (this.checkRectCollision(bomb.bombEl.getBoundingClientRect(), tankRect)) {
                bomb.explodeBomb();
                this.bombArr.splice(this.bombArr.indexOf(bomb), 1);
                bomb.remove();
                setTimeout(() => {
                    this.endGame();
                }, 1000);
                break;
            }
        }
        
        // Update score displays
        this.gameScoreEl.innerText = `Score: ${this.score}`;
        this.gameLandedEl.innerText = `Landed: ${this.landedParatroopers}`;
        this.endScoreEl.innerText = `Score: ${this.score}`;
        this.endLandedEl.innerText = `Landed: ${this.landedParatroopers}`;
    }
    
    // Optimized collision detection function
    checkRectCollision(rect1, rect2) {
        return (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
        );
    }

    checkLanded() {
        // console.log("Landed!")
        this.paratroopersArr.forEach((trooper) => {
            // ! If trooper.hasLanded is true (meaning the trooper was already marked as landed), !trooper.hasLanded becomes false effectively skipping the logic. If trooper.hasLanded is false (the trooper hasn't been marked as landed yet), !trooper.hasLanded becomes true executing the logic.
            // ? "if the trooper has landed AND has not yet been marked as landed"
            if (trooper.landed() && !trooper.hasLanded) {
                trooper.paratrooperEl.src = "/images/paratrooper-landed.png"
                trooper.paratrooperEl.style.width = "20px"
                trooper.paratrooperEl.style.height = "20px"
                trooper.paratrooperEl.style.top = "365px"
                trooper.paratrooperEl.style.Zindex = 9

                trooper.hasLanded = true
                this.landedParatroopers += 1
            }
        })

        this.bombArr.forEach((bomb, bombIndex) => {
            if (bomb.landed() && !bomb.hasLanded) {

                bomb.explodeBomb()
                bomb.remove()
                this.bombArr.splice(bombIndex,1)
                bomb.hasLanded = true
                this.score = this.score - 5
            }
        })
    }
    
    endGame() {
        this.gameIsRunning = false
        this.gameContainer.style.display = "none"
        this.endScreen.style.display = "flex"
        console.log("GAME OVER!")
    }
}