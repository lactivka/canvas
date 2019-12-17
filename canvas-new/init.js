import {canvas} from "./index.js";

export function init() {
    let dataURL = localStorage.getItem("canvasImage");
    document.querySelector(".tool__red").children[0].style.backgroundColor = "#ff0000";
    document.querySelector(".tool__blue").children[0].style.backgroundColor = "#0000ff";
    /*let drawing = false;*/

    if (dataURL === null) initDefault();
    else initFromStorage(dataURL);

    
}

function initDefault() {
    canvas.width = 512;
    canvas.height = 512;
    /*currentColor = "#008000";
    document.querySelector(".tool__current").children[0].style.backgroundColor = currentColor;
    prevColor = "#ffa500";
    document.querySelector(".tool__prev").children[0].style.backgroundColor = prevColor;*/
}

function initFromStorage(dataURL) {
    let width = localStorage.getItem("width");
    let height = localStorage.getItem("height");
    /*currentColor = "#008000";
    document.querySelector(".tool__current").children[0].style.backgroundColor = currentColor;
    prevColor = "#ffa500";
    document.querySelector(".tool__prev").children[0].style.backgroundColor = prevColor;*/
    canvas.drawPicture(dataURL, width, height);
    
    
}

