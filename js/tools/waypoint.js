let waypoint = {
    //evnts
    LMBPressEvent(ev) {
        this.addWaypoint(ev);
    },
    LMBReleaseEvent(ev) {

    },
    RMBPressEvent(ev) {

    },
    RMBReleaseEvent(ev) {

    },
    mouseMoveEvent(ev) {

    },
    undoEvent() {
        map.toolData.waypoints.pop();
        update();
    },
    singleUndoEvent() {
        this.undoEvent();
    },

    //methods
    addWaypoint: function (ev) {
        let x = (ev.clientX - map.x) / (map.scale * map.image.baseWidth);
        let y = (ev.clientY - map.y) / (map.scale * map.image.baseHeight);

        map.toolData.waypoints.push(new Waypoint(x, y));
        
        update();
    },
    showDescription: function (waypoint) {
        this.hideDescription();

        let x = map.toolData.waypoints[i].x * (map.scale * map.image.baseWidth) + map.x;
        let y = map.toolData.waypoints[i].y * (map.scale * map.image.baseHeight) + map.y;

        ui.waypointBox.style.left = x + "px";
        ui.waypointBox.style.top = y + "px";

        ui.waypointBox.style.width = waypoint.width + "px";
        ui.waypointBox.style.height = waypoint.height + "px";

        ui.waypointName.value = waypoint.name;
        ui.waypointTextArea.value = waypoint.content;

        ui.waypointBox.style.display = "block";
    },
    hideDescription: function () {
        if(tool.waypoint.selWaypoint == -1) {return}

        //save changes
        map.toolData.waypoints[tool.waypoint.selWaypoint].width = ui.waypointBox.offsetWidth - 20;
        map.toolData.waypoints[tool.waypoint.selWaypoint].height = ui.waypointBox.offsetHeight - 20;

        map.toolData.waypoints[tool.waypoint.selWaypoint].name = ui.waypointName.value;
        map.toolData.waypoints[tool.waypoint.selWaypoint].content = ui.waypointTextArea.value;


        tool.waypoint.selWaypoint = -1;
        ui.waypointBox.style.display = "none";
        update();
    }
}