import {data4x4} from "./data4x4.js";
import {data32x32} from "./data32x32.js";
import {Canvas} from "./canvas.js";
import {init, color} from "./init.js";

export let canvas = new Canvas(document.getElementById("canvas"));
init();

const src = "./asets/canvasimage.png";

let drawing = false;

function defineArray (data) {
    if (data.localeCompare("4") === 0) return data4x4;
    if (data.localeCompare("32") === 0) return data32x32;
    return false;
}

class DrawingTools {

    activate(clicked) { // set active status for selected tool
        document.querySelector(".active").classList.remove("active");
        clicked.classList.add("active");
    }

    bucketUse() { // fill canvas with current color
            
        ctx.fillStyle = document.querySelector(".tool__current").children[0].style.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    chooseUse(event) { // set current color equal pixel color clicked on canvas
        
        let x = event.pageX - event.target.offsetLeft;
        let y = event.pageY - event.target.offsetTop; 

        let pixelData = ctx.getImageData(Math.floor(x*canvas.width/512), Math.floor(y*canvas.height/512), 1, 1).data;
        this.changePrevTo();
        this.changeCurrentFromChooseColor(pixelData);       
    }

    pencilUse(event) { // draw on canvas with pencil tool
        
        let x = event.pageX - event.target.offsetLeft;
        let y = event.pageY - event.target.offsetTop; 
                 
        ctx.fillStyle = document.querySelector(".tool__current").children[0].style.backgroundColor;
        ctx.fillRect(Math.floor(x*canvas.width/512), Math.floor(y*canvas.height/512), 1, 1);  
    }
}

let tool = new DrawingTools();

window.onload = document.querySelector(".draw").addEventListener("click", (event) => {
    const data = event.target.dataset.array;
    
    if (data.localeCompare("image") === 0) canvas.drawPicture(src, 256, 256);
    else {
        const array = defineArray(data);
        canvas.drawPixel(data, array); 
    }
});

window.onload = document.querySelector(".tools-for-draw").addEventListener("click", (event) => {
    tool.activate(event.target);
} );

window.onload = document.getElementById("canvas").addEventListener("mousedown", (event) => {
    drawing = true;
    let functionName = (document.querySelector(".active").classList[0]).slice(6) + "Use";
    tool[functionName](event);
})

window.onload = document.getElementById("canvas").addEventListener("mousemove", (event) => {
    if (drawing) {
        tool.pencilUse(event);
    }
})  
 
window.onload = document.getElementById("canvas").addEventListener("mouseup", () => {
    drawing = false;
})

window.onload = document.getElementById("canvas").addEventListener("mouseleave", () => {
    drawing = false;
})

window.onload = document.querySelector(".color-input").onchange =  () => {
    color.changeCurrentFromInput();
}

window.onload = document.querySelector(".select-color").addEventListener("click", (event) => {
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