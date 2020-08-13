let numSquares = 6;
let colours = [];
let selectedColor = selectRandomColour();

// display selectors
let header = document.getElementById("header");
let intro = document.getElementById("intro");
let colourDisplay = document.getElementById("colourDisplay");
let msgDisplay = document.getElementById("msgDisplay");

// control selectors
let squares = document.querySelectorAll(".square");
let resetButton = document.getElementById("resetButton");
let modeButtons = document.querySelectorAll(".mode");

var game = {};

game.init = function() {

    // populate selection prompt
    colourDisplay.innerHTML = selectedColor;

    // set page listeners
    setButtonListeners();
    setSquareListeners();

    // default mode is Hard
    resetBoard(6);
}

// runs when page is loaded
// initializes event listeners
game.init();

function setButtonListeners() {
    for (let i = 0; i < modeButtons.length; i++) {

        modeButtons[i].addEventListener("click", function() {
    
            // remove "selected" class from all present buttons
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
    
            // add class to clicked button
            this.classList.add("selected");
    
            // reset board
            // update number of squares based on difficulty
            this.textContent === "EASY" ? resetBoard(3): resetBoard(6);
        });
    }

    resetButton.addEventListener("click", function() {
        resetBoard(numSquares);
    });
}

function setSquareListeners() {
    for (let i = 0; i < squares.length; i++) {

        // apply initial colours to squares
        squares[i].style.backgroundColor = colours[i];

        // add click listeners to squares
        squares[i].addEventListener("click", function() {
            //obtain colour of clicked square
            console.log(this.style.backgroundColor);
            let clickedColour = this.style.backgroundColor;

            // check win condition by comparing
            // colour to selectedColour variable
            if (clickedColour === selectedColor) {
                msgDisplay.innerHTML = "Correct!";
                resetButton.innerHTML = "Play Again";
                intro.style.backgroundColor = clickedColour;
                updateColours(clickedColour);
            } else {
                msgDisplay.innerHTML = "Try Again...";
                this.style.backgroundColor = "#232323";
            }
        });
    }
}

function resetBoard(numberOfSquares) {

    // update number of squares
    numSquares = numberOfSquares;
    colours = generateColours(numSquares);
    selectedColor = selectRandomColour();

    // update colourDisplay text
    colourDisplay.innerHTML = selectedColor;

    //revert reset button text and update msgDisplay
    resetButton.innerHTML = "New Colours";
    msgDisplay.innerHTML = "";
    intro.style.backgroundColor = "#232323";

    // change colours of squares
    for (let i = 0; i < squares.length; i++) {
        if (colours[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colours[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

function generateColours(num) {

    // initialize an empty array
    let arr = [];

    // and num amount of random colours to array
    for (let i = 0; i < num; i++) {
        // get random colour and push into array
        arr[i] = createColour();
    }

    return arr;
}

/* Math.floor() "chops" off decimals*/
/* Math.random() returns a floating-point number
between 0 and 1 (0 inclusive but NOT 1) */
function createColour() {

    // pick random rgb values from 0-255
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    // return synthesized property string
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

/* helper function that randomly selects an index
from colours array */
function selectRandomColour() {

    let random = Math.floor(Math.random() * colours.length);
    
    return colours[random];
}

function updateColours(colour) {

    //loop through all squares
    //change each colour to match given colour
    for (let i = 0; i < colours.length; i++) {
        squares[i].style.backgroundColor = colour;
    }
}
