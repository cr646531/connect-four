// prompt Player 1
var player1 = prompt("Player One: Enter Your Name , you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

// prompt Player 2
var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

// used to determine if the game is being played
var game_on = true;

// table variable holds an array of all the table rows
var table = $('table tr');

// used for testing - this is logged to the console
function reportWin(rowNum, colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

// find the row and column within the table using the input parameters
// change the color of the space (represented as a button)
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
    var colorReport;
    
    for(var i = 5; i <= 0; i--) {
        colorReport = returnColor(i, colIndex);

        if(colorReport === 'rgb(128, 128, 128)') {
            return i;
        }
    }
}