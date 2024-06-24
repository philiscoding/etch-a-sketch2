//16x16 divs
//they need to be in a container
//border,margins and box model
//
const body = document.querySelector("body");
const sketchContainer = document.createElement("div");
const buttonContainer = document.createElement("div");
const input = document.createElement("input");
const button = document.createElement("button");

sketchContainer.classList.add("sketch-container");
buttonContainer.classList.add("button-container");
button.classList.add("button");
button.textContent = "GO!";
input.setAttribute("placeholder", "Enter grid size: Eg 64")

buttonContainer.appendChild(input);
buttonContainer.appendChild(button);
body.appendChild(sketchContainer);
body.insertBefore(buttonContainer, sketchContainer);

let drawState = false;


window.addEventListener("mousedown", function (e) {
    if (e.button === 0) {
        drawState = true;
    }
});

window.addEventListener("mouseup", function (e) {
    if (e.button === 0) {
        drawState = false;
    }
});

//generate grid based on input value
button.addEventListener("click", function generateGrid() {

    sketchContainer.innerHTML = "";

    let squares = input.value;
    let userInput = +input.value * +input.value;
    let size = 800 / squares;

    for (let i = 0; i < userInput; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.height = size + "px";
        square.style.width = size + "px";
        square.addEventListener("mouseenter", paint)
        sketchContainer.appendChild(square);
    }
});

//create 16 div's and append them to container
// for (let i = 0; i < 256; i++) {
//     const square = document.createElement("div");
//     square.classList.add("square");
//     square.addEventListener("mouseenter", paint)
//     sketchContainer.appendChild(square);
// }

//on click, look at input data
//generate new sequence of divs based on number


function paint() {
    if (drawState) {
        this.classList.add("black");
    }
}
