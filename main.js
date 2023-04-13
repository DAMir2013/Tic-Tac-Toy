'use strict';
function createTitle() {
    const title = document.createElement('h1');
    title.innerHTML = 'Tic-Tac-Toy';
    title.classList.add('titleClass');
    title.style.margin = 'auto';
    document.getElementById('newTitle').appendChild(title);
    createButton();
}

createTitle();

function createButton() {
    const button = document.createElement('button');
    button.innerHTML = 'Start Game';
    button.classList.add('buttonClass');
    button.style.margin = 'auto';
    document.getElementById('newButton').appendChild(button);
    let start = button.addEventListener("click", createField);
}

function createField() {
    const field = document.createElement('div');
    field.classList.add('fieldClass');
    field.style.width = '450px';
    field.style.height = '450px';
    // field.style.border = '3px solid red';
    field.setAttribute('id', 'field1');
    document.getElementById('conteiner').appendChild(field);
    fillField();
}


function createCanvas(z) {
    const canvasFrame = document.createElement('canvas');
    canvasFrame.setAttribute('id', `c${z}`);
    canvasFrame.width = '150';
    canvasFrame.height = '150';
    document.querySelector(`#f${z}`).appendChild(canvasFrame);
    
}

function createCell(z, col, row) {
    const cell = document.createElement('div');
    cell.setAttribute('id', `f${z}`);
    cell.setAttribute('positionX', row);
    cell.setAttribute('positionY', col);
    cell.style.width = '150px';
    cell.style.height = '150px';
    cell.style.border = '3px solid black';
    document.getElementById('field1').appendChild(cell);
}
function fillField() {
    let counter = 0;
    for(let col = 0; col < 3; col++) {
        for(let row = 0; row < 3; row++) {
            createCell(counter, col, row);
            createCanvas(counter);
            counter++;
        }
    }
    createRandomNumber(1);
}

function createRandomNumber(condition) {
  let num = Math.floor(Math.random() * (9 - 1) + 1);
  if(condition == 1) {
    let timerId = setTimeout(drawCross, 3000, num, 1);
    createRandomNumber(2);
  } else {
    let timerId2 = setTimeout(drawZero, 4000, num, 1); 
  }
}

function drawCross(serialNumX, condition) {
    let winner = checkWin();
    if(winner == 1) {
        return;
    }
    const canvas = document.getElementById(`c${serialNumX}`);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 150);
    ctx.stroke();
    ctx.moveTo(0, 150);
    ctx.lineTo(150, 0);
    ctx.stroke();
    document.querySelector(`#f${serialNumX}`).classList.add("X");
    
    if(condition == 2) {
        checkReplayrow(serialNumX, 1);
    }

}

function drawZero(serialNumO, condition) {
    let winner = checkWin();
    if(winner == 1) {
        return;
    }
    if(document.querySelector(`#f${serialNumO}`).className == `X` && condition == 1) {
        createRandomNumber(2);
    } else {
        const canvas = document.getElementById(`c${serialNumO}`);
        const ctx = canvas.getContext('2d');
        const pi = Math.PI;
        ctx.beginPath();
        ctx.lineWidth = '10';
        ctx.strokeStyle = 'yellow';
        ctx.arc(75, 75, 65, 2*pi, false);
        ctx.stroke();
        document.querySelector(`#f${serialNumO}`).classList.add("O");     
    }
    if(condition == 1) {
        checkValue();
    }
    if(condition == 2) {
        checkReplayrow(serialNumO, 2);
    }
       
}

