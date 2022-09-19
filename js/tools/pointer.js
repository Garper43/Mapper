let pointer = {
    selectedType: undefined,
    selectedPoint: {
        brushIndex: -1,
        strokeIndex: -1,
        pointIndex: -1,
    },
    selectedWaypointIndex: -1,


    LMBPressEvent(ev) {
        this.startDrag(ev);
    },
    LMBReleaseEvent(ev) {
        this.stopDrag(ev);
    },
    RMBPressEvent(ev) {

    },
    RMBReleaseEvent(ev) {
    
    },
    mouseMoveEvent(ev) {
        if(!tool.active) {return}

        let x = (ev.clientX - map.x) / (map.scale * map.image.baseWidth);
        let y = (ev.clientY - map.y) / (map.scale * map.image.baseHeight);

        if(this.selectedType == "point") {
            b = this.selectedPoint.brushIndex;
            s = this.selectedPoint.strokeIndex;
            p = this.selectedPoint.pointIndex;

            map.toolData.brushes[b].points.x[s][p] = x;
            map.toolData.brushes[b].points.y[s][p] = y;
        }else {
            map.toolData.waypoints[this.selectedWaypointIndex].x = x;
            map.toolData.waypoints[this.selectedWaypointIndex].y = y;
        }

        update();
    },
    undoEvent() {

    },
    singleUndoEvent() {

    },
    
    startDrag(ev) {
        //find the nearest point
        let minRadius = 20; //minimum distance to a point
        let cX = ev.clientX;
        let cY = ev.clientY;

        //iterate through brushes
        for(b = 0; b < map.toolData.brushes.length; b++) {
            let brush = map.toolData.brushes[b];
        
            for(s = 0; s < brush.points.x.length; s++) { //iterate through strokes

                for(p = 0; p < brush.points.x[s].length; p++) { //iterate through points
                    let x = brush.points.x[s][p] * (map.scale * map.image.baseWidth) + map.x;
                    let y = brush.points.y[s][p] * (map.scale * map.image.baseHeight) + map.y;

                    //check if selected point is close enough
                    if(Math.pow(x-cX, 2) + Math.pow(y-cY, 2) < Math.pow(minRadius, 2)) {
                        this.selectedPoint.brushIndex = b;
                        this.selectedPoint.strokeIndex = s;
                        this.selectedPoint.pointIndex = p;

                        tool.active = true;
                        this.selectedType = "point";
                    }  
                }    
            } 
        }  

        //iterate through waypoints
        for(i = 0; i < map.toolData.waypoints.length; i++) {
            let x = map.toolData.waypoints[i].x * (map.scale * map.image.baseWidth) + map.x;
            let y = map.toolData.waypoints[i].y * (map.scale * map.image.baseHeight) + map.y;

            if(Math.pow(x-cX, 2) + Math.pow(y-cY, 2) < Math.pow(minRadius, 2)) {
                this.selectedWaypointIndex = i;

                tool.active = true;
                this.selectedType = "waypoint";
            } 
        }
    },
    stopDrag(ev) {
        tool.active = false;
    }
}

