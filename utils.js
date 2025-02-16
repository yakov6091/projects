'use strict'

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function setLife() {
    var lifeContainer = document.querySelector('.life')
    lifeContainer.innerHTML = ''
    for (var i = 0; i < gLevel.lives; i++) {
        lifeContainer.innerHTML += LIVE
    }

}

function removeHint() {
    var lifeContainer = document.querySelector('.hints')
    lifeContainer.innerHTML = ''
    for (var i = 0; i < gLevel.hints; i++) {
        lifeContainer.innerHTML += '💡'
    }

}

function gameOver() {
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.modal p').innerText = "Game Over!"
    document.querySelector('.modal p').style.backgroundColor = 'chocolate'
    gButton = document.querySelector('.face')
    gButton.innerHTML = SAD
}

function checkVictory() {
    if (gGame.coveredCount === gLevel.mines) {
        document.querySelector('.modal').style.display = 'block'
        document.querySelector('.modal p').innerText = "You Won!"
        document.querySelector('.modal p').style.backgroundColor = 'green'
        gButton = document.querySelector('.face')
        gButton.innerHTML = WIN
        gGame.isOn = false
    }
}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}