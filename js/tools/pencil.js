let pencil = {
    //evnts
    LMBPressEvent: function (ev) {
        this.pencilStart();
        this.addPoint(ev);
    },
    LMBReleaseEvent: function (ev) {
        this.pencilEnd();
    },
    RMBPressEvent: function (ev) {

    },
    RMBReleaseEvent: function (ev) {

    },
    mouseMoveEvent: function (ev) {
        if(!tool.toolActive) {return}

        this.addPoint(ev);
    },

    //methods
    addPoint: function (ev) {
        let brush = tool.brush.brushes[tool.brush.selBrush];
    
        brush.points.x[brush.points.x.length - 1].push((ev.clientX - map.x));
        brush.points.y[brush.points.y.length - 1].push((ev.clientY - map.y));

        window.requestAnimationFrame(update);
    },

    pencilStart: function () {
        tool.toolActive = true;
    
        tool.brush.brushes[tool.brush.selBrush].points.x.push([]);
        tool.brush.brushes[tool.brush.selBrush].points.y.push([]);
    },

    pencilEnd: function () {
        tool.toolActive = false;
    },
}