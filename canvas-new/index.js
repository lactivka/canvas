import {data4x4} from "./data4x4.js";
import {data32x32} from "./data32x32.js";
import {Canvas} from "./canvas.js";
import {init, color} from "./init.js";
import {Tools} from "./tools.js";

const canvasElement = document.getElementById("canvas");
const buttons = document.querySelector(".draw");
const drawTools = document.querySelector(".tools-for-draw");
const colorTools = document.querySelector(".select-color");
const colorInput = document.querySelector(".color-input");
export const currentColorElement = document.querySelector(".tool__current");
export const prevColorElement = document.querySelector(".tool__prev");
export const canvas = new Canvas(canvasElement);
const tool = new Tools(document.querySelector(".tool__pencil"));
let drawing = false;
const src = "./asets/canvasimage.png";
let oldCoordinates = [];
let coordinates = [];

window.onload = init();

function defineArray (data) {
    if (data === "4") return data4x4;
    if (data === "32") return data32x32;
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
    if (activeTool === "bucket") { 
        return "bucketFill"; 
    }
    if (activeTool === "choose") {
        return "getPixelColor"; 
    }
    if (activeTool === "pencil") { 
        return "drawRectangle"; 
    }
}

buttons.addEventListener("click", (event) => {
    const data = event.target.dataset.array;
    
    if (data === "image") {
        canvas.drawPicture(src, 256, 256);
        return;
    }
    
    const array = defineArray(data);
    canvas.drawPixel(data, array); 
    
});

drawTools.addEventListener("click", (event) => {
    tool.activate(event.target);
} );

canvasElement.addEventListener("mousedown", (event) => {
    drawing = true;
    coordinates = calcCoordinates(event);
    let functionName = defineFunctionName((document.querySelector(".active").classList[0]).slice(6));
    
    canvas[functionName](color.currentColor, coordinates);
})

canvasElement.addEventListener("mousemove", (event) => {
    if (drawing) {
        oldCoordinates = coordinates;
        coordinates = calcCoordinates(event);
        canvas.drawRectangle(color.currentColor, oldCoordinates, coordinates);
    }
})  
 
canvasElement.addEventListener("mouseup", () => {
    drawing = false;
})

canvasElement.addEventListener("mouseleave", () => {
    drawing = false;
})

colorInput.onchange =  () => {
    let selectedColor = colorInput.value;
    color.changeCurrentFromInput(selectedColor, currentColorElement, colorInput);
}

colorTools.addEventListener("click", (event) => {
   color.changeColor(event.target, currentColorElement, prevColorElement);     
});
// select tool for draw by pressing keyboard key 
document.addEventListener("keydown", (event) => {

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
    localStorage.setItem("canvasImage", canvasElement.toDataURL());
    localStorage.setItem("width", canvasElement.width);
    localStorage.setItem("height", canvasElement.height);
    localStorage.setItem("currentColor", color.currentColor);
    localStorage.setItem("prevColor",  color.prevColor);
}