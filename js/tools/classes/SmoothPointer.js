class SmoothPointer {
    constructor(smoothness) {
        this.smoothness = smoothness;

        this.x;
        this.y;
    }

    startPointer(ev) {
        this.x = ev.clientX;
        this.y = ev.clientY;
    }

    movePointer(ev) {
        let cx = ev.clientX;
        let cy = ev.clientY;

        let x = this.x;
        let y = this.y;
    
        this.x = x + (cx-x)/this.smoothness;
        this.y = y + (cy-y)/this.smoothness;
    }
}