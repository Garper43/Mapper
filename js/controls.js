//map control
//scroll event
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
    map.x = map.x - (cX - map.x) * ZOOM_SPEED * direction;
    map.y = map.y - (cY - map.y) * ZOOM_SPEED * direction;
    //scale the map
    map.image.displayWidth = (map.image.baseWidth * map.scale);
    map.image.displayHeight = (map.image.baseHeight * map.scale);

    //update canvas
    window.requestAnimationFrame(update);
});

//drag events
canvas.addEventListener("mousedown", function (event) {
    if(event.button != 1) {return} //check for middle mouse button

    map.drag = true;
    map.dragStart.x = map.x - event.clientX * DRAG_SPEED;
    map.dragStart.y = map.y - event.clientY * DRAG_SPEED;

    //make canvas overlay the toolbar so that dragging it over the toolbar doesn't stop the drag
    canvas.style.zIndex = "2";
});
canvas.addEventListener("mouseup", function (event) {
    if(event.button != 1) {return}  //check for middle mouse button

    map.drag = false;

    //reset canvas z-index
    canvas.style.zIndex = "0";
});
canvas.addEventListener("mousemove", function (event) {
    //return if drag is off
    if (!map.drag) { return }
    map.x = map.dragStart.x + event.clientX * DRAG_SPEED;
    map.y = map.dragStart.y + event.clientY * DRAG_SPEED;
    window.requestAnimationFrame(update);
});