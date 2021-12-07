const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.webkitImageSmoothingEnabled = true;
ctx.mozImageSmoothingEnabled = true;
ctx.imageSmoothingEnabled = true;

hexDigits = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]

//update canvas
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map.image.file, map.image.x + map.x, map.image.y + map.y, map.image.displayWidth, map.image.displayHeight);

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
    for( a in tool.brush.brushes ) { //loop through brushes

        let brush = tool.brush.brushes[a];
        ctx.fillStyle = brush.color;
        ctx.strokeStyle = brush.color;
        ctx.lineCap = 'round';

        for( b in brush.points.x ) { //loop through strokes
            //draw lines
            ctx.lineWidth = brush.thickness * map.scale;
            ctx.beginPath();

            ctx.moveTo((brush.points.x[b][0] + map.x), (brush.points.y[b][0] + map.y));

            for( c in brush.points.x[b] ) { //loop through points
                ctx.lineTo((brush.points.x[b][c] + map.x), (brush.points.y[b][c] + map.y));
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

    for( i = 0 ; i < tool.waypoint.waypoints.length ; i++ ) {
        x = tool.waypoint.waypoints[i].x + map.x;
        y = tool.waypoint.waypoints[i].y + map.y;

        ctx.drawImage(tool.waypoint.icon, x - 10, y - 20, 20, 20);
    }

    if(map.scale >= 1) {
        ctx.fillStyle = "black";
        ctx.font = "20px sans-serif";

        for( i = 0 ; i < tool.waypoint.waypoints.length ; i++ ) {
            x = tool.waypoint.waypoints[i].x + map.x;
            y = tool.waypoint.waypoints[i].y + map.y;

            ctx.fillText(tool.waypoint.waypoints[i].name, x + 10, y);
        }    
    }
    
}

