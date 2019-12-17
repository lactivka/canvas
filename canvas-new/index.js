import {data4x4} from "./data4x4.js";
import {data32x32} from "./data32x32.js";
import {Canvas} from "./canvas.js";
import {init} from "./init.js";

export let canvas = new Canvas(document.getElementById("canvas"));
const src = "./asets/canvasimage.png";
init();

/*let currentColor = localStorage.getItem("currentColor");
let prevColor = localStorage.getItem("prevColor");*/
let drawing = false;

// set select-color tools colors 
/*document.querySelector(".tool__current").children[0].style.backgroundColor = currentColor;
document.querySelector(".tool__prev").children[0].style.backgroundColor = prevColor;
document.querySelector(".tool__red").children[0].style.backgroundColor = "#ff0000";
document.querySelector(".tool__blue").children[0].style.backgroundColor = "#0000ff";*/

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

    setCurrentColor(clicked) { // color changing
        
        let prevColor = document.querySelector(".tool__prev").children[0].style.backgroundColor;
        
        this.clicked = clicked;
        this.changePrevTo();
        this.changeCurrentTo(clicked, prevColor);
    }

    changePrevTo() { // change color of prev tool to current tool color
        
        document.querySelector(".tool__prev").children[0].style.backgroundColor = 
        document.querySelector(".tool__current").children[0].style.backgroundColor;
    }

    changeCurrentTo(clicked, prevColor) { // change current tool color:

        if (clicked.closest(".tool__prev")) {  // to prev tool color
            document.querySelector(".tool__current").children[0].style.backgroundColor = 
            prevColor;
        }

        if (clicked.closest(".tool__red")) { // to red
            document.querySelector(".tool__current").children[0].style.backgroundColor = 
            document.querySelector(".tool__red").children[0].style.backgroundColor;   
        }
          
        if (clicked.closest(".tool__blue")) { // to blue
           document.querySelector(".tool__current").children[0].style.backgroundColor = 
           document.querySelector(".tool__blue").children[0].style.backgroundColor;   
        } 
         
    }

    changeCurrentFromInput() { // change current color to color selected in input
        
           document.querySelector(".tool__current").children[0].style.backgroundColor = 
           document.querySelector(".color-input").value;

           document.querySelector(".color-input").value = "#eeebeb";
    }

    changeCurrentFromChooseColor(pixelData) {
        document.querySelector(".tool__current").children[0].style.backgroundColor = ('rgba(' + pixelData + ')');
    }
}

let tool = new DrawingTools();

window.onload = document.querySelector(".draw").addEventListener("click", (event) => {
    const data = event.target.dataset.array;
    
    if (data.localeCompare("image") === 0) canvas.drawPicture(src, 256, 256);
    else {
        const array = defineArray(data);
        canvas.drawArray(data, array); 
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
    tool.changeCurrentFromInput();
}

window.onload = document.querySelector(".select-color").addEventListener("click", (event) => {
    tool.setCurrentColor(event.target);     
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
    localStorage.setItem("currentColor", document.querySelector(".tool__current").children[0].style.backgroundColor);
    localStorage.setItem("prevColor",  document.querySelector(".tool__prev").children[0].style.backgroundColor);
}