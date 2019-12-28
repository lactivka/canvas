import {color} from "./init.js";
import {currentColorElement, prevColorElement} from "./index.js";

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
        
        array.forEach((row, i) => {
            row.forEach((column, j) => {
                this.ctx.fillStyle =  stringFormat === true ? `#${column}` : `rgba(${column})`;
                this.ctx.fillRect(i, j, this.canvas.width, this.canvas.height);
            })
        }) 
    }

    defineFormat(arr) {
        if ((typeof arr[0][0]).localeCompare("string") === 0) return true;
        return false;
    }

    bucketFill(selectedColor) { // fill canvas with current color
            
        this.ctx.fillStyle = selectedColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getPixelColor(selectedColor, coordinates) { // get clicked pixel color

        let pixelData = this.ctx.getImageData(coordinates[0], coordinates[1], 1, 1).data;
        this.setPixelColor(selectedColor, pixelData);     
    }

    setPixelColor(selectedColor, pixelData) { // set current color equal pixel color clicked on canvas
        color.changePrevTo(selectedColor, prevColorElement);
        color.changeCurrentFromChooseColor(pixelData, currentColorElement);
    }

    drawRectangle(color, oldCoord, coord) { // draw on canvas with pencil tool
        this.ctx.fillStyle = color;
    
        if (coord === undefined) { 
            this.ctx.fillRect(oldCoord[0], oldCoord[1], 1, 1);
            return;
        }
        
        let dx = Math.abs(coord[0] - oldCoord[0]);
        let dy = Math.abs(coord[1] - oldCoord[1]);
        let sx = (oldCoord[0] < coord[0]) ? 1 : -1;
        let sy = (oldCoord[1] < coord[1]) ? 1 : -1;
        let err = dx - dy;

        while(true) {
            this.ctx.fillRect(oldCoord[0], oldCoord[1], 1, 1);

            if ((oldCoord[0] === coord[0]) && (oldCoord[1] === coord[1])) break;
            let nextErr = 2 * err;
            if (nextErr > -dy) { err -= dy; oldCoord[0] += sx; }
            if (nextErr < dx) { err += dx; oldCoord[1] += sy;}
        }   
    }
}