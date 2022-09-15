let tool = {
    selTool: undefined,
    toolActive: false,

    LMBPressEvent: function (ev) {
        selTool.LMBPressEvent(ev);
    },
    LMBReleaseEvent: function (ev) {
        selTool.LMBReleaseEvent(ev);
    },
    RMBPressEvent: function (ev) {
        selTool.RMBPressEvent(ev);
    },
    RMBReleaseEvent: function (ev) {
        selTool.RMBReleaseEvent(ev);
    },

    brush: {
        selBrush: undefined, //index of the selected brush inside brushTool.brushes

        //methods
        addBrush: function (color, thickness) {
            let brush = new Brush(color, thickness);
        
            map.toolData.brushes.push(brush);
            //brushTool.selBrush = brushTool.brushes.length - 1;
            ui.addBrushBtn(color);
        },
    },
    waypoint: {
        selWaypoint: -1,
        icon: new Image(),
    }
}