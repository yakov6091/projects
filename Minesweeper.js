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


}

console.log(buildBoard())
function buildBoard() {
    const size = gLevel.size //4
    // console.log(size)
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = CELL
        }
    }
    board[1][2] = BOMB
    board[3][1] = BOMB
    return board

}

function setMinesNegsCount() {

}