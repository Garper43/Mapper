map = {
    image: {
        file: new Image(),
        
        x: 0,
        y: 0,

        //TODO: do something
        src: "assets/gtavmap.svg",

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

let brushTool = {
    selBrush: undefined, //index of the selected brush inside brushTool.brushes
    brushes: [], //stores every brush object
    poly: false,
    activeTool: undefined,

    //methods
    addBrush: function addBrush(color, thickness) {
        let brush = new Brush(color, thickness);
    
        this.brushes.push(brush);
        //brushTool.selBrush = brushTool.brushes.length - 1;
        ui.addBrushBtn(color);
    },
    addPoint: function addPoint(event) {
        let brush = this.brushes[this.selBrush];
    
        brush.points.x[brush.points.x.length - 1].push((event.clientX - map.x));
        brush.points.y[brush.points.y.length - 1].push((event.clientY - map.y));
    
        window.requestAnimationFrame(update);
    },

    //pencil methods
    pencilStart: function pencilStart() {
        this.pencil = true;
    
        this.brushes[this.selBrush].points.x.push([]);
        this.brushes[this.selBrush].points.y.push([]);
    },
    pencilEnd: function pencilEnd() {
        this.pencil = false;
    },

    //poly methods
    polyStart: function polyStart() {
        this.poly = true;
    
        this.brushes[this.selBrush].points.x.push([]);
        this.brushes[this.selBrush].points.y.push([]);
    },
    polyEnd: function polyEnd() {
        this.poly = false;
    }
}