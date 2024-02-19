window.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn")
    const restartBtn = document.getElementById("restart-btn")
    let game;
    let cannon;
    cannon = new Cannon()

    startBtn.addEventListener('click', () => {
        console.log("Start!")
        game = new Game()
        game.startGame()
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
    })

})