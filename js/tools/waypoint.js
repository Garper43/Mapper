let waypoint = {
    //evnts
    LMBPressEvent: function (ev) {
        this.addWaypoint(ev);
    },
    LMBReleaseEvent: function (ev) {

    },
    RMBPressEvent: function (ev) {

    },
    RMBReleaseEvent: function (ev) {

    },
    mouseMoveEvent: function (ev) {

    },

    //methods
    addWaypoint: function (ev) {
        tool.waypoint.waypoints.push(new Waypoint(ev.clientX - map.x, ev.clientY - map.y));

        let clone = ui.waypointTemplate.cloneNode(true);
        ui.waypointContainer.appendChild(clone);
        
        let waypoint = ui.waypointContainer.children[ui.waypointContainer.children.length - 1];

        waypoint.style.left = ev.clientX - waypoint.offsetWidth/2 + "px";
        waypoint.style.top = ev.clientY - waypoint.offsetHeight/2 + "px";
    },
}