export class Color {
    
    constructor(curr, prev, red, blue) {
        this.currentColor = curr;
        this.prevColor = prev;
        this.red = red;
        this.blue = blue;
    }

    changeColor(clicked, currentColorElement, prevColorElement) {
        let previous = this.prevColor;

        this.changePrevTo(this.currentColor, prevColorElement);
        this.changeCurrentTo(clicked, previous, currentColorElement);
    }

    changePrevTo(color, element) { // change color of prev tool to current tool color
        
        element.children[0].style.backgroundColor = color;
        this.prevColor = color;
    }

    changeCurrentTo(clicked, color, element) { // change current tool color:

        if (clicked.closest(".tool__prev")) {  // to prev tool color
            element.children[0].style.backgroundColor = color;
            this.currentColor = color;
        }

        if (clicked.closest(".tool__red")) { // to red
            element.children[0].style.backgroundColor = this.red;
            this.currentColor = this.red;   
        }
          
        if (clicked.closest(".tool__blue")) { // to blue
           element.children[0].style.backgroundColor = this.blue;
           this.currentColor = this.blue;   
        }     
    }

    changeCurrentFromInput(color, currentColorElement, inputElement) { // change current color to color selected in input
        
        currentColorElement.children[0].style.backgroundColor = color;
        inputElement.value = "#eeebeb";
        this.currentColor = color;
    }

    changeCurrentFromChooseColor(pixelData, element) {
        let data = ('rgba(' + pixelData + ')');
        element.children[0].style.backgroundColor = data;
        this.currentColor = data;
    }
}