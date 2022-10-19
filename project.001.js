const unitLength = 40;
const boxColor = 'blue';
const strokeColor = '#FAFAD2';
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;

const aduioControl = document.getElementById("aduioControl");
const mp3Aduio = document.getElementById("mp3Aduio")
const bgvideo = document.getElementById("bgvideo");

window.onload = function () {

    aduioControl.src = "Super Mario Bros. Soundtrack.mp3";
    aduioControl.load();

    aduioControl.addEventListener("load", () => {

        aduioControl.play();
    })


}


function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth-200, windowHeight - 200);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}

let img;
function preload() {
    img = loadImage('star.webp');
}

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
}

function draw() {
    // background(255);
    clear()
    generate();

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                fill('rgba(0,0,0,0.5)');
                frameRate(1);
                image(img, i * unitLength, j * unitLength, unitLength, unitLength);
            } else {
                fill(255, 0);
                stroke(strokeColor);
                strokeWeight(0.5);
                rect(i * unitLength, j * unitLength, unitLength, unitLength);
            }
        }
    }
}

function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < 2) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > 3) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == 3) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}


function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;

    // fill("red");
    // stroke(strokeColor);
    // rect(x * unitLength, y * unitLength, unitLength, unitLength);
    image(img, x * unitLength, y * unitLength, unitLength, unitLength);

}

/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop();
    mouseDragged();
    bgvideo.play()
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}

document.querySelector('#start-button')
    .addEventListener('click', function () {
        loop();
        let audio = new Audio()
        audio.onloadeddata = () => {
            audio.play()
        }
        audio.src = 'MyMovie.mp3'
    });
document.querySelector('#stop-button')
    .addEventListener('click', function () {
        noLoop();
        let audio = new Audio()
        audio.onloadeddata = () => {
            audio.play()
        }
        audio.src = 'MyMovie.mp3'
    });

document.querySelector('#reset-button')
    .addEventListener('click', function () {
        init();
        let audio = new Audio()
        audio.onloadeddata = () => {
            audio.play()
        }
        audio.src = 'MyMovie.mp3'
    });


    document.querySelector('#mute-button')
    .addEventListener('click', function () {
        aduioControl.pause()
    });

    document.querySelector('#unmute-button')
    .addEventListener('click', function () {
        aduioControl.play()
    });



let audio 
window.addEventListener('mousedown', function () {
 s
});


let nighttheme = false;
const nightthemeButton = document.querySelector('#nighttheme-button')

nightthemeButton.addEventListener('click', function () {


    const canvasEle = document.querySelector("#canvas");
    // console.log("hello");

   if (nighttheme) {
    nightthemeButton.innerHTML = '<img src="mario.png" class = "sun" style="margin-bottom: 15px">'
    canvasEle.style.backgroundImage = "url(nightheme.jpeg)"
   }
   else{
    nightthemeButton.innerHTML = '<img src="moon.png" class = "moon" style="margin-bottom: 15px">'
    canvasEle.style.backgroundImage = null
    }

   nighttheme = !nighttheme


});


