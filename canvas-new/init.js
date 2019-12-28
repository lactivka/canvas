import {canvas} from "./index.js";
import {Color} from "./сolor.js";
export let color;

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
    document.querySelector(".tool__current").children[0].style.backgroundColor = "#008000";
    document.querySelector(".tool__prev").children[0].style.backgroundColor = "#ffa500";
    color = new Color("#008000", "#ffa500", "#ff0000", "#0000ff");
}

function initFromStorage(dataURL) {
    let width = localStorage.getItem("width");
    let height = localStorage.getItem("height");

    canvas.drawPicture(dataURL, width, height);
    document.querySelector(".tool__current").children[0].style.backgroundColor = localStorage.getItem("currentColor");
    document.querySelector(".tool__prev").children[0].style.backgroundColor = localStorage.getItem("prevColor");
    color = new Color(localStorage.getItem("currentColor"), localStorage.getItem("prevColor"), "#ff0000", "#0000ff");
}

