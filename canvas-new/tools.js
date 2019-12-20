export class Tools {

    constructor(activeTool) {
        this.activeTool = activeTool;
    }

    activate(clicked) { // set active status for selected tool
        this.activeTool.classList.remove("active");
        this.activeTool = clicked;
        this.activeTool.classList.add("active");
    }
}