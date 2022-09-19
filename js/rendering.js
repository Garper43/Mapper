const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

hexDigits = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]

//update canvas
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map.image.file, map.x, map.y, map.image.displayWidth, map.image.displayHeight);

    drawBrushes();
    drawWaypoints();
}

//load map.image.file
map.image.file.src = map.image.src;
map.image.file.onload = function() {
    let imgWidth = map.image.file.naturalWidth;
    let imgHeight = map.image.file.naturalHeight;

    //set base image size and offset
    if(imgHeight > imgWidth) {
        map.image.baseWidth = canvas.height * (imgWidth/imgHeight);
        map.image.baseHeight = canvas.height;

        map.x = (canvas.width - map.image.baseWidth) / 2;
    } else {
        map.image.baseHeight = canvas.width * (imgHeight/imgWidth);
        map.image.baseWidth = canvas.width;

        map.y = (canvas.height - map.image.baseHeight) / 2;
    }
    
    //set initial display image size
    map.image.displayWidth = map.image.baseWidth * map.scale;
    map.image.displayHeight = map.image.baseHeight * map.scale;

    //initial image draw
    update();
}

//load waypoint image file
tool.waypoint.icon.src = "assets/waypoint_icon.png";
tool.waypoint.icon.onload = function() {
    update();
}

function drawBrushes() {
    for( a in map.toolData.brushes ) { //loop through brushes

        let brush = map.toolData.brushes[a];
        ctx.fillStyle = brush.color;
        ctx.strokeStyle = brush.color;
        ctx.lineCap = 'round';

        for( b in brush.points.x ) { //loop through strokes
            //draw lines
            ctx.lineWidth = brush.thickness * map.scale;
            ctx.beginPath();

            let x = brush.points.x[b][0] * (map.scale * map.image.baseWidth) + map.x;
            let y = brush.points.y[b][0] * (map.scale * map.image.baseHeight) + map.y;

            ctx.moveTo(~~x, ~~y);

            for( c in brush.points.x[b] ) { //loop through points
                x = brush.points.x[b][c] * (map.scale * map.image.baseWidth) + map.x;
                y = brush.points.y[b][c] * (map.scale * map.image.baseHeight) + map.y;

                ctx.lineTo(~~x, ~~y);
            }

            //fill
            if(brush.fill) {
                ctx.fillStyle = brush.fillColor + toHex(brush.transparency*255);
                ctx.fill();
            }
            
            //stroke
            ctx.stroke();
        }
    } 
}

function toHex(value) {
    a = Math.floor(value/16);
    b = Math.floor(value - a*16);

    //a & b are converted to strings here
    a = hexDigits[a];
    b = hexDigits[b];

    return a + b;
}

function drawWaypoints() {
    let x;
    let y;

    for( i = 0 ; i < map.toolData.waypoints.length ; i++ ) {
        x = map.toolData.waypoints[i].x * (map.scale * map.image.baseWidth) + map.x;
        y = map.toolData.waypoints[i].y * (map.scale * map.image.baseHeight) + map.y;

        ctx.drawImage(tool.waypoint.icon, x - 10, y - 20, 20, 20);
    }

    if(map.scale >= 1) {
        ctx.fillStyle = "black";
        ctx.font = "20px sans-serif";

        for( i = 0 ; i < map.toolData.waypoints.length ; i++ ) {
            x = map.toolData.waypoints[i].x * (map.scale * map.image.baseWidth) + map.x;
            y = map.toolData.waypoints[i].y * (map.scale * map.image.baseHeight) + map.y;

            ctx.fillText(map.toolData.waypoints[i].name, x + 10, y);
        }    
    }
    
}

function scaleCoordinate(coordinate, origin, factor) {
    //scale scale cordinates of point
    xScaled = coordinate + (coordinate - origin) * factor;

    //move point cordinates
    xMoved = (xScaled + origin * factor);

    return xMoved;
}

