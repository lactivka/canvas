let frames = [];

const getFrames = () => {
    const frames = [];

    const frame = [
        ["00BCD4", "FFEB3B","FFEB3B","00BCD4"],
        ["FFEB3B", "FFC107","FFC107","FFEB3B"],
        ["FFEB3B", "FFC107","FFC107","FFEB3B"],
        ["00BCD4", "FFEB3B","FFEB3B","00BCD4"]
    ]

    frames.push(frame);
    console.log(frames);

    return frames;
}

function draw(frame) {
    let canvas = document.getElementById('canvas');
    
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        
       frame.forEach((row, i) => {
            row.forEach((column, j) => {
                ctx.fillStyle = "#" + column;
                ctx.fillRect(i, j, 4, 4);
            })
        })     
    }
}

window.onload = document.getElementById('draw').addEventListener('click', () => {
    const frames = getFrames();
    const frame = frames[0];
    draw(frame);
})
