const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
//ctx.webkitImageSmoothingEnabled = false;
//ctx.mozImageSmoothingEnabled = false;
//ctx.imageSmoothingEnabled = false;

//update map
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map.image.file, map.x, map.y, map.image.displayWidth, map.image.displayHeight);
}

//load map map.image.file
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
    ctx.drawImage(map.image.file, map.x, map.y, map.image.baseWidth, map.image.baseHeight);
}