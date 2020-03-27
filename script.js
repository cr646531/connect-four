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

// find the row and column within the table using the input parameters
// return the color of the space (represented as a button)
function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// check for the next empty space in a given column
function checkBottom(colIndex) {
    var colorReport;
    
    for(var i = 5; i <= 0; i--) {
        colorReport = returnColor(i, colIndex);

        if(colorReport === 'rgb(128, 128, 128)') {
            return i;
        }
    }
}

// given four spaces, check whether all four spaces have the same color
// make sure all four spaces are within the bounds of the board and are not empty spaces
function colorMatchCheck(one, two, three, four) {
    return (one == two && one == three && one == four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// check for hortizontal win
function horizontalCheck() {
    for(var col = 0; col < 6; col++) {
        for(var row = 0; row < 4; row++) {
            if(colorMatchCheck(returnColor(row, col) && returnColor(row, col + 1) && returnColor(row, col + 2) && returnColor(row, col + 3))) {
                reportWin(row, col);
                return true;
            }
        }
    }
    return false;
}

// check for vertical wins
function verticalCheck() {
    for(var col = 0; col < 6; col++) {
        for(var row = 0; row < 4; row++) {
            if(colorMatchCheck(returnColor(row, col)) && returnColor(row + 1, col) && returnColor(row + 2, col) && returnColor(row + 3, col)) {
                reportWin(row, col);
                return true;
            }
        }
    }
    return false;
}

// check for diagonal wins
function diagonalCheck() {
    for(var col = 0; col < 5; col++) {
        for(var row = 0; row < 7; row++) {
            if(colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                reportWin(row,col);
                return true;
            } else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
                reportWin(row, col);
                return true;
            }
        }
    }
    return false;
}

// game over
function gameOver(winningPlayer) {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 7; row++) {
            $('h3').fadeOut('fast');
            $('h1').text(winningPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px")
        }
    }
}

// begin the game with player one
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

// start with player one
$('h3').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on('click', function(){

    // store the column chosen in a variable
    var col = $(this).closest("td").index();

    // store the bottom empty space in the given column
    var bottomAvail = checkBottom(col);

    // drop the chip in that column at the bottomAvail row
    changeColor(bottomAvail, col, currentColor);

    // check for a win or a tie
    if(horizontalCheck() || verticalCheck() || diagonalCheck()) {
        gameEnd(currentName);
    }

    // if no win or tie, continue to next player
    currentPlayer = currentPlayer * -1;

    // check who the current player is.
    if(currentPlayer == 1) {
        currentName = player1;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1Color;
    } else {
        currentName = player2;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
        currentColor = player2Color;
    }
});