function checkValue () {
    let previousX = document.querySelector(".X");
    let numberX = previousX.getAttribute("id");
    let arrCheckAxisX = [];
    let arrCheckAxisY = [];
    let valueX = Number(previousX.getAttribute('positionx'));
    let valueY = Number(previousX.getAttribute('positiony'));
    for(let i = valueX - 2; i <= valueX + 2; i++) {
        if(i >= 0 && i < 3 && i != valueX) {
            let checkClass = document.querySelector(`[positionx = '${i}'][positiony = '${valueY}']`).className;
            let checkId = document.querySelector(`[positionx = '${i}'][positiony = '${valueY}']`).getAttribute('id');
            
                        if(checkClass != 'O') {
                            arrCheckAxisX.push(Number(checkId[checkId.length - 1]));
                        } 
        }
    }
    for(let i = valueY - 2; i <= valueY + 2; i++) {
        if(i >= 0 && i < 3 && i != valueY) {
            
            let checkClass = document.querySelector(`[positionx = '${valueX}'][positiony = '${i}']`).className;
            let checkId = document.querySelector(`[positionx = '${valueX}'][positiony = '${i}']`).getAttribute('id');
            if(checkClass != 'O') {
                arrCheckAxisY.push(Number(checkId[checkId.length - 1]));
            } 
        }   
    }
    if(arrCheckAxisX.length > 1) {
        let currentValue = Number(numberX[numberX.length - 1]);
        if(Math.abs(currentValue - arrCheckAxisX[0]) >= Math.abs(currentValue - arrCheckAxisX[1])) {
            setTimeout(drawCross, 5000, arrCheckAxisX[1], 2);
        } else {
            setTimeout(drawCross, 5000, arrCheckAxisX[0], 2);
        }    
    } else {
        let currentValue = Number(numberX[numberX.length - 1]);
        if(Math.abs(currentValue - arrCheckAxisY[0]) >= Math.abs(currentValue - arrCheckAxisY[1])) {
            setTimeout(drawCross, 5000, arrCheckAxisY[1], 2);
        } else {
            setTimeout(drawCross, 5000, arrCheckAxisY[0], 2);
        }
        
    }
}


function checkReplayrow(positionCheck, meaning) {
    let valueX = Number(document.querySelector(`#f${positionCheck}`).getAttribute("positionX"));
    let valueY = Number(document.querySelector(`#f${positionCheck}`).getAttribute("positionY"));
    let arrX = [];
    for(let i = valueX - 2; i <= valueX + 2; i++) {
        if(i >= 0 && i <= 2 && i != valueX) {
            arrX.push([i, valueY]);
        }
    }

    for(let j = 0; j < arrX.length; j++) {
        if(meaning == 1) {
            if(document.querySelector(`[positionx = '${arrX[j][0]}'][positiony = '${arrX[j][1]}']`).className == 'X') {
            arrX.splice(j, 1);
            } 
        }

        if(meaning == 2) {
            if(document.querySelector(`[positionx = '${arrX[j][0]}'][positiony = '${arrX[j][1]}']`).className == 'O') {
            arrX.splice(j, 1);
            } 
            
        }
        
    }

    if(arrX.length == 1) {
        let nextO = document.querySelector(`[positionx = '${arrX[0][0]}'][positiony = '${arrX[0][1]}']`).getAttribute('id');
        let nextONum = Number(nextO[nextO.length - 1]);
        if(meaning == 1) {
            if(document.querySelector(`#f${nextONum}`).className == 'O') {
                checkReplaycol(positionCheck, meaning);
            } else {
                setTimeout(drawZero, 4000, nextONum, 2);
                console.log(`checkReplayRowOOOOOOO${nextONum}`);
                return;
            }
            
        }

        if(meaning == 2) {
            if(document.querySelector(`#f${nextONum}`).className == 'X') {
                checkReplaycol(positionCheck, meaning);
            } else {
                setTimeout(drawCross, 4000, nextONum, 2);
                console.log(`checkReplayRowXXXXXX${nextONum}`);
                return;
            }
        }
        
    } else {
        checkReplaycol(positionCheck, meaning);
    }
}


