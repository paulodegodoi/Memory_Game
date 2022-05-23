const cards = document.querySelectorAll(".card")
let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return
    this.classList.add("flip")
    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return
    }
    secondCard = this
    hasFlippedCard = false
    checkForMath()
}

function restartGame() {
    document.location.reload(true)
}

let scoreGame = 0
function finishGame() {
    const btnRestart = document.getElementById("btnRestart")
    btnRestart.style.display = "block"
    btnRestart.addEventListener("click", restartGame)
}

function checkForMath() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        foundPair()
        scoreGame++
        if (scoreGame == 6) {
            finishGame()
        }
        return
    }
    noPair()
}

function foundPair() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard()
}

function noPair() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")

        resetBoard()
    }, 1500)
}

function resetBoard() {
    ;[hasFlippedCard, lockBoard] = [false, false][(firstCard, secondCard)] = [
        null,
        null,
    ]
}

;(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
})()

cards.forEach((card) => {
    card.addEventListener("click", flipCard)
})
