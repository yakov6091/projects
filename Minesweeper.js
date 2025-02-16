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
var gGame
var gInterval


var gLevel = {
    size: 4,
    mines: 2,
    lives: 1,
    hints: 3
}

function onInit() {
    gGame = {
        isOn: true, //true when game is on
        coveredCount: 0, // how many cells are covered
        markedCount: 0, // how many cells are marked (with flag)
        secsPassed: 0, // how many seconds passed
        isHintActive: false, // Track if a hint is active
        hintsUsed: 0 // Track number of hints used
    }
    document.querySelector('.modal').style.display = 'none'
    gButton = document.querySelector('.face')
    gButton.innerHTML = HAPPY
    gBoard = buildBoard()
    console.log(gBoard)


    setMinesNegsCount(gBoard)
    renderAmountOfMines()
    randomMines()
    renderBoard(gBoard)
    setLife()



}
// function resetButton(){
//     gButton = document.querySelector('.face')
//     gButton.innerHTML = HAPPY
//     onInit()

// }

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
            gGame.coveredCount++
        }
    }

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


function onCellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    if (!gGame.isOn) return


    if (cell.isMine) {
        gLevel.lives--
        setLife()

        cell.isCovered = false
        elCell.innerHTML = FLAG


        if (gLevel.lives === 0) {
            gGame.isOn = false
            revealMines()
            gameOver()
        }
        return

    }

    if (cell.isCovered) {
        cell.isCovered = false
        gGame.coveredCount--
        elCell.innerText = cell.minesAroundCount || ''
        elCell.style.backgroundColor = 'grey'
        checkVictory()
    }

    expandUncover(i, j)
}

//explain to me how the function works
function expandUncover(cellI, cellJ) {
    if (gBoard[cellI][cellJ].minesAroundCount !== 0) return
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue

            const currCell = gBoard[i][j]
            var elCurrCell = document.querySelector(`.cell-${i}-${j}`)

            if (!currCell.isCovered || currCell.isMine) continue
            currCell.isCovered = false
            gGame.coveredCount--
            elCurrCell.style.backgroundColor = 'grey'


            if (currCell.minesAroundCount === 0) {
                elCurrCell.innerHTML = ''
                expandUncover(i, j)
            } else {
                elCurrCell.innerHTML = currCell.minesAroundCount
            }
            checkVictory()
        }
    }

}

function onDifficultyClick(elBtn) {
    gLevel.size = +elBtn.dataset.size
    gLevel.mines = +elBtn.dataset.mine
    if (elBtn.dataset.difficulty === 'easy') {
        gLevel.lives = 1
    }
    else if (elBtn.dataset.difficulty === 'medium') {
        gLevel.lives = 2
    }
    else if (elBtn.dataset.difficulty === 'hard') {
        gLevel.lives = 3
    }
    onInit()
}

function setFlag(event, elCell, i, j) {
    event.preventDefault()
    const cell = gBoard[i][j]
    if (!gGame.isOn) return

    if (cell.isCovered && !cell.isMarked) { // if(true && !false = true)
        cell.isMarked = true
        elCell.innerHTML = FLAG
        gGame.markedCount++

    } else if (cell.isMarked && cell.isCovered) { //if(true && true)
        cell.isMarked = false
        elCell.innerHTML = ''
        gGame.markedCount--

    }
    renderAmountOfMines()
    checkVictory()
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
    //TODO:function  get empty cell (bingo)
    for (var i = 0; i < gLevel.mines; i++) {
        var randomCellPos = getRandomPos() // {i:2, j:3}
        //if the cell is mine try again
        if (!gBoard[randomCellPos.i][randomCellPos.j].isMine) {

            gBoard[randomCellPos.i][randomCellPos.j].isMine = true
        }
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
