import {data4x4} from "./data4x4.js";
import {data32x32} from "./data32x32.js";
import {Canvas} from "./canvas.js";
import {init, color} from "./init.js";
import {Tools} from "./tools.js";

let canvasElement = document.getElementById("canvas");
let buttons = document.querySelector(".draw");
let drawTools = document.querySelector(".tools-for-draw");
let colorTools = document.querySelector(".select-color");
let colorInput = document.querySelector(".color-input");
export let canvas = new Canvas(canvasElement);
let tool = new Tools(document.querySelector(".tool__pencil"));
let drawing = false;
const src = "./asets/canvasimage.png";
let oldCoordinates = [];
let coordinates = [];

init();

function defineArray (data) {
    if (data.localeCompare("4") === 0) return data4x4;
    if (data.localeCompare("32") === 0) return data32x32;
    return false;
}

function calcCoordinates(event) {
    let target = [];
    let x = event.pageX - event.target.offsetLeft;
    let y = event.pageY - event.target.offsetTop;
    
    target.push(Math.floor(x*canvas.getWidth()/512));
    target.push(Math.floor(y*canvas.getHeight()/512));
   
    return target;
}

function defineFunctionName(activeTool) {
    if (activeTool.localeCompare("bucket") === 0) { return "bucketFill"; }
    if (activeTool.localeCompare("choose") === 0) { return "pixelColor"; }
    if (activeTool.localeCompare("pencil") === 0) { return "drawRectangle"; }
}

window.onload = buttons.addEventListener("click", (event) => {
    const data = event.target.dataset.array;
    
    if (data.localeCompare("image") === 0) canvas.drawPicture(src, 256, 256);
    else {
        const array = defineArray(data);
        canvas.drawPixel(data, array); 
    }
});

window.onload = drawTools.addEventListener("click", (event) => {
    tool.activate(event.target);
} );

window.onload = canvasElement.addEventListener("mousedown", (event) => {
    drawing = true;
    coordinates = calcCoordinates(event);
    let functionName = defineFunctionName((document.querySelector(".active").classList[0]).slice(6));
    
    canvas[functionName](color.currentColor, coordinates);
})

window.onload = canvasElement.addEventListener("mousemove", (event) => {
    if (drawing) {
        oldCoordinates = coordinates;
        coordinates = calcCoordinates(event);
        canvas.drawRectangle(color.currentColor, oldCoordinates, coordinates);
    }
})  
 
window.onload = canvasElement.addEventListener("mouseup", () => {
    drawing = false;
})

window.onload = canvasElement.addEventListener("mouseleave", () => {
    drawing = false;
})

window.onload = colorInput.onchange =  () => {
    color.changeCurrentFromInput();
}

window.onload = colorTools.addEventListener("click", (event) => {
   color.changeColor(event.target);     
});
// select tool for draw by pressing keyboard key 
window.onload = document.addEventListener("keydown", (event) => {

    switch(event.code) {
        case "KeyB": // select fill bucket
            tool.activate(document.querySelector(".tool__bucket"));
            break;
        case "KeyC": // select choose color
            tool.activate(document.querySelector(".tool__choose"));
            break;
        case "KeyP": // select pencil
            tool.activate(document.querySelector(".tool__pencil"));
            break;
    }
})
// save current condition to local storage
window.onbeforeunload = () => {
    canvas.saveCanvas();
    color.saveColor();
}