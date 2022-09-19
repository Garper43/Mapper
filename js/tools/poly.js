let poly = {
    //evnts
    LMBPressEvent(ev) {
        if(!tool.toolActive) {
            this.polyStart();    
        }
        
        this.addPoint(ev);
    },
    LMBReleaseEvent(ev) {

    },
    RMBPressEvent(ev) {
        this.polyEnd();
    },
    RMBReleaseEvent(ev) {

    },
    mouseMoveEvent(ev) {

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

        brush.points.x[brush.points.x.length - 1].push((ev.clientX - map.x) / (map.scale * map.image.baseWidth));
        brush.points.y[brush.points.y.length - 1].push((ev.clientY - map.y) / (map.scale * map.image.baseHeight));

        window.requestAnimationFrame(update);
    },

    polyStart: function polyStart() { 
        tool.toolActive = true;

        map.toolData.brushes[tool.brush.selBrush].points.x.push([]);
        map.toolData.brushes[tool.brush.selBrush].points.y.push([]);
    },

    polyEnd: function polyEnd() {
        tool.toolActive = false;
    }
}