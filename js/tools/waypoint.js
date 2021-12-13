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
        tool.waypoint.waypoints.pop();
        update();
    },
    singleUndoEvent() {
        this.undoEvent();
    },

    //methods
    addWaypoint: function (ev) {
        tool.waypoint.waypoints.push(new Waypoint(ev.clientX - map.x, ev.clientY - map.y));
        update();
    },
    showWaypoint: function (waypoint) {
        this.hideWaypoint();

        ui.waypointBox.style.left = waypoint.x + map.x + "px";
        ui.waypointBox.style.top = waypoint.y + map.y + "px";

        ui.waypointBox.style.width = waypoint.width + "px";
        ui.waypointBox.style.height = waypoint.height + "px";

        ui.waypointName.value = waypoint.name;
        ui.waypointTextArea.value = waypoint.content;

        ui.waypointBox.style.display = "block";
    },
    hideWaypoint: function () {
        if(tool.waypoint.selWaypoint == -1) {return}

        //save changes
        tool.waypoint.waypoints[tool.waypoint.selWaypoint].width = ui.waypointBox.offsetWidth - 20;
        tool.waypoint.waypoints[tool.waypoint.selWaypoint].height = ui.waypointBox.offsetHeight - 20;

        tool.waypoint.waypoints[tool.waypoint.selWaypoint].name = ui.waypointName.value;
        tool.waypoint.waypoints[tool.waypoint.selWaypoint].content = ui.waypointTextArea.value;


        tool.waypoint.selWaypoint = -1;
        ui.waypointBox.style.display = "none";
        update();
    }
}