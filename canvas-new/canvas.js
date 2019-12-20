import {color} from "./init.js";

export class Canvas {

    constructor(canvaselement) {
        this.canvas = canvaselement;
        this.ctx = canvas.getContext("2d");
    }

    getWidth() {
        return this.canvas.width;
    }
    
    getHeight() {
        return this.canvas.height;
    }

    drawPicture(source, width, height) {
        const img = new Image;
        this.canvas.width = width;
        this.canvas.height = height; 
        img.crossOrigin = 'anonymous';
        img.src = source;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
        }
    }

    drawPixel(data, array) {
        this.canvas.width = data;
        this.canvas.height = data;
        let stringFormat = this.defineFormat(array);
        
        if (stringFormat === true) {
            array.forEach((row, i) => {
                row.forEach((column, j) => {
                    this.ctx.fillStyle = "#" + column;
                    this.ctx.fillRect(i, j, this.canvas.width, this.canvas.height);
                })
            })
        } else {
            array.forEach((row, i) => {
                row.forEach((column, j) => {
                    this.ctx.fillStyle = "rgba(" + column + ")";
                    this.ctx.fillRect(i, j, this.canvas.width, this.canvas.height);
                })
            })
        }
    }

    defineFormat(arr) {
        if ((typeof arr[0][0]).localeCompare("string") === 0) return true;
        return false;
    }

    bucketUse() { // fill canvas with current color
            
        this.ctx.fillStyle = color.currentColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    chooseUse(coordinates) { // set current color equal pixel color clicked on canvas

        let pixelData = this.ctx.getImageData(coordinates[0], coordinates[1], 1, 1).data;
        color.changePrevTo(color.currentColor);
        color.changeCurrentFromChooseColor(pixelData);       
    }

    pencilUse(coordinates) { // draw on canvas with pencil tool
        
        this.ctx.fillStyle = color.currentColor;
        this.ctx.fillRect(coordinates[0], coordinates[1], 1, 1);  
    }

    saveCanvas() {
        localStorage.setItem("canvasImage", this.canvas.toDataURL());
        localStorage.setItem("width", this.canvas.width);
        localStorage.setItem("height", this.canvas.height);
    }
}