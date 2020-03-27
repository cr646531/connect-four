Description

A simple Connect Four game made with Javascript, jQuery, HTML and CSS. The game could have been made more efficiently, but the aim was to show how jQuery can be used to interact with the DOM.

Gameplay

This game is played on a vertical board which has seven columns and six rows. At the beginning of the game, all the spaces are empty. Each turn, one player will choose a column, and the bottom-most empty space in that column will change color to indicate that the space belongs to them. So, in every turn there are at most seven different spaces that can be chosen. If all the spaces in a column have been filled, the player must chose another column. Players alternate each turn.

Objective

The aim for both players is to connect four spaces in a straight line. The line can be vertical, horizontal or diagonal. The first player to connect four of their spaces wins.