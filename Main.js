const ZOOM_SPEED = 0.2;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

map = {
    image: new Image(),
    x: 0,
    y: 0,
    width: 100, //replaced after loading the map image
    height: 100, //replaced after loading the map image
    drag: false,
    dragStart: {
        x: 0,
        y: 0
    },
}

//load map map.image
map.image.src = "map.png";
map.image.onload = function() {
    //set map image size
    map.width = canvas.height * (map.image.naturalWidth/map.image.naturalHeight);
    map.height = canvas.height;

    ctx.drawImage(map.image, map.x, map.y, map.width, map.height);
}
map.image.src = "gtavmap.svg";

//update map
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map.image, map.x, map.y, map.width, map.height);
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
    //move the map
    map.x = map.x - (cX - map.x) * ZOOM_SPEED * direction;
    map.y = map.y - (cY - map.y) * ZOOM_SPEED * direction;
    //scale the map
    map.width = map.width + (map.width * direction * ZOOM_SPEED);
    map.height = map.height + (map.height * direction * ZOOM_SPEED);
    window.requestAnimationFrame(update);
});

//drag events
canvas.addEventListener("mousedown", function (event) {
    map.drag = true;
    map.dragStart.x = map.x - event.clientX * 1.5;
    map.dragStart.y = map.y - event.clientY * 1.5;
});
canvas.addEventListener("mouseup", function (event) {
    map.drag = false;
});
canvas.addEventListener("mousemove", function (event) {
    //return if drag is off
    if (!map.drag) { return }
    map.x = map.dragStart.x + event.clientX * 1.5;
    map.y = map.dragStart.y + event.clientY * 1.5;
    window.requestAnimationFrame(update);
});