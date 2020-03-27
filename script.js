
/* ------------------------------ FUNCTIONS ------------------------------ */

// change the color the given space
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// return the color of the given space
function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// check for the bottom-most empty space in a given column
function checkBottom(colIndex) {
    var colorReport = returnColor(5, colIndex);
    
    for(var i = 5; i >= 0; i--) {
        colorReport = returnColor(i, colIndex);

        if(colorReport === 'rgb(128, 128, 128)') {
            return i;
        }
    }
}

// given four spaces, check whether all four spaces have the same color
// make sure all four spaces are within the bounds of the board and are not empty
function colorMatchCheck(one, two, three, four) {
    return (one == two && one == three && one == four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// check for hortizontal win
function horizontalCheck() {
    for(var col = 0; col < 4; col++) {
        for(var row = 0; row < 6; row++) {
            if(colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
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
            if(colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
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
                return true;
            } else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
                return true;
            }
        }
    }
    return false;
}

// display the "gave over" text
function gameOver(winningPlayer) {
    $('h2').text(winningPlayer + " is the winner!");
    $('h4').text("Refresh your browser to play again.")
    game_on = false;
}


/* ------------------------------ GLOBAL VARIABLES ------------------------------ */

// player variables for name and color
var player1;
var player1Color;
var player2;
var player2Color;

// current variables for which player makes the next move
var currentPlayer;
var currentName;
var currentColor;

// used to determine if the game is being played
var game_on = true;

// table variable holds an array of all the table rows
var table = $('table tr');


/* ------------------------------ EVENT HANDLERS ------------------------------ */

// click on the button to begin the game
$('#start-button').on('click', function() {

    // hide the start button and display the board
    $('#start-button').hide('slow');
    $('#board').toggle();

    // prompt Player 1
    player1 = prompt("Player One: Enter Your Name , you will be Blue");
    player1Color = 'rgb(86, 151, 255)';

    // prompt Player 2
    player2 = prompt("Player Two: Enter Your Name, you will be Red");
    player2Color = 'rgb(237, 45, 73)';

    // begin the game with player one
    currentPlayer = 1;
    currentName = player1;
    currentColor = player1Color;
});

// click on a space within the board to make the next move
$('#board button').on('click', function() { 

    // prevents the players from making any more moves when the game has ended
    if(!game_on) {
        return 0;
    }

    // store the column chosen in a variable
    var col = $(this).closest("td").index();

    // store the bottom empty space in the column chosen
    var bottomAvail = checkBottom(col);

    // drop the chip in the bottom-most available space of the chosen column
    changeColor(bottomAvail, col, currentColor);

    // check for a win or a tie
    if(horizontalCheck() || verticalCheck() || diagonalCheck()) {
        // trigger the game over function
        gameOver(currentName);
    } else {
        // if there is no win or tie, continue to next player
        currentPlayer = currentPlayer * -1;

        // check who the current player is and display the applicable text
        if(currentPlayer == 1) {
            currentName = player1;
            $('h2').text("It is " + currentName + "'s turn!");
            $('h4').text("Pick a column to drop your blue chip.");
            currentColor = player1Color;
        } else {
            currentName = player2;
            $('h2').text("It is " + currentName + "'s turn!");
            $('h4').text("Pick a column to drop your red chip.");
            currentColor = player2Color;
        }
    }

});
