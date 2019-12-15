export class Canvas {

    constructor (canvaselement) {
        this.canvas = canvaselement;
        this.ctx = canvas.getContext("2d");
    }

    drawPicture(source) {
        const img = new Image;
        this.canvas.width = 256;
        this.canvas.height = 256; 
        img.crossOrigin = 'anonymous';
        img.src = source;
        img.onload = function() {
            this.ctx = canvas.getContext("2d");
            this.ctx.drawImage(img, 0, 0);
        }
    }

    drawArray(data, array) {
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
}