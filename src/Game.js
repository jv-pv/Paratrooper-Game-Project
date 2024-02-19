class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro")
        this.gameContainer = document.getElementById("game-container")
        this.gameScreen = document.getElementById("game-screen")
        this.endScreen = document.getElementById("game-end")

        this.width = 600
        this.height = 400
        this.paratroopers = []
        this.kills = 0
        this.lives = 1
        this.gameIsOver = false
        this.gameInterval;
        this.gameLoopFrequency = 1000/60
        this.frames = 0
    }



    startGame() {
        // Set Width and Height for Game Screen
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`

        // On start game click display Game Screen and hide Start Screen
        this.startScreen.style.display = "none"
        this.gameContainer.style.display = "flex"


    }


    endGame() {
        this.gameContainer.style.display = "none"
        this.endScreen.style.display = "flex"
    }
}