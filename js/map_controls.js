//EVENTS
canvas.addEventListener("wheel", (ev) => {
    if(map.drag) {return}

    waypoint.hideWaypoint();

    let direction = -1;
    //cursor coordinates
    let cX = ev.clientX;
    let cY = ev.clientY;
    //check scroll direction
    if (ev.deltaY < 0) {
        direction = direction * -1;
    }
    
    map.scale = map.scale + (map.scale * ZOOM_SPEED * direction);

    //move the map
    map.x = ~~(map.x - (cX - map.x) * ZOOM_SPEED * direction);
    map.y = ~~(map.y - (cY - map.y) * ZOOM_SPEED * direction);
    //scale the map
    map.image.displayWidth = (map.image.baseWidth * map.scale);
    map.image.displayHeight = (map.image.baseHeight * map.scale);

    //scale brushes
    //TODO: make this readable
    for( a in tool.brush.brushes ) { //loop through brushes
        let brush = tool.brush.brushes[a];

        for( b in brush.points.x ) { //loop through  brush strokes
            for( c in brush.points.x[b] ) { //loop through  brush points
                brush.points.x[b][c] = scaleCoordinate(brush.points.x[b][c], cX, ZOOM_SPEED * direction);
                brush.points.y[b][c] = scaleCoordinate(brush.points.y[b][c], cY, ZOOM_SPEED * direction);
            }  
        }    
    }

    //scale waypoints
    for( i = 0 ; i < tool.waypoint.waypoints.length ; i++ ) {
        tool.waypoint.waypoints[i].x = scaleCoordinate(tool.waypoint.waypoints[i].x, cX, ZOOM_SPEED * direction);
        tool.waypoint.waypoints[i].y = scaleCoordinate(tool.waypoint.waypoints[i].y, cY, ZOOM_SPEED * direction);
    }

    //update canvas
    window.requestAnimationFrame(update);
});

canvas.addEventListener("mousedown", (ev) => {
    //check for waypoint press
    if(ev.button == 0 && tool.selTool != pointer) {
        cX = ev.clientX;
        cY = ev.clientY;

        for(i = 0; i < tool.waypoint.waypoints.length; i++) {
            wX = tool.waypoint.waypoints[i].x + map.x;
            wY = tool.waypoint.waypoints[i].y + map.y;

            x = cX - wX;
            y = cY - wY;

            if((x*x + y*y) < 20*20) {
                waypoint.showWaypoint(tool.waypoint.waypoints[i]);
                tool.waypoint.selWaypoint = i;
                return;
            }
        }
    }

    waypoint.hideWaypoint();

    //check for everything else
    if(ev.button == 1) { 
        dragStart(ev) 

    } else if(ev.button == 0) {
        tool.selTool.LMBPressEvent(ev);

    } else if(ev.button == 2) {
        tool.selTool.RMBPressEvent(ev);

    }
});
canvas.addEventListener("mouseup", (ev) => {
    if(ev.button == 1) { 
        dragEnd(ev) 

    } else if(ev.button == 0) {
        tool.selTool.LMBReleaseEvent(ev);

    } else if(ev.button == 2) {
        tool.selTool.RMBReleaseEvent(ev);

    }
});
canvas.addEventListener("mousemove", (ev) => {
    if (map.drag) { 
        moveMap(ev);
        waypoint.hideWaypoint();
    } else if(tool.selTool != undefined) {
        tool.selTool.mouseMoveEvent(ev);
    }
});
//ctrl-z
window.addEventListener("keydown", (ev) => {
    if (ev.key == "z" && ev.ctrlKey && !ev.altKey) {tool.selTool.undoEvent()};
    if (ev.key == "z" && ev.ctrlKey &&  ev.altKey) {tool.selTool.singleUndoEvent()};
});





//FUNCTIONS
function dragStart(ev) {
    map.drag = true;
    map.dragStart.x = map.x - ev.clientX * DRAG_SPEED;
    map.dragStart.y = map.y - ev.clientY * DRAG_SPEED;

    //make canvas overlay the toolbar so that dragging it over the toolbar doesn't stop the drag
    //canvas.style.zIndex = "4";
}

function dragEnd(ev) {
    map.drag = false;

    //reset canvas z-index
    //canvas.style.zIndex = "1";
}

function moveMap(ev) {
    map.x = Math.floor(map.dragStart.x + ev.clientX * DRAG_SPEED);
    map.y = Math.floor(map.dragStart.y + ev.clientY * DRAG_SPEED);
    
    window.requestAnimationFrame(update);
}

function scaleCoordinate(coordinate, origin, factor) {
    //scale scale cordinates of point
    xScaled = coordinate + (coordinate - origin) * factor;

    //move point cordinates
    xMoved = (xScaled + origin * factor);

    return xMoved;
}




//MISCELLANEOUS
document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
});