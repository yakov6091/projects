'use strict'
const WALL = ''
const CELL = '🔲'
const FLAG = '🚩'
const BOMB = '💣'
const HAPPY = '😇'
const SAD = '😖'
const WIN = '😎'
const HINT = '💡'

var gBoard

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

    gBoard = buildBoard()
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
    console.log(gBoard)


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
                minesAroundCount: 4,
                isCovered: true,
                isMine: false,
                isMarked: false,
            }
        }
    }

    board[1][2] = BOMB

    board[3][1] = BOMB
    return board
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
        for (var j = 0; i < gBoard[0].length; j++) {
            var tile = gBoard[i][j]
            if (tile === BOMB) {

            }
        }
    }
}
