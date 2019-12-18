export class Color {
    
    constructor(curr, prev, red, blue) {
        this.currentColor = curr;
        this.prevColor = prev;
        this.red = red;
        this.blue = blue;
    }

    changeColor(clicked) {
        let previous = this.prevColor;

        this.changePrevTo(this.currentColor);
        this.changeCurrentTo(clicked, previous);
    }

    changePrevTo(current) { // change color of prev tool to current tool color
        
        document.querySelector(".tool__prev").children[0].style.backgroundColor = current;
        this.prevColor = current;
    }

    changeCurrentTo(clicked, color) { // change current tool color:

        if (clicked.closest(".tool__prev")) {  // to prev tool color
            document.querySelector(".tool__current").children[0].style.backgroundColor = color;
            this.currentColor = color;
        }

        if (clicked.closest(".tool__red")) { // to red
            document.querySelector(".tool__current").children[0].style.backgroundColor = this.red;
            this.currentColor = this.red;   
        }
          
        if (clicked.closest(".tool__blue")) { // to blue
           document.querySelector(".tool__current").children[0].style.backgroundColor = this.blue;
           this.currentColor = this.blue;   
        }     
    }

    changeCurrentFromInput() { // change current color to color selected in input
        let inputColor = document.querySelector(".color-input").value;
        
        document.querySelector(".tool__current").children[0].style.backgroundColor = inputColor;
        document.querySelector(".color-input").value = "#eeebeb";
        this.currentColor = inputColor;
    }

    changeCurrentFromChooseColor(pixelData) {
        let data = ('rgba(' + pixelData + ')');
        document.querySelector(".tool__current").children[0].style.backgroundColor = data;
        this.currentColor = data;
    }
    
    saveColor() {
        localStorage.setItem("currentColor", this.currentColor);
        localStorage.setItem("prevColor",  this.prevColor);
    }
}