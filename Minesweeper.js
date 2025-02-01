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
var gMines = 2

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
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
    console.log(gBoard)


    randomMines()


}

// console.log(buildBoard())
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
        document.querySelector('.modal').style.display = 'block'
        gButton = document.querySelector('.face')
        gButton.innerHTML = SAD
        return
    }
    // change the if
    if (cell.isCovered) {
        cell.isCovered = false
        elCell.innerText = cell.minesAroundCount
        elCell.style.backgroundColor = 'grey'
    }
    // renderAmountOfMines()
}

function setFlag(event, elCell, i, j) {
    event.preventDefault()
    const cell = gBoard[i][j]
    if (cell.isCovered && !cell.isMarked) { // if(true && !false = true)
        cell.isMarked = true
        elCell.innerHTML = FLAG
        gMines--
        renderAmountOfMines()

    } else if (cell.isCovered && cell.isMarked) { //if(true && true)
        cell.isMarked = false
        elCell.innerHTML = ''
        gMines++
        renderAmountOfMines()
    }
}

function getRandomPos() {
    var randomRowIdx = getRandomInt(1, gBoard.length - 1)
    var randomColIdx = getRandomInt(1, gBoard[0].length - 1)
    return {
        i: randomRowIdx,
        j: randomColIdx
    }
}

//FIX duplicate location
function randomMines() {
    for (var i = 0; i < gMines; i++) {
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

function renderAmountOfMines() {
    var elMines = document.querySelector('h2 span')
    elMines.innerText = gMines
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
            var tile = gBoard[i][j]
            if (tile.isMine) {
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.innerHTML = BOMB
                elCell.style.backgroundColor = 'red'
            }
        }
    }
}
