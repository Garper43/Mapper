//GENERAL CONTROLS
//EVENTS
canvas.addEventListener("wheel", function(event) {
    if(map.drag) {return}

    let direction = -1;
    //cursor coordinates
    let cX = event.clientX;
    let cY = event.clientY;
    //check scroll direction
    if (event.deltaY < 0) {
        direction = direction * -1;
    }
    
    map.scale = map.scale + (map.scale * ZOOM_SPEED * direction);

    //move the map
    map.x = (map.x - (cX - map.x) * ZOOM_SPEED * direction);
    map.y = (map.y - (cY - map.y) * ZOOM_SPEED * direction);
    //scale the map
    map.image.displayWidth = (map.image.baseWidth * map.scale);
    map.image.displayHeight = (map.image.baseHeight * map.scale);

    //scale brushes
    //TODO: make this readable
    for( a in brushTool.brushes ) { //loop through brushes
        let brush = brushTool.brushes[a];

        let x1,y1;
        let x2,y2;

        for( b in brush.points.x ) { //loop through strokes
            for( c in brush.points.x[b] ) { //loop through points
                //starting value of x
                x1 = brush.points.x[b][c] + map.x;
                y1 = brush.points.y[b][c] + map.y;

                //scaled value of x
                x2 = x1 + (x1 - event.clientX) * (ZOOM_SPEED * direction);
                y2 = y1 + (y1 - event.clientX) * (ZOOM_SPEED * direction);

                //subtract scaled map offset coordinates from x2
                brush.points.x[b][c] = (x2 - (map.x + (map.x - event.clientX) * (ZOOM_SPEED * direction)));
                brush.points.y[b][c] = (y2 - (map.y + (map.y - event.clientX) * (ZOOM_SPEED * direction)));
            }  
        }    
    }

    //update canvas
    window.requestAnimationFrame(update);
});

document.addEventListener('contextmenu', e => {
    e.preventDefault();
});

canvas.addEventListener("mousedown", function (event) {
    if(event.button == 1) { dragStart(event) } //start dragging map
    else if(event.button == 0 && brushTool.selBrush != undefined && brushTool.activeTool == "pencil") { brushTool.pencilStart() ; brushTool.addPoint(event) } //start draw using pencil
    else if(event.button == 0 && brushTool.selBrush != undefined && !brushTool.poly && brushTool.activeTool == "poly") { brushTool.polyStart() ; brushTool.addPoint(event) } // start draw using poly
    else if(event.button == 0 && brushTool.selBrush != undefined && brushTool.poly && brushTool.activeTool == "poly") { brushTool.addPoint(event) } //draw using poly
    else if(event.button == 2 && brushTool.selBrush != undefined && brushTool.poly && brushTool.activeTool == "poly") { brushTool.polyEnd() } //stop draw using poly
});
window.addEventListener("mouseup", function (event) {
    if(event.button == 1) { dragEnd(event) }  //map drag stop
    else if(event.button == 0) { brushTool.pencilEnd() } //pencil draw stop
});
canvas.addEventListener("mousemove", function (event) {
    //return if drag is off
    if (map.drag) { moveMap(event) } //move map
    else if (brushTool.pencil) { brushTool.addPoint(event) } //add brushTool point
});



//FUNCTIONS
function dragStart(event) {
    map.drag = true;
    map.dragStart.x = map.x - event.clientX * DRAG_SPEED;
    map.dragStart.y = map.y - event.clientY * DRAG_SPEED;

    //make canvas overlay the toolbar so that dragging it over the toolbar doesn't stop the drag
    canvas.style.zIndex = "2";
}

function dragEnd(event) {
    map.drag = false;

    //reset canvas z-index
    canvas.style.zIndex = "1";
}

function moveMap(event) {
    map.x = map.dragStart.x + event.clientX * DRAG_SPEED;
    map.y = map.dragStart.y + event.clientY * DRAG_SPEED;
    
    window.requestAnimationFrame(update);
}