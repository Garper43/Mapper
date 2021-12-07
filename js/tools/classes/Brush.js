class Brush {
    constructor(color, thickness) {
        this.color = color;
        this.thickness = thickness;
        
        this.fill = false;
        this.fillColor = "#ffffff";
        this.transparency = 1;

        this.points = {
            x: [],
            y: [],
        };
    }

    addPoint(event) {
        let brush = this.brushes[this.selBrush];
    
        brush.points.x[brush.points.x.length - 1].push((event.clientX - map.x));
        brush.points.y[brush.points.y.length - 1].push((event.clientY - map.y));

        window.requestAnimationFrame(update);
    }
}