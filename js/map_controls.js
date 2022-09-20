//EVENTS
canvas.addEventListener("wheel", (ev) => {
    if(map.drag) {return}

    waypoint.hideDescription();

    let direction = (ev.deltaY > 0)?-1:1;
    //cursor coordinates
    let cX = ev.clientX;
    let cY = ev.clientY;
    
    map.scale = map.scale + (map.scale * ZOOM_SPEED * direction);

    //move the map
    map.x = ~~(map.x - (cX - map.x) * ZOOM_SPEED * direction);
    map.y = ~~(map.y - (cY - map.y) * ZOOM_SPEED * direction);
    //scale the map
    map.image.displayWidth = (map.image.baseWidth * map.scale);
    map.image.displayHeight = (map.image.baseHeight * map.scale);

    //update canvas
    window.requestAnimationFrame(update);
});

canvas.addEventListener("mousedown", (ev) => {
    //check for waypoint press
    if(ev.button == 0 && tool.selTool != pointer) {
        cX = ev.clientX;
        cY = ev.clientY;

        for(i = 0; i < map.toolData.waypoints.length; i++) {
            wX = map.toolData.waypoints[i].x * (map.scale * map.image.baseWidth) + map.x;
            wY = map.toolData.waypoints[i].y * (map.scale * map.image.baseHeight) + map.y;

            x = cX - wX;
            y = cY - wY;

            if((x*x + y*y) < 20*20) {
                waypoint.showDescription(map.toolData.waypoints[i]);
                tool.waypoint.selWaypoint = i;
                return;
            }
        }
    }

    waypoint.hideDescription();

    //check for everything else
    if(ev.button == 0) { 
        dragStart(ev) 

    }  else if(ev.button == 2) {
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
        waypoint.hideDescription();
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

//MISCELLANEOUS
document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
});
