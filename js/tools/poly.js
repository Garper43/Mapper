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
        tool.brush.brushes[tool.brush.selBrush].points.x.pop();
        tool.brush.brushes[tool.brush.selBrush].points.y.pop();

        update();
    },
    singleUndoEvent() {
        let brush = tool.brush.brushes[tool.brush.selBrush];

        brush.points.x[brush.points.x.length-1].pop();
        brush.points.y[brush.points.y.length-1].pop();

        if(brush.points.x[brush.points.x.length-1].length == 0) {
            this.undoEvent(); //delete current stroke
        }

        update();
    },

    //methods
    addPoint: function (ev) {
        let brush = tool.brush.brushes[tool.brush.selBrush];
        brush.points.x[brush.points.x.length - 1].push((ev.clientX - map.x));
        brush.points.y[brush.points.y.length - 1].push((ev.clientY - map.y));
        window.requestAnimationFrame(update);
    },

    polyStart: function polyStart() { 
        tool.toolActive = true;

        tool.brush.brushes[tool.brush.selBrush].points.x.push([]);
        tool.brush.brushes[tool.brush.selBrush].points.y.push([]);
    },

    polyEnd: function polyEnd() {
        tool.toolActive = false;
    }
}