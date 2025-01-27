'use strict'

function renderBoard(mat) {
    var strHTML = `<table><tbody>`
    for (var i = 0; i < mat.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class ="${className}">
                       <onclick = "onCellClicked(gGame)">${cell} </button>
                       </td>`
        }
        strHTML += `</tr>`
    }
    var elTable = document.querySelector('.board')
    elTable.innerHTML = strHTML
}





function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}