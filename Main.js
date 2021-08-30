const ZOOM_SPEED = 0.2;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

map = {
    image: {
        file: new Image(),
        //these dimentions are placeholders and will be replaced in image.file.onload()
        //they are used for calculating displayed image size
        baseWidth: 0,
        baseHeight: 0,
        //these dimentions are placeholders and will be replaced in scroll events
        //displayed dimentions are actual dimentions that will be drawn
        displayWidth: 0,
        displayHeight: 0,
    },
    //offset
    x: 0,
    y: 0,

    drag: false,
    dragStart: {
        x: 0,
        y: 0
    },
    scale: 1,
}

//load map map.image.file
map.image.file.src = "map.png";
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
    ctx.drawImage(map.image.file, map.x, map.y, map.image.baseWidth, map.image.baseHeight);
}
map.image.file.src = "gtavmap.svg";

//update map
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map.image.file, map.x, map.y, map.image.displayWidth, map.image.displayHeight);
}

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