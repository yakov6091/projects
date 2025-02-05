'use strict'

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function setLife() {
    var lifeContainer = document.querySelector('.life')
    lifeContainer.innerHTML = ''
    for (var i = 0; i < 3; i++) {
        lifeContainer.innerHTML += LIVE
    }
}



function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}