'use strict'
var gNums
var gNextNum = 1
var gSize = 3

var gInterval



function onInitGame() {
    gNums = generateNums(gSize ** 2)
    gNextNum = 1
    renderNums()
    document.querySelector('.completed').style.display = 'none'
    document.querySelector('.timer').innerText = '0:000'
    clearInterval(gInterval)

}


function getNum() {
    // coppy of the gnums array
    // var coppyNums = gNums.slice()
    //indexNum 0 - 8...
    const randIdx = getRandomInt(0, gNums.length)
    //getting the number by randIdx
    const num = gNums[randIdx]
    //remove the number from the copied array
    gNums.splice(randIdx, 1)
    return num
}

function renderNums() {
    // getting the coppy of array
    var strHtml = ''
    for (var i = 0; i < gSize; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < gSize; j++) {
            //console.log(num)
            strHtml += `<td 
                       onclick = "onCellClicked(this)"> ${getNum()} 
                       </td>`
        }
        strHtml += `</tr>`

    }
    var elTable = document.querySelector('table tbody')
    elTable.innerHTML = strHtml
    renderNextNum()
}


function renderNextNum() {
    var elNextNum = document.querySelector('h2 span')
    elNextNum.innerText = gNextNum

}

function onCellClicked(elCell) {
    // console.log(elCell)
    var clickedNum = +elCell.innerText
    // console.log(clickedNum)
    if (clickedNum === gNextNum) {
        elCell.style.backgroundColor = 'black'

        if (clickedNum === 1) {
            startStopWatch()

        } else if (clickedNum === gSize ** 2) {
            clearInterval(gInterval)
            document.querySelector('.completed').style.display = 'block'
            return // stoped
        }

        // console.log('Right')

        gNextNum++
        renderNextNum()
    }
}


function onDifficultyClick(elBtn) {
    gSize = +elBtn.dataset.size
    onInitGame()
}


function startStopWatch() {
    var StartTime = Date.now();
    gInterval = setInterval(function () {
        var elapsedTime = Date.now() - StartTime;
        document.querySelector(".timer").innerHTML = (elapsedTime / 1000).toFixed(3);
    }, 1);
}

function generateNums(level) {
    gNums = []
    for (var i = 1; i <= level; i++) {
        gNums.push(i)
    }
    return gNums
}




function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}