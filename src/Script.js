window.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn")
    const restartBtn = document.getElementById("restart-btn")
    let game;
    let cannon;
    
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
    })

    
    document.addEventListener("keydown", (e) => {
       
        if (e.key === "ArrowRight") {
            cannon.rotateRight()
        } else if (e.key === "ArrowLeft") {
            cannon.rotateLeft()
        }

        if (e.code === 'Space') {
            console.log("Firing", cannon)
            cannon.fireCannon()
        }
    })

})