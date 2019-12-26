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

    bucketFill(color) { // fill canvas with current color
            
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    pixelColor(current, coordinates) { // set current color equal pixel color clicked on canvas

        let pixelData = this.ctx.getImageData(coordinates[0], coordinates[1], 1, 1).data;
        color.changePrevTo(current);
        color.changeCurrentFromChooseColor(pixelData);       
    }

    drawRectangle(color, oldCoord, coord) { // draw on canvas with pencil tool
        this.ctx.fillStyle = color;
    
        if (coord === undefined) { this.ctx.fillRect(oldCoord[0], oldCoord[1], 1, 1); }
        else {
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

    saveCanvas() {
        localStorage.setItem("canvasImage", this.canvas.toDataURL());
        localStorage.setItem("width", this.canvas.width);
        localStorage.setItem("height", this.canvas.height);
    }
}