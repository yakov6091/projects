'use strict'
const FLAG = '🚩'
const BOMB = '💣'
const HAPPY = '😇'
const SAD = '😖'
const WIN = '😎'
const HINT = '💡'
const LIVE = '💗'

var gBoard
var gButton
// var gMines

var gLevel = {
    size: 4,
    mines: 2
}

var gGame = {
    isOn: false, //true when game is on
    coveredCount: 0, // how many cells are covered
    markedCount: 0, // how many cells are marked (with flag)
    secsPassed: 0 // how many seconds passed
}

function onInit() {
    document.querySelector('.modal').style.display = 'none'
    gButton = document.querySelector('.face')
    gButton.innerHTML = HAPPY
    gBoard = buildBoard()
    console.log(gBoard)
    setMinesNegsCount(gBoard)
    renderAmountOfMines()
    // setLife()
    randomMines()
    renderBoard(gBoard)

}

console.log(buildBoard())
function buildBoard() {
    const size = gLevel.size //4
    // console.log(size)
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isCovered: true,
                isMine: false,
                isMarked: false,
            }
        }
    }
    // board[1][2].isMine = true
    // board[3][1].isMine = true
    return board
}

function renderBoard(mat) {
    var strHTML = `<table><tbody>`
    for (var i = 0; i < mat.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < mat[0].length; j++) {
            // const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class ="${className}"
                       onclick = "onCellClicked(this,${i},${j})"
                       oncontextmenu ="setFlag(event,this,${i},${j})">

                       
                       </td>`
        }
        strHTML += `</tr>`
    }
    strHTML += '</tbody></table>'
    var elTable = document.querySelector('.board')
    elTable.innerHTML = strHTML
}

//TODO: if is bomb or cell
function onCellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    if (cell.isMine) {
        // elCell.style.backgroundColor = 'red'
        // elCell.innerHTML = BOMB
        revealMines()
        cell.isCovered = false
        document.querySelector('.modal').style.display = 'block'
        document.querySelector('.modal p').innerText = "Game Over!"
        document.querySelector('.modal p').style.backgroundColor = 'chocolate'
        gButton = document.querySelector('.face')
        gButton.innerHTML = SAD
        renderAmountOfMines()

    }

    if (cell.isCovered) {
        cell.isCovered = false
        elCell.innerText = cell.minesAroundCount
        elCell.style.backgroundColor = 'grey'
    }
    // renderAmountOfMines()
    checkVictory()
}


function onDifficultyClick(elBtn) {
    gLevel.size = +elBtn.dataset.size
    gLevel.mines = +elBtn.dataset.mine
    renderAmountOfMines()
    onInit()
}

function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isCovered && !cell.isMine) return

            if (cell.isMine && !cell.isMarked) return
        }
    }
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.modal p').innerText = "You Won!"
    document.querySelector('.modal p').style.backgroundColor = 'green'
    gButton = document.querySelector('.face')
    gButton.innerHTML = WIN
    renderAmountOfMines()

}

// need to fix the flag on bom tile and on isCoverd
function setFlag(event, elCell, i, j) {
    event.preventDefault()
    const cell = gBoard[i][j]

    if (!cell.isCovered && cell.isMine) return

    if (cell.isCovered && !cell.isMarked) { // if(true && !false = true)
        cell.isMarked = true
        elCell.innerHTML = FLAG
        gLevel.mines--


    } else if (cell.isMarked && cell.isCovered) { //if(true && true)
        cell.isMarked = false
        elCell.innerHTML = ''
        gLevel.mines++

    }
    renderAmountOfMines()

}

function renderAmountOfMines() {
    var elMines = document.querySelector('h2 span')
    elMines.innerText = gLevel.mines
}

function getRandomPos() {
    var randomRowIdx = getRandomInt(0, gBoard.length)
    var randomColIdx = getRandomInt(0, gBoard.length)

    return {
        i: randomRowIdx,
        j: randomColIdx
    }
}

//FIX duplicate location
function randomMines() {
    for (var i = 0; i < gLevel.mines; i++) {
        var randomCellPos = getRandomPos() // {i:2, j:3}
        //if the cell is mine try again
        if (gBoard[randomCellPos.i][randomCellPos.j].isMine) {
            i--
        }
        //place a mine in an empty cell
        gBoard[randomCellPos.i][randomCellPos.j].isMine = true
    }
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
}



function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countMinesAround(i, j, board)
        }
    }
}

function countMinesAround(cellI, cellJ, board) {
    var neighborsMines = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j].isMine) neighborsMines++
        }
    }
    return neighborsMines
}

function revealMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine) {
                cell.isCovered = false
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.innerHTML = BOMB
                elCell.style.backgroundColor = 'red'
            }
        }
    }
}
