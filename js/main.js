map = {
    image: {
        file: new Image(),

        //TODO: do something
        src: "assets/world.png",

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
    draw: false,
    dragStart: {
        x: 0,
        y: 0
    },
    scale: 1,
}