let poly = {
    //evnts
    LMBPressEvent: function (ev) {
        if(!tool.toolActive) {
            this.polyStart();    
        }
        
        this.addPoint(ev);
    },
    LMBReleaseEvent: function (ev) {

    },
    RMBPressEvent: function (ev) {
        this.polyEnd();
    },
    RMBReleaseEvent: function (ev) {

    },
    mouseMoveEvent: function (ev) {

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