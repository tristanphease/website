
/**
 * Sets up the areas to highlight, can't do this with css for some reason
 */
function setupAreaHighlight() {
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    
    canvas.style.pointerEvents = "none";
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 50;

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawRect(rect) {
        setOutline();
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
    }

    function setOutline() {
        ctx.strokeStyle = "#000000bb";
        ctx.lineWidth = 4;
    }

    function parseRect(coordsString) {
        let coords = coordsString.split(",");

        let x1 = parseFloat(coords[0]);
        let y1 = parseFloat(coords[1]);
        let x2 = parseFloat(coords[2]);
        let y2 = parseFloat(coords[3]);

        let x = Math.min(x1, x2);
        let width = Math.abs(x1 - x2);
        let y = Math.min(y1, y2);
        let height = Math.abs(y1 - y2);
        return {
            x,
            y,
            width,
            height
        };
    }

    function parseAndDrawRect(coordsString) {
        let rect = parseRect(coordsString);
        drawRect(rect);
    }

    function drawPoly(coords) {
        setOutline();
        ctx.beginPath();
        for (let i=0;i<coords.length;i++) {
            let coord = coords[i];
            if (i === 0) {
                ctx.moveTo(coord.x, coord.y);
            } else {
                ctx.lineTo(coord.x, coord.y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }

    function parsePoly(coordsString) {
        let allCoords = coordsString.split(",").map(coord => parseFloat(coord));
        let coordsFormatted = [];
        for (let i=0;i<allCoords.length;i+=2) {
            let coord = {
                x: allCoords[i],
                y: allCoords[i+1]
            };
            coordsFormatted.push(coord);
        }
        return coordsFormatted;
    }

    function parseAndDrawPoly(coordsString) {
        let coords = parsePoly(coordsString);
        drawPoly(coords);
    }

    let imageWrapper = document.getElementById("inner-image");
    imageWrapper.appendChild(canvas);
    let image = document.getElementById("background_image");

    function calculateCanvasSize() {
        let styles = window.getComputedStyle(image);
        canvas.style.left = styles.left;
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.style.width = image.width + "px";
        canvas.style.height = image.height + "px";
    }
    
    calculateCanvasSize();
    window.addEventListener("resize", calculateCanvasSize);

    for (let area of document.querySelectorAll("area")) {
        area.addEventListener("mouseover", () => {
            switch (area.shape) {
                case "rect":
                    parseAndDrawRect(area.coords);
                    break;
                case "poly":
                    parseAndDrawPoly(area.coords);
                    break;
                default:
                    console.error(`area shape ${area.shape} not supported`);
            }
        });
        area.addEventListener("mouseout", () => {
            clearCanvas();
        });
    }
}

window.addEventListener("load", () => {
    setupAreaHighlight();
    // logCoords();
});

/**
 * Logs coords to console for building the area maps
 */
function logCoords() {
    let image = document.getElementById("background_image");

    image.addEventListener("mousedown", e => {
        // middle mouse down
        if (e.button === 1) {
            let rect = image.getBoundingClientRect();

            let coords = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            console.log(`Coords: x: ${coords.x}, y: ${coords.y}`);
            e.preventDefault();
        }
    })
    
}
