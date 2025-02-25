window.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn")
    const restartBtn = document.getElementById("restart-btn")
    let game;
    let cannon;
    
    // Track key states
    const keyState = {
        ArrowRight: false,
        ArrowLeft: false,
        Space: false
    };
    
    startBtn.addEventListener('click', () => {
        console.log("Start!")
        cannon = new Cannon()
        game = new Game(cannon)
        setTimeout(() => {
            game.startGame()
        }, 250)
    })

    restartBtn.addEventListener('click', () => {
        console.log("Restart!")
        location.reload()
    })

    // Handle keydown events
    document.addEventListener("keydown", (e) => {
        // Update key state
        if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.code === "Space") {
            keyState[e.key === "ArrowRight" ? "ArrowRight" : 
                     e.key === "ArrowLeft" ? "ArrowLeft" : "Space"] = true;
        }
        
        // Handle rotation
        if (e.key === "ArrowRight" && cannon) {
            cannon.rotateRight()
        } else if (e.key === "ArrowLeft" && cannon) {
            cannon.rotateLeft()
        }

        // Handle firing - the debounce is now handled in the Cannon class
        if (e.code === 'Space' && cannon) {
            cannon.fireCannon()
        }
    })
    
    // Handle keyup events
    document.addEventListener("keyup", (e) => {
        // Update key state
        if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.code === "Space") {
            keyState[e.key === "ArrowRight" ? "ArrowRight" : 
                     e.key === "ArrowLeft" ? "ArrowLeft" : "Space"] = false;
        }
    })
})