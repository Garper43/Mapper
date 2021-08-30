//map control
//scroll event
canvas.addEventListener("wheel", function(event) {
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
    map.drag = true;
    map.dragStart.x = map.x - event.clientX * 1.5;
    map.dragStart.y = map.y - event.clientY * 1.5;

    //make canvas overlay the toolbar so that dragging it over the toolbar doesn't stop the drag
    canvas.style.zIndex = "2";
});
canvas.addEventListener("mouseup", function (event) {
    map.drag = false;

    //reset canvas z-index
    canvas.style.zIndex = "0";
});
canvas.addEventListener("mousemove", function (event) {
    //return if drag is off
    if (!map.drag) { return }
    map.x = map.dragStart.x + event.clientX * 1.5;
    map.y = map.dragStart.y + event.clientY * 1.5;
    window.requestAnimationFrame(update);
});