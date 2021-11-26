const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

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

//load marker file
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

            ctx.moveTo(~~(brush.points.x[b][0] + map.x), ~~(brush.points.y[b][0] + map.y));

            for( c in brush.points.x[b] ) { //loop through points
                ctx.lineTo(~~(brush.points.x[b][c] + map.x), ~~(brush.points.y[b][c] + map.y));
            }

            ctx.stroke();
        }
    } 
}

function drawWaypoints() {
    for( i = 0 ; i < tool.waypoint.waypoints.length ; i++ ) {
        ctx.drawImage(tool.waypoint.icon, tool.waypoint.waypoints[i].x + map.x - 10, tool.waypoint.waypoints[i].y + map.y - 20, 20, 20);
    }
}

