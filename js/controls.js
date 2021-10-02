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
    for( a in drawing.brushes ) { //loop through brushes
        let brush = drawing.brushes[a];

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

canvas.addEventListener("mousedown", function (event) {
    if(event.button == 1) { dragStart(event) }                                                     //check for middle mouse button
    else if(event.button == 0 && drawing.selBrush != undefined) { brushStart() ; addPoint(event) } //check for left mouse button
});
window.addEventListener("mouseup", function (event) {
    if(event.button == 1) { dragEnd(event) }  //check for middle mouse button
    else if(event.button == 0) { brushEnd() } //check for left mouse button
});
canvas.addEventListener("mousemove", function (event) {
    //return if drag is off
    if (map.drag) { moveMap(event) }
    else if (drawing.draw) { addPoint(event) }
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



//BRUSH CONTROLS
function brushStart() {
    drawing.draw = true;

    drawing.brushes[drawing.selBrush].points.x.push([]);
    drawing.brushes[drawing.selBrush].points.y.push([]);
}

function addPoint(event) {
    let brush = drawing.brushes[drawing.selBrush];

    brush.points.x[brush.points.x.length - 1].push(~~(event.clientX - map.x));
    brush.points.y[brush.points.y.length - 1].push(~~(event.clientY - map.y));

    window.requestAnimationFrame(update);
}

function brushEnd() {
    drawing.draw = false;
}