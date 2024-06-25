const body = document.querySelector("body");
const sketchContainer = document.createElement("div");
const buttonContainer = document.createElement("div");
const input = document.createElement("input");
const button = document.createElement("button");
const shadingButton = document.createElement("button");
const rainBowButton = document.createElement("button");
const resetButton = document.createElement("button");

sketchContainer.classList.add("sketch-container");
buttonContainer.classList.add("button-container");
button.classList.add("button");
button.textContent = "CREATE GRID";
input.setAttribute("placeholder", "Enter grid size: Eg 64")
shadingButton.textContent = "SHADING";
rainBowButton.textContent = "RAINBOW MODE";
resetButton.textContent = "RESET";
shadingButton.classList.add("button");
rainBowButton.classList.add("button");
resetButton.classList.add("button");

buttonContainer.appendChild(input);
buttonContainer.appendChild(button);
buttonContainer.appendChild(shadingButton);
buttonContainer.appendChild(rainBowButton);
buttonContainer.appendChild(resetButton);

body.appendChild(sketchContainer);
body.insertBefore(buttonContainer, sketchContainer);

let colorMode = "default";
let shading = false;
let drawState = false;


sketchContainer.addEventListener("mousedown", function (e) {
    if (e.button === 0) {
        drawState = true;
    }
});

sketchContainer.addEventListener("mouseup", function (e) {
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
        square.addEventListener("mouseover", paint);
        square.addEventListener("mousedown", paint);
        sketchContainer.appendChild(square);
    }
});

shadingButton.addEventListener("click", () => {
    shading = true;
});

rainBowButton.addEventListener("click", () => {
    colorMode = "rainbow";
});

resetButton.addEventListener("click", () => {
    colorMode = "default";
    shading = false;
});

// create 16 div's and append them to container
for (let i = 0; i < 256; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.height = "50px";
    square.style.width = "50px";
    square.addEventListener("mouseover", paint);
    square.addEventListener("mousedown", paint);
    sketchContainer.appendChild(square);
}

function paint(e) {
    //default black
    if (e.type === 'mouseover' && !drawState) return
    if (drawState && colorMode == "default") {
        e.target.style.backgroundColor = "black"
    }
    //rainbow colors
    else if (drawState && colorMode == "rainbow") {
        let max = rainbowColors.length;
        let randomRainbowColor = getRandomNum(max);
        e.target.style.backgroundColor = rainbowColors[randomRainbowColor];
    }
    //shading functionality
    if (drawState && shading) {
        let opacity = 0.1;

        if (!e.target.style.opacity) {
            e.target.style.opacity = opacity.toString();
        } else {
            let opacityAsNum = +e.target.style.opacity + opacity;
            e.target.style.opacity = opacityAsNum.toString();
        }
    }
}

//get random num from 0 to max
function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

const rainbowColors = [
    "#E81416",
    "#FFA500",
    "#FAEB36",
    "#79C314",
    "#487DE7",
    "#4B369D",
    "#70369D"
];
