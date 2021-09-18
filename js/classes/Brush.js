class Brush {
    constructor(color, thickness) {
        this.color = color;
        this.thickness = thickness;

        this.points = {
            x: [],
            y: [],
        };
    }
}