function checkReplaycol(positionCheck, meaning) {
    let valueX = Number(document.querySelector(`#f${positionCheck}`).getAttribute("positionX"));
    let valueY = Number(document.querySelector(`#f${positionCheck}`).getAttribute("positionY"));
    let arrY = [];
    for(let i = valueY - 2; i <= valueY + 2; i++) {
        if(i >= 0 && i <=2 && i != valueY) {
            arrY.push([valueX, i]);
        }
    }

    for(let j = 0; j < arrY.length; j++) {
        
        if(meaning == 1) {
            if(document.querySelector(`[positionx = '${arrY[j][0]}'][positiony = '${arrY[j][1]}']`).className == 'X') {
                arrY.splice(j, 1);
            } 
        }

        if(meaning == 2) {
            if(document.querySelector(`[positionx = '${arrY[j][0]}'][positiony = '${arrY[j][1]}']`).className == 'O') {
                arrY.splice(j, 1);
            } 
        }
    }

    if(arrY.length == 1) {
        
        let nextO = document.querySelector(`[positionx = '${arrY[0][0]}'][positiony = '${arrY[0][1]}']`).getAttribute('id');
        let nextONum = Number(nextO[nextO.length - 1]);
        
        if(meaning == 1) {
            if(document.querySelector(`#f${nextONum}`).className == 'O') {
                    checkDiagonal1(positionCheck,meaning);
                }  else {
                setTimeout(drawZero, 4000, nextONum, 2);
                console.log(`checkReplaycolOOOOOOO${nextONum}`);
                return;
            }
        }
        
        if(meaning == 2) {
            if(document.querySelector(`#f${nextONum}`).className == 'X') {
                checkDiagonal1(positionCheck,meaning); 
            } else {
                setTimeout(drawCross, 4000, nextONum, 2);
                console.log(`checkReplaycolXXXXXX${nextONum}`);
                return;
            }
        } 
    } else {
        checkDiagonal1(positionCheck,meaning);
    }
    
}

function checkDiagonal1(positionCheck, meaning) {
    if(positionCheck == 0 || positionCheck == 4 || positionCheck == 8) {
        let valueX = Number(document.querySelector(`#f${positionCheck}`).getAttribute("positionX"));
        let valueY = Number(document.querySelector(`#f${positionCheck}`).getAttribute("positionY"));
        let arrDiagonal1 = [[0, 0], [1, 1], [2, 2]];
    
        for(let i = 0; i < arrDiagonal1.length; i++) {
            if(arrDiagonal1[i][0] == valueX && arrDiagonal1[i][1] == valueY) {
                arrDiagonal1.splice(i, 1);
            }
        }
        
        for(let j = 0; j < arrDiagonal1.length; j++) {
        if(meaning == 1) {
            if(document.querySelector(`[positionx = '${arrDiagonal1[j][0]}'][positiony = '${arrDiagonal1[j][1]}']`).className == 'X') {
                arrDiagonal1.splice(j, 1);
                
            }
        }
    
        if(meaning == 2) {
            if(document.querySelector(`[positionx = '${arrDiagonal1[j][0]}'][positiony = '${arrDiagonal1[j][1]}']`).className == 'O') {
                arrDiagonal1.splice(j, 1);
                
            } 
        }
    
        }   
    
        if(arrDiagonal1.length == 1) {
            
                let nextO = document.querySelector(`[positionx = '${arrDiagonal1[0][0]}'][positiony = '${arrDiagonal1[0][1]}']`).getAttribute('id');
                let nextONum = Number(nextO[nextO.length - 1]);
                
                if(meaning == 1) {
                    if(document.querySelector(`#f${nextONum}`).className == 'O') {
                        checkDiagonal2(positionCheck,meaning);
                    } else {
                        setTimeout(drawZero, 4000, nextONum, 2);
                        console.log(`checkDiagonal1OOOOOOO${nextONum}`);
                        return;
                    }
                    
                }
                if(meaning == 2) {
                    if(document.querySelector(`#f${nextONum}`).className == 'X') {
                        checkDiagonal2(positionCheck,meaning);
                    } else {
                        setTimeout(drawCross, 4000, nextONum, 2);
                        console.log(`checkDiagonal1XXXXXXXXXXXX${nextONum}`);
                        return;
                    }
                }  
        } else {
            checkDiagonal2(positionCheck,meaning);
        }
    }  else {
        checkDiagonal2(positionCheck,meaning);
    }
     

    
}

