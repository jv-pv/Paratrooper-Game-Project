window.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn")
    const restartBtn = document.getElementById("restart-btn")
    let game;

    startBtn.addEventListener('click', () => {
        console.log("Start!")
        game = new Game()
        game.startGame()
    })

    restartBtn.addEventListener('click', () => {
        console.log("Restart!")
        // location.reload()
    })

})