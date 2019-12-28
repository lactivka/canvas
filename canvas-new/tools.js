export class Tools {

    constructor(selectedTool) {
        this.selectedTool = selectedTool;
    }

    activate(clicked) { // set active status for selected tool
        this.selectedTool.classList.remove("active");
        this.selectedTool = clicked;
        this.selectedTool.classList.add("active");
    }
}