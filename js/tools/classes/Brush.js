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
}