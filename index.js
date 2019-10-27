let arr4x4 = [
    ["00BCD4", "FFEB3B","FFEB3B","00BCD4"],
    ["FFEB3B", "FFC107","FFC107","FFEB3B"],
    ["FFEB3B", "FFC107","FFC107","FFEB3B"],
    ["00BCD4", "FFEB3B","FFEB3B","00BCD4"]
]

function draw() {
    let canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        /*canvas.width = 4;
        canvas.height = 4;*/
        arr4x4.forEach((row, i) => {
            row.forEach((column, j) => {
                ctx.fillStyle = "#" + column;
                ctx.fillRect(i, j, 4, 4);
            })
        })
        
    }
}
