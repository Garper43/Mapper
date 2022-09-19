let pencil = {
    pointer: new SmoothPointer(4),


    //evnts
    LMBPressEvent: function (ev) {
        this.pencilStart(ev);
        this.pointer.startPointer(ev);
        this.addPoint(ev);
    },
    LMBReleaseEvent(ev) {
        this.pencilEnd();
    },
    RMBPressEvent(ev) {

    },
    RMBReleaseEvent(ev) {

    },
    mouseMoveEvent(ev) {
        if(!tool.toolActive) {return}

        this.pointer.movePointer(ev);
        this.addPoint(ev);
    },
    undoEvent() {
        map.toolData.brushes[tool.brush.selBrush].points.x.pop();
        map.toolData.brushes[tool.brush.selBrush].points.y.pop();

        update();
    },
    singleUndoEvent() {
        let brush = map.toolData.brushes[tool.brush.selBrush];

        brush.points.x[brush.points.x.length-1].pop();
        brush.points.y[brush.points.y.length-1].pop();

        if(brush.points.x[brush.points.x.length-1].length == 0) {
            this.undoEvent(); //delete current stroke
        }

        update();
    },

    //methods
    addPoint: function (ev) {
        let brush = map.toolData.brushes[tool.brush.selBrush];
    
        brush.points.x[brush.points.x.length - 1].push((this.pointer.x - map.x) / (map.scale * map.image.baseWidth));
        brush.points.y[brush.points.y.length - 1].push((this.pointer.y - map.y) / (map.scale * map.image.baseHeight));

        window.requestAnimationFrame(update);
    },

    pencilStart: function (ev) {
        tool.toolActive = true;
    
        map.toolData.brushes[tool.brush.selBrush].points.x.push([]);
        map.toolData.brushes[tool.brush.selBrush].points.y.push([]);
    },

    pencilEnd: function () {
        tool.toolActive = false;

        //TODO: consider this
        //remove some points
        // let points = map.toolData.brushes[tool.brush.selBrush].points;

        // if(points.x[points.x.length - 1].length > 150) {
        //     for(a = 0; a < 1; a++) {
        //         for(i = 1; i < points.x[points.x.length - 1].length; i += 2) {
        //             points.x[points.x.length - 1].splice(i, 1);
        //             points.y[points.y.length - 1].splice(i, 1);
        //         }    
        //     }   
            
        //     update();
        //     console.log("Simplified");
        // }
    },
}