function checkDiagonal2(positionCheck, meaning) {

    let valueX = Number(document.querySelector(`#f${positionCheck}`).getAttribute("positionX"));
    let valueY = Number(document.querySelector(`#f${positionCheck}`).getAttribute("positionY"));
    let arrDiagonal2 = [[0, 2], [1, 1], [2, 0]];

    for(let i = 0; i < arrDiagonal2.length; i++) {
        if(arrDiagonal2[i][0] == valueX && arrDiagonal2[i][1] == valueY) {
            arrDiagonal2.splice(i, 1);
        }
    }

    for(let j = 0; j < arrDiagonal2.length; j++) {
        if(meaning == 1) {
            if(document.querySelector(`[positionx = '${arrDiagonal2[j][0]}'][positiony = '${arrDiagonal2[j][1]}']`).className == 'X') {
                arrDiagonal2.splice(j, 1);
            } 
        }
    
        if(meaning == 2) {
            if(document.querySelector(`[positionx = '${arrDiagonal2[j][0]}'][positiony = '${arrDiagonal2[j][1]}']`).className == 'O') {
                arrDiagonal2.splice(j, 1);
            } 
        }
    
        } 
        
        if(arrDiagonal2.length == 1) {
        
            let nextO = document.querySelector(`[positionx = '${arrDiagonal2[0][0]}'][positiony = '${arrDiagonal2[0][1]}']`).getAttribute('id');
            let nextONum = Number(nextO[nextO.length - 1]);
            
            if(meaning == 1) {
                if(document.querySelector(`#f${nextONum}`).className == 'O') {
                    definitionOfEmpty(meaning);
                } else {
                    setTimeout(drawZero, 4000, nextONum, 2);
                    console.log(`checkDiagonal2OOOOOO${nextONum}`);
                    return;
                }
                
            }
            if(meaning == 2) {
                if(document.querySelector(`#f${nextONum}`).className == 'X') {
                    definitionOfEmpty(meaning);
                } else {
                    setTimeout(drawCross, 4000, nextONum, 2);
                    console.log(`checkDiagonal2XXXXXX${nextONum}`);
                    return;
                }
            }  
    } else {
        // alert("BUUUUUU")
        definitionOfEmpty(meaning)
    }
    
}

function definitionOfEmpty(meaning) {
    let count = 0;
    for(let j = 0; j < 9; j++) {
        if(document.querySelector(`#f${j}`).className == 'O' || document.querySelector(`#f${j}`).className == 'X') {
            count++;
        }
    }
    if(count == 9) {
        alert("No Win - draw");
            return;
    }
    for(let i = 0; i < 9; i++) {
            if(meaning == 1) {
                console.log(document.querySelector(`#f${i}`).className);
                if(document.querySelector(`#f${i}`).className != 'O') {
                    if(document.querySelector(`#f${i}`).className != 'X') {
                        setTimeout(drawZero, 4000, i, 2);
                        console.log(`definitionOfEmptyOOOOO${i}`);
                        break;
                    }
                }
            }
            if(meaning == 2) {
                console.log(document.querySelector(`#f${i}`).className);
                if(document.querySelector(`#f${i}`).className != 'X') {
                    if(document.querySelector(`#f${i}`).className != 'O') {
                        setTimeout(drawCross, 4000, i, 2);
                        console.log(`definitionOfEmptyXXXXXX${i}`);
                        break;
                    }
                    
                } 
            }
          
    }
    
    
    
}

function checkWin() {
    let arrAll = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for(let i = 0; i < arrAll.length; i++) {
        let counterX = 0;
        let counterO = 0;

        let drawValue = 0;
        for(let k = 0; k < 9; k++) {
            if(document.querySelector(`#f${k}`).className == 'X' || 
            document.querySelector(`#f${k}`).className == 'O') {
                drawValue++;
            }
        }
        if(drawValue == 9) {
            alert("No Win - draw");
            return 1;
        }
        for(let j = 0; j < arrAll[i].length; j++) {
            if(document.querySelector(`#f${arrAll[i][j]}`).className == 'X') {
                counterX++;  
            }
            if(document.querySelector(`#f${arrAll[i][j]}`).className == 'O') {
                counterO++;  
            }

            if(counterX == 3) {
                alert("Winner Player 'X");
                return 1;
            }
            if(counterO == 3) {
                alert("Winner Player 'O");
                return 1;
            }

        }
    }
}













