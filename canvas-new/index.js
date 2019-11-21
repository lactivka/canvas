import {data4x4} from "./data4x4.js";
import {data32x32} from "./data32x32.js";

let canvas = document.getElementById("canvas");

class DrawByButton {
    handleEvent (event) {
        switch (event.target.dataset.array) {
            case "4":
                if (canvas.getContext) {
                    let ctx = canvas.getContext("2d");
                    canvas.width = 4;
                    canvas.height = 4;
                    data4x4.forEach((row, i) => {
                        row.forEach((column, j) => {
                            ctx.fillStyle = "#" + column;
                            ctx.fillRect(i, j, canvas.width, canvas.height);
                        })
                    })
                }
                break;
            case "32":
                if (canvas.getContext) {
                    let ctx = canvas.getContext("2d");
                    canvas.width = 32;
                    canvas.height = 32;
                    data32x32.forEach((row, i) => {
                        row.forEach((column, j) => {
                            ctx.fillStyle = "rgba(" + column + ")";
                            ctx.fillRect(i, j, canvas.width, canvas.height);
                        })
                    })
                }
                break;
            case "image":
                if (canvas.getContext) {
                    let ctx = canvas.getContext("2d");
                    let img = new Image(); 
                    canvas.width = 256;
                    canvas.height = 256; 
                    img.onload = function() {
                        ctx.drawImage(img, 0, 0);
                    }           
                    img.src = "./asets/canvasimage.png";
                }
                break;
        }
    }
}

let draw = new DrawByButton();
window.onload = document.querySelector(".draw").addEventListener("click", draw